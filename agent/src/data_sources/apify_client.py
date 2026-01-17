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

# The saved task that runs daily - fetches original job postings (not recruiter posts)
APIFY_TASK_ID = "definable_field/career-site-job-listing-api-daily"


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
                # Parse job data - adapt to your task's output format
                # Common fields from career site scrapers
                job = RawJob(
                    title=item.get("title") or item.get("positionName") or item.get("jobTitle", ""),
                    company=item.get("company") or item.get("companyName") or item.get("employer", "Unknown"),
                    location=item.get("location") or item.get("jobLocation") or "UK",
                    description=item.get("description") or item.get("jobDescription") or "",
                    url=item.get("url") or item.get("applyUrl") or item.get("jobUrl", ""),
                    salary_min=parse_salary(item.get("salary") or item.get("salaryRange")),
                    salary_max=parse_salary(item.get("salary") or item.get("salaryRange"), is_max=True),
                    source="apify_career_site",
                    external_id=item.get("id") or item.get("jobId") or item.get("url", str(hash(str(item))))
                )

                # Only include if we have minimum required fields
                if job.title and job.url:
                    jobs.append(job)
                else:
                    print(f"[Apify] Skipping item missing title or url: {item.get('title', 'no title')}")

            except Exception as e:
                print(f"[Apify] Error parsing job item: {e}")
                continue

        print(f"[Apify] Parsed {len(jobs)} valid jobs")
        return jobs


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
