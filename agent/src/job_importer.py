"""
Job Import Pipeline for fractional.quest

This module handles the daily automated import of fractional executive jobs:
1. Fetches jobs from Apify (Indeed, LinkedIn scrapers)
2. Uses Pydantic AI to filter for relevant fractional/interim roles
3. Deduplicates against existing jobs in the database
4. Enriches with AI-generated snippets and keywords
5. Inserts new jobs into Neon PostgreSQL

Triggered daily by Railway cron at 6 AM UTC.
"""

import hashlib
import json
import os
import sys
from datetime import datetime
from typing import List, Optional, Tuple

import psycopg2
from pydantic import BaseModel, Field
from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel

from src.data_sources.apify_client import RawJob, fetch_apify_jobs, fetch_linkedin_jobs, fetch_all_apify_jobs
from src.data_sources.web_scraper import scrape_url, generate_slug, ScrapedContent


# ============
# Models
# ============

class FilterResult(BaseModel):
    """Result of AI job filtering"""
    is_relevant: bool = Field(description="True if this is a fractional/interim executive role")
    role_category: Optional[str] = Field(description="Role category: CTO, CFO, CMO, COO, CPO, CHRO, CISO, CEO, or OTHER")
    confidence: float = Field(description="Confidence score 0.0-1.0")
    reasoning: str = Field(description="Brief explanation of the classification")


class EnrichmentResult(BaseModel):
    """Result of AI content enrichment"""
    description_snippet: str = Field(description="Compelling 150-character summary")
    teaser_hook: str = Field(description="Voice-friendly one-liner for quick responses")
    topic_keywords: List[str] = Field(description="5-10 searchable keywords")


class FullContentResult(BaseModel):
    """Result of AI full content generation"""
    full_description: str = Field(description="Comprehensive 3-5 paragraph job description written in engaging prose")
    responsibilities: List[str] = Field(description="5-8 key responsibilities as bullet points")
    requirements: List[str] = Field(description="5-8 key requirements/qualifications as bullet points")
    benefits: List[str] = Field(description="3-5 benefits or perks if mentioned, empty list if not")
    about_company: str = Field(description="1-2 paragraph company description based on available info")


class EnrichedJob(BaseModel):
    """Job ready for database insertion"""
    title: str
    company_name: str
    location: Optional[str]
    description_snippet: str
    role_category: str
    url: str
    salary_min: Optional[int]
    salary_max: Optional[int]
    teaser_hook: Optional[str]
    topic_keywords: List[str]
    source: str
    external_id: str
    content_hash: str
    # New fields for full content
    slug: str
    full_description: Optional[str] = None
    responsibilities: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    benefits: Optional[List[str]] = None
    about_company: Optional[str] = None
    posted_date: Optional[str] = None
    workplace_type: Optional[str] = None
    is_fractional: bool = True
    is_interim: bool = False


class ImportStats(BaseModel):
    """Statistics from an import run"""
    fetched: int = 0
    filtered: int = 0
    duplicates: int = 0
    inserted: int = 0
    errors: List[str] = []


# ============
# AI Agents
# ============

# Filter agent determines if a job is a relevant fractional/interim role
filter_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=FilterResult,
    system_prompt="""You are a job classification expert for a fractional executive jobs platform.

FRACTIONAL roles are:
- Part-time executive leadership (typically 2-4 days/week)
- Interim executive positions (temporary full-time, 3-12 months)
- Portfolio careers (executive working with multiple clients)
- Fractional/part-time C-suite or VP-level positions

RELEVANT role categories (choose one):
- CTO (Chief Technology Officer, VP Engineering, Tech Director)
- CFO (Chief Financial Officer, Finance Director, VP Finance)
- CMO (Chief Marketing Officer, Marketing Director, VP Marketing)
- COO (Chief Operating Officer, Operations Director)
- CPO (Chief Product Officer, VP Product, Head of Product)
- CHRO (Chief HR Officer, HR Director, People Director)
- CISO (Chief Information Security Officer, Security Director)
- CEO (Chief Executive Officer, Managing Director)
- OTHER (relevant executive role not fitting above)

## RECRUITER DETECTION - CRITICAL!
REJECT jobs posted by recruitment/staffing agencies. Signs of recruiter posts:
- Company name contains: Recruitment, Staffing, Talent, HR Solutions, Search, Partners, Associates, Consulting (when recruiting)
- Common recruiter company patterns: "X Recruitment", "X Staffing", "X Talent", "X Search", "X Partners"
- Job description mentions "our client" repeatedly (hiding the actual employer)
- Vague company descriptions like "leading organization" without naming the company
- Multiple similar roles posted by same company (aggregator behavior)
- LinkedIn company pages that are recruitment agencies

KNOWN RECRUITER COMPANY PATTERNS (auto-reject):
- Hays, Robert Half, Michael Page, Reed, Adecco, Manpower, Randstad, Harvey Nash
- Grayson HR, Frazer Jones, Goodman Masson, Marks Sattin, Robert Walters
- Any company with "Recruitment", "Recruiters", "Staffing", "Talent Acquisition" in name

We ONLY want jobs posted DIRECTLY by the hiring company (original postings), NOT recruiter listings.

NOT relevant (reject these):
- Full-time permanent positions (unless explicitly interim)
- Junior or mid-level roles
- Non-executive positions
- Recruiting/staffing agency listings (see above)
- Contract developer/engineer roles (unless CTO-level)
- Jobs where the actual employer is hidden ("our client seeks...")

Analyze the job and determine:
1. is_relevant: true only if this is clearly a fractional/interim/portfolio executive role FROM A DIRECT EMPLOYER
2. role_category: The best matching category from the list above
3. confidence: 0.0-1.0 how certain you are (use 0.7+ threshold for inclusion)
4. reasoning: Brief explanation - MUST mention if rejected due to recruiter detection

Be conservative - when in doubt, reject. Quality over quantity. NO RECRUITERS."""
)

# Enrichment agent generates compelling content
enrich_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=EnrichmentResult,
    system_prompt="""You enrich job listings for a premium fractional executive platform.

Given a job, generate:

1. description_snippet (EXACTLY 150 characters max):
   - Compelling, action-oriented summary
   - Focus on what makes this role exciting
   - Include key differentiators (industry, company stage, impact)
   - Example: "Lead digital transformation at a £50M fintech. Shape product strategy and scale engineering team from 10 to 30."

2. teaser_hook (One sentence, voice-friendly):
   - Natural conversational tone for voice assistant
   - Highlight the most exciting aspect
   - Example: "Exciting Fractional CTO role at a fast-growing fintech in London"

3. topic_keywords (5-10 searchable terms):
   - Role type (fractional, interim, part-time)
   - Industry (fintech, healthtech, SaaS, etc.)
   - Skills mentioned (strategy, transformation, growth)
   - Location terms
   - Company stage (startup, scaleup, enterprise)
   - Technologies if relevant

Be professional, specific, and focus on what makes executives excited about opportunities."""
)

# Content generation agent writes comprehensive job content
content_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    output_type=FullContentResult,
    system_prompt="""You are a professional copywriter creating job listings for a premium fractional executive platform.

Given a job posting (title, company, location, and scraped content), generate comprehensive, ORIGINAL content:

## WRITING STYLE
- Professional, engaging tone suitable for senior executives
- DO NOT copy text verbatim - rewrite everything in your own words
- Focus on what makes this role appealing to experienced executives
- Be specific where you have info, gracefully general where you don't

## FULL DESCRIPTION (3-5 paragraphs)
Write an engaging narrative covering:
1. Opening hook - what makes this opportunity exciting
2. The company context and why they need this role
3. The strategic impact this person will have
4. Working arrangement (fractional/part-time details if known)
5. Call to action

## RESPONSIBILITIES (5-8 bullet points)
Extract or infer key responsibilities. Each should:
- Start with an action verb
- Be specific to the role level (executive, not junior)
- Focus on strategic impact, not tasks

## REQUIREMENTS (5-8 bullet points)
Extract or infer qualifications. Include:
- Experience level (years, previous titles)
- Industry experience if relevant
- Skills and competencies
- Qualifications if mentioned

## BENEFITS (3-5 bullet points)
If mentioned, extract benefits. If not clear, leave empty list.

## ABOUT COMPANY (1-2 paragraphs)
Write about the company based on available info. If minimal info:
- Use what you know about the industry
- Keep it professional but brief
- Don't make up specific details

IMPORTANT: Generate ORIGINAL content. This is for a job board that creates its own listings, not just aggregation."""
)


# ============
# Core Functions
# ============

# Known recruitment agencies - auto-reject without AI call
KNOWN_RECRUITERS = {
    # Major UK recruitment agencies
    "hays", "robert half", "michael page", "reed", "adecco", "manpower", "randstad",
    "harvey nash", "grayson hr", "frazer jones", "goodman masson", "marks sattin",
    "robert walters", "korn ferry", "spencer stuart", "egon zehnder", "heidrick",
    "russell reynolds", "boyden", "stanton chase", "odgers berndtson",
    # Major global recruiters
    "linkedin talent solutions", "indeed", "glassdoor", "ziprecruiter", "monster",
    "careerbuilder", "dice", "totaljobs", "cv-library", "jobsite", "reed.co.uk",
    # Executive search firms
    "executive network", "search partners", "talent partners", "people partners",
    "resource solutions", "talent point", "talent works", "talent hub",
    # Common LinkedIn recruiter patterns
    "talent lab", "talent group", "talent connect", "talent bridge", "talent spot",
    "hire", "hiring", "recruited", "placements", "headhunters", "headhunting",
    # More UK agencies
    "harnham", "la fosse", "computer futures", "investigo", "page personnel",
    "page executive", "progress sales", "nicoll curtin", "fintellect",
    "eames consulting", "opus recruitment", "harris hill", "athona recruitment",
    # Pattern matches
    "recruitment", "recruiters", "staffing", "talent acquisition", "search partners",
    "executive search", "talent solutions", "hr solutions", "consulting partners",
    "resourcing", "personnel", "careers", "jobs board", "job board",
}

# Description patterns that indicate recruiter posts
RECRUITER_DESCRIPTION_PATTERNS = [
    "our client",
    "on behalf of our client",
    "our prestigious client",
    "a leading",  # When used without naming the company
    "a well-known",
    "a major",
    "confidential client",
    "undisclosed client",
    "my client",
    "we are recruiting for",
    "we're recruiting for",
    "we are looking for",  # When from recruiter
    "get in touch",
    "send your cv",
    "submit your cv",
    "email your cv",
    "contact us for more",
]

def fetch_db_recruiters(conn) -> set:
    """Fetch known recruiters from database for fast lookup."""
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT company_name, pattern_type
            FROM known_recruiters
            WHERE is_active = true
        """)
        rows = cur.fetchall()
        cur.close()
        # Return as set of tuples for fast lookup
        return {(row[0].lower(), row[1]) for row in rows}
    except Exception as e:
        print(f"[Recruiter] Error fetching from DB: {e}", file=sys.stderr)
        return set()


def increment_recruiter_block_count(conn, company_name: str):
    """Increment the jobs_blocked counter for a recruiter."""
    try:
        cur = conn.cursor()
        company_lower = company_name.lower().strip()
        cur.execute("""
            UPDATE known_recruiters
            SET jobs_blocked = jobs_blocked + 1, updated_at = NOW()
            WHERE is_active = true
            AND (
                (pattern_type = 'exact' AND LOWER(company_name) = %s)
                OR (pattern_type = 'contains' AND %s LIKE '%%' || LOWER(company_name) || '%%')
                OR (pattern_type = 'starts_with' AND %s LIKE LOWER(company_name) || '%%')
                OR (pattern_type = 'ends_with' AND %s LIKE '%%' || LOWER(company_name))
            )
        """, (company_lower, company_lower, company_lower, company_lower))
        conn.commit()
        cur.close()
    except Exception as e:
        print(f"[Recruiter] Error incrementing block count: {e}", file=sys.stderr)


def is_likely_recruiter(company_name: str, description: str = "", source: str = "", db_recruiters: set = None) -> bool:
    """
    Quick check if job is from a recruiter (before AI call).

    LinkedIn posts especially need aggressive filtering as many are from recruiters.
    Checks both hardcoded patterns AND database table.
    """
    if not company_name:
        return False
    company_lower = company_name.lower().strip()
    desc_lower = (description or "").lower()

    # Check database recruiters if available
    if db_recruiters:
        for pattern, pattern_type in db_recruiters:
            if pattern_type == 'exact' and pattern == company_lower:
                return True
            elif pattern_type == 'contains' and pattern in company_lower:
                return True
            elif pattern_type == 'starts_with' and company_lower.startswith(pattern):
                return True
            elif pattern_type == 'ends_with' and company_lower.endswith(pattern):
                return True

    # Check company name against known recruiters
    for pattern in KNOWN_RECRUITERS:
        if pattern in company_lower:
            return True

    # Check for common recruiter naming patterns
    recruiter_patterns = [
        company_lower.endswith(" recruitment"),
        company_lower.endswith(" staffing"),
        company_lower.endswith(" talent"),
        company_lower.endswith(" search"),
        company_lower.endswith(" partners") and "law" not in company_lower,  # Exclude law firms
        company_lower.endswith(" associates") and ("law" not in company_lower and "legal" not in company_lower),
        company_lower.endswith(" consulting") and "tech" not in company_lower,
        company_lower.endswith(" resourcing"),
        company_lower.endswith(" personnel"),
        company_lower.startswith("recruit"),
    ]
    if any(recruiter_patterns):
        return True

    # For LinkedIn sources, also check description for recruiter language
    if source == "apify_linkedin" and desc_lower:
        recruiter_phrase_count = 0
        for pattern in RECRUITER_DESCRIPTION_PATTERNS:
            if pattern in desc_lower:
                recruiter_phrase_count += 1
        # If multiple recruiter phrases, likely a recruiter
        if recruiter_phrase_count >= 2:
            return True
        # "Our client" is a strong indicator
        if "our client" in desc_lower or "my client" in desc_lower:
            return True

    return False


def compute_content_hash(job: RawJob) -> str:
    """Create hash for fuzzy deduplication based on title + company + location."""
    content = f"{job.title.lower().strip()}|{job.company.lower().strip()}|{(job.location or '').lower().strip()}"
    return hashlib.md5(content.encode()).hexdigest()


async def filter_job(job: RawJob) -> FilterResult:
    """Use AI to determine if job is a relevant fractional/interim role."""
    prompt = f"""Classify this job posting:

Title: {job.title}
Company: {job.company}
Location: {job.location or 'Not specified'}
Description: {job.description[:2000]}  # Limit to 2000 chars
URL: {job.url}
"""
    try:
        result = await filter_agent.run(prompt)
        return result.output
    except Exception as e:
        print(f"[Filter] Error filtering job '{job.title}': {e}", file=sys.stderr)
        # Default to rejecting on error
        return FilterResult(
            is_relevant=False,
            role_category=None,
            confidence=0.0,
            reasoning=f"Error during classification: {str(e)}"
        )


async def generate_full_content(job: RawJob, filter_result: FilterResult, scraped: ScrapedContent) -> FullContentResult:
    """Generate comprehensive original content for a job listing."""
    # Combine available content
    content_parts = []
    if scraped.success and scraped.main_content:
        content_parts.append(f"SCRAPED PAGE CONTENT:\n{scraped.main_content[:4000]}")
    if job.description:
        content_parts.append(f"ORIGINAL DESCRIPTION:\n{job.description[:2000]}")

    combined_content = "\n\n".join(content_parts) if content_parts else "Limited information available"

    prompt = f"""Generate comprehensive job listing content for:

Title: {job.title}
Company: {job.company}
Role Category: {filter_result.role_category}
Location: {job.location or 'UK'}
Salary: {f'£{job.salary_min}-{job.salary_max} per day' if job.salary_min else 'Not specified'}

SOURCE CONTENT:
{combined_content}

Remember: Write ORIGINAL content, don't copy verbatim. Make it engaging for senior executives."""

    try:
        result = await content_agent.run(prompt)
        return result.output
    except Exception as e:
        print(f"[Content] Error generating content: {e}", file=sys.stderr)
        # Return basic fallback
        return FullContentResult(
            full_description=job.description[:1000] if job.description else f"Exciting {filter_result.role_category} opportunity at {job.company}.",
            responsibilities=["Lead strategic initiatives", "Drive business growth", "Build and manage teams"],
            requirements=["Senior executive experience", "Proven track record", "Strong leadership skills"],
            benefits=[],
            about_company=f"{job.company} is seeking a fractional executive to join their leadership team."
        )


async def enrich_job(job: RawJob, filter_result: FilterResult, generate_content: bool = True) -> EnrichedJob:
    """Generate enriched content for a job listing, optionally with full content generation."""
    from datetime import datetime

    # Generate slug
    slug = generate_slug(job.title, job.company)

    # Get basic enrichment
    prompt = f"""Enrich this fractional executive job listing:

Title: {job.title}
Company: {job.company}
Role Category: {filter_result.role_category}
Location: {job.location or 'UK'}
Description: {job.description[:2500]}
"""

    # Determine if fractional or interim based on title/description
    title_lower = job.title.lower()
    desc_lower = (job.description or "").lower()
    is_fractional = "fractional" in title_lower or "part-time" in title_lower or "part time" in title_lower
    is_interim = "interim" in title_lower or "temporary" in title_lower

    # Determine workplace type
    workplace_type = None
    if "remote" in title_lower or "remote" in desc_lower:
        workplace_type = "Remote"
    elif "hybrid" in title_lower or "hybrid" in desc_lower:
        workplace_type = "Hybrid"
    elif "on-site" in title_lower or "onsite" in desc_lower or "office" in desc_lower:
        workplace_type = "On-site"

    try:
        result = await enrich_agent.run(prompt)

        # Optionally generate full content
        full_content = None
        if generate_content:
            print(f"[Enrich] Scraping {job.url[:60]}...", file=sys.stderr)
            scraped = await scrape_url(job.url)
            full_content = await generate_full_content(job, filter_result, scraped)

        return EnrichedJob(
            title=job.title,
            company_name=job.company,
            location=job.location,
            description_snippet=result.output.description_snippet[:150],
            role_category=filter_result.role_category or "OTHER",
            url=job.url,
            salary_min=job.salary_min,
            salary_max=job.salary_max,
            teaser_hook=result.output.teaser_hook,
            topic_keywords=result.output.topic_keywords[:10],
            source=job.source,
            external_id=job.external_id,
            content_hash=compute_content_hash(job),
            slug=slug,
            full_description=full_content.full_description if full_content else None,
            responsibilities=full_content.responsibilities if full_content else None,
            requirements=full_content.requirements if full_content else None,
            benefits=full_content.benefits if full_content else None,
            about_company=full_content.about_company if full_content else None,
            posted_date=datetime.now().strftime("%Y-%m-%d"),
            workplace_type=workplace_type,
            is_fractional=is_fractional or not is_interim,  # Default to fractional
            is_interim=is_interim
        )
    except Exception as e:
        print(f"[Enrich] Error enriching job '{job.title}': {e}", file=sys.stderr)
        # Fallback to basic enrichment
        return EnrichedJob(
            title=job.title,
            company_name=job.company,
            location=job.location,
            description_snippet=job.description[:150] if job.description else job.title,
            role_category=filter_result.role_category or "OTHER",
            url=job.url,
            salary_min=job.salary_min,
            salary_max=job.salary_max,
            teaser_hook=f"New {filter_result.role_category} opportunity at {job.company}",
            topic_keywords=["fractional", filter_result.role_category.lower() if filter_result.role_category else "executive"],
            source=job.source,
            external_id=job.external_id,
            content_hash=compute_content_hash(job),
            slug=slug,
            posted_date=datetime.now().strftime("%Y-%m-%d"),
            is_fractional=True,
            is_interim=False
        )


def check_duplicate(conn, job: RawJob) -> bool:
    """
    Check if job already exists in database.

    Uses three-tier deduplication:
    1. External ID match (exact duplicate from same source)
    2. Content hash match (same title+company+location)
    3. URL match (same job posting)
    """
    cur = conn.cursor()

    # Check by external ID (exact match from same source)
    cur.execute("""
        SELECT id FROM jobs
        WHERE source = %s AND external_id = %s
    """, (job.source, job.external_id))
    if cur.fetchone():
        cur.close()
        return True

    # Check by content hash (fuzzy match - same title+company+location)
    content_hash = compute_content_hash(job)
    cur.execute("""
        SELECT id FROM jobs
        WHERE content_hash = %s
    """, (content_hash,))
    if cur.fetchone():
        cur.close()
        return True

    # Check by URL
    if job.url:
        cur.execute("""
            SELECT id FROM jobs WHERE url = %s
        """, (job.url,))
        if cur.fetchone():
            cur.close()
            return True

    cur.close()
    return False


# Map AI role categories to database enum values
ROLE_TO_CATEGORY = {
    "CTO": "Engineering",
    "CFO": "Finance",
    "CMO": "Marketing",
    "COO": "Operations",
    "CPO": "Product",
    "CHRO": "HR",
    "CISO": "Engineering",  # Security often falls under Engineering
    "CEO": "Executive",
    "CRO": "Sales",
    "CIO": "Engineering",
    "CDO": "Data",
    "CLO": "Legal",
    "OTHER": "Other",
}


def map_role_to_category(role: str) -> str:
    """Map AI-detected role to database category enum."""
    return ROLE_TO_CATEGORY.get(role.upper(), "Other")


def insert_job(conn, job: EnrichedJob) -> Optional[str]:
    """
    Insert enriched job into database with full content.

    Returns the job ID if successful, None otherwise.
    """
    # Map role to database category enum
    category = map_role_to_category(job.role_category)

    cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO jobs (
                title, company_name, location, description_snippet,
                role_category, url, salary_min, salary_max,
                teaser_hook, topic_keywords, source, external_id,
                content_hash, imported_at, is_active, is_fractional, is_interim,
                slug, full_description, responsibilities, requirements,
                benefits, about_company, posted_date, workplace_type
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), true, %s, %s,
                %s, %s, %s, %s, %s, %s, %s, %s
            ) RETURNING id
        """, (
            job.title,
            job.company_name,
            job.location,
            job.description_snippet,
            category,
            job.url,
            job.salary_min,
            job.salary_max,
            job.teaser_hook,
            job.topic_keywords,
            job.source,
            job.external_id,
            job.content_hash,
            job.is_fractional,
            job.is_interim,
            job.slug,
            job.full_description,
            job.responsibilities,
            job.requirements,
            job.benefits,
            job.about_company,
            job.posted_date,
            job.workplace_type
        ))
        job_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        print(f"[Insert] Inserted job with slug: {job.slug}", file=sys.stderr)
        return str(job_id)
    except Exception as e:
        conn.rollback()
        cur.close()
        print(f"[Insert] Error inserting job '{job.title}': {e}", file=sys.stderr)
        return None


def start_import_run(conn, source: str) -> int:
    """Start tracking an import run. Returns run ID."""
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO job_import_runs (source, status)
        VALUES (%s, 'running')
        RETURNING id
    """, (source,))
    run_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    return run_id


def complete_import_run(conn, run_id: int, stats: ImportStats, status: str = "completed", error: str = None):
    """Update import run with final stats."""
    cur = conn.cursor()
    cur.execute("""
        UPDATE job_import_runs SET
            completed_at = NOW(),
            jobs_fetched = %s,
            jobs_filtered = %s,
            jobs_duplicates = %s,
            jobs_inserted = %s,
            status = %s,
            error_message = %s,
            metadata = %s
        WHERE id = %s
    """, (
        stats.fetched,
        stats.filtered,
        stats.duplicates,
        stats.inserted,
        status,
        error,
        json.dumps({"errors": stats.errors[:10]}),  # Limit stored errors
        run_id
    ))
    conn.commit()
    cur.close()


# ============
# Main Pipeline
# ============

async def run_import_pipeline(
    database_url: str,
    apify_token: Optional[str] = None,
    confidence_threshold: float = 0.7,
    dry_run: bool = False
) -> ImportStats:
    """
    Main entry point for daily job import.

    Fetches jobs from the pre-scheduled Apify task (definable_field/career-site-job-listing-api-daily)
    which scrapes original job postings from company career sites and LinkedIn company pages.

    Args:
        database_url: Neon PostgreSQL connection string
        apify_token: Apify API token
        confidence_threshold: Minimum AI confidence to include a job (default 0.7)
        dry_run: If True, don't insert jobs, just log what would be done

    Returns:
        ImportStats with counts of processed jobs
    """
    stats = ImportStats()

    if not apify_token:
        print("[Import] No APIFY_TOKEN provided, skipping Apify fetch", file=sys.stderr)
        return stats

    # Connect to database
    conn = psycopg2.connect(database_url)
    run_id = start_import_run(conn, "daily_import")

    print(f"[Import] Started run {run_id}", file=sys.stderr)

    # Fetch known recruiters from database for fast lookup
    db_recruiters = fetch_db_recruiters(conn)
    print(f"[Import] Loaded {len(db_recruiters)} recruiter patterns from database", file=sys.stderr)

    try:
        # 1. Fetch jobs from all Apify sources (career sites + LinkedIn)
        # Career sites task runs at 6 AM UTC, LinkedIn task runs at 10 PM GMT
        print("[Import] Fetching from all Apify sources...", file=sys.stderr)
        raw_jobs = await fetch_all_apify_jobs(apify_token)
        print(f"[Import] Got {len(raw_jobs)} jobs from Apify sources", file=sys.stderr)

        stats.fetched = len(raw_jobs)
        print(f"[Import] Total fetched: {stats.fetched}", file=sys.stderr)

        # 2. Process each job
        for i, job in enumerate(raw_jobs):
            try:
                print(f"[Import] Processing {i+1}/{len(raw_jobs)}: {job.title[:50]}...", file=sys.stderr)

                # Check for duplicates first (fast, no AI cost)
                if check_duplicate(conn, job):
                    stats.duplicates += 1
                    print(f"[Import]   -> Duplicate, skipping", file=sys.stderr)
                    continue

                # Pre-filter: Check for known recruiters (fast, no AI cost)
                # Checks both hardcoded patterns and database table
                # LinkedIn sources get extra scrutiny with description checking
                if is_likely_recruiter(job.company, job.description, job.source, db_recruiters):
                    stats.filtered += 1
                    increment_recruiter_block_count(conn, job.company)
                    print(f"[Import]   -> Recruiter detected: {job.company} (source: {job.source})", file=sys.stderr)
                    continue

                # AI filter (slower, costs API credits)
                filter_result = await filter_job(job)

                if not filter_result.is_relevant:
                    stats.filtered += 1
                    print(f"[Import]   -> Not relevant: {filter_result.reasoning}", file=sys.stderr)
                    continue

                if filter_result.confidence < confidence_threshold:
                    stats.filtered += 1
                    print(f"[Import]   -> Low confidence ({filter_result.confidence:.2f}): {filter_result.reasoning}", file=sys.stderr)
                    continue

                print(f"[Import]   -> Relevant {filter_result.role_category} (confidence: {filter_result.confidence:.2f})", file=sys.stderr)

                # Enrich with AI-generated content
                enriched = await enrich_job(job, filter_result)

                if dry_run:
                    print(f"[Import]   -> DRY RUN: Would insert: {enriched.title} at {enriched.company_name}", file=sys.stderr)
                    stats.inserted += 1
                else:
                    # Insert into database
                    job_id = insert_job(conn, enriched)
                    if job_id:
                        stats.inserted += 1
                        print(f"[Import]   -> Inserted with ID: {job_id}", file=sys.stderr)
                    else:
                        stats.errors.append(f"Failed to insert: {job.title}")

            except Exception as e:
                error_msg = f"{job.title}: {str(e)}"
                stats.errors.append(error_msg)
                print(f"[Import]   -> Error: {e}", file=sys.stderr)

        # Complete the run
        complete_import_run(conn, run_id, stats, "completed")
        print(f"[Import] Completed. Fetched: {stats.fetched}, Filtered: {stats.filtered}, Duplicates: {stats.duplicates}, Inserted: {stats.inserted}", file=sys.stderr)

    except Exception as e:
        error_msg = str(e)
        complete_import_run(conn, run_id, stats, "failed", error_msg)
        print(f"[Import] Failed with error: {e}", file=sys.stderr)
        raise

    finally:
        conn.close()

    return stats


async def get_import_status(database_url: str, limit: int = 10) -> List[dict]:
    """Get recent import run history."""
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    cur.execute("""
        SELECT id, started_at, completed_at, source,
               jobs_fetched, jobs_filtered, jobs_duplicates, jobs_inserted,
               status, error_message
        FROM job_import_runs
        ORDER BY started_at DESC
        LIMIT %s
    """, (limit,))
    rows = cur.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "started_at": r[1].isoformat() if r[1] else None,
            "completed_at": r[2].isoformat() if r[2] else None,
            "source": r[3],
            "jobs_fetched": r[4],
            "jobs_filtered": r[5],
            "jobs_duplicates": r[6],
            "jobs_inserted": r[7],
            "status": r[8],
            "error": r[9]
        }
        for r in rows
    ]


# CLI for manual testing
if __name__ == "__main__":
    import asyncio

    DATABASE_URL = os.getenv("DATABASE_URL")
    APIFY_TOKEN = os.getenv("APIFY_TOKEN")

    if not DATABASE_URL:
        print("ERROR: DATABASE_URL not set")
        sys.exit(1)

    if not APIFY_TOKEN:
        print("ERROR: APIFY_TOKEN not set")
        sys.exit(1)

    print("Running import pipeline...")
    stats = asyncio.run(run_import_pipeline(
        database_url=DATABASE_URL,
        apify_token=APIFY_TOKEN,
        dry_run="--dry-run" in sys.argv
    ))

    print(f"\nResults:")
    print(f"  Fetched: {stats.fetched}")
    print(f"  Filtered: {stats.filtered}")
    print(f"  Duplicates: {stats.duplicates}")
    print(f"  Inserted: {stats.inserted}")
    if stats.errors:
        print(f"  Errors: {len(stats.errors)}")
        for err in stats.errors[:5]:
            print(f"    - {err}")
