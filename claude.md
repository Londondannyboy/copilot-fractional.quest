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

## Engagement Types

| Type | Description | is_fractional | is_interim |
|------|-------------|---------------|------------|
| Fractional | 1-3 days/week ongoing | true | false |
| Interim | Full-time 3-12 months | false | true |
| Part-Time | Fixed days per week | true | false |
| Advisory | Board/strategic advisor | true | false |

## Current Coverage (Jan 2026)

**Jobs UK Pages**: All 11 roles x 4 engagement types = 44 jobs in DB

**Static Pages**: CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO, CIO, CRO, CCO for:
- Fractional Jobs UK
- Interim Jobs UK
- Part-Time Jobs UK
- Advisory Jobs UK
- Role definitions
- Salary guides
- Hire pages

## Restart Prompt

See `CONTENT_RESTART_PROMPT.md` for context when starting new sessions.
