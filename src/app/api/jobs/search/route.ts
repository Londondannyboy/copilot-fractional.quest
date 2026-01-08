import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// GET /api/jobs/search - Search jobs with filters
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const roleType = params.get('role') || ''
  const location = params.get('location') || ''
  const remoteParam = params.get('remote') || ''

  // Pagination
  const page = parseInt(params.get('page') || '1')
  const limit = Math.min(parseInt(params.get('limit') || '20'), 50)
  const offset = (page - 1) * limit

  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Base query with UK filter
    let jobs: any[] = []
    let total = 0

    // Build filter logic
    const isRemoteFilter = remoteParam === 'remote' || remoteParam === 'true'
    const isHybridFilter = remoteParam === 'hybrid'

    // Department/category filter
    const departments = ['Engineering', 'Marketing', 'Finance', 'Operations', 'Sales', 'HR', 'Product']
    const isDepartmentFilter = roleType && departments.includes(roleType)

    // Query based on filters
    if (isDepartmentFilter && location && isRemoteFilter) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = ${roleType} AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} AND (is_remote = true OR workplace_type = 'Remote')`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND role_category = ${roleType} AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} AND (is_remote = true OR workplace_type = 'Remote') ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (isDepartmentFilter && location) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = ${roleType} AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND role_category = ${roleType} AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (isDepartmentFilter && isRemoteFilter) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = ${roleType} AND (is_remote = true OR workplace_type = 'Remote')`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND role_category = ${roleType} AND (is_remote = true OR workplace_type = 'Remote') ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (isDepartmentFilter) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = ${roleType}`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND role_category = ${roleType} ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (location && location.toLowerCase() !== 'remote' && isRemoteFilter) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} AND (is_remote = true OR workplace_type = 'Remote')`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} AND (is_remote = true OR workplace_type = 'Remote') ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (location && location.toLowerCase() !== 'remote') {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`}`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND LOWER(COALESCE(location, '')) LIKE ${`%${location.toLowerCase()}%`} ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (isRemoteFilter || location?.toLowerCase() === 'remote') {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (is_remote = true OR workplace_type = 'Remote')`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND (is_remote = true OR workplace_type = 'Remote') ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else if (isHybridFilter) {
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND workplace_type = 'Hybrid'`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true AND workplace_type = 'Hybrid' ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    } else {
      // No filters - return all UK jobs
      const countResult = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true`
      total = parseInt((countResult[0] as any)?.count || '0')
      jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, workplace_type, compensation, role_category, skills_required, posted_date, hours_per_week FROM jobs WHERE is_active = true ORDER BY posted_date DESC NULLS LAST LIMIT ${limit} OFFSET ${offset}`
    }

    return NextResponse.json({
      jobs: jobs.map((job: any) => ({
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
