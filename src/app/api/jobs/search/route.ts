import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// Country-specific location keywords for filtering
const COUNTRY_LOCATIONS: Record<string, string[]> = {
  uk: [
    'united kingdom', 'england', 'scotland', 'wales', 'northern ireland',
    'london', 'manchester', 'birmingham', 'edinburgh', 'glasgow',
    'bristol', 'leeds', 'liverpool', 'cambridge', 'oxford', 'uk'
  ],
  us: [
    'united states', 'usa', 'america',
    'new york', 'san francisco', 'los angeles', 'chicago', 'boston',
    'austin', 'seattle', 'denver', 'miami', 'atlanta', 'dallas'
  ],
  au: [
    'australia',
    'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
    'canberra', 'hobart', 'darwin', 'gold coast'
  ],
  nz: [
    'new zealand', 'nz',
    'auckland', 'wellington', 'christchurch', 'hamilton', 'tauranga', 'dunedin'
  ]
}

// Check if location matches a specific country
function isLocationInCountry(location: string | null, country: string): boolean {
  if (!location) return false
  // Remote jobs are available for all countries
  if (location.toLowerCase() === 'remote') return true

  const loc = location.toLowerCase()
  const countryKeywords = COUNTRY_LOCATIONS[country] || COUNTRY_LOCATIONS.uk
  return countryKeywords.some(keyword => loc.includes(keyword))
}

// Legacy UK-only check for backwards compatibility
function isUKLocation(location: string | null): boolean {
  return isLocationInCountry(location, 'uk')
}

// GET /api/jobs/search - Search jobs with filters (UK-only by default)
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const roleType = params.get('role') || ''
  const location = params.get('location') || ''
  const remoteParam = params.get('remote') || ''
  const country = params.get('country') || 'uk' // Default to UK for backwards compatibility
  const includeInternational = params.get('international') === 'true'

  // Pagination
  const page = parseInt(params.get('page') || '1')
  const limit = Math.min(parseInt(params.get('limit') || '20'), 50)
  const offset = (page - 1) * limit

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Build filter logic
    const isRemoteFilter = remoteParam === 'remote' || remoteParam === 'true'
    const isHybridFilter = remoteParam === 'hybrid'
    const isOnsiteFilter = remoteParam === 'onsite'

    // Department/category filter with aliases
    // Maps MDX defaultDepartment values to actual role_category values in the DB
    const departmentMap: Record<string, string> = {
      Technology: 'Engineering',
      Engineering: 'Engineering',
      Marketing: 'Marketing',
      Finance: 'Finance',
      Operations: 'Operations',
      Sales: 'Sales',
      HR: 'HR',
      Product: 'Product',
      Legal: 'Legal',
      Design: 'Design',
      Data: 'Data',
      Executive: 'Executive',
      Compliance: 'Legal',
      Innovation: 'Engineering',
      Strategy: 'Executive',
      Communications: 'Marketing',
      Sustainability: 'Operations',
    }
    const mappedDepartment = roleType ? departmentMap[roleType] || roleType : ''
    const isDepartmentFilter = !!mappedDepartment

    // Fetch all matching jobs (we'll filter for UK in JS for flexibility)
    let allJobs: any[] = []

    if (isDepartmentFilter && location) {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true AND is_fractional = true
          AND role_category = ${mappedDepartment}
          AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else if (isDepartmentFilter) {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true AND is_fractional = true
          AND role_category = ${mappedDepartment}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else if (location && location.toLowerCase() !== 'remote') {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true AND is_fractional = true
          AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else {
      // No specific filters - get all jobs
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true AND is_fractional = true
        ORDER BY posted_date DESC NULLS LAST
      `
    }

    // Apply country filter (unless international=true)
    let filteredJobs = includeInternational
      ? allJobs
      : allJobs.filter((job: any) => isLocationInCountry(job.location, country))

    // Apply remote/hybrid/onsite filter
    if (isRemoteFilter) {
      filteredJobs = filteredJobs.filter((job: any) =>
        job.is_remote || job.workplace_type === 'Remote' || job.location?.toLowerCase() === 'remote'
      )
    } else if (isHybridFilter) {
      filteredJobs = filteredJobs.filter((job: any) => job.workplace_type === 'Hybrid')
    } else if (isOnsiteFilter) {
      filteredJobs = filteredJobs.filter((job: any) =>
        job.workplace_type === 'On-site' || job.workplace_type === 'Onsite' ||
        (!job.is_remote && job.workplace_type !== 'Remote' && job.workplace_type !== 'Hybrid')
      )
    }

    const total = filteredJobs.length
    const paginatedJobs = filteredJobs.slice(offset, offset + limit)

    return NextResponse.json({
      jobs: paginatedJobs.map((job: any) => ({
        id: job.id,
        slug: job.slug,
        title: job.title,
        company_name: job.company_name,
        location: job.location || 'Location TBD',
        is_remote: job.is_remote || job.workplace_type === 'Remote',
        workplace_type: job.workplace_type,
        compensation: job.compensation,
        role_category: job.role_category,
        skills_required: job.skills_required || [],
        posted_date: job.posted_date,
        hours_per_week: job.hours_per_week,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('Job search error:', error)
    return NextResponse.json({ jobs: [], total: 0, error: 'Search failed' }, { status: 500 })
  }
}
