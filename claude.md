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

### Page Architecture

**High-traffic pages** use static components (NOT database/PageRenderer):
```
src/app/fractional-cfo-jobs-uk/page.tsx → JobPageClient
```

**Lower-traffic pages** can use database + PageRenderer:
```
src/app/[slug]/page.tsx → Neon pages table → PageRenderer
```

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

### Tavily API Access
**API Key**: `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`

Use Tavily for:
- Keyword research and competitive analysis
- AI Overview responses (what Google shows)
- People Also Ask patterns
- Competitor content analysis
- Pricing/market data validation

**Usage via curl**:
```bash
curl -s -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "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",
    "query": "fractional CMO UK cost",
    "search_depth": "advanced",
    "include_answer": true,
    "max_results": 5
  }'
```

**Key fields in response**:
- `answer`: AI-generated summary (like Google AI Overview)
- `results[].content`: Page content snippets
- `results[].url`: Competitor URLs
- `results[].score`: Relevance score

### GSC Data Location
- Queries: `/Users/dankeegan/Desktop/Queries.csv`
- Pages: `/Users/dankeegan/Desktop/Pages.csv`

### Content Research Workflow
1. Read GSC data to identify high-impression, low-click keywords
2. Use Tavily to research competitor content and AI responses
3. Identify content gaps and FAQ opportunities
4. Enrich pages with competitive intelligence

## Content Creation Phase (Planned)

See `.claude/reference/content-plan.md` for the full content creation roadmap.

**Priority Areas**:
- Comparison content (Fractional vs Interim vs Full-Time)
- FAQ enrichment with PAA-style questions
- Definition boxes for AI Overview optimization
- Pricing tables with competitive data

## Restart Prompt

See `CONTENT_RESTART_PROMPT.md` for context when starting new sessions.
