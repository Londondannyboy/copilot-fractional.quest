import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, userType, message } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Insert into contact_requests table
    await sql`
      INSERT INTO contact_requests (name, email, user_type, message, created_at)
      VALUES (${name || null}, ${email}, ${userType || 'unknown'}, ${message || null}, NOW())
    `

    return NextResponse.json({ success: true, message: 'Request submitted successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
