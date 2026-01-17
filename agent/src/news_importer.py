"""
News Import Pipeline for fractional.quest

This module handles the daily automated import of news articles:
1. Fetches news from Serper.dev (Google News API)
2. Uses Pydantic AI to filter for relevant fractional executive content
3. Enriches with AI-generated summaries and categories
4. Inserts into Neon PostgreSQL articles table

Triggered daily by Railway cron alongside job imports.
"""

import hashlib
import json
import os
import sys
from datetime import datetime
from typing import List, Optional

import psycopg2
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel

from src.data_sources.serper_client import RawNewsArticle, fetch_serper_news, fetch_trending_fractional_news
from src.data_sources.web_scraper import scrape_url, generate_slug, ScrapedContent
from src.data_sources.unsplash_client import get_image_for_article, UnsplashImage


# ============
# Models
# ============

class NewsFilterResult(BaseModel):
    """Result of AI news filtering"""
    is_relevant: bool = Field(description="True if this article is about fractional/interim executives")
    category: str = Field(description="Category: trends, hiring, opinion, case_study, market_report, other")
    relevance_score: float = Field(description="Relevance score 0.0-1.0")
    reasoning: str = Field(description="Brief explanation")


class NewsEnrichmentResult(BaseModel):
    """Result of AI news enrichment"""
    summary: str = Field(description="2-3 sentence summary of the article")
    key_insights: List[str] = Field(description="3-5 key takeaways")
    tags: List[str] = Field(description="5-10 relevant tags")
    sentiment: str = Field(description="positive, neutral, or negative sentiment about fractional work")


class FullArticleResult(BaseModel):
    """Result of AI full article generation"""
    full_content: str = Field(description="500-800 word original article about the news, written for fractional executives")


class EnrichedArticle(BaseModel):
    """Article ready for database insertion"""
    title: str
    url: str
    source_name: str
    published_date: Optional[str]
    summary: str
    key_insights: List[str]
    category: str
    tags: List[str]
    sentiment: str
    image_url: Optional[str]
    content_hash: str
    slug: str
    full_content: Optional[str] = None
    # Unsplash attribution fields
    image_photographer: Optional[str] = None
    image_photographer_url: Optional[str] = None
    image_unsplash_url: Optional[str] = None


class NewsImportStats(BaseModel):
    """Statistics from a news import run"""
    fetched: int = 0
    filtered: int = 0
    duplicates: int = 0
    inserted: int = 0
    errors: List[str] = []


# ============
# AI Agents
# ============

news_filter_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=NewsFilterResult,
    system_prompt="""You are a news classifier for a fractional executive platform.

RELEVANT articles are about:
- Fractional/interim executive roles and hiring
- Part-time C-suite and leadership trends
- Portfolio careers at executive level
- Gig economy for senior executives
- Companies hiring fractional CFO/CTO/CMO/COO/etc
- Market trends for interim leadership
- Success stories of fractional executives
- Challenges and benefits of fractional work

NOT relevant:
- General job market news (not executive-specific)
- Full-time executive appointments (unless comparing to fractional)
- Fractional ownership (real estate, jets, etc.)
- Unrelated business news
- Recruitment agency marketing

Categories:
- trends: Industry trends and market analysis
- hiring: Specific hiring news or announcements
- opinion: Thought leadership and expert opinions
- case_study: Success stories and examples
- market_report: Data and statistics
- other: Relevant but doesn't fit above

Be selective - quality over quantity. Score 0.7+ for inclusion."""
)

news_enrich_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=NewsEnrichmentResult,
    system_prompt="""You enrich news articles for a fractional executive platform.

Generate:

1. summary (2-3 sentences):
   - Capture the main news/insight
   - Focus on what's relevant to fractional executives
   - Professional, informative tone

2. key_insights (3-5 bullet points):
   - Actionable takeaways for executives
   - Market implications
   - Relevant statistics or data points

3. tags (5-10):
   - Role types mentioned (CFO, CTO, etc.)
   - Industries
   - Topics (hiring, trends, salary, etc.)
   - Locations if relevant

4. sentiment:
   - positive: Good news for fractional work
   - neutral: Factual/balanced reporting
   - negative: Challenges or concerns raised

Focus on extracting value for fractional executives."""
)

# Article writer agent generates comprehensive original content
article_writer_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=FullArticleResult,
    system_prompt="""You are a business journalist writing for a fractional executive platform.

Your task is to write an ORIGINAL article based on a news story. The article should be:

## STYLE & TONE
- Professional business journalism, not marketing copy
- Written for experienced C-suite executives
- Informative and analytical, not promotional
- UK English spelling and conventions

## STRUCTURE (500-800 words)
1. **Opening hook** (1 paragraph) - Why this matters to fractional executives
2. **The news** (1-2 paragraphs) - What happened, who's involved
3. **Analysis** (2-3 paragraphs) - What this means for the fractional executive market
4. **Implications** (1-2 paragraphs) - How fractional CFOs/CTOs/CMOs etc. should respond
5. **Closing thought** (1 paragraph) - Forward-looking perspective

## REQUIREMENTS
- DO NOT copy text verbatim from the source - write original content
- Include specific data points and quotes if available in source material
- Make it relevant to fractional/interim executives specifically
- Avoid hyperbole and marketing language
- Be balanced and analytical

## ATTRIBUTION
- Reference the source publication naturally in the text
- Example: "According to a Financial Times report..." or "As reported by TechCrunch..."

Write content that executives would want to read and share."""
)


# ============
# Core Functions
# ============

def compute_article_hash(article: RawNewsArticle) -> str:
    """Create hash for deduplication based on title + source."""
    content = f"{article.title.lower().strip()}|{article.source.lower().strip()}"
    return hashlib.md5(content.encode()).hexdigest()


async def filter_article(article: RawNewsArticle) -> NewsFilterResult:
    """Use AI to determine if article is relevant."""
    prompt = f"""Classify this news article:

Title: {article.title}
Source: {article.source}
Snippet: {article.snippet}
URL: {article.url}
"""
    try:
        result = await news_filter_agent.run(prompt)
        return result.output
    except Exception as e:
        print(f"[NewsFilter] Error: {e}", file=sys.stderr)
        return NewsFilterResult(
            is_relevant=False,
            category="other",
            relevance_score=0.0,
            reasoning=f"Error: {str(e)}"
        )


async def generate_full_article(article: RawNewsArticle, filter_result: NewsFilterResult, scraped: ScrapedContent) -> str:
    """Generate a comprehensive original article based on the news source."""
    # Combine available content
    content_parts = []
    if scraped.success and scraped.main_content:
        content_parts.append(f"SCRAPED CONTENT:\n{scraped.main_content[:5000]}")
    if article.snippet:
        content_parts.append(f"ORIGINAL SNIPPET:\n{article.snippet}")

    combined_content = "\n\n".join(content_parts) if content_parts else "Limited information available"

    prompt = f"""Write an original article based on this news story:

TITLE: {article.title}
SOURCE: {article.source}
CATEGORY: {filter_result.category}
DATE: {article.date or 'Recent'}

SOURCE CONTENT:
{combined_content}

Remember: Write an ORIGINAL 500-800 word article, don't copy verbatim. Make it relevant to fractional executives."""

    try:
        result = await article_writer_agent.run(prompt)
        return result.output.full_content
    except Exception as e:
        print(f"[ArticleWriter] Error: {e}", file=sys.stderr)
        # Return fallback content
        return f"""The fractional executive market continues to evolve, as highlighted by recent developments reported by {article.source}.

{article.snippet}

This news underscores the growing importance of flexible executive leadership in today's business environment. Fractional executives, who work with multiple companies on a part-time basis, are increasingly sought after for their ability to provide strategic guidance without the commitment of a full-time hire.

For professionals considering or already working in fractional roles, staying informed about market developments like these is essential for maintaining a competitive edge and understanding where opportunities may arise.

The trend towards fractional leadership shows no signs of slowing, with more companies recognising the value of accessing senior expertise on a flexible basis."""


async def enrich_article(article: RawNewsArticle, filter_result: NewsFilterResult, generate_content: bool = True) -> EnrichedArticle:
    """Generate enriched content for an article, optionally with full article generation."""
    import os

    # Generate slug
    slug = generate_slug(article.title)

    prompt = f"""Enrich this news article about fractional executives:

Title: {article.title}
Source: {article.source}
Category: {filter_result.category}
Snippet: {article.snippet}
Date: {article.date or 'Unknown'}
"""
    try:
        result = await news_enrich_agent.run(prompt)

        # Optionally generate full article
        full_content = None
        if generate_content:
            print(f"[NewsEnrich] Scraping {article.url[:60]}...", file=sys.stderr)
            scraped = await scrape_url(article.url)
            full_content = await generate_full_article(article, filter_result, scraped)

        # Get contextual image from Unsplash instead of source image
        image_url = None
        image_photographer = None
        image_photographer_url = None
        image_unsplash_url = None

        unsplash_key = os.getenv("UNSPLASH_ACCESS_KEY")
        if unsplash_key:
            print(f"[NewsEnrich] Fetching Unsplash image for category: {filter_result.category}...", file=sys.stderr)
            unsplash_image = await get_image_for_article(
                category=filter_result.category,
                tags=result.output.tags,
                title=article.title,
                access_key=unsplash_key
            )
            if unsplash_image:
                image_url = unsplash_image.url
                image_photographer = unsplash_image.photographer
                image_photographer_url = unsplash_image.photographer_url
                image_unsplash_url = unsplash_image.unsplash_url
                print(f"[NewsEnrich] Got Unsplash image by {unsplash_image.photographer}", file=sys.stderr)
            else:
                print(f"[NewsEnrich] No Unsplash image found, using source image", file=sys.stderr)
                image_url = article.image_url
        else:
            print(f"[NewsEnrich] UNSPLASH_ACCESS_KEY not set, using source image", file=sys.stderr)
            image_url = article.image_url

        return EnrichedArticle(
            title=article.title,
            url=article.url,
            source_name=article.source,
            published_date=article.date,
            summary=result.output.summary,
            key_insights=result.output.key_insights[:5],
            category=filter_result.category,
            tags=result.output.tags[:10],
            sentiment=result.output.sentiment,
            image_url=image_url,
            content_hash=compute_article_hash(article),
            slug=slug,
            full_content=full_content,
            image_photographer=image_photographer,
            image_photographer_url=image_photographer_url,
            image_unsplash_url=image_unsplash_url
        )
    except Exception as e:
        print(f"[NewsEnrich] Error: {e}", file=sys.stderr)
        # Fallback to basic enrichment
        return EnrichedArticle(
            title=article.title,
            url=article.url,
            source_name=article.source,
            published_date=article.date,
            summary=article.snippet[:200] if article.snippet else article.title,
            key_insights=[],
            category=filter_result.category,
            tags=["fractional", "executive"],
            sentiment="neutral",
            image_url=article.image_url,
            content_hash=compute_article_hash(article),
            slug=slug,
            full_content=None
        )


def check_article_duplicate(conn, article: RawNewsArticle) -> bool:
    """Check if article already exists in database."""
    try:
        cur = conn.cursor()

        # Check by URL
        cur.execute("SELECT id FROM news_articles WHERE url = %s", (article.url,))
        if cur.fetchone():
            cur.close()
            return True

        # Check by content hash
        content_hash = compute_article_hash(article)
        cur.execute("SELECT id FROM news_articles WHERE content_hash = %s", (content_hash,))
        if cur.fetchone():
            cur.close()
            return True

        cur.close()
        return False
    except Exception as e:
        conn.rollback()  # Reset transaction state
        print(f"[NewsDupe] Error checking duplicate: {e}", file=sys.stderr)
        return False  # Allow insertion attempt if check fails


def insert_article(conn, article: EnrichedArticle) -> Optional[str]:
    """Insert enriched article into database with full content and Unsplash attribution."""
    cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO news_articles (
                title, url, source_name, published_date, summary,
                key_insights, category, tags, sentiment, image_url,
                content_hash, imported_at, status, slug, full_content,
                image_photographer, image_photographer_url, image_unsplash_url
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), 'published', %s, %s, %s, %s, %s
            ) RETURNING id
        """, (
            article.title,
            article.url,
            article.source_name,
            article.published_date,
            article.summary,
            article.key_insights,
            article.category,
            article.tags,
            article.sentiment,
            article.image_url,
            article.content_hash,
            article.slug,
            article.full_content,
            article.image_photographer,
            article.image_photographer_url,
            article.image_unsplash_url
        ))
        article_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        print(f"[NewsInsert] Inserted article with slug: {article.slug}", file=sys.stderr)
        return str(article_id)
    except Exception as e:
        conn.rollback()
        cur.close()
        print(f"[NewsInsert] Error: {e}", file=sys.stderr)
        return None


# ============
# Main Pipeline
# ============

async def run_news_import_pipeline(
    database_url: str,
    serper_api_key: Optional[str] = None,
    relevance_threshold: float = 0.7,
    dry_run: bool = False
) -> NewsImportStats:
    """
    Main entry point for daily news import.

    Args:
        database_url: Neon PostgreSQL connection string
        serper_api_key: Serper.dev API key
        relevance_threshold: Minimum relevance score (default 0.7)
        dry_run: If True, don't insert, just log

    Returns:
        NewsImportStats with counts
    """
    stats = NewsImportStats()

    if not serper_api_key:
        print("[NewsImport] No SERPER_API_KEY provided", file=sys.stderr)
        return stats

    conn = psycopg2.connect(database_url)

    try:
        # Fetch news from Serper
        print("[NewsImport] Fetching news from Serper.dev...", file=sys.stderr)
        raw_articles = await fetch_trending_fractional_news(serper_api_key)
        stats.fetched = len(raw_articles)
        print(f"[NewsImport] Fetched {stats.fetched} articles", file=sys.stderr)

        # Process each article
        for i, article in enumerate(raw_articles):
            try:
                print(f"[NewsImport] Processing {i+1}/{len(raw_articles)}: {article.title[:50]}...", file=sys.stderr)

                # Check for duplicates
                if check_article_duplicate(conn, article):
                    stats.duplicates += 1
                    print(f"[NewsImport]   -> Duplicate", file=sys.stderr)
                    continue

                # AI filter
                filter_result = await filter_article(article)

                if not filter_result.is_relevant:
                    stats.filtered += 1
                    print(f"[NewsImport]   -> Not relevant: {filter_result.reasoning}", file=sys.stderr)
                    continue

                if filter_result.relevance_score < relevance_threshold:
                    stats.filtered += 1
                    print(f"[NewsImport]   -> Low score ({filter_result.relevance_score:.2f})", file=sys.stderr)
                    continue

                print(f"[NewsImport]   -> Relevant ({filter_result.category}, score: {filter_result.relevance_score:.2f})", file=sys.stderr)

                # Enrich
                enriched = await enrich_article(article, filter_result)

                if dry_run:
                    print(f"[NewsImport]   -> DRY RUN: Would insert", file=sys.stderr)
                    stats.inserted += 1
                else:
                    article_id = insert_article(conn, enriched)
                    if article_id:
                        stats.inserted += 1
                        print(f"[NewsImport]   -> Inserted ID: {article_id}", file=sys.stderr)
                    else:
                        stats.errors.append(f"Failed: {article.title}")

            except Exception as e:
                stats.errors.append(f"{article.title}: {str(e)}")
                print(f"[NewsImport]   -> Error: {e}", file=sys.stderr)

        print(f"[NewsImport] Complete. Fetched: {stats.fetched}, Filtered: {stats.filtered}, Duplicates: {stats.duplicates}, Inserted: {stats.inserted}", file=sys.stderr)

    except Exception as e:
        print(f"[NewsImport] Pipeline error: {e}", file=sys.stderr)
        raise

    finally:
        conn.close()

    return stats
