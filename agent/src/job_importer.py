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

from data_sources.apify_client import RawJob, fetch_apify_jobs


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
    result_type=FilterResult,
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

NOT relevant (reject these):
- Full-time permanent positions (unless explicitly interim)
- Junior or mid-level roles
- Non-executive positions
- Recruiting/staffing agency internal roles
- Contract developer/engineer roles (unless CTO-level)

Analyze the job and determine:
1. is_relevant: true only if this is clearly a fractional/interim/portfolio executive role
2. role_category: The best matching category from the list above
3. confidence: 0.0-1.0 how certain you are (use 0.7+ threshold for inclusion)
4. reasoning: Brief explanation (1-2 sentences)

Be conservative - when in doubt, reject. Quality over quantity."""
)

# Enrichment agent generates compelling content
enrich_agent = Agent(
    model=GoogleModel('gemini-2.0-flash'),
    result_type=EnrichmentResult,
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


# ============
# Core Functions
# ============

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
        return result.data
    except Exception as e:
        print(f"[Filter] Error filtering job '{job.title}': {e}", file=sys.stderr)
        # Default to rejecting on error
        return FilterResult(
            is_relevant=False,
            role_category=None,
            confidence=0.0,
            reasoning=f"Error during classification: {str(e)}"
        )


async def enrich_job(job: RawJob, filter_result: FilterResult) -> EnrichedJob:
    """Generate enriched content for a job listing."""
    prompt = f"""Enrich this fractional executive job listing:

Title: {job.title}
Company: {job.company}
Role Category: {filter_result.role_category}
Location: {job.location or 'UK'}
Description: {job.description[:2500]}
"""
    try:
        result = await enrich_agent.run(prompt)

        return EnrichedJob(
            title=job.title,
            company_name=job.company,
            location=job.location,
            description_snippet=result.data.description_snippet[:150],  # Enforce limit
            role_category=filter_result.role_category or "OTHER",
            url=job.url,
            salary_min=job.salary_min,
            salary_max=job.salary_max,
            teaser_hook=result.data.teaser_hook,
            topic_keywords=result.data.topic_keywords[:10],  # Limit to 10
            source=job.source,
            external_id=job.external_id,
            content_hash=compute_content_hash(job)
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
            content_hash=compute_content_hash(job)
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


def insert_job(conn, job: EnrichedJob) -> Optional[str]:
    """
    Insert enriched job into database.

    Returns the job ID if successful, None otherwise.
    """
    cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO jobs (
                title, company_name, location, description_snippet,
                role_category, url, salary_min, salary_max,
                teaser_hook, topic_keywords, source, external_id,
                content_hash, imported_at, is_active, is_fractional
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), true, true
            ) RETURNING id
        """, (
            job.title,
            job.company_name,
            job.location,
            job.description_snippet,
            job.role_category,
            job.url,
            job.salary_min,
            job.salary_max,
            job.teaser_hook,
            job.topic_keywords,
            job.source,
            job.external_id,
            job.content_hash
        ))
        job_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
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

    try:
        # 1. Fetch jobs from the pre-scheduled Apify task
        # This task runs daily and scrapes original job postings (not recruiter posts)
        print("[Import] Fetching from Apify scheduled task...", file=sys.stderr)
        raw_jobs = await fetch_apify_jobs(apify_token)
        print(f"[Import] Got {len(raw_jobs)} jobs from Apify task", file=sys.stderr)

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
