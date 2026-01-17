import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')

  try {
    const sql = neon(process.env.DATABASE_URL!)

    let articles

    if (category) {
      articles = await sql`
        SELECT
          id,
          title,
          url,
          source_name,
          published_date,
          summary,
          key_insights,
          category,
          tags,
          sentiment,
          image_url,
          imported_at
        FROM news_articles
        WHERE status = 'published'
        AND category = ${category}
        ORDER BY imported_at DESC
        LIMIT ${limit}
      `
    } else {
      articles = await sql`
        SELECT
          id,
          title,
          url,
          source_name,
          published_date,
          summary,
          key_insights,
          category,
          tags,
          sentiment,
          image_url,
          imported_at
        FROM news_articles
        WHERE status = 'published'
        ORDER BY imported_at DESC
        LIMIT ${limit}
      `
    }

    return NextResponse.json({
      articles,
      total: articles.length
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
