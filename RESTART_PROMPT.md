# Fractional Quest V2 - Comprehensive Restart Prompt

## Mission
Migrate and enhance ALL content from fractional.quest (V1) to fractional.quest (V2), ensuring V2 EXCEEDS V1 in quality, SEO, and user experience. V2 must have every page that V1 has, plus CopilotKit AI enhancements.

---

## Quick Start Commands

```bash
# Navigate to project
cd /Users/dankeegan/fractional.quest

# Start development
npm run dev

# Build to verify
npm run build

# Check page count
ls src/app/ | wc -l
```

---

## Current State (Jan 2026)

### Page Counts
- **V1 (fractional.quest)**: 304 page directories
- **V2 (fractional.quest)**: 101 page directories
- **Gap**: ~203 pages still to create/migrate

### What's Complete in V2

#### High-Traffic Job Pages (JobPageClient + SEO) ✅
All using full component architecture with CopilotKit sidebar:
- `/fractional-jobs-london` (115 clicks/month)
- `/fractional-jobs-uk` (23 clicks/month)
- `/fractional-cfo-jobs-uk`, `/fractional-cto-jobs-uk`, `/fractional-cmo-jobs-uk`, `/fractional-coo-jobs-uk`
- `/fractional-chro-jobs-uk`, `/fractional-ciso-jobs-uk`, `/fractional-cpo-jobs-uk`, `/fractional-ceo-jobs-uk`
- `/remote-fractional-jobs`

#### Location Pages ✅
All with enriched SEO content (authority links, statistics, relatedPages):
- `/manchester`, `/birmingham`, `/edinburgh`, `/bristol`

#### Role Definition Pages ✅
- `/fractional-cfo`, `/fractional-cto`, `/fractional-cmo`, `/fractional-coo`
- `/fractional-chro`, `/fractional-ciso`, `/fractional-cpo`, `/fractional-ceo`

#### Salary Guide Pages ✅
- `/fractional-cfo-salary`, `/fractional-cto-salary`, `/fractional-cmo-salary`, `/fractional-coo-salary`
- `/fractional-chro-salary`, `/fractional-ciso-salary`, `/fractional-cpo-salary`, `/fractional-ceo-salary`

#### Services/Hire Pages ✅
- `/fractional-cfo-services`, `/fractional-cto-services`, etc. (8 total)
- `/hire-fractional-cfo`, `/hire-fractional-cto`, etc. (8 total)

#### Interim Job Pages ✅
- `/interim-cfo-jobs-uk`, `/interim-cto-jobs-uk`, etc. (8 total)
- `/interim-executive`, `/interim-marketing-director`

#### Part-Time Job Pages ✅
- `/part-time-cfo-jobs-uk`, `/part-time-cto-jobs-uk`, etc. (8 total)

#### Calculator Pages ✅
- `/calculators` - Hub page
- `/calculators/company-savings` - Compare fractional vs full-time costs
- `/calculators/rate-finder` - Day rate finder
- `/calculators/portfolio-builder` - Portfolio career planning

---

## What's Missing (Priority Order)

### Priority 1: High-Impression Pages (Create in Neon DB)

These pages have significant Google Search Console impressions but 0-2 clicks - improving them could drive traffic:

| Page | Impressions | Current Status |
|------|-------------|----------------|
| `/fractional-coo-services` | 151 | Missing |
| `/state-fractional-cfo-market-2025` | 76 | Missing (Article) |
| `/fractional-cmo-services` | 51 | ✅ Created |
| `/interim-executive` | 50 | ✅ Created |
| `/fractional-cfo-services` | 49 | ✅ Created |
| `/interim-marketing-director` | 38 | ✅ Created |
| `/fractional-cfo-meaning` | 35 | Missing |
| `/fractional-ciso-meaning` | 27 | Missing |

### Priority 2: Static/Legal Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/about` | ✅ | ❌ Missing |
| `/contact` | ✅ | ❌ Missing |
| `/how-it-works` | ✅ | ❌ Missing |
| `/people` | ✅ | ❌ Missing |
| `/privacy` | ✅ | ❌ Missing |
| `/terms` | ✅ | ❌ Missing |
| `/compliance` | ✅ | ❌ Missing |
| `/guide` | ✅ | ❌ Missing |

### Priority 3: Short URL Redirects

These should redirect to full pages:
- `/cfo` → `/fractional-cfo`
- `/cto` → `/fractional-cto`
- `/cmo` → `/fractional-cmo`
- `/coo` → `/fractional-coo`
- `/cpo` → `/fractional-cpo`
- `/cro` → `/fractional-cro`

### Priority 4: Meaning/Definition Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-cfo-meaning` | ✅ | ❌ Missing |
| `/fractional-cto-meaning` | ✅ | ❌ Missing |
| `/fractional-cmo-meaning` | ✅ | ❌ Missing |
| `/fractional-coo-meaning` | ✅ | ❌ Missing |
| `/fractional-chro-meaning` | ✅ | ❌ Missing |
| `/fractional-cro-meaning` | ✅ | ❌ Missing |
| `/fractional-executive-meaning` | ✅ | ❌ Missing |

### Priority 5: Cost/Hourly Rate Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-cfo-cost` | ✅ | ❌ Missing |
| `/fractional-cfo-hourly-rate` | ✅ | ❌ Missing |
| `/fractional-cto-cost` | ✅ | ❌ Missing |
| `/fractional-cto-hourly-rate` | ✅ | ❌ Missing |
| `/fractional-cmo-cost` | ✅ | ❌ Missing |
| `/fractional-coo-cost` | ✅ | ❌ Missing |
| `/fractional-coo-hourly-rate` | ✅ | ❌ Missing |
| `/fractional-hr-cost` | ✅ | ❌ Missing |
| `/fractional-hr-hourly-rate` | ✅ | ❌ Missing |

### Priority 6: Comparison Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-cfo-vs-full-time` | ✅ | ❌ Missing |
| `/fractional-cto-vs-full-time-cto` | ✅ | ❌ Missing |
| `/fractional-coo-vs-full-time` | ✅ | ❌ Missing |
| `/fractional-cmo-vs-marketing-agency` | ✅ | ❌ Missing |
| `/fractional-hr-vs-full-time` | ✅ | ❌ Missing |
| `/fractional-vs-timeshare` | ✅ | ❌ Missing |

### Priority 7: How To Become Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/how-to-become-fractional-cfo` | ✅ | ❌ Missing |
| `/how-to-become-a-fractional-cto` | ✅ | ❌ Missing |
| `/how-to-become-a-fractional-cmo` | ✅ | ❌ Missing |
| `/how-to-become-fractional-coo` | ✅ | ❌ Missing |
| `/how-to-become-a-fractional-executive` | ✅ | ❌ Missing |

### Priority 8: For Startups Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-cfo-for-startups` | ✅ | ❌ Missing |
| `/fractional-cto-for-startups` | ✅ | ❌ Missing |
| `/fractional-cmo-for-startups` | ✅ | ❌ Missing |
| `/fractional-coo-for-startups` | ✅ | ❌ Missing |
| `/fractional-hr-for-startups` | ✅ | ❌ Missing |

### Priority 9: Additional Job Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-jobs` | ✅ | ❌ Missing (index) |
| `/fractional-cio-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cdo-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cro-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cgo-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cao-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cso-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-dpo-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-hr-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-cfo-jobs-remote` | ✅ | ❌ Missing |
| `/fractional-compliance-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-finance-director-jobs-uk` | ✅ | ❌ Missing |
| `/fractional-general-counsel-jobs-uk` | ✅ | ❌ Missing |

### Priority 10: Location Pages (Additional)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-jobs-glasgow` | ✅ | DB only |
| `/fractional-jobs-leeds` | ✅ | DB only |
| `/fractional-jobs-cambridge` | ✅ | ❌ Missing |
| `/fractional-jobs-belfast` | ✅ | ❌ Missing |
| `/fractional-jobs-cardiff` | ✅ | ❌ Missing |
| `/fractional-jobs-liverpool` | ✅ | ❌ Missing |
| `/fractional-jobs-nottingham` | ✅ | ❌ Missing |

### Priority 11: Industry/Vertical Pages

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| `/fractional-jobs-startups` | ✅ | ❌ Missing |
| `/fractional-jobs-saas` | ✅ | ❌ Missing |
| `/fractional-jobs-tech` | ✅ | DB only |
| `/fractional-jobs-ecommerce` | ✅ | DB only |
| `/fractional-jobs-finance` | ✅ | ❌ Missing |
| `/fractional-jobs-healthcare` | ✅ | ❌ Missing |

---

## Technical Architecture

### Two Page Types

1. **JobPageClient Pages** (Static routes with full components)
   - For high-traffic job listing pages
   - Includes: CopilotKit sidebar, EmbeddedJobBoard, HotJobs, EmailCapture, RoleCalculator
   - Files: `src/app/{slug}/page.tsx` + `src/lib/seo-content/{slug}.ts`
   - Must be added to `STATIC_ROUTE_SLUGS` in `[slug]/page.tsx`

2. **PageRenderer Pages** (Database-served via Neon)
   - For lower-traffic informational pages
   - Content stored in `pages` table as JSONB
   - Served by `src/app/[slug]/page.tsx`

### Creating a JobPageClient Page

```bash
# 1. Create SEO content file
src/lib/seo-content/{location}.ts

# 2. Create page file
src/app/{slug}/page.tsx

# 3. Add to STATIC_ROUTE_SLUGS in src/app/[slug]/page.tsx

# 4. Build and verify
npm run build
```

### Creating a Database Page

```sql
-- Insert into pages table via Neon console
INSERT INTO pages (slug, page_type, title, meta_description, hero_title, hero_subtitle, sections, faqs, status)
VALUES (
  'fractional-cfo-meaning',
  'definition',
  'What Does Fractional CFO Mean?',
  'Understand the meaning of fractional CFO...',
  'What Does Fractional CFO Mean?',
  'Understanding part-time finance leadership',
  '[{"type": "intro", "content": "..."}, {"type": "definition_box", "content": "..."}]'::jsonb,
  '[{"question": "...", "answer": "..."}]'::jsonb,
  'published'
);
```

### Database Schema (pages table)

```sql
CREATE TABLE pages (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  page_type TEXT NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_badge TEXT,
  accent_color TEXT DEFAULT '#059669',
  sections JSONB DEFAULT '[]',
  faqs JSONB DEFAULT '[]',
  external_links JSONB DEFAULT '[]',
  related_pages JSONB DEFAULT '[]',
  job_board_enabled BOOLEAN DEFAULT false,
  job_board_department TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Section Types for PageRenderer

| Type | Description |
|------|-------------|
| `intro` | Introductory paragraph |
| `definition_box` | Highlighted definition |
| `role_cards` | Grid of linked role cards |
| `stats_bar` | Statistics bar |
| `prose_grid` | Two-column prose content |
| `check_list` | Bulleted checklist |
| `comparison_table` | Side-by-side comparison |
| `steps_list` | Numbered steps |
| `cta_section` | Call-to-action block |
| `job_board` | Embedded job listings |
| `calculator` | Interactive calculator |
| `video` | YouTube embed |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/[slug]/page.tsx` | Dynamic route for DB pages, contains STATIC_ROUTE_SLUGS |
| `src/components/pages/PageRenderer.tsx` | Renders DB page sections |
| `src/components/job-pages/JobPageClient.tsx` | Full job page with CopilotKit |
| `src/lib/seo-content/*.ts` | SEO content for static pages |
| `src/lib/pages.ts` | Database queries for pages |
| `src/lib/jobs.ts` | Job listing queries |

---

## SEO Content Structure

Each SEO file should include:

```typescript
export const exampleSEO = {
  meta: {
    title: "Page Title | Fractional Quest",
    description: "Meta description 150-160 chars",
    keywords: ["keyword1", "keyword2"],
  },
  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "Current Page", url: "/current-page" },
  ],
  hero: {
    headline: "Main Headline",
    subtitle: "Supporting subtitle",
    stats: {
      stat1: "Value",
      stat2: "Value",
    },
  },
  authorityLinks: [
    { name: "Authority Name", url: "https://...", context: "Description" },
    // 8+ external authority links for E-E-A-T
  ],
  statistics: {
    stat1: { value: "X%", description: "...", source: "Source Name" },
    // 5+ statistics with sources
  },
  relatedPages: [
    { name: "Related Page", url: "/related-page" },
    // 8+ internal links
  ],
  content: {
    whyLocation: { title: "...", paragraphs: ["...", "..."] },
    dayRates: { title: "...", rates: [...] },
    locations: { title: "...", areas: [...] },
    emergingRoles: { title: "...", roles: [...] },
    sectors: { title: "...", list: [...] },
  },
  faqs: [
    { question: "...", answer: "..." },
    // 6+ FAQs
  ],
  schema: {
    organization: { "@type": "Organization", name: "Fractional Quest", url: "https://fractional.quest" },
  },
};
```

---

## Quality Checklist Per Page

- [ ] Title < 60 characters
- [ ] Meta description 150-160 characters
- [ ] Hero section with image or gradient
- [ ] At least 6 FAQs
- [ ] 8+ authority links (external)
- [ ] 8+ related pages (internal)
- [ ] Statistics with sources
- [ ] Schema markup (BreadcrumbList, WebPage, FAQPage)
- [ ] Mobile responsive
- [ ] Core Web Vitals pass

---

## Success Metrics

### Target vs Current

| Metric | V1 (fractional.quest) | V2 Target |
|--------|----------------------|-----------|
| Total Pages | 304 | 304+ |
| GSC Clicks/month | ~250 | 400+ |
| GSC Impressions/month | ~15,000 | 25,000+ |
| Pages indexed | 300+ | 500+ |

---

## Environment

```
Working directory: /Users/dankeegan/fractional.quest
V1 reference: /Users/dankeegan/fractional.quest
Platform: macOS Darwin 24.6.0
Database: Neon PostgreSQL
Deployment: Vercel (auto-deploy on push)
```

---

## Next Actions

1. **Create missing high-impression pages** in Neon database
2. **Create static/legal pages** (about, contact, privacy, terms)
3. **Add short URL redirects** (cfo → fractional-cfo)
4. **Create meaning pages** for all roles
5. **Create cost/hourly-rate pages** for all roles
6. **Create comparison pages** (vs full-time, vs agency)
7. **Create how-to-become pages** for career guidance
8. **Create for-startups pages** targeting startup audience
9. **Create additional job pages** for missing roles
10. **Create location pages** for remaining UK cities

---

## Copy This Prompt to Continue

```
I'm continuing the Fractional Quest V2 migration in /Users/dankeegan/fractional.quest

## Mission
V2 must have ALL pages from V1 (304+) with SUPERIOR quality. Every page should have:
- Rich SEO content (authority links, statistics, FAQs)
- CopilotKit integration where applicable
- Better user experience than V1

## Current Status
- V2 has 101 page directories
- V1 has 304 page directories
- Gap: ~203 pages to create

## Reference Files
- Restart prompt: /Users/dankeegan/fractional.quest/RESTART_PROMPT.md
- V1 source: /Users/dankeegan/fractional.quest/app/
- Database: Neon PostgreSQL (pages table)

## Key Commands
- Build: npm run build
- Dev: npm run dev
- Check pages: ls src/app/ | wc -l

## Priority
1. High-impression pages (GSC data shows opportunity)
2. Static/legal pages (about, contact, privacy, terms)
3. Meaning pages (fractional-cfo-meaning, etc.)
4. Cost/hourly-rate pages
5. Comparison pages
6. How-to-become pages
7. For-startups pages
8. Additional job pages
9. Location pages

Please continue creating pages to match V1, prioritizing high-impression opportunities.
```
