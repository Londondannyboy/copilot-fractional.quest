import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// This is a one-time fix script for canonical URLs
// It sets canonical_url to NULL for all pages so they fall back to the correct slug-based URL

export async function GET(request: Request) {
  // Check for auth token to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.FIX_CANONICAL_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'DATABASE_URL not configured' }, { status: 500 })
  }

  const sql = neon(process.env.DATABASE_URL)

  try {
    // First, get count of pages with wrong canonical
    const wrongCanonicals = await sql`
      SELECT COUNT(*) as count
      FROM pages
      WHERE canonical_url IS NOT NULL
        AND canonical_url != CONCAT('https://fractional.quest/', slug)
    `

    // Get some examples of wrong canonicals
    const examples = await sql`
      SELECT slug, canonical_url
      FROM pages
      WHERE canonical_url IS NOT NULL
      LIMIT 10
    `

    // Update all pages to have NULL canonical_url
    // This makes them fall back to the correct https://fractional.quest/{slug}
    const result = await sql`
      UPDATE pages
      SET canonical_url = NULL,
          updated_at = NOW()
      WHERE canonical_url IS NOT NULL
      RETURNING slug
    `

    return NextResponse.json({
      success: true,
      message: 'Canonical URLs fixed',
      wrongCanonicalsBefore: wrongCanonicals[0]?.count || 0,
      examplesBefore: examples,
      pagesUpdated: result.length,
      updatedSlugs: result.map((r) => r.slug)
    })
  } catch (error) {
    console.error('Error fixing canonicals:', error)
    return NextResponse.json({
      error: 'Failed to fix canonicals',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Also support POST for safety
export async function POST(request: Request) {
  return GET(request)
}
