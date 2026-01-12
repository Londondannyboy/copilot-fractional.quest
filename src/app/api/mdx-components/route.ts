import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

// Initialize the mdx_components table
async function initializeTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS mdx_components (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      props JSONB DEFAULT '[]',
      example_usage TEXT,
      requires_auth BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

// Seed data for available MDX components
const componentData = [
  {
    name: "PersonalizedHero",
    description: "Dynamic hero section with user greeting, location context, and job count. Shows personalized welcome message for logged-in users.",
    category: "hero",
    props: JSON.stringify([
      { name: "location", type: "string", required: false, description: "City name (e.g., 'London', 'Manchester')" },
      { name: "role", type: "string", required: false, description: "Target role (e.g., 'CMO', 'CTO', 'CFO')" },
      { name: "jobCount", type: "number", required: false, description: "Number of available jobs to display" }
    ]),
    example_usage: '<PersonalizedHero location="London" role="CMO" jobCount={47} />',
    requires_auth: false
  },
  {
    name: "SalaryBenchmarkChart",
    description: "Interactive chart comparing user's day rate to market percentiles (25th, 50th, 75th, 90th). Shows where the user stands relative to the market.",
    category: "chart",
    props: JSON.stringify([
      { name: "role", type: "string", required: true, description: "Role type (CMO, CTO, CFO, COO, etc.)" },
      { name: "location", type: "string", required: true, description: "Location for salary data" },
      { name: "yourRate", type: "number", required: false, description: "User's current day rate in GBP" }
    ]),
    example_usage: '<SalaryBenchmarkChart role="CMO" location="London" yourRate={1100} />',
    requires_auth: false
  },
  {
    name: "CareerTimeline",
    description: "Interactive visualization showing career progression from current role to target fractional executive position. Includes milestones and skill development.",
    category: "visualization",
    props: JSON.stringify([
      { name: "currentRole", type: "string", required: true, description: "User's current job title" },
      { name: "targetRole", type: "string", required: true, description: "Target fractional role" }
    ]),
    example_usage: '<CareerTimeline currentRole="Marketing Director" targetRole="Fractional CMO" />',
    requires_auth: false
  },
  {
    name: "MarketOverview",
    description: "Dashboard showing live market statistics including job count, average rates, growth trends, and top hiring sectors for a specific role and location.",
    category: "dashboard",
    props: JSON.stringify([
      { name: "location", type: "string", required: false, description: "Filter by location" },
      { name: "role", type: "string", required: false, description: "Filter by role type" }
    ]),
    example_usage: '<MarketOverview location="London" role="CMO" />',
    requires_auth: false
  },
  {
    name: "CopilotMainPanel",
    description: "Embedded chat interface within content. Sends questions to the same AI assistant. Great for contextual help sections.",
    category: "chat",
    props: JSON.stringify([
      { name: "title", type: "string", required: false, description: "Panel title" },
      { name: "suggestedQuestions", type: "string[]", required: false, description: "Array of suggested questions to show as chips" }
    ]),
    example_usage: '<CopilotMainPanel title="Ask about this role" suggestedQuestions={["What is the average rate?", "Show me jobs"]} />',
    requires_auth: false
  },
  {
    name: "EmbeddedJobBoard",
    description: "Filterable job listings with department, location, and work type filters. Supports pagination and customizable accent colors.",
    category: "job-board",
    props: JSON.stringify([
      { name: "defaultDepartment", type: "string", required: false, description: "Pre-filter by department (Finance, Engineering, Marketing, etc.)" },
      { name: "title", type: "string", required: false, description: "Section title" },
      { name: "accentColor", type: "string", required: false, description: "Color theme: emerald, blue, amber, purple, red, indigo" },
      { name: "jobsPerPage", type: "number", required: false, description: "Jobs to show per page (default: 6)" }
    ]),
    example_usage: '<EmbeddedJobBoard defaultDepartment="Marketing" title="CMO Jobs" accentColor="emerald" />',
    requires_auth: false
  },
  {
    name: "RoleCalculator",
    description: "Interactive earnings calculator. User can adjust days per month, hourly rate, and see annual income projections for fractional work.",
    category: "calculator",
    props: JSON.stringify([
      { name: "role", type: "string", required: false, description: "Pre-select role for default rates" }
    ]),
    example_usage: '<RoleCalculator role="CMO" />',
    requires_auth: false
  },
  {
    name: "HotJobs",
    description: "Carousel of featured/trending job opportunities. Shows high-priority or recently posted positions.",
    category: "job-board",
    props: JSON.stringify([
      { name: "limit", type: "number", required: false, description: "Number of jobs to show (default: 5)" },
      { name: "department", type: "string", required: false, description: "Filter by department" }
    ]),
    example_usage: '<HotJobs limit={5} department="Finance" />',
    requires_auth: false
  }
];

export async function GET() {
  try {
    // Get all components from database
    const components = await sql`
      SELECT name, description, category, props, example_usage, requires_auth
      FROM mdx_components
      ORDER BY category, name
    `;

    return NextResponse.json({
      success: true,
      count: components.length,
      components
    });
  } catch (error) {
    console.error("Error fetching MDX components:", error);
    return NextResponse.json(
      { error: "Failed to fetch components" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "initialize") {
      // Create table and seed with component data
      await initializeTable();

      // Upsert all components
      for (const component of componentData) {
        await sql`
          INSERT INTO mdx_components (name, description, category, props, example_usage, requires_auth)
          VALUES (${component.name}, ${component.description}, ${component.category}, ${component.props}, ${component.example_usage}, ${component.requires_auth})
          ON CONFLICT (name) DO UPDATE SET
            description = EXCLUDED.description,
            category = EXCLUDED.category,
            props = EXCLUDED.props,
            example_usage = EXCLUDED.example_usage,
            requires_auth = EXCLUDED.requires_auth
        `;
      }

      return NextResponse.json({
        success: true,
        message: `Initialized ${componentData.length} MDX components`
      });
    }

    return NextResponse.json(
      { error: "Unknown action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in MDX components API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
