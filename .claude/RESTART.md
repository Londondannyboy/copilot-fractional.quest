# Fractional Quest V2 - Restart Prompt

> **Purpose**: Copy this document when starting a new session to restore full project context.
> **Last Updated**: 2026-01-12

## Quick Context

**Project**: Fractional Quest V2 - UK's premier fractional executive job platform
**Location**: `/Users/dankeegan/fractional.quest`
**Status**: MDX-first architecture being implemented

## What V2 Must Achieve

1. **SEO Excellence**: Maintain/exceed V1 rankings for 347+ pages
2. **AI-First**: CopilotKit + Hume voice on every page
3. **MDX-Powered**: React components embedded in content
4. **Personalization**: User profiles, saved jobs, career planning

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind |
| Content | MDX + PageRenderer hybrid |
| AI Chat | CopilotKit (sidebar + in-content) |
| Voice | Hume EVI with CLM on Railway |
| Backend | Pydantic AI agent |
| Database | Neon PostgreSQL |
| Auth | Neon Auth + Stack Auth |

## Key Commands

```bash
npm run dev              # Start frontend + agent (port 3001 if 3000 busy)
npm run build            # Production build
npm run lint             # Type check
cd agent && uv run uvicorn src.agent:app --reload --port 8000  # Agent only
```

## Slash Commands (/.claude/commands/)

| Command | Purpose |
|---------|---------|
| `/prime` | Load project context at session start |
| `/plan {feature}` | Create structured plan before coding |
| `/execute {plan}` | Build feature from plan (fresh context) |
| `/create-prd` | Generate/update PRD |
| `/create-page {slug}` | Create new page with quality checks |
| `/evolve` | Improve rules/commands after bugs |

## Modular Rules (/.claude/reference/)

Load these only when working on specific areas:

| Reference | When to Load |
|-----------|--------------|
| `mdx-content.md` | Working on MDX pages or components |
| `copilotkit-integration.md` | CopilotKit features, hooks, agent tools |
| `database-pages.md` | Neon database pages, PageRenderer |
| `seo-content.md` | SEO, high-traffic pages, authority links |

## Current MDX Demo

Working demo at: `/fractional-jobs-london-mdx/page.tsx`

Shows:
- PersonalizedHero with user greeting
- SalaryBenchmarkChart with comparison
- CareerTimeline with milestones
- MarketOverview with animated stats
- CopilotMainPanel for in-content chat

## Key Files

### MDX Infrastructure
- `/src/lib/mdx-components.tsx` - Component registry
- `/src/components/MDXRenderer.tsx` - Runtime renderer
- `/src/components/mdx/*.tsx` - Personalized components
- `/next.config.ts` - MDX plugin enabled

### Content
- `/PRD.md` - Product requirements (north star)
- `/CLAUDE.md` - Full historical documentation
- `/src/lib/seo-content/*.ts` - SEO content files

### Pages
- Static pages: `/src/app/fractional-jobs-*/page.tsx`
- Database pages: `/src/app/[slug]/page.tsx`
- MDX demo: `/src/app/fractional-jobs-london-mdx/page.tsx`

### Agent
- `/agent/src/agent.py` - Pydantic AI agent with tools
- Railway URL: `copilotkit-agent-production.up.railway.app`

## Page Architecture Decision Tree

```
Is this a high-traffic page (>10 clicks/month)?
├── YES → Use JobPageClient with full components
│         - CopilotKit sidebar
│         - EmbeddedJobBoard
│         - HotJobs, EmailCapture, RoleCalculator
│         - Add to STATIC_ROUTE_SLUGS
│
└── NO → Use database page via PageRenderer
         - Add content to Neon `pages` table
         - Simpler sections, less interactive
```

## Context Reset Pattern

**IMPORTANT**: Between planning and execution, clear context:
1. Run `/plan {feature}` → outputs `/.claude/plans/{feature}.md`
2. Clear context (`/clear` or restart)
3. Run `/execute /.claude/plans/{feature}.md`
4. Plan contains ALL context needed - no additional priming

## Database Quick Reference

**Project ID**: (check with `mcp__neon__list_projects`)

**Key Tables**:
- `jobs` - 213 job listings
- `pages` - 243 database-driven pages
- `user_profile_items` - User preferences
- `neon_auth.users` - Auth users

**Run SQL**:
```
mcp__neon__run_sql with projectId and sql
```

## GSC Top Pages (Priority)

| URL | Clicks/mo | Status |
|-----|-----------|--------|
| /fractional-jobs-london | 115 | ✅ Static |
| /london | 40 | Needs redirect |
| /fractional-jobs-uk | 23 | ✅ Static |
| /fractional-cmo-jobs-uk | 17 | ✅ Static |
| /fractional-cto-jobs-uk | 16 | ✅ Static |
| /fractional-coo-jobs-uk | 12 | ✅ Static |
| /fractional-cfo-jobs-uk | 9 | ✅ Static |

## What Was Just Completed (Session Before This)

### Cole Medin Methodology Implementation
- ✅ Created PRD.md (north star document)
- ✅ Created modular rules in `/.claude/reference/`
- ✅ Created slash commands in `/.claude/commands/`
- ✅ Updated CLAUDE.md with modular architecture

### MDX Demo Working
- ✅ MDX infrastructure installed and configured
- ✅ 5 personalized components created
- ✅ Demo page at /fractional-jobs-london-mdx
- ✅ CopilotKit integration in main content area

## Immediate Next Steps

1. **Database migration**: Add `mdx_content` column to pages table
2. **Hybrid rendering**: Update `[slug]/page.tsx` for MDX pages
3. **Migrate high-traffic pages**: Convert to MDX format
4. **CopilotKit MDX generation**: Enable agent to return MDX

## Key Learnings (Don't Repeat These Mistakes)

1. **Don't use PageRenderer for high-traffic pages** - Use JobPageClient
2. **Don't compare text extraction** - Compare visual quality
3. **V2 must EXCEED V1** before switchover
4. **MDX reduces 56 section types** to ~10 core components
5. **Instructions prop** is the reliable way to pass user context to agent

## Files to Read First

1. `/PRD.md` - Full project requirements
2. `/.claude/reference/mdx-content.md` - MDX patterns
3. `/src/app/fractional-jobs-london-mdx/page.tsx` - Working demo

---

*To use this restart prompt: Copy everything above into a new Claude session, or run `/prime` command.*
