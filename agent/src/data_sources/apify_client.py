"""
Apify client for fetching job listings from career sites.

Uses a pre-configured Apify task (definable_field/career-site-job-listing-api-daily)
that scrapes original job postings from company career sites and LinkedIn company pages.

This task is scheduled to run daily on Apify, so we just fetch the latest results
from its dataset rather than running new scraper jobs.
"""

import httpx
import asyncio
import re
from typing import List, Optional
from pydantic import BaseModel


class RawJob(BaseModel):
    """Job as fetched from external source"""
    title: str
    company: str
    location: Optional[str] = None
    description: str
    url: str
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    source: str  # 'apify_career_site', 'apify_linkedin_company', etc.
    external_id: str  # Source system ID


APIFY_BASE_URL = "https://api.apify.com/v2"

# The saved tasks that run daily
# Career sites task - fetches original job postings from company career sites
APIFY_TASK_CAREER_SITES = "definable_field~career-site-job-listing-api-daily"

# LinkedIn job search task - fetches jobs from LinkedIn (scheduled 10pm GMT)
# IMPORTANT: This includes recruiter posts that need extra filtering
APIFY_TASK_LINKEDIN = "definable_field~advanced-linkedin-job-search-api-daily"

# Legacy alias for backward compatibility
APIFY_TASK_ID = APIFY_TASK_CAREER_SITES


def parse_salary(salary_str: Optional[str], is_max: bool = False) -> Optional[int]:
    """
    Parse salary string to integer.
    Handles formats like:
    - "£800-1200 per day"
    - "£100,000 - £150,000 per year"
    - "$150k-200k"
    """
    if not salary_str:
        return None

    # Remove currency symbols and normalize
    cleaned = salary_str.replace('£', '').replace('$', '').replace('€', '')

    # Find all numbers
    numbers = re.findall(r'[\d,]+(?:\.\d+)?k?', cleaned, re.IGNORECASE)
    if not numbers:
        return None

    def convert_number(num_str: str) -> int:
        num_str = num_str.replace(',', '')
        if num_str.lower().endswith('k'):
            return int(float(num_str[:-1]) * 1000)
        return int(float(num_str))

    try:
        if is_max and len(numbers) > 1:
            return convert_number(numbers[1])
        return convert_number(numbers[0])
    except (ValueError, IndexError):
        return None


async def fetch_apify_jobs(token: str, max_items: int = 100) -> List[RawJob]:
    """
    Fetch job listings from the pre-configured Apify task.

    The task (definable_field/career-site-job-listing-api-daily) is scheduled
    to run daily on Apify and scrapes original job postings from:
    - Company career sites
    - LinkedIn company pages (direct postings, not recruiter)

    This function fetches the latest results from the task's dataset.

    Args:
        token: Apify API token
        max_items: Maximum jobs to fetch from the dataset

    Returns:
        List of RawJob objects
    """
    async with httpx.AsyncClient(timeout=60.0) as client:
        # First, get the latest run of the task to find the dataset
        print(f"[Apify] Fetching latest run from task: {APIFY_TASK_ID}")

        runs_response = await client.get(
            f"{APIFY_BASE_URL}/actor-tasks/{APIFY_TASK_ID}/runs",
            params={"token": token, "limit": 1, "desc": "true"}
        )

        if runs_response.status_code != 200:
            print(f"[Apify] Error fetching task runs: {runs_response.status_code}")
            print(f"[Apify] Response: {runs_response.text}")
            return []

        runs_data = runs_response.json()
        runs = runs_data.get("data", {}).get("items", [])

        if not runs:
            print("[Apify] No runs found for task")
            return []

        latest_run = runs[0]
        run_status = latest_run.get("status")
        dataset_id = latest_run.get("defaultDatasetId")

        print(f"[Apify] Latest run status: {run_status}, dataset: {dataset_id}")

        if run_status != "SUCCEEDED":
            print(f"[Apify] Latest run not successful, status: {run_status}")
            # Try to get the last successful run
            runs_response = await client.get(
                f"{APIFY_BASE_URL}/actor-tasks/{APIFY_TASK_ID}/runs",
                params={"token": token, "limit": 10, "desc": "true", "status": "SUCCEEDED"}
            )
            runs_data = runs_response.json()
            successful_runs = runs_data.get("data", {}).get("items", [])
            if successful_runs:
                dataset_id = successful_runs[0].get("defaultDatasetId")
                print(f"[Apify] Using last successful run dataset: {dataset_id}")
            else:
                print("[Apify] No successful runs found")
                return []

        # Fetch items from the dataset
        print(f"[Apify] Fetching items from dataset: {dataset_id}")

        results_response = await client.get(
            f"{APIFY_BASE_URL}/datasets/{dataset_id}/items",
            params={"token": token, "format": "json", "limit": max_items}
        )

        if results_response.status_code != 200:
            print(f"[Apify] Error fetching dataset: {results_response.status_code}")
            return []

        items = results_response.json()
        print(f"[Apify] Fetched {len(items)} items from dataset")

        jobs = []
        for item in items:
            try:
                # Parse job data from career-site-job-listing-api format
                # Fields: id, title, organization, url, description_text, locations_derived, etc.
                title = item.get("title", "")
                company = item.get("organization") or item.get("company") or "Unknown"

                # Get location - prefer derived locations, fallback to cities
                location = None
                if item.get("locations_derived"):
                    location = item["locations_derived"][0] if isinstance(item["locations_derived"], list) else item["locations_derived"]
                elif item.get("cities_derived"):
                    location = item["cities_derived"][0] if isinstance(item["cities_derived"], list) else item["cities_derived"]
                elif item.get("location"):
                    location = item["location"]

                # Get description
                description = item.get("description_text") or item.get("description") or ""

                # Get salary if available
                salary_min = item.get("ai_salary_minvalue") or parse_salary(item.get("salary_raw"))
                salary_max = item.get("ai_salary_maxvalue") or parse_salary(item.get("salary_raw"), is_max=True)

                job = RawJob(
                    title=title,
                    company=company,
                    location=location or "Remote",
                    description=description,
                    url=item.get("url", ""),
                    salary_min=int(salary_min) if salary_min else None,
                    salary_max=int(salary_max) if salary_max else None,
                    source="apify_career_site",
                    external_id=str(item.get("id", item.get("url", hash(str(item)))))
                )

                # Only include if we have minimum required fields
                if job.title and job.url:
                    jobs.append(job)
                    print(f"[Apify] Parsed: {job.title[:50]} at {job.company}")
                else:
                    print(f"[Apify] Skipping item missing title or url: {item.get('title', 'no title')}")

            except Exception as e:
                print(f"[Apify] Error parsing job item: {e}")
                continue

        print(f"[Apify] Parsed {len(jobs)} valid jobs")
        return jobs


async def fetch_linkedin_jobs(token: str, max_items: int = 100) -> List[RawJob]:
    """
    Fetch job listings from the LinkedIn job search Apify task.

    The task (definable_field/advanced-linkedin-job-search-api-daily) is scheduled
    to run daily at 10pm GMT and scrapes LinkedIn job postings.

    IMPORTANT: LinkedIn has many recruiter postings - these need extra filtering.
    The job_importer.py handles recruiter detection.

    Args:
        token: Apify API token
        max_items: Maximum jobs to fetch from the dataset

    Returns:
        List of RawJob objects
    """
    async with httpx.AsyncClient(timeout=60.0) as client:
        # Get the latest run of the LinkedIn task
        print(f"[Apify LinkedIn] Fetching latest run from task: {APIFY_TASK_LINKEDIN}")

        runs_response = await client.get(
            f"{APIFY_BASE_URL}/actor-tasks/{APIFY_TASK_LINKEDIN}/runs",
            params={"token": token, "limit": 1, "desc": "true"}
        )

        if runs_response.status_code != 200:
            print(f"[Apify LinkedIn] Error fetching task runs: {runs_response.status_code}")
            print(f"[Apify LinkedIn] Response: {runs_response.text}")
            return []

        runs_data = runs_response.json()
        runs = runs_data.get("data", {}).get("items", [])

        if not runs:
            print("[Apify LinkedIn] No runs found for task")
            return []

        latest_run = runs[0]
        run_status = latest_run.get("status")
        dataset_id = latest_run.get("defaultDatasetId")

        print(f"[Apify LinkedIn] Latest run status: {run_status}, dataset: {dataset_id}")

        if run_status != "SUCCEEDED":
            print(f"[Apify LinkedIn] Latest run not successful, status: {run_status}")
            # Try to get the last successful run
            runs_response = await client.get(
                f"{APIFY_BASE_URL}/actor-tasks/{APIFY_TASK_LINKEDIN}/runs",
                params={"token": token, "limit": 10, "desc": "true", "status": "SUCCEEDED"}
            )
            runs_data = runs_response.json()
            successful_runs = runs_data.get("data", {}).get("items", [])
            if successful_runs:
                dataset_id = successful_runs[0].get("defaultDatasetId")
                print(f"[Apify LinkedIn] Using last successful run dataset: {dataset_id}")
            else:
                print("[Apify LinkedIn] No successful runs found")
                return []

        # Fetch items from the dataset
        print(f"[Apify LinkedIn] Fetching items from dataset: {dataset_id}")

        results_response = await client.get(
            f"{APIFY_BASE_URL}/datasets/{dataset_id}/items",
            params={"token": token, "format": "json", "limit": max_items}
        )

        if results_response.status_code != 200:
            print(f"[Apify LinkedIn] Error fetching dataset: {results_response.status_code}")
            return []

        items = results_response.json()
        print(f"[Apify LinkedIn] Fetched {len(items)} items from dataset")

        jobs = []
        for item in items:
            try:
                # Parse job data from LinkedIn job search format
                # Fields vary but typically: title, companyName, location, description, link/url, etc.
                title = item.get("title") or item.get("jobTitle") or ""
                company = item.get("companyName") or item.get("company") or item.get("organization") or "Unknown"

                # Get location
                location = item.get("location") or item.get("jobLocation") or None

                # Get description
                description = item.get("description") or item.get("jobDescription") or ""

                # Get URL - LinkedIn uses various field names
                url = item.get("link") or item.get("url") or item.get("jobUrl") or item.get("applyUrl") or ""

                # Get salary if available
                salary_raw = item.get("salary") or item.get("salaryRange") or item.get("compensation")
                salary_min = parse_salary(salary_raw)
                salary_max = parse_salary(salary_raw, is_max=True)

                job = RawJob(
                    title=title,
                    company=company,
                    location=location or "Remote",
                    description=description,
                    url=url,
                    salary_min=salary_min,
                    salary_max=salary_max,
                    source="apify_linkedin",  # Different source tag for tracking
                    external_id=str(item.get("id") or item.get("jobId") or item.get("link") or hash(str(item)))
                )

                # Only include if we have minimum required fields
                if job.title and job.url:
                    jobs.append(job)
                    print(f"[Apify LinkedIn] Parsed: {job.title[:50]} at {job.company}")
                else:
                    print(f"[Apify LinkedIn] Skipping item missing title or url: {item.get('title', 'no title')}")

            except Exception as e:
                print(f"[Apify LinkedIn] Error parsing job item: {e}")
                continue

        print(f"[Apify LinkedIn] Parsed {len(jobs)} valid jobs")
        return jobs


async def fetch_all_apify_jobs(token: str, max_items_per_source: int = 100) -> List[RawJob]:
    """
    Fetch jobs from all configured Apify sources (career sites + LinkedIn).

    This is the recommended function for the daily import pipeline as it
    combines jobs from multiple sources.

    Args:
        token: Apify API token
        max_items_per_source: Maximum jobs to fetch from each source

    Returns:
        Combined list of RawJob objects from all sources
    """
    all_jobs = []

    # Fetch from career sites task
    print("[Apify] Fetching from career sites task...")
    career_jobs = await fetch_apify_jobs(token, max_items_per_source)
    all_jobs.extend(career_jobs)
    print(f"[Apify] Got {len(career_jobs)} jobs from career sites")

    # Fetch from LinkedIn task
    print("[Apify] Fetching from LinkedIn task...")
    linkedin_jobs = await fetch_linkedin_jobs(token, max_items_per_source)
    all_jobs.extend(linkedin_jobs)
    print(f"[Apify] Got {len(linkedin_jobs)} jobs from LinkedIn")

    print(f"[Apify] Total combined: {len(all_jobs)} jobs")
    return all_jobs


async def trigger_apify_task(token: str) -> Optional[str]:
    """
    Manually trigger the Apify task to run.

    Usually not needed since the task runs on a daily schedule,
    but can be used for ad-hoc imports.

    Args:
        token: Apify API token

    Returns:
        Run ID if successful, None otherwise
    """
    async with httpx.AsyncClient(timeout=30.0) as client:
        print(f"[Apify] Triggering task: {APIFY_TASK_ID}")

        run_response = await client.post(
            f"{APIFY_BASE_URL}/actor-tasks/{APIFY_TASK_ID}/runs",
            params={"token": token}
        )

        if run_response.status_code != 201:
            print(f"[Apify] Error triggering task: {run_response.status_code}")
            return None

        run_data = run_response.json()
        run_id = run_data.get("data", {}).get("id")
        print(f"[Apify] Task triggered, run ID: {run_id}")
        return run_id


async def wait_for_apify_run(token: str, run_id: str, timeout_minutes: int = 10) -> bool:
    """
    Wait for an Apify run to complete.

    Args:
        token: Apify API token
        run_id: The run ID to wait for
        timeout_minutes: Maximum time to wait

    Returns:
        True if run succeeded, False otherwise
    """
    async with httpx.AsyncClient(timeout=30.0) as client:
        max_attempts = timeout_minutes * 12  # Check every 5 seconds

        for attempt in range(max_attempts):
            status_response = await client.get(
                f"{APIFY_BASE_URL}/actor-runs/{run_id}",
                params={"token": token}
            )

            if status_response.status_code != 200:
                print(f"[Apify] Error checking run status: {status_response.status_code}")
                return False

            status = status_response.json().get("data", {}).get("status")

            if status == "SUCCEEDED":
                print(f"[Apify] Run {run_id} completed successfully")
                return True
            elif status in ["FAILED", "ABORTED", "TIMED-OUT"]:
                print(f"[Apify] Run {run_id} failed with status: {status}")
                return False

            if attempt % 6 == 0:  # Log every 30 seconds
                print(f"[Apify] Run {run_id} status: {status}, waiting...")

            await asyncio.sleep(5)

        print(f"[Apify] Timeout waiting for run {run_id}")
        return False


async def fetch_apify_jobs_fresh(token: str, max_items: int = 100) -> List[RawJob]:
    """
    Trigger a fresh run of the Apify task and wait for results.

    Use this when you need absolutely fresh data rather than the
    latest scheduled run results.

    Args:
        token: Apify API token
        max_items: Maximum jobs to fetch

    Returns:
        List of RawJob objects
    """
    run_id = await trigger_apify_task(token)
    if not run_id:
        return []

    success = await wait_for_apify_run(token, run_id)
    if not success:
        return []

    # Now fetch the results
    return await fetch_apify_jobs(token, max_items)
