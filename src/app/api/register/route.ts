import { NextRequest, NextResponse } from 'next/server'
import { createDbQuery } from '@/lib/db'

// Email validation (RFC 5322 simplified)
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// LinkedIn URL validation
function isValidLinkedIn(url: string): boolean {
  const re = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
  return re.test(url)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, linkedinUrl, consent } = body

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (!linkedinUrl || !linkedinUrl.trim()) {
      return NextResponse.json(
        { success: false, message: 'LinkedIn profile URL is required' },
        { status: 400 }
      )
    }

    if (!isValidLinkedIn(linkedinUrl)) {
      return NextResponse.json(
        { success: false, message: 'Invalid LinkedIn URL. Please use format: https://linkedin.com/in/yourname' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: 'Consent is required' },
        { status: 400 }
      )
    }

    // Store in database
    const sql = createDbQuery()

    await sql`
      INSERT INTO waitlist (name, email, linkedin_url, consent_given, created_at, updated_at)
      VALUES (${name.trim()}, ${email.trim().toLowerCase()}, ${linkedinUrl.trim()}, true, NOW(), NOW())
      ON CONFLICT (email)
      DO UPDATE SET
        name = ${name.trim()},
        linkedin_url = ${linkedinUrl.trim()},
        updated_at = NOW()
    `

    return NextResponse.json({
      success: true,
      message: 'Successfully registered!'
    })

  } catch (error) {
    console.error('Registration error:', error)

    // Handle duplicate email gracefully (though we use ON CONFLICT)
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json({
        success: true,
        message: 'Email updated successfully!'
      })
    }

    return NextResponse.json(
      { success: false, message: 'Failed to register. Please try again.' },
      { status: 500 }
    )
  }
}
