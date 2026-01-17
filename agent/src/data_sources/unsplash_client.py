"""
Unsplash API client for fetching contextual images.

Uses the Unsplash API to find relevant professional images based on
article category, tags, or search terms.
"""

import os
import httpx
from typing import Optional, List
from pydantic import BaseModel


class UnsplashImage(BaseModel):
    """Unsplash image with attribution"""
    url: str  # Regular size URL
    thumb_url: str  # Thumbnail URL
    photographer: str
    photographer_url: str
    unsplash_url: str  # Link back to Unsplash (required by API terms)


UNSPLASH_API_URL = "https://api.unsplash.com"

# Mapping of article categories to search terms for better image matches
CATEGORY_SEARCH_TERMS = {
    "trends": "business strategy modern office",
    "hiring": "executive interview professional",
    "opinion": "business leader thinking",
    "case_study": "success business team",
    "market_report": "financial charts data analysis",
    "other": "professional business executive",
}

# Mapping of role keywords to search terms
ROLE_SEARCH_TERMS = {
    "cfo": "finance executive boardroom",
    "cto": "technology executive modern office",
    "cmo": "marketing executive creative",
    "coo": "operations management business",
    "ceo": "executive leadership boardroom",
    "chro": "human resources team meeting",
    "cpo": "product design innovation",
    "ciso": "cybersecurity technology",
}


async def search_unsplash_image(
    query: str,
    access_key: Optional[str] = None,
    orientation: str = "landscape"
) -> Optional[UnsplashImage]:
    """
    Search Unsplash for a relevant image.

    Args:
        query: Search terms
        access_key: Unsplash API access key (or from UNSPLASH_ACCESS_KEY env var)
        orientation: Image orientation (landscape, portrait, squarish)

    Returns:
        UnsplashImage if found, None otherwise
    """
    access_key = access_key or os.getenv("UNSPLASH_ACCESS_KEY")
    if not access_key:
        print("[Unsplash] No access key provided", flush=True)
        return None

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.get(
                f"{UNSPLASH_API_URL}/search/photos",
                headers={"Authorization": f"Client-ID {access_key}"},
                params={
                    "query": query,
                    "orientation": orientation,
                    "per_page": 1,
                    "content_filter": "high",  # Safe for work
                }
            )

            if response.status_code != 200:
                print(f"[Unsplash] API error: {response.status_code}", flush=True)
                return None

            data = response.json()
            results = data.get("results", [])

            if not results:
                print(f"[Unsplash] No results for: {query}", flush=True)
                return None

            photo = results[0]
            return UnsplashImage(
                url=photo["urls"]["regular"],
                thumb_url=photo["urls"]["thumb"],
                photographer=photo["user"]["name"],
                photographer_url=photo["user"]["links"]["html"],
                unsplash_url=photo["links"]["html"]
            )

    except Exception as e:
        print(f"[Unsplash] Error: {e}", flush=True)
        return None


async def get_image_for_article(
    category: str,
    tags: Optional[List[str]] = None,
    title: Optional[str] = None,
    access_key: Optional[str] = None
) -> Optional[UnsplashImage]:
    """
    Get a contextually relevant image for a news article.

    Tries multiple search strategies:
    1. Role-specific search if tags mention a C-suite role
    2. Category-based search
    3. Fallback to generic business image

    Args:
        category: Article category (trends, hiring, opinion, etc.)
        tags: Article tags
        title: Article title for additional context
        access_key: Unsplash API access key

    Returns:
        UnsplashImage if found, None otherwise
    """
    access_key = access_key or os.getenv("UNSPLASH_ACCESS_KEY")

    # Strategy 1: Check tags for role keywords
    if tags:
        tags_lower = [t.lower() for t in tags]
        for role, search_term in ROLE_SEARCH_TERMS.items():
            if any(role in tag for tag in tags_lower):
                print(f"[Unsplash] Searching for role: {role}", flush=True)
                image = await search_unsplash_image(search_term, access_key)
                if image:
                    return image

    # Strategy 2: Category-based search
    category_terms = CATEGORY_SEARCH_TERMS.get(category, CATEGORY_SEARCH_TERMS["other"])
    print(f"[Unsplash] Searching by category: {category}", flush=True)
    image = await search_unsplash_image(category_terms, access_key)
    if image:
        return image

    # Strategy 3: Fallback
    print("[Unsplash] Using fallback search", flush=True)
    return await search_unsplash_image("professional business executive", access_key)


async def get_image_for_job(
    role_category: str,
    company: Optional[str] = None,
    access_key: Optional[str] = None
) -> Optional[UnsplashImage]:
    """
    Get a contextually relevant image for a job listing.

    Args:
        role_category: Job role category (CTO, CFO, CMO, etc.)
        company: Company name for context
        access_key: Unsplash API access key

    Returns:
        UnsplashImage if found, None otherwise
    """
    access_key = access_key or os.getenv("UNSPLASH_ACCESS_KEY")

    # Get role-specific search terms
    role_lower = role_category.lower()
    search_term = ROLE_SEARCH_TERMS.get(role_lower, "executive leadership business")

    print(f"[Unsplash] Searching for job image: {role_category}", flush=True)
    return await search_unsplash_image(search_term, access_key)
