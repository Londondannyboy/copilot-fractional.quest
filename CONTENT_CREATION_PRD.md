# Content Creation PRD - Fractional Quest V2

## Objective
Migrate and enhance all content from fractional.quest (V1) to fractional.quest (V2), ensuring V2 exceeds V1 in quality, SEO, and user experience.

## Current State (Jan 2026)

### V1 (fractional.quest)
- **Total Pages**: 500+ (including job detail pages)
- **Core Pages**: ~150 content pages
- **Job Listings**: ~350 individual job pages

### V2 (fractional.quest)
- **Total Pages**: 115 (from sitemap)
- **JobPageClient Pages**: 12 (fully upgraded)
- **PageRenderer Pages**: ~100 (database-served, basic)

---

## Page Categories & Status

### 1. HIGH-PRIORITY: JobPageClient Pages (✅ DONE)
These pages use the full JobPageClient with all innovative components.

| Page | GSC Clicks | Status |
|------|------------|--------|
| /fractional-jobs-london | 115 | ✅ Complete |
| /fractional-jobs-uk | 23 | ✅ Complete |
| /fractional-cmo-jobs-uk | 17 | ✅ Complete |
| /fractional-cto-jobs-uk | 16 | ✅ Complete |
| /fractional-coo-jobs-uk | 12 | ✅ Complete |
| /fractional-cfo-jobs-uk | 9 | ✅ Complete |
| /fractional-ciso-jobs-uk | 7 | ✅ Complete |
| /fractional-cpo-jobs-uk | 6 | ✅ Complete |
| /fractional-chro-jobs-uk | 5 | ✅ Complete |
| /fractional-ceo-jobs-uk | 5 | ✅ Complete |
| /remote-fractional-jobs | 6 | ✅ Complete |
| /london (redirect) | 40 | ✅ Complete |

**Features included:**
- HeroSection with Voice
- LiveMarketPulse (animated stats)
- AIInsightsPanel (CopilotKit interactive)
- HeyCompanies (employer CTA)
- JobsSidebar with Featured Jobs
- MarketStatistics
- SkillsDemandChart
- SavingsCalculator
- RoleComparisonTool
- AuthorityLinks
- FAQSection
- CaseStudy
- ExpertProfile

---

### 2. MEDIUM-PRIORITY: Location Pages (🔄 TO CREATE)
Need JobPageClient versions with location-specific SEO content.

| Page | GSC Impressions | Status | Action |
|------|----------------|--------|--------|
| /manchester | - | v1 only | Create JobPageClient + SEO |
| /birmingham | - | v1 only | Create JobPageClient + SEO |
| /edinburgh | - | v1 only | Create JobPageClient + SEO |
| /bristol | - | v1 only | Create JobPageClient + SEO |
| /leeds | - | Missing | Create from scratch |
| /glasgow | - | DB only | Create JobPageClient + SEO |

**Required files per location:**
```
src/app/{location}/page.tsx           # JobPageClient page
src/lib/seo-content/{location}.ts     # SEO content file
```

---

### 3. MEDIUM-PRIORITY: Role Definition Pages (🔄 TO ENRICH)
Currently served via PageRenderer. Need richer content.

| Page | Status | Action |
|------|--------|--------|
| /fractional-cfo | v1 only | Enrich in DB |
| /fractional-cto | v1 only | Enrich in DB |
| /fractional-cmo | v1 only | Enrich in DB |
| /fractional-coo | v1 only | Enrich in DB |
| /fractional-chro | v1 only | Enrich in DB |
| /fractional-ciso | v1 only | Enrich in DB |
| /fractional-cpo | v1 only | Enrich in DB |
| /fractional-ceo | v1 only | Enrich in DB |
| /fractional-cio | Missing | Create in DB |
| /fractional-cdo | Missing | Create in DB |
| /fractional-cco | Missing | Create in DB |
| /fractional-cgo | Missing | Create in DB |
| /fractional-cro | Missing | Create in DB |
| /fractional-dpo | Missing | Create in DB |

---

### 4. MEDIUM-PRIORITY: Salary/Cost Pages (🔄 TO ENRICH)

| Page | Status | Action |
|------|--------|--------|
| /fractional-cfo-salary | v1 only | Enrich |
| /fractional-cto-salary | v1 only | Enrich |
| /fractional-cmo-salary | v1 only | Enrich |
| /fractional-coo-salary | v1 only | Enrich |
| /fractional-cfo-cost | Missing | Create |
| /fractional-cfo-hourly-rate | Missing | Create |

---

### 5. MEDIUM-PRIORITY: Hire Guide Pages (🔄 TO ENRICH)

| Page | Status | Action |
|------|--------|--------|
| /hire-fractional-cfo | v1 only | Enrich |
| /hire-fractional-cto | v1 only | Enrich |
| /hire-fractional-cmo | v1 only | Enrich |
| /hire-fractional-coo | v1 only | Enrich |
| /hire-fractional-chro | v1 only | Enrich |
| /hire-fractional-ciso | v1 only | Enrich |
| /hire-fractional-cpo | v1 only | Enrich |
| /hire-fractional-ceo | v1 only | Enrich |

---

### 6. LOW-PRIORITY: Services Pages (❌ TO CREATE)
Marketing-focused pages for each role.

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /fractional-cfo-services | ✅ Exists | ❌ Missing |
| /fractional-cto-services | ✅ Exists | ❌ Missing |
| /fractional-cmo-services | ✅ Exists | ❌ Missing |
| /fractional-coo-services | ✅ Exists | ❌ Missing |
| /fractional-ceo-services | ✅ Exists | ❌ Missing |
| /fractional-chro-services | ✅ Exists | ❌ Missing |
| /fractional-ciso-services | ✅ Exists | ❌ Missing |
| /fractional-cio-services | ✅ Exists | ❌ Missing |
| /fractional-cpo-services | ✅ Exists | ❌ Missing |
| /fractional-cdo-services | ✅ Exists | ❌ Missing |
| /fractional-cco-services | ✅ Exists | ❌ Missing |
| /fractional-cgo-services | ✅ Exists | ❌ Missing |
| /fractional-cro-services | ✅ Exists | ❌ Missing |
| /fractional-dpo-services | ✅ Exists | ❌ Missing |

---

### 7. LOW-PRIORITY: Meaning/Definition Pages (❌ TO CREATE)
SEO pages targeting "what is X" queries.

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /fractional-cfo-meaning | ✅ Exists | v1 only |
| /fractional-cto-meaning | ✅ Exists | ❌ Missing |
| /fractional-cmo-meaning | ✅ Exists | ❌ Missing |
| /fractional-coo-meaning | ✅ Exists | ❌ Missing |
| /fractional-ciso-meaning | ✅ Exists | v1 only |
| /what-is-fractional | ✅ Exists | ❌ Missing |
| /what-is-fractional-cfo | ✅ Exists | ❌ Missing |
| /what-is-fractional-cto | ✅ Exists | ❌ Missing |
| /what-is-fractional-hr | ✅ Exists | ❌ Missing |

---

### 8. LOW-PRIORITY: Comparison Pages (❌ TO CREATE)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /fractional-cfo-vs-full-time | ✅ Exists | ❌ Missing |
| /fractional-cto-vs-full-time-cto | ✅ Exists | ❌ Missing |
| /fractional-coo-vs-full-time | ✅ Exists | ❌ Missing |
| /fractional-hr-vs-full-time | ✅ Exists | ❌ Missing |
| /fractional-cmo-vs-marketing-agency | ✅ Exists | ❌ Missing |
| /fractional-vs-interim | ✅ Exists | ❌ Missing |
| /fractional-vs-timeshare | ✅ Exists | ❌ Missing |

---

### 9. LOW-PRIORITY: Career Guide Pages (❌ TO CREATE)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /how-to-become-fractional-cfo | ✅ Exists | ❌ Missing |
| /how-to-become-a-fractional-cto | ✅ Exists | ❌ Missing |
| /how-to-become-a-fractional-cmo | ✅ Exists | ❌ Missing |
| /how-to-become-a-fractional-executive | ✅ Exists | ❌ Missing |

---

### 10. LOW-PRIORITY: Interim Pages (🔄 PARTIAL)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /interim-cfo | ✅ Exists | v1 only |
| /interim-cmo | ✅ Exists | ❌ Missing |
| /interim-coo | ✅ Exists | ❌ Missing |
| /interim-cto | ✅ Exists | ❌ Missing |
| /interim-executive | ✅ Exists | v1 only |
| /interim-cfo-jobs-uk | ✅ Exists | v1 only |
| (+ all other interim role jobs) | ✅ Exists | v1 only |

---

### 11. LOW-PRIORITY: Part-Time Pages (🔄 PARTIAL)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /part-time-cfo | ✅ Exists | DB only |
| /part-time-cfo-jobs-uk | ✅ Exists | v1 only |
| /part-time-cmo | ✅ Exists | ❌ Missing |
| /part-time-coo | ✅ Exists | ❌ Missing |
| /part-time-cto | ✅ Exists | ❌ Missing |
| /part-time-hr | ✅ Exists | ❌ Missing |
| (+ all other part-time role jobs) | ✅ Exists | v1 only |

---

### 12. LOW-PRIORITY: Industry/Vertical Pages (❌ TO CREATE)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /fractional-jobs-startups | ✅ Exists | ❌ Missing |
| /fractional-jobs-saas | ✅ Exists | ❌ Missing |
| /fractional-jobs-tech | ✅ Exists | v1 only |
| /fractional-jobs-ecommerce | ✅ Exists | DB only |

---

### 13. STATIC PAGES (🔄 TO CREATE)

| Page | V1 Status | V2 Status |
|------|-----------|-----------|
| /about | ✅ Exists | ❌ Missing |
| /how-it-works | ✅ Exists | ❌ Missing |
| /people | ✅ Exists | ❌ Missing |
| /compliance | ✅ Exists | ❌ Missing |
| /privacy | ✅ Exists | ❌ Missing |
| /terms | ✅ Exists | ❌ Missing |

---

## Content Creation Phases

### Phase 1: Critical (This Week)
**Goal:** Ensure all GSC traffic pages are fully upgraded.

1. ✅ /fractional-jobs-london - DONE
2. ✅ /fractional-jobs-uk - DONE
3. ✅ All role jobs UK pages - DONE
4. ✅ /remote-fractional-jobs - DONE
5. ✅ /manchester - JobPageClient + SEO (enriched with authority links, statistics)
6. ✅ /birmingham - JobPageClient + SEO (enriched with authority links, statistics)
7. ✅ /edinburgh - JobPageClient + SEO (enriched with authority links, statistics)
8. ✅ /bristol - JobPageClient + SEO (enriched with authority links, statistics)

### Phase 2: High-Value (Next Week)
**Goal:** Complete role ecosystem pages.

1. ⬜ All /fractional-{role} definition pages - Enrich
2. ⬜ All /fractional-{role}-salary pages - Enrich
3. ⬜ All /hire-fractional-{role} pages - Enrich

### Phase 3: Coverage (Week 3)
**Goal:** Create all missing service/meaning pages.

1. ⬜ All /fractional-{role}-services pages - Create
2. ⬜ All /fractional-{role}-meaning pages - Create
3. ⬜ All /what-is-fractional-{role} pages - Create

### Phase 4: Comparison & Career (Week 4)
**Goal:** Complete comparison and career content.

1. ⬜ All comparison pages - Create
2. ⬜ All career guide pages - Create
3. ⬜ Industry vertical pages - Create

### Phase 5: Static & Legal (Week 5)
**Goal:** Complete site infrastructure.

1. ⬜ /about - Create
2. ⬜ /how-it-works - Create
3. ⬜ /privacy - Create
4. ⬜ /terms - Create

---

## Technical Implementation

### For JobPageClient Pages (Static Routes)
```
1. Create /src/app/{slug}/page.tsx
2. Create /src/lib/seo-content/{slug}.ts
3. Add to STATIC_ROUTE_SLUGS in [slug]/page.tsx
4. Build and deploy
```

### For PageRenderer Pages (Database)
```
1. INSERT INTO pages table via Neon console or API
2. Include all fields: title, meta_description, sections, faqs, etc.
3. Rebuild to generate static params
```

---

## Quality Checklist Per Page

- [ ] Title < 60 chars
- [ ] Meta description 150-160 chars
- [ ] Hero with image
- [ ] At least 6 FAQs
- [ ] Authority links (8+)
- [ ] Statistics with sources
- [ ] Internal links (8+)
- [ ] Schema markup (BreadcrumbList, WebPage, FAQPage)
- [ ] Mobile responsive
- [ ] Core Web Vitals pass

---

## Success Metrics

### Pre-Migration (V1)
- GSC Clicks: ~250/month
- GSC Impressions: ~15,000/month
- Pages indexed: 300+

### Post-Migration Target (V2)
- GSC Clicks: 400+/month (+60%)
- GSC Impressions: 25,000+/month (+66%)
- Pages indexed: 500+
- Average position improvement: +5 positions

---

## Restart Prompt

When context runs low, use this to resume:

```
I'm working on the Fractional Quest V2 content migration in /Users/dankeegan/fractional.quest

## Key Context
1. **Goal**: V2 must have ALL pages from V1 (500+) with BETTER quality
2. **Architecture**: JobPageClient for high-traffic, PageRenderer for rest
3. **PRD Location**: /CONTENT_CREATION_PRD.md

## Completed
- 12 JobPageClient pages with all innovative components
- Innovative components: AIInsightsPanel, LiveMarketPulse, SkillsDemandChart, RoleComparisonTool

## Current Phase
- Phase 1: Location pages (manchester, birmingham, edinburgh, bristol)

## Commands
- Build: npm run build
- Dev: npm run dev

## Key Files
- JobPageClient: src/components/job-pages/JobPageClient.tsx
- SEO content: src/lib/seo-content/*.ts
- Database pages: src/lib/pages.ts (queries Neon)
```
