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


async def enrich_article(article: RawNewsArticle, filter_result: NewsFilterResult) -> EnrichedArticle:
    """Generate enriched content for an article."""
    prompt = f"""Enrich this news article about fractional executives:

Title: {article.title}
Source: {article.source}
Category: {filter_result.category}
Snippet: {article.snippet}
Date: {article.date or 'Unknown'}
"""
    try:
        result = await news_enrich_agent.run(prompt)

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
            image_url=article.image_url,
            content_hash=compute_article_hash(article)
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
            content_hash=compute_article_hash(article)
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
    """Insert enriched article into database."""
    cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO news_articles (
                title, url, source_name, published_date, summary,
                key_insights, category, tags, sentiment, image_url,
                content_hash, imported_at, status
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), 'published'
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
            article.content_hash
        ))
        article_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
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
