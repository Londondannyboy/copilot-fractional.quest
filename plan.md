# Fractional Quest v2 - Migration Plan

Last updated: 2026-01-10 (Session 5 - V2 Quality Enhancement)

---

## CRITICAL RESTART PROMPT (Copy/Paste to Continue)

```
I'm continuing work on the Fractional Quest v2 migration in /Users/dankeegan/copilotkit-demo.

## CRITICAL CONTEXT
The V2 migration had a major architecture mistake: pages were migrated to thin database JSONB content instead of recreating the rich component-driven pages from fractional.quest (V1).

The CORRECT pattern exists at `/fractional-jobs-london` which uses `JobPageClient` with:
- CopilotKit sidebar
- EmbeddedJobBoard with filters
- HotJobs carousel
- EmailCapture
- RoleCalculator
- Full hero with images
- Interactive components

The WRONG pattern was `/[slug]/page.tsx` serving thin PageRenderer content from Neon database.

## COMPLETED (2026-01-10)
1. ✅ Created `/fractional-jobs-uk` static page using JobPageClient pattern
2. ✅ Created all 8 role-specific jobs pages (CFO, CTO, CMO, COO, CHRO, CISO, CPO, CEO)
3. ✅ Fixed `jobs` table queries (was using old `test_jobs` table)
4. ✅ Added Unsplash image domains to next.config.ts
5. ✅ Transparent header with white text on job pages (when not scrolled)
6. ✅ All pages committed and pushed to git

## CURRENT ISSUES
1. Job cards need unique Unsplash images (currently using static role-based images)
2. Jobs should be pre-filtered for UK/London only (may show US jobs)
3. Need sidebar with jobs and CTAs like fractional.quest
4. Calendly should move to separate page for performance

## KEY FILES
- `/src/components/job-pages/JobPageClient.tsx` - Main page component with CopilotKit
- `/src/components/EmbeddedJobBoard.tsx` - Job board with filters (client-side)
- `/src/lib/jobs.ts` - Server-side job queries
- `/src/app/api/jobs/search/route.ts` - Client-side job search API
- `/src/components/navigation/Header.tsx` - Transparent header logic

## DATABASE
- **Neon Project:** plain-glade-34229418
- **Table:** `jobs` (213 active jobs with `is_active = true`)
- **Columns:** id, slug, title, company_name, location, salary_min, salary_max, description_snippet, role_category, is_remote, workplace_type

## GIT
- Remote: https://github.com/Londondannyboy/copilot-fractional.quest.git
- Latest commits:
  - Header transparency fix
  - Job queries fixed to use `jobs` table
  - All role pages created

## IMMEDIATE TASKS
1. Add Unsplash API for unique job card images
2. Pre-filter jobs for UK/London locations
3. Add sidebar with jobs list and CTAs
4. Move Calendly to separate page
5. Verify code quality

Read CLAUDE.md for full session history and patterns.
```

---

## V2 PAGE ARCHITECTURE

### Correct Pattern: JobPageClient

Pages using this pattern have full V1 quality:
- `/fractional-jobs-london`
- `/fractional-jobs-uk` (created 2026-01-10)
- `/fractional-cfo-jobs-uk` through `/fractional-ceo-jobs-uk`

```tsx
// Correct pattern
import { JobPageClient } from "@/components/job-pages";
import { getJobsPageData } from "@/lib/jobs";
import { seoContent } from "@/lib/seo-content/[location].ts";

export default async function Page() {
  const { jobs, stats } = await getJobsPageData("uk");
  return (
    <JobPageClient
      location="uk"
      locationDisplay="UK"
      initialJobs={jobs}
      stats={stats}
      seoContent={seoContent}
    />
  );
}
```

### Wrong Pattern: Database PageRenderer

These pages are thin and lack interactive components:
- Any page served via `/[slug]/page.tsx` from database
- PageRenderer renders basic sections but NO CopilotKit, job boards, calculators

### STATIC_ROUTE_SLUGS

Pages listed here bypass database and use static component-driven pages:
```typescript
// src/app/[slug]/page.tsx
const STATIC_ROUTE_SLUGS = [
  'fractional-jobs-london',
  'fractional-jobs-uk',
  'fractional-cfo-jobs-uk',
  'fractional-cto-jobs-uk',
  'fractional-cmo-jobs-uk',
  'fractional-coo-jobs-uk',
  'fractional-chro-jobs-uk',
  'fractional-ciso-jobs-uk',
  'fractional-cpo-jobs-uk',
  'fractional-ceo-jobs-uk',
]
```

---

## SESSION 5 PROGRESS (2026-01-10)

### Completed
1. ✅ Created `src/lib/seo-content/uk.ts` - UK SEO content
2. ✅ Created `src/app/fractional-jobs-uk/page.tsx` - Main UK jobs page
3. ✅ Created all role-specific SEO content files (cfo, cto, cmo, coo, chro, ciso, cpo, ceo)
4. ✅ Created all role-specific job pages
5. ✅ Updated STATIC_ROUTE_SLUGS to include all new pages
6. ✅ Fixed `src/lib/jobs.ts` to query `jobs` table (was `test_jobs`)
7. ✅ Fixed column names: company_name, description_snippet, role_category
8. ✅ Added Unsplash/ui-avatars/Google domains to next.config.ts
9. ✅ Transparent header with white text on job pages

### In Progress
1. 🔄 Unsplash API for unique job card images
2. 🔄 Pre-filter jobs for UK/London only

### Pending
1. Add sidebar with jobs and CTAs
2. Move Calendly to separate page
3. Verify code cleanliness

---

## JOB DATA ARCHITECTURE

### Server-Side (Initial Load)
```
getJobsPageData(filter) in src/lib/jobs.ts
  ↓
Queries Neon `jobs` table with is_active = true
  ↓
Returns { jobs: Job[], stats: JobStats }
  ↓
Passed to JobPageClient as initialJobs
```

### Client-Side (Filtering)
```
EmbeddedJobBoard in src/components/EmbeddedJobBoard.tsx
  ↓
Fetches /api/jobs/search with params (role, location, remote, page, limit)
  ↓
API route queries Neon `jobs` table
  ↓
Returns filtered jobs for display
```

### Database Schema
```sql
Table: jobs
- id: UUID
- slug: TEXT (unique)
- title: TEXT
- company_name: TEXT
- location: TEXT
- is_remote: BOOLEAN
- workplace_type: TEXT (remote, hybrid, onsite)
- salary_min: INTEGER
- salary_max: INTEGER
- compensation: TEXT
- description_snippet: TEXT
- role_category: TEXT (Finance, Engineering, Marketing, etc.)
- skills_required: TEXT[]
- hours_per_week: TEXT
- posted_date: TIMESTAMP
- is_active: BOOLEAN
```

---

## REMAINING PAGES TO BUILD

### High Traffic (Not yet component-driven)
| Page | Clicks/mo | Status |
|------|-----------|--------|
| /london | 40 | Redirect to /fractional-jobs-london |
| /remote-fractional-jobs | 6 | Needs JobPageClient |
| /fractional-jobs-tech | 4 | Needs JobPageClient |

### Role Pages (Definition, not Jobs)
| Page | Impressions | Status |
|------|-------------|--------|
| /fractional-cfo | 12 | Has page, may need enhancement |
| /fractional-cto | 29 | Has page, may need enhancement |
| /fractional-cmo | - | Has page |
| /fractional-coo | 17 | Has page |

### Services Pages
Already exist with EmbeddedJobBoard from previous session.

---

## GIT COMMITS (2026-01-10)

1. `e1c7711` - Create V2 job pages with JobPageClient pattern
2. `15eb553` - Add Unsplash image domains to next.config.ts
3. `79b9616` - Fix job queries to use jobs table
4. `be640fa` - Add debug logging to EmbeddedJobBoard
5. `[pending]` - Header transparency fix

---

## DEBUGGING TIPS

### If EmbeddedJobBoard shows 0 jobs:
1. Check browser console for `[EmbeddedJobBoard]` logs
2. Check API response at `/api/jobs/search`
3. Verify `jobs` table has data with `is_active = true`
4. Check column names match: company_name, description_snippet, role_category

### If images don't load:
1. Check next.config.ts has domain in `images.remotePatterns`
2. Verify URL format matches Unsplash pattern
3. Check browser network tab for blocked requests

### If header not transparent:
1. Verify page pathname is in TRANSPARENT_HEADER_PAGES array
2. Check browser dev tools for class changes on scroll
