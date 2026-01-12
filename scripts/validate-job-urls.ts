/**
 * Script to validate job URLs and mark expired jobs as inactive
 * Run with: npx tsx scripts/validate-job-urls.ts
 */

import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL!

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

interface Job {
  id: string
  slug: string
  title: string
  url: string
  company_name: string
}

// Check if a URL is still valid (job exists)
async function checkUrl(url: string): Promise<{ valid: boolean; status: number; error?: string }> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10s timeout

    const response = await fetch(url, {
      method: 'HEAD', // Just check headers, don't download body
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FractionalQuestBot/1.0; job-validation)',
      },
      redirect: 'follow',
    })

    clearTimeout(timeout)

    // Consider 2xx and 3xx as valid
    const valid = response.status >= 200 && response.status < 400

    return { valid, status: response.status }
  } catch (error: any) {
    // If HEAD fails, try GET (some sites don't support HEAD)
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FractionalQuestBot/1.0; job-validation)',
        },
        redirect: 'follow',
      })

      clearTimeout(timeout)

      const valid = response.status >= 200 && response.status < 400
      return { valid, status: response.status }
    } catch (getError: any) {
      return { valid: false, status: 0, error: getError.message }
    }
  }
}

async function main() {
  console.log('🔍 Fetching active jobs...\n')

  const jobs = await sql`
    SELECT id, slug, title, url, company_name
    FROM jobs
    WHERE is_active = true AND url IS NOT NULL
    ORDER BY posted_date DESC NULLS LAST
  ` as Job[]

  console.log(`Found ${jobs.length} active jobs with URLs\n`)

  const results = {
    valid: [] as Job[],
    invalid: [] as { job: Job; status: number; error?: string }[],
    errors: [] as { job: Job; error: string }[],
  }

  // Process in batches to avoid overwhelming servers
  const batchSize = 10
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize)

    console.log(`\n📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(jobs.length / batchSize)}...`)

    const checks = await Promise.all(
      batch.map(async (job) => {
        const result = await checkUrl(job.url)
        return { job, ...result }
      })
    )

    for (const check of checks) {
      if (check.valid) {
        results.valid.push(check.job)
        console.log(`✅ ${check.job.title.slice(0, 50)}... (${check.status})`)
      } else if (check.error) {
        results.errors.push({ job: check.job, error: check.error })
        console.log(`⚠️  ${check.job.title.slice(0, 50)}... ERROR: ${check.error}`)
      } else {
        results.invalid.push({ job: check.job, status: check.status, error: check.error })
        console.log(`❌ ${check.job.title.slice(0, 50)}... (${check.status})`)
      }
    }

    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESULTS SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Valid: ${results.valid.length}`)
  console.log(`❌ Invalid (404/expired): ${results.invalid.length}`)
  console.log(`⚠️  Errors (timeout/network): ${results.errors.length}`)

  if (results.invalid.length > 0) {
    console.log('\n❌ INVALID JOBS (to be marked inactive):')
    for (const { job, status } of results.invalid) {
      console.log(`  - [${status}] ${job.title} @ ${job.company_name}`)
      console.log(`    URL: ${job.url}`)
      console.log(`    ID: ${job.id}`)
    }

    // Ask for confirmation before marking inactive
    console.log(`\n⚠️  Ready to mark ${results.invalid.length} jobs as inactive.`)
    console.log('Run with --apply to actually update the database.')

    if (process.argv.includes('--apply')) {
      console.log('\n🔧 Marking invalid jobs as inactive...')
      for (const { job } of results.invalid) {
        await sql`UPDATE jobs SET is_active = false WHERE id = ${job.id}`
        console.log(`  ❌ Deactivated: ${job.title}`)
      }
      console.log(`\n✅ Marked ${results.invalid.length} jobs as inactive.`)
    }
  }

  if (results.errors.length > 0) {
    console.log('\n⚠️  JOBS WITH ERRORS (manual check needed):')
    for (const { job, error } of results.errors) {
      console.log(`  - ${job.title} @ ${job.company_name}`)
      console.log(`    Error: ${error}`)
    }
  }
}

main().catch(console.error)
