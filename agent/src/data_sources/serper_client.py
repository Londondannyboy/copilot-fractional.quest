"""
Serper.dev client for fetching news about fractional executives.

Uses the Serper Google News API to find relevant articles about:
- Fractional executive trends
- Interim leadership news
- Part-time C-suite developments
- Gig economy executive roles
"""

import httpx
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel


class RawNewsArticle(BaseModel):
    """News article as fetched from Serper"""
    title: str
    snippet: str
    url: str
    source: str  # Publication name
    date: Optional[str] = None  # Date string from Google
    image_url: Optional[str] = None


SERPER_API_URL = "https://google.serper.dev/news"

# Search queries for fractional executive news
NEWS_QUERIES = [
    "fractional executive trends",
    "fractional CFO news",
    "fractional CTO hiring",
    "interim executive leadership",
    "part-time C-suite",
    "portfolio career executive",
    "fractional CMO marketing",
    "interim CFO appointment",
]


async def fetch_serper_news(
    api_key: str,
    queries: Optional[List[str]] = None,
    num_results: int = 10,
    time_period: str = "d"  # d=day, w=week, m=month
) -> List[RawNewsArticle]:
    """
    Fetch news articles from Serper.dev Google News API.

    Args:
        api_key: Serper.dev API key
        queries: List of search queries (defaults to NEWS_QUERIES)
        num_results: Number of results per query (max 100)
        time_period: Time filter - d (day), w (week), m (month)

    Returns:
        List of RawNewsArticle objects
    """
    queries = queries or NEWS_QUERIES
    all_articles: List[RawNewsArticle] = []
    seen_urls = set()

    async with httpx.AsyncClient(timeout=30.0) as client:
        for query in queries:
            try:
                print(f"[Serper] Searching: {query}")

                response = await client.post(
                    SERPER_API_URL,
                    headers={
                        "X-API-KEY": api_key,
                        "Content-Type": "application/json"
                    },
                    json={
                        "q": query,
                        "gl": "gb",  # UK results
                        "hl": "en",
                        "num": num_results,
                        "tbs": f"qdr:{time_period}"  # Time filter
                    }
                )

                if response.status_code != 200:
                    print(f"[Serper] Error for '{query}': {response.status_code}")
                    continue

                data = response.json()
                news_items = data.get("news", [])

                print(f"[Serper] Found {len(news_items)} articles for '{query}'")

                for item in news_items:
                    url = item.get("link", "")

                    # Dedupe by URL
                    if url in seen_urls:
                        continue
                    seen_urls.add(url)

                    article = RawNewsArticle(
                        title=item.get("title", ""),
                        snippet=item.get("snippet", ""),
                        url=url,
                        source=item.get("source", "Unknown"),
                        date=item.get("date"),
                        image_url=item.get("imageUrl")
                    )

                    if article.title and article.url:
                        all_articles.append(article)

            except Exception as e:
                print(f"[Serper] Error searching '{query}': {e}")
                continue

    print(f"[Serper] Total unique articles: {len(all_articles)}")
    return all_articles


async def fetch_trending_fractional_news(api_key: str) -> List[RawNewsArticle]:
    """
    Fetch today's trending news about fractional executives.

    This is a convenience function that uses optimized queries
    for daily news gathering.
    """
    trending_queries = [
        "fractional executive",
        "interim CFO appointed",
        "fractional CTO startup",
        "part-time executive hire",
        "portfolio career CEO",
    ]

    return await fetch_serper_news(
        api_key=api_key,
        queries=trending_queries,
        num_results=5,  # Fewer per query to avoid too many results
        time_period="d"  # Last 24 hours
    )
