from textwrap import dedent
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from pydantic_ai.ag_ui import StateDeps
from ag_ui.core import EventType, StateSnapshotEvent
from pydantic_ai.models.google import GoogleModel
import psycopg2
import os

from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# =====
# State
# =====
class Job(BaseModel):
  title: str
  company: str
  location: str

class AppState(BaseModel):
  jobs: list[Job] = Field(default_factory=list)
  search_query: str = ""

# =====
# Agent
# =====
agent = Agent(
  model = GoogleModel('gemini-2.0-flash'),
  deps_type=StateDeps[AppState],
  system_prompt=dedent("""
    You are an AI assistant for a premium fractional executive jobs platform.

    You have powerful visualization tools at your disposal:
    - show_jobs_chart: Show job distribution by role type (bar chart)
    - show_location_chart: Show jobs by geography (pie chart)
    - show_salary_insights: Show salary ranges by role (area chart)
    - show_market_dashboard: Show a comprehensive market overview dashboard
    - get_featured_articles: Get relevant articles with images about fractional work
    - search_jobs: Search and display job listings

    When users ask about jobs, charts, visualizations, salary data, or market insights,
    USE THE APPROPRIATE TOOL to render rich, interactive UI components.

    Be enthusiastic and helpful. Suggest visualizations proactively!
  """).strip()
)

# =====
# Tools
# =====
@agent.tool
def get_jobs(ctx: RunContext[StateDeps[AppState]]) -> list[dict]:
  """Get the current list of jobs in state."""
  return [j.model_dump() for j in ctx.deps.state.jobs]

@agent.tool
async def search_jobs(ctx: RunContext[StateDeps[AppState]], query: str) -> StateSnapshotEvent:
  """Search for jobs. Shows results as rich job cards."""
  print(f"🔍 Searching: {query}")
  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()
  search_term = f"%{query}%"
  cur.execute("""
    SELECT title, company, location
    FROM test_jobs
    WHERE title ILIKE %s OR company ILIKE %s OR location ILIKE %s OR role_type ILIKE %s
    LIMIT 10
  """, (search_term, search_term, search_term, search_term))
  rows = cur.fetchall()
  cur.close()
  conn.close()
  print(f"🔍 Found {len(rows)} jobs")
  jobs = [Job(title=r[0], company=r[1] or "Unknown", location=r[2] or "Remote") for r in rows]
  ctx.deps.state.jobs = jobs
  ctx.deps.state.search_query = query
  return StateSnapshotEvent(type=EventType.STATE_SNAPSHOT, snapshot=ctx.deps.state)

@agent.tool
def show_jobs_chart(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Show an interactive bar chart of job distribution by role type."""
  print("📊 Generating role distribution chart")
  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()
  cur.execute("""
    SELECT role_type, COUNT(*) as count
    FROM test_jobs
    GROUP BY role_type ORDER BY count DESC
  """)
  rows = cur.fetchall()
  cur.close()
  conn.close()
  print(f"📊 Chart data: {rows}")
  return {
    "chartData": [{"name": r[0], "jobs": r[1], "fill": ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"][i % 8]} for i, r in enumerate(rows)],
    "title": "Fractional Executive Roles Distribution",
    "subtitle": "Live data from test_jobs"
  }

@agent.tool
def show_location_chart(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Show a pie chart of jobs by geographic location."""
  print("🌍 Generating location chart")
  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()
  cur.execute("""
    SELECT location, COUNT(*) as count
    FROM test_jobs
    GROUP BY location ORDER BY count DESC
  """)
  rows = cur.fetchall()
  cur.close()
  conn.close()
  print(f"🌍 Location data: {rows}")
  return {
    "chartData": [{"name": r[0], "jobs": r[1]} for r in rows],
    "title": "Jobs by Location",
    "subtitle": "Geographic distribution from test_jobs"
  }

@agent.tool
def show_salary_insights(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Show salary range insights by executive role type as an area chart."""
  print("💰 Generating salary insights")
  # Simulated market data based on industry standards
  salary_data = [
    {"role": "CEO", "min": 250, "max": 500, "avg": 375},
    {"role": "CFO", "min": 200, "max": 400, "avg": 300},
    {"role": "CTO", "min": 180, "max": 380, "avg": 280},
    {"role": "CMO", "min": 150, "max": 320, "avg": 235},
    {"role": "COO", "min": 170, "max": 350, "avg": 260},
    {"role": "CHRO", "min": 140, "max": 280, "avg": 210},
    {"role": "CRO", "min": 160, "max": 340, "avg": 250},
    {"role": "CPO", "min": 150, "max": 300, "avg": 225},
  ]
  return {
    "chartData": salary_data,
    "title": "Fractional Executive Day Rates (£)",
    "subtitle": "Market rate ranges by role"
  }

@agent.tool
def show_market_dashboard(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Show a comprehensive market dashboard with multiple metrics."""
  print("📈 Generating market dashboard")
  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()

  cur.execute("SELECT COUNT(*) FROM test_jobs")
  total_jobs = cur.fetchone()[0]

  cur.execute("SELECT COUNT(DISTINCT company) FROM test_jobs")
  total_companies = cur.fetchone()[0]

  cur.execute("SELECT AVG(salary_max) FROM test_jobs WHERE salary_max IS NOT NULL")
  avg_salary = cur.fetchone()[0] or 150000

  cur.execute("""
    SELECT role_type, COUNT(*) as cnt
    FROM test_jobs
    GROUP BY role_type ORDER BY cnt DESC LIMIT 5
  """)
  top_roles = cur.fetchall()

  cur.close()
  conn.close()
  print(f"📈 Dashboard: {total_jobs} jobs, {total_companies} companies")

  return {
    "metrics": {
      "totalJobs": total_jobs,
      "totalCompanies": total_companies,
      "remoteJobs": 0,
      "avgDayRate": f"£{int(avg_salary/1000)}k"
    },
    "topRoles": [{"name": r[0], "count": r[1]} for r in top_roles],
    "title": "Fractional Executive Market Dashboard",
    "lastUpdated": "Live"
  }

@agent.tool
def get_featured_articles(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Get featured articles about fractional executive work with images."""
  print("📰 Getting featured articles")
  articles = [
    {
      "title": "The Rise of Fractional Executives",
      "description": "How the fractional model is transforming C-suite hiring",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      "url": "https://fractional.quest/fractional-executive-meaning",
      "source": "Fractional Quest"
    },
    {
      "title": "CFO vs Fractional CFO: Which Do You Need?",
      "description": "A guide to choosing the right finance leadership model",
      "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      "url": "https://fractional.quest/fractional-cfo-jobs-uk",
      "source": "Industry Guide"
    },
    {
      "title": "Tech Leadership on Demand",
      "description": "Why startups are choosing fractional CTOs",
      "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      "url": "https://fractional.quest/fractional-cto-jobs-uk",
      "source": "Tech Insights"
    },
    {
      "title": "The Future of Executive Work",
      "description": "Portfolio careers and the new C-suite paradigm",
      "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      "url": "https://fractional.quest/fractional-roles",
      "source": "Forbes"
    }
  ]
  return {"articles": articles, "title": "Featured Insights"}

@agent.tool
def show_a2ui_job_card(ctx: RunContext[StateDeps[AppState]], role: str) -> dict:
  """Show a rich A2UI job card widget for a specific role. Returns A2UI JSON format."""
  print(f"🎨 Generating A2UI card for: {role}")

  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()
  cur.execute("""
    SELECT title, company, location, salary_min, salary_max, description
    FROM test_jobs
    WHERE title ILIKE %s OR role_type ILIKE %s
    LIMIT 1
  """, (f"%{role}%", f"%{role}%"))
  row = cur.fetchone()
  cur.close()
  conn.close()
  print(f"🎨 Found job: {row}")

  if not row:
    return {"a2ui": {"type": "text", "text": f"No {role} jobs found"}}

  salary_text = f"💰 £{row[3]//1000}k - £{row[4]//1000}k" if row[3] and row[4] else ""

  # Return A2UI JSON format
  return {
    "a2ui": {
      "type": "card",
      "children": [
        {
          "type": "image",
          "url": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=150&fit=crop",
          "alt": "Executive office"
        },
        {"type": "text", "variant": "h2", "text": row[0]},
        {"type": "text", "variant": "body", "text": f"🏢 {row[1]}"},
        {"type": "text", "variant": "caption", "text": f"📍 {row[2]}"},
        {"type": "text", "variant": "caption", "text": salary_text},
        {"type": "text", "variant": "body", "text": row[5] or ""},
        {
          "type": "row",
          "children": [
            {"type": "button", "label": "Apply Now", "variant": "primary"},
            {"type": "button", "label": "Save", "variant": "secondary"}
          ]
        }
      ]
    },
    "title": f"Featured {role} Position"
  }

@agent.tool
def show_a2ui_stats_widget(ctx: RunContext[StateDeps[AppState]]) -> dict:
  """Show an A2UI statistics widget with live market data."""
  print("📊 Generating A2UI stats widget")

  conn = psycopg2.connect(DATABASE_URL)
  cur = conn.cursor()

  cur.execute("SELECT COUNT(*) FROM test_jobs")
  total = cur.fetchone()[0]

  cur.execute("SELECT COUNT(DISTINCT company) FROM test_jobs")
  companies = cur.fetchone()[0]

  cur.execute("SELECT AVG(salary_max) FROM test_jobs WHERE salary_max IS NOT NULL")
  avg_salary = cur.fetchone()[0] or 150000

  cur.close()
  conn.close()
  print(f"📊 Stats: {total} jobs, {companies} companies")

  return {
    "a2ui": {
      "type": "card",
      "children": [
        {"type": "text", "variant": "h1", "text": "📈 Market Snapshot"},
        {
          "type": "row",
          "children": [
            {
              "type": "column",
              "children": [
                {"type": "text", "variant": "h2", "text": str(total)},
                {"type": "text", "variant": "caption", "text": "Active Jobs"}
              ]
            },
            {
              "type": "column",
              "children": [
                {"type": "text", "variant": "h2", "text": str(companies)},
                {"type": "text", "variant": "caption", "text": "Companies"}
              ]
            },
            {
              "type": "column",
              "children": [
                {"type": "text", "variant": "h2", "text": f"£{int(avg_salary/1000)}k"},
                {"type": "text", "variant": "caption", "text": "Avg Salary"}
              ]
            }
          ]
        },
        {"type": "divider"},
        {"type": "text", "variant": "body", "text": "Live data from test_jobs table"}
      ]
    },
    "title": "Market Statistics"
  }
