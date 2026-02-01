# Fractional Quest - Development Guide

## Quick Start

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
git add -A && git commit -m "message" && git push  # Deploy
```

## Project Overview

- **Location**: `/Users/dankeegan/fractional.quest`
- **Database**: Neon PostgreSQL (`plain-glade-34229418`)
- **Stack**: Next.js 15, React 19, TypeScript, Tailwind, CopilotKit

## Modular Reference Files

Load these when working on specific tasks:

| Reference | Location | When to Use |
|-----------|----------|-------------|
| **Job Schema** | `.claude/reference/job-schema.md` | Creating/updating Neon job entries |
| **SEO Templates** | `.claude/reference/seo-templates.md` | Writing job descriptions, authority links |
| **Role Data** | `.claude/reference/role-data.md` | Day rates, engagement types, role categories |

## Key Patterns

### Page Architecture (Updated Feb 2026)

**ALL pages now served from Neon via IntelligentPageRenderer:**
```
src/app/[slug]/page.tsx → Neon pages table → IntelligentPageRenderer
```

- `STATIC_ROUTE_SLUGS` array is now empty - all pages use Neon
- Static hardcoded page files still exist but `[slug]` route takes priority
- International pages (`/us/`, `/au/`, `/nz/`) also use IntelligentPageRenderer
- One unified template with locale-aware internal linking

**IntelligentPageRenderer Features:**
- Auto internal/external linking (75+ terms, locale-aware)
- Enhanced visual sections with icons & gradients
- Industry insights (real HBR/Forbes/LinkedIn data)
- Schema.org structured data (FAQPage, BreadcrumbList)
- Mobile responsive design
- Sidebar with quick nav, newsletter, related pages
- CostSavingsChart, SkillsBreakdownChart, KeyTakeawaysBox
- RelatedRolesSection with locale-aware links

### Adding Jobs to Database

1. Read `.claude/reference/job-schema.md` for schema
2. Read `.claude/reference/seo-templates.md` for description template
3. Read `.claude/reference/role-data.md` for rates
4. Use `mcp__neon__run_sql` to INSERT

### Creating Job Pages

For new role/engagement pages:
1. Copy existing template (e.g., `fractional-cfo-jobs-uk`)
2. Create SEO content file in `src/lib/seo-content/`
3. Add to `STATIC_ROUTE_SLUGS` in `[slug]/page.tsx`

## Database Tables

| Table | Purpose |
|-------|---------|
| `jobs` | All job listings (213+ entries) |
| `pages` | Database-driven page content |
| `user_profile_items` | User preferences |
| `articles` | Blog content |

## Key Components

| Component | Purpose |
|-----------|---------|
| `JobPageClient` | Full-featured job page with CopilotKit |
| `EmbeddedJobBoard` | Filterable job listings |
| `RoleCalculator` | Day rate calculator |
| `ServerJobGrid` | Server-rendered job grid |
| `HotJobsLines` | Featured jobs carousel |
| `TableOfContents` | Sticky TOC with accentColor prop |
| `Header` | Navigation with Work Types dropdown |
| `Footer` | Comprehensive footer with 8 link sections |

## Engagement Types

| Type | Description | is_fractional | is_interim |
|------|-------------|---------------|------------|
| Fractional | 1-3 days/week ongoing | true | false |
| Interim | Full-time 3-12 months | false | true |
| Part-Time | Fixed days per week | true | false |
| Advisory | Board/strategic advisor | true | false |
| Contract | Fixed-term 3-12 months (Neon pages) | false | true |
| Founding | Startup equity + cash (Neon pages) | true | false |

## Job Posts (Google Jobs)

Individual job posts at `/fractional-job/{slug}` - dynamic route querying `jobs` table.

**URL Pattern**: `https://fractional.quest/fractional-job/{slug}`

**Coverage (49 poster-card jobs)**:
| Engagement Type | Count | Example URL |
|-----------------|-------|-------------|
| Fractional | 14 | /fractional-job/fractional-cfo-uk |
| Interim | 12 | /fractional-job/interim-cfo-uk |
| Part-Time | 12 | /fractional-job/part-time-cfo-uk |
| Advisory | 11 | /fractional-job/advisory-cfo-uk |

**Roles**: CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CCO, CDO, CAIO, FD, GC, MD

**Features**: JobPosting schema, hero images, day rates, FAQs, authority links

**Key File**: `src/app/fractional-job/[slug]/page.tsx`

## Current Coverage (Jan 2026)

**Jobs UK Pages**: All 11 core roles x 4 engagement types = 44 jobs in DB

**Static Pages**: CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CCO for:
- Fractional Jobs UK
- Interim Jobs UK
- Part-Time Jobs UK
- Advisory Jobs UK
- Role definitions
- Salary guides
- Hire pages

**New Static Pages (Jan 2026)**:
- CAIO (Chief AI Officer) - `/fractional-chief-ai-officer-jobs-uk`
- FD (Finance Director) - `/fractional-finance-director-jobs-uk`
- GC (General Counsel) - `/fractional-general-counsel-jobs-uk`
- MD (Managing Director) - `/fractional-managing-director-jobs-uk`

**Neon Database Pages**:
- Contract jobs UK: 11 roles (contract-cfo-jobs-uk, etc.)
- Founding jobs UK: 6 roles (founding-cto-jobs-uk, etc.)

**Hub Pages (Neon)** - Topic clustering for discoverability:
- `/interim-jobs-uk` - Hub linking to all interim role pages
- `/part-time-jobs-uk` - Hub linking to all part-time role pages
- `/advisory-jobs-uk` - Hub linking to all advisory role pages

**SEO-Enriched Pages (Jan 2026)**:
- Cost guides: `fractional-cfo-cost`, `fractional-cmo-cost`, `fractional-coo-cost`
- Role guides: `interim-cmo`, `interim-cto`, `interim-ceo`, `interim-chro`
- Part-time guides: `part-time-cmo`, `part-time-coo`
- Specialist pages: `fractional-cmo-uk`, `fractional-fd`, `fractional-cfo-agency`
- Services: `virtual-cfo-services`, `fractional-operations-manager`, `fractional-cmo-b2b`

**Recruitment Pages (Jan 2026)** - 35+ pages with fractional/interim angle:
- C-Suite: `c-suite-recruitment`, `cfo-headhunter`, `cfo-recruitment`
- Executive Search: `executive-search-firms`, `interim-executive-search`
- Industry: `biotech-recruitment-agency`, `pharmaceutical-headhunter`, `fintech-recruitment-agency`
- Sector: `private-equity-recruitment-agency`, `ai-recruitment-agency`, `accounting-recruitment-agency`
- Function: `executive-marketing-recruitment`, `executive-sales-recruitment`, `technology-executive-recruitment`
- Manager-level: `interim-hr-director`, `interim-sales-director`, `interim-manager`, `interim-operations-manager`

**Internal Linking Structure**:
- Pillar pages (CFO/CMO/CTO/COO jobs) link to relevant recruitment pages via `relatedPages`
- Footer has dedicated "Recruitment" section with 10 key pages
- Header has "Work Types" dropdown for interim/part-time/advisory
- All recruitment pages link back to job pages

## Internationalization (i18n)

**Supported Markets**: UK (default), US, AU, NZ

**URL Structure**:
- UK: `/fractional-cfo-jobs-uk` (root, no prefix)
- US: `/us/fractional-cfo-jobs`
- AU: `/au/fractional-cfo-jobs`
- NZ: `/nz/fractional-cfo-jobs`

**For detailed i18n implementation**: See `.claude/reference/i18n-guide.md`

**Key Files**:
| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Locale definitions, location options |
| `src/i18n/currency.ts` | Exchange rates, market-specific day rates |
| `src/middleware.ts` | Auto-redirect based on browser locale |
| `src/components/LocaleSwitcher.tsx` | Header country selector |

**Adding International Pages**:
1. Create SEO content: `src/lib/seo-content/{role}-jobs-{locale}.ts`
2. Create page: `src/app/[locale]/fractional-{role}-jobs/page.tsx`
3. Pages automatically get hreflang, currency formatting, locale job filtering

## Research & Content Intelligence

### Tavily API Suite
**API Key**: `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`

**Available APIs** (use all for comprehensive enrichment):

| API | Purpose | When to Use |
|-----|---------|-------------|
| **Search** | Find competitors, get AI answer | Initial research, quick pricing validation |
| **Extract** | Pull full content from URLs | Deep competitor analysis, FAQ sourcing |
| **Research** | Comprehensive market analysis | Long-form content generation |
| **Crawl** | Map entire competitor sites | Site structure analysis |
| **Map** | Get site structure | Competitor navigation patterns |

**Check Usage**:
```bash
curl -s -H "Authorization: Bearer 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" https://api.tavily.com/usage
```

### Tavily API Commands

**Search API** (find competitors + AI answer):
```bash
cat > /tmp/tav.json << 'EOF'
{"api_key":"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","query":"fractional CFO cost UK 2025","search_depth":"advanced","include_answer":true,"max_results":8}
EOF
curl -s -X POST "https://api.tavily.com/search" -H "Content-Type: application/json" -d @/tmp/tav.json | jq '{answer, results: [.results[] | {title, url}]}'
```

**Extract API** (full competitor content):
```bash
cat > /tmp/tav_extract.json << 'EOF'
{"api_key":"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","urls":["https://competitor.com/page"],"extract_depth":"advanced"}
EOF
curl -s -X POST "https://api.tavily.com/extract" -H "Content-Type: application/json" -d @/tmp/tav_extract.json | jq '.results[] | {url, content: .raw_content[:3000]}'
```

**Research API** (comprehensive analysis):
```bash
cat > /tmp/tav_research.json << 'EOF'
{"api_key":"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","query":"What are fractional CFO costs in the UK? Include day rates, monthly retainers, and factors affecting pricing.","max_results":10,"include_answer":true}
EOF
curl -s -X POST "https://api.tavily.com/search" -H "Content-Type: application/json" -d @/tmp/tav_research.json
```

### Content Enrichment Tracking (Neon)

Track all enrichments in `content_enrichment` table:

```sql
-- Check enrichment status
SELECT page_slug, enrichment_depth, tavily_apis_used,
       quality_score_before, quality_score_after,
       needs_revisit, revisit_priority, enriched_at
FROM content_enrichment
WHERE enrichment_type = 'tavily_competitive'
ORDER BY needs_revisit DESC, revisit_priority;

-- Find pages needing work
SELECT page_slug FROM content_enrichment
WHERE needs_revisit = true
ORDER BY revisit_priority DESC;
```

**Enrichment Depth Levels**:
| Level | APIs Used | Quality Target | Time |
|-------|-----------|----------------|------|
| **Basic** | Search only | 6→7 | Quick |
| **Moderate** | Search + Extract | 6→7.5 | Medium |
| **Comprehensive** | Search + Extract + Research | 6→8.5 | Full |

**Quality Scoring (1-10)**:
- 5-6: Original content, no external validation
- 7: Validated pricing, competitor citations
- 8: Monthly retainers, savings comparisons, authority links
- 9: Primary sources, long-form content, comprehensive FAQs
- 10: Best-in-class, multiple primary sources, case studies

### Authoritative Sources (Primary)

Always cite primary sources where possible:

| Domain | Primary Sources |
|--------|-----------------|
| **Finance** | ICAEW, ACCA, CIMA, FCA, BVCA |
| **Marketing** | CIM, Marketing Week, IPA |
| **Technology** | BCS, Tech Nation, Gartner UK |
| **HR** | CIPD, SHRM, HR Magazine |
| **Operations** | CMI, IoD, APM |
| **Security** | (ISC)², ISACA, NCSC |
| **Legal** | Law Society, SRA, CILEX |

**Citation Format**:
```
"Source: ICAEW Practice Insights 2024" (primary)
"Source: HireCFO, EmergeOne Jan 2026" (competitor validation)
```

### Content Research Workflow

**Comprehensive Enrichment Process**:
1. **Search**: Find top 5-8 competitors for keyword
2. **Extract**: Pull full content from top 3 competitor URLs
3. **Analyze**: Identify pricing, FAQs, sections we're missing
4. **Research**: Generate comprehensive market summary if needed
5. **Enrich**: Add monthly retainers, savings %, authority links
6. **Cite**: Add primary sources AND competitor validation
7. **Track**: Log in `content_enrichment` with depth level and quality scores

**After Each Enrichment**:
```sql
INSERT INTO content_enrichment (
  page_slug, enrichment_type, tavily_apis_used, enrichment_depth,
  quality_score_before, quality_score_after, needs_revisit,
  revisit_priority, changes_made, notes
) VALUES (
  'page-slug', 'tavily_competitive',
  ARRAY['search', 'extract', 'research'], 'comprehensive',
  6, 8, false, NULL,
  'Added: monthly retainers, savings comparison, 3 authority links',
  'Primary sources: ICAEW, CIPD. Competitors: HireCFO, Porter Wills'
);
```

### GSC Data Location
- Queries: `/Users/dankeegan/Desktop/Queries.csv`
- Pages: `/Users/dankeegan/Desktop/Pages.csv`

## Content Quality Standards

### Required Elements for 8+ Score:
- [ ] Definition box (60-80 words for AI Overview)
- [ ] Day rate table with sector breakdown
- [ ] Monthly retainer pricing section
- [ ] Savings vs full-time comparison (with %)
- [ ] At least 2 primary source citations
- [ ] At least 2 competitor-validated data points
- [ ] 5+ FAQs including cost question
- [ ] Authority links section (professional bodies)

### Required Elements for 9+ Score:
- All of above, plus:
- [ ] Long-form content (2000+ words)
- [ ] 3-way comparison table (Fractional vs Interim vs Full-Time)
- [ ] Case study or data point reference
- [ ] PAA-style questions from Tavily research
- [ ] Internal links to related pages

## Session Progress (Feb 2026)

### Completed This Session

**Template Unification:**
- Migrated ALL pages to Neon + IntelligentPageRenderer
- Cleared `STATIC_ROUTE_SLUGS` - no more hardcoded page priority
- Updated international pages to use IntelligentPageRenderer (was using legacy PageWithCopilot)
- Added locale-aware internal linking (US/AU/NZ users stay in their market)

**IntelligentPageRenderer Enhancements:**
- Auto internal linking (55+ terms) with locale awareness
- Auto external linking (20+ authority sources: Gartner, CIPD, ICAEW, etc.)
- Enhanced section renderers with icons based on keywords
- Industry insights section (replaced fake testimonials with real HBR/Forbes data)
- Mobile responsive fixes (overflow-x-hidden, grid-cols-1)
- Sidebar improvements (quick nav, newsletter CTA, related pages)
- New components: CostSavingsChart, SkillsBreakdownChart, KeyTakeawaysBox
- stripMdxComponents() to remove raw MDX tags from rendered content

**Locale-Aware Linking System:**
- `detectLocaleFromSlug()` - detects us/au/nz from page slug
- `localizeUrl()` - converts UK URLs to locale paths
- `localizeTitle()` - removes UK references for other markets
- Updated: addAutoLinks, RelatedRolesSection, Sidebar links

### Known Issues / Next Steps

**Priority 1 - Header/Footer Locale Awareness:**
- Header and Footer components still have hardcoded UK links
- US/AU/NZ users clicking header nav go back to UK pages
- Need to pass locale to Header/Footer or make them locale-aware

**Priority 2 - International Content:**
- US/AU/NZ pages in Neon may have sparse content (empty sections)
- Consider enriching international page content in Neon
- Add locale-specific job data to jobs table

**Priority 3 - Content Enrichment:**
- Continue Tavily-based enrichment for remaining pages
- Track in `content_enrichment` table
- Target quality score 8+ for all lead pages

**Technical Debt:**
- Static hardcoded page files can be deleted (but keep as backup)
- Consider adding middleware.ts for proper i18n routing
- PageWithCopilot component is now unused - can be removed

## Restart Prompt

See `CONTENT_RESTART_PROMPT.md` for context when starting new sessions.
