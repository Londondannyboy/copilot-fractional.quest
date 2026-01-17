"""
Web scraper for fetching full page content from job postings and news articles.

Uses httpx with BeautifulSoup for HTML parsing, with fallback to readability
for article extraction.
"""

import re
import httpx
from typing import Optional
from bs4 import BeautifulSoup


class ScrapedContent:
    """Scraped content from a web page"""
    def __init__(
        self,
        title: str = "",
        main_content: str = "",
        raw_html: str = "",
        meta_description: str = "",
        success: bool = False,
        error: Optional[str] = None
    ):
        self.title = title
        self.main_content = main_content
        self.raw_html = raw_html
        self.meta_description = meta_description
        self.success = success
        self.error = error


# Common user agents to avoid blocking
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
]


def clean_text(text: str) -> str:
    """Clean extracted text - remove excess whitespace and normalize."""
    if not text:
        return ""
    # Replace multiple whitespace with single space
    text = re.sub(r'\s+', ' ', text)
    # Remove leading/trailing whitespace
    text = text.strip()
    return text


def extract_main_content(soup: BeautifulSoup) -> str:
    """
    Extract the main content from a page, focusing on job description
    or article content areas.
    """
    # Remove script, style, nav, header, footer elements
    for element in soup.find_all(['script', 'style', 'nav', 'header', 'footer', 'aside', 'form']):
        element.decompose()

    # Try to find main content areas (common patterns)
    content_selectors = [
        # Job posting selectors
        '.job-description', '.job-content', '.job-details',
        '[data-testid="job-description"]', '.description-content',
        '#job-description', '.jobDescription', '.posting-description',
        '.job-posting-content', '.jobposting-description',
        # LinkedIn
        '.description__text', '.jobs-description',
        # Indeed
        '#jobDescriptionText', '.jobsearch-JobComponent-description',
        # Generic article selectors
        'article', 'main', '.article-content', '.post-content',
        '.entry-content', '.content-main', '#content',
        # News article selectors
        '.article-body', '.story-body', '.news-article',
    ]

    for selector in content_selectors:
        try:
            element = soup.select_one(selector)
            if element:
                text = element.get_text(separator='\n', strip=True)
                if len(text) > 200:  # Meaningful content
                    return clean_text(text)
        except Exception:
            continue

    # Fallback: get body text
    body = soup.find('body')
    if body:
        return clean_text(body.get_text(separator='\n', strip=True))[:10000]

    return ""


async def scrape_url(
    url: str,
    timeout: float = 30.0,
    max_content_length: int = 50000
) -> ScrapedContent:
    """
    Scrape a URL and extract the main content.

    Args:
        url: The URL to scrape
        timeout: Request timeout in seconds
        max_content_length: Maximum content length to return

    Returns:
        ScrapedContent object with extracted content
    """
    if not url:
        return ScrapedContent(error="No URL provided", success=False)

    try:
        async with httpx.AsyncClient(
            timeout=timeout,
            follow_redirects=True,
            verify=False  # Some job sites have SSL issues
        ) as client:
            headers = {
                "User-Agent": USER_AGENTS[0],
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-GB,en;q=0.9",
                "Accept-Encoding": "gzip, deflate",
            }

            print(f"[Scraper] Fetching: {url[:80]}...")
            response = await client.get(url, headers=headers)

            if response.status_code != 200:
                return ScrapedContent(
                    error=f"HTTP {response.status_code}",
                    success=False
                )

            html = response.text
            if len(html) > max_content_length * 2:
                html = html[:max_content_length * 2]

            soup = BeautifulSoup(html, 'html.parser')

            # Extract title
            title = ""
            title_tag = soup.find('title')
            if title_tag:
                title = clean_text(title_tag.get_text())

            # Extract meta description
            meta_desc = ""
            meta_tag = soup.find('meta', attrs={'name': 'description'})
            if meta_tag:
                meta_desc = meta_tag.get('content', '')

            # Extract main content
            main_content = extract_main_content(soup)

            if len(main_content) > max_content_length:
                main_content = main_content[:max_content_length]

            print(f"[Scraper] Extracted {len(main_content)} chars from {url[:50]}...")

            return ScrapedContent(
                title=title,
                main_content=main_content,
                raw_html=html[:10000],  # Keep some raw HTML for debugging
                meta_description=meta_desc,
                success=True
            )

    except httpx.TimeoutException:
        return ScrapedContent(error="Request timeout", success=False)
    except httpx.RequestError as e:
        return ScrapedContent(error=f"Request error: {str(e)}", success=False)
    except Exception as e:
        return ScrapedContent(error=f"Scrape error: {str(e)}", success=False)


def generate_slug(title: str, company: str = "", max_length: int = 80) -> str:
    """
    Generate a URL-friendly slug from title and optional company name.

    Examples:
        "Fractional CFO at Tech Corp" -> "fractional-cfo-tech-corp"
        "Senior CTO Role - London" -> "senior-cto-role-london"
    """
    if not title:
        return ""

    # Combine title with company if provided
    text = title
    if company and company.lower() not in title.lower():
        text = f"{title} {company}"

    # Convert to lowercase
    slug = text.lower()

    # Remove special characters except spaces and hyphens
    slug = re.sub(r'[^\w\s-]', '', slug)

    # Replace spaces with hyphens
    slug = re.sub(r'[\s_]+', '-', slug)

    # Remove consecutive hyphens
    slug = re.sub(r'-+', '-', slug)

    # Trim hyphens from ends
    slug = slug.strip('-')

    # Truncate to max length at word boundary
    if len(slug) > max_length:
        slug = slug[:max_length].rsplit('-', 1)[0]

    return slug
