import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'

const sql = neon(process.env.DATABASE_URL!)

/**
 * GET /api/recruiters - List all known recruiters
 * GET /api/recruiters?check=company_name - Check if a company is a known recruiter
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const check = searchParams.get('check')

  if (check) {
    // Check if a specific company matches any recruiter pattern
    const companyLower = check.toLowerCase().trim()

    const matches = await sql`
      SELECT company_name, pattern_type, reason
      FROM known_recruiters
      WHERE is_active = true
      AND (
        (pattern_type = 'exact' AND LOWER(company_name) = ${companyLower})
        OR (pattern_type = 'contains' AND ${companyLower} LIKE '%' || LOWER(company_name) || '%')
        OR (pattern_type = 'starts_with' AND ${companyLower} LIKE LOWER(company_name) || '%')
        OR (pattern_type = 'ends_with' AND ${companyLower} LIKE '%' || LOWER(company_name))
      )
      LIMIT 1
    `

    return NextResponse.json({
      company: check,
      isRecruiter: matches.length > 0,
      match: matches[0] || null
    })
  }

  // List all recruiters
  const recruiters = await sql`
    SELECT id, company_name, pattern_type, reason, flagged_by, jobs_blocked, is_active, created_at
    FROM known_recruiters
    ORDER BY jobs_blocked DESC, created_at DESC
  `

  return NextResponse.json({
    total: recruiters.length,
    recruiters
  })
}

/**
 * POST /api/recruiters - Add a new recruiter
 * Body: { company_name, pattern_type?, reason?, flagged_by? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_name, pattern_type = 'contains', reason, flagged_by = 'manual' } = body

    if (!company_name) {
      return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO known_recruiters (company_name, pattern_type, reason, flagged_by)
      VALUES (${company_name.toLowerCase().trim()}, ${pattern_type}, ${reason || null}, ${flagged_by})
      ON CONFLICT (company_name, pattern_type) DO UPDATE SET
        reason = COALESCE(EXCLUDED.reason, known_recruiters.reason),
        updated_at = NOW()
      RETURNING id, company_name, pattern_type
    `

    return NextResponse.json({
      success: true,
      recruiter: result[0]
    })
  } catch (error) {
    console.error('Error adding recruiter:', error)
    return NextResponse.json({ error: 'Failed to add recruiter' }, { status: 500 })
  }
}

/**
 * DELETE /api/recruiters?id=123 - Deactivate a recruiter (soft delete)
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  await sql`
    UPDATE known_recruiters
    SET is_active = false, updated_at = NOW()
    WHERE id = ${parseInt(id)}
  `

  return NextResponse.json({ success: true })
}
