import { neon } from "@neondatabase/serverless";

// Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  salaryMin?: number;
  salaryMax?: number;
  description?: string;
  roleType?: string;
  postedDate?: string;
  url?: string;
}

export interface JobStats {
  total: number;
  avgDayRate: number;
  topRoles: { role: string; count: number }[];
  roleBreakdown: { name: string; jobs: number }[];
  salaryRanges: { role: string; min: number; max: number; avg: number }[];
  hybridPercentage: number;
}

// Database client
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

// Fetch jobs by location
export async function getJobsByLocation(location: string): Promise<Job[]> {
  const sql = getDb();
  const searchTerm = `%${location}%`;

  try {
    const rows = await sql`
      SELECT
        title,
        company,
        location,
        salary_min,
        salary_max,
        description,
        role_type
      FROM test_jobs
      WHERE location ILIKE ${searchTerm}
      LIMIT 50
    `;

    return rows.map((row: any, index: number) => ({
      id: `job-${index}`,
      title: row.title,
      company: row.company || "Unknown",
      location: row.location || "UK",
      salaryMin: row.salary_min,
      salaryMax: row.salary_max,
      salary: row.salary_min && row.salary_max
        ? `£${Math.round(row.salary_min / 1000)}k - £${Math.round(row.salary_max / 1000)}k`
        : undefined,
      description: row.description,
      roleType: row.role_type,
      url: `https://fractional.quest/fractional-jobs`,
    }));
  } catch (error) {
    console.error("[jobs] Error fetching by location:", error);
    return [];
  }
}

// Fetch jobs by role type
export async function getJobsByRole(role: string): Promise<Job[]> {
  const sql = getDb();
  const searchTerm = `%${role}%`;

  try {
    const rows = await sql`
      SELECT
        title,
        company,
        location,
        salary_min,
        salary_max,
        description,
        role_type
      FROM test_jobs
      WHERE title ILIKE ${searchTerm} OR role_type ILIKE ${searchTerm}
      LIMIT 50
    `;

    return rows.map((row: any, index: number) => ({
      id: `job-${index}`,
      title: row.title,
      company: row.company || "Unknown",
      location: row.location || "UK",
      salaryMin: row.salary_min,
      salaryMax: row.salary_max,
      salary: row.salary_min && row.salary_max
        ? `£${Math.round(row.salary_min / 1000)}k - £${Math.round(row.salary_max / 1000)}k`
        : undefined,
      description: row.description,
      roleType: row.role_type,
      url: `https://fractional.quest/fractional-${role.toLowerCase()}-jobs-uk`,
    }));
  } catch (error) {
    console.error("[jobs] Error fetching by role:", error);
    return [];
  }
}

// Get stats for a location
export async function getLocationStats(location: string): Promise<JobStats> {
  const sql = getDb();
  const searchTerm = `%${location}%`;

  try {
    // Total count
    const [countResult] = await sql`
      SELECT COUNT(*) as count
      FROM test_jobs
      WHERE location ILIKE ${searchTerm}
    `;
    const total = Number(countResult?.count || 0);

    // Average salary
    const [avgResult] = await sql`
      SELECT AVG(salary_max) as avg
      FROM test_jobs
      WHERE location ILIKE ${searchTerm} AND salary_max IS NOT NULL
    `;
    const avgDayRate = Math.round(Number(avgResult?.avg || 150000) / 1000);

    // Role breakdown
    const roleRows = await sql`
      SELECT role_type as role, COUNT(*) as count
      FROM test_jobs
      WHERE location ILIKE ${searchTerm}
      GROUP BY role_type
      ORDER BY count DESC
    `;
    const topRoles = roleRows.map((r: any) => ({
      role: r.role || "Other",
      count: Number(r.count),
    }));
    const roleBreakdown = topRoles.map((r) => ({
      name: r.role,
      jobs: r.count,
    }));

    // Salary ranges (day rates in £)
    const salaryRanges = [
      { role: "CTO", min: 900, max: 1400, avg: 1100 },
      { role: "CFO", min: 1000, max: 1500, avg: 1200 },
      { role: "CMO", min: 850, max: 1300, avg: 1000 },
      { role: "COO", min: 900, max: 1300, avg: 1050 },
      { role: "CHRO", min: 800, max: 1200, avg: 950 },
    ];

    return {
      total,
      avgDayRate,
      topRoles,
      roleBreakdown,
      salaryRanges,
      hybridPercentage: 60,
    };
  } catch (error) {
    console.error("[jobs] Error fetching stats:", error);
    return {
      total: 0,
      avgDayRate: 0,
      topRoles: [],
      roleBreakdown: [],
      salaryRanges: [],
      hybridPercentage: 0,
    };
  }
}

// Combined fetch for page data
export async function getJobsPageData(location: string) {
  const [jobs, stats] = await Promise.all([
    getJobsByLocation(location),
    getLocationStats(location),
  ]);

  return { jobs, stats };
}
