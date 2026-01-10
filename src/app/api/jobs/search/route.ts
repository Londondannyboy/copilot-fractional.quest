import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// UK location check function
function isUKLocation(location: string | null): boolean {
  if (!location) return false
  const loc = location.toLowerCase()
  return (
    loc.includes('united kingdom') ||
    loc.includes('england') ||
    loc.includes('scotland') ||
    loc.includes('wales') ||
    loc.includes('northern ireland') ||
    loc.includes('london') ||
    loc.includes('manchester') ||
    loc.includes('birmingham') ||
    loc.includes('edinburgh') ||
    loc.includes('glasgow') ||
    loc.includes('bristol') ||
    loc.includes('leeds') ||
    loc.includes('liverpool') ||
    loc.includes('cambridge') ||
    loc.includes('oxford') ||
    loc === 'remote' ||
    loc === 'uk'
  )
}

// GET /api/jobs/search - Search jobs with filters (UK-only by default)
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const roleType = params.get('role') || ''
  const location = params.get('location') || ''
  const remoteParam = params.get('remote') || ''
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

    // Department/category filter
    const departments = ['Engineering', 'Marketing', 'Finance', 'Operations', 'Sales', 'HR', 'Product']
    const isDepartmentFilter = roleType && departments.includes(roleType)

    // Fetch all matching jobs (we'll filter for UK in JS for flexibility)
    let allJobs: any[] = []

    if (isDepartmentFilter && location) {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true
          AND role_category = ${roleType}
          AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else if (isDepartmentFilter) {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true
          AND role_category = ${roleType}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else if (location && location.toLowerCase() !== 'remote') {
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true
          AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}
        ORDER BY posted_date DESC NULLS LAST
      `
    } else {
      // No specific filters - get all jobs
      allJobs = await sql`
        SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week
        FROM jobs
        WHERE is_active = true
        ORDER BY posted_date DESC NULLS LAST
      `
    }

    // Apply UK filter (unless international=true)
    let filteredJobs = includeInternational
      ? allJobs
      : allJobs.filter((job: any) => isUKLocation(job.location))

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
