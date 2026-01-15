/**
 * Fix Canonical URLs in Database
 *
 * This script sets canonical_url to NULL for all pages in the database,
 * allowing them to fall back to the correct self-referencing URL pattern.
 *
 * Usage:
 *   npx tsx scripts/fix-canonicals.ts
 *
 * Or with environment variable:
 *   DATABASE_URL=your_url npx tsx scripts/fix-canonicals.ts
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load .env.local file manually
function loadEnv() {
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envContent = readFileSync(envPath, 'utf-8')
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=').trim()
        // Strip surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value
        }
      }
    })
  } catch {
    // Try .env if .env.local doesn't exist
    try {
      const envPath = join(process.cwd(), '.env')
      const envContent = readFileSync(envPath, 'utf-8')
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=')
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=').trim()
          // Strip surrounding quotes
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = value
          }
        }
      })
    } catch {
      // No env file found
    }
  }
}

loadEnv()

async function main() {
  const DATABASE_URL = process.env.DATABASE_URL

  if (!DATABASE_URL) {
    console.error('ERROR: DATABASE_URL environment variable is not set')
    console.log('Please set it in .env file or pass it as an environment variable')
    process.exit(1)
  }

  console.log('Connecting to database...')
  const sql = neon(DATABASE_URL)

  try {
    // Step 1: Check current state
    console.log('\n=== CURRENT STATE ===')

    const totalPages = await sql`SELECT COUNT(*) as count FROM pages`
    console.log(`Total pages in database: ${totalPages[0].count}`)

    const pagesWithCanonical = await sql`
      SELECT COUNT(*) as count FROM pages WHERE canonical_url IS NOT NULL
    `
    console.log(`Pages with canonical_url set: ${pagesWithCanonical[0].count}`)

    const wrongCanonicals = await sql`
      SELECT COUNT(*) as count FROM pages
      WHERE canonical_url IS NOT NULL
        AND canonical_url NOT LIKE CONCAT('%', slug)
    `
    console.log(`Pages with potentially wrong canonical: ${wrongCanonicals[0].count}`)

    // Step 2: Show examples
    console.log('\n=== EXAMPLES OF CURRENT CANONICAL_URLs ===')
    const examples = await sql`
      SELECT slug, canonical_url
      FROM pages
      WHERE canonical_url IS NOT NULL
      LIMIT 20
    `

    if (examples.length === 0) {
      console.log('No pages have canonical_url set (this is good!)')
    } else {
      examples.forEach((row: { slug: string; canonical_url: string }) => {
        console.log(`  ${row.slug} → ${row.canonical_url}`)
      })
    }

    // Step 3: Fix canonicals
    console.log('\n=== FIXING CANONICAL URLs ===')

    const result = await sql`
      UPDATE pages
      SET canonical_url = NULL,
          updated_at = NOW()
      WHERE canonical_url IS NOT NULL
      RETURNING slug
    `

    console.log(`Updated ${result.length} pages`)

    if (result.length > 0) {
      console.log('Updated slugs:')
      result.forEach((row: { slug: string }) => {
        console.log(`  - ${row.slug}`)
      })
    }

    // Step 4: Verify fix
    console.log('\n=== VERIFICATION ===')
    const afterFix = await sql`
      SELECT COUNT(*) as count FROM pages WHERE canonical_url IS NOT NULL
    `
    console.log(`Pages with canonical_url after fix: ${afterFix[0].count}`)

    console.log('\n✅ Done! All database pages will now use the correct canonical URL pattern:')
    console.log('   https://fractional.quest/{slug}')
    console.log('\nNote: Static pages (not in database) need alternates.canonical in their metadata.')

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
