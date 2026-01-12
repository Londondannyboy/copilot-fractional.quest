# Fractional Quest v2 - Migration Plan

Last updated: 2026-01-10 (Session 7 - Sidebar Components & SEO Enrichment)

---

## CRITICAL RESTART PROMPT (Copy/Paste to Continue)

```
I'm continuing work on the Fractional Quest v2 migration in /Users/dankeegan/fractional.quest.

## CRITICAL CONTEXT
V2 pages must EXCEED V1 (fractional.quest) in quality before switchover to fractional.quest domain.

The CORRECT pattern uses `JobPageClient` with:
- CopilotKit sidebar with agent context
- EmbeddedJobBoard with filters
- HotJobs carousel
- EmailCapture
- RoleCalculator
- Full hero with images
- JobsSidebar with authority links, statistics, related pages

## COMPLETED (2026-01-10 Session 7)

### New Sidebar Components Created
1. ✅ `src/components/sidebar/AuthorityLinks.tsx` - External authority links with icons
2. ✅ `src/components/sidebar/StatisticsHighlight.tsx` - Market stats with citations and accent colors
3. ✅ `src/components/sidebar/RelatedPages.tsx` - Internal links for topical authority
4. ✅ `src/components/sidebar/index.ts` - Barrel export

### JobsSidebar Enhanced
- Now accepts: authorityLinks, statistics, relatedPages, accentColor, currentPath props
- Integrates all three new sidebar components

### SEO Content Enriched (10 files total)
All with 8 authority links, 5 statistics, 6 FAQs, 8 related pages:
- `london.ts` ✅
- `uk.ts` ✅
- `cmo-jobs-uk.ts` ✅
- `cto-jobs-uk.ts` ✅
- `cpo-jobs-uk.ts` ✅
- `ciso-jobs-uk.ts` ✅
- `cfo-jobs-uk.ts` ✅
- `coo-jobs-uk.ts` ✅
- `chro-jobs-uk.ts` ✅
- `ceo-jobs-uk.ts` ✅

### JobPageClient Updated
- Passes enriched SEO content to JobsSidebar

## KEY FILES
- `/src/components/sidebar/` - New sidebar components (AuthorityLinks, StatisticsHighlight, RelatedPages)
- `/src/components/JobsSidebar.tsx` - Enhanced with enriched SEO content props
- `/src/components/job-pages/JobPageClient.tsx` - Passes enriched content to sidebar
- `/src/lib/seo-content/*.ts` - All 10 SEO files enriched

## NEXT STEPS
1. Enrich remaining location SEO files (manchester, birmingham, edinburgh, bristol, leeds, glasgow)
2. Verify sidebars render correctly on all pages
3. Consider adding more authority links for E-E-A-T

## GIT
- Remote: https://github.com/Londondannyboy/fractional.quest.git
- Latest commit: `3b2678d` - Add sidebar components and enrich remaining SEO content files

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

## SESSION 7 PROGRESS (2026-01-10) - Sidebar Components & SEO Enrichment

### Completed
1. ✅ Created `src/components/sidebar/AuthorityLinks.tsx` - External links with icons
2. ✅ Created `src/components/sidebar/StatisticsHighlight.tsx` - Stats with accent colors
3. ✅ Created `src/components/sidebar/RelatedPages.tsx` - Internal links section
4. ✅ Created `src/components/sidebar/index.ts` - Barrel export
5. ✅ Enhanced `JobsSidebar.tsx` with new component integration
6. ✅ Updated `JobPageClient.tsx` to pass enriched SEO content to sidebar
7. ✅ Enriched `cfo-jobs-uk.ts` with 8 authority links, 5 statistics, 6 FAQs
8. ✅ Enriched `coo-jobs-uk.ts` with 8 authority links, 5 statistics, 6 FAQs
9. ✅ Enriched `chro-jobs-uk.ts` with 8 authority links, 5 statistics, 6 FAQs
10. ✅ Enriched `ceo-jobs-uk.ts` with 8 authority links, 5 statistics, 6 FAQs
11. ✅ Build passing (209 pages generated)
12. ✅ Committed and deployed: `3b2678d`

### Previous Sessions Completed
- Session 5: All job pages created with JobPageClient pattern
- Session 6: 6 SEO files enriched (london, uk, cmo, cto, cpo, ciso)

### Pending
1. Enrich location SEO files (manchester, birmingham, edinburgh, bristol, leeds, glasgow)
2. Verify sidebars render correctly on all pages

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
