# Fractional Quest V2 - Product Requirements Document

> **North Star Document** - This PRD is the single source of truth for the Fractional Quest V2 project.
> All feature development should reference this document.

## Mission

Build the UK's premier platform for fractional executive job seekers and hirers, combining:
- **SEO Excellence**: Maintain/exceed V1 rankings for 347+ pages
- **AI-First Experience**: CopilotKit + Hume voice integration on every page
- **MDX-Powered Content**: React components embedded in content for rich, personalized experiences
- **Personalization**: User profiles, saved jobs, career trajectory planning

## Target Users

### Primary: Fractional Executives
- Senior professionals (CFO, CTO, CMO, COO, CHRO, CISO, CPO, CEO)
- Seeking portfolio careers with multiple clients
- Want salary benchmarking, job matching, career guidance

### Secondary: Companies Hiring Fractionals
- Startups, scaleups, PE-backed companies
- Need flexible C-suite expertise without full-time commitment
- Want to understand pricing, find candidates, make hiring decisions

## Current State (Jan 2026)

### Metrics
- **Total Pages**: 347 (243 database + 104 static)
- **Database Pages**: 243 in Neon PostgreSQL
- **Static Pages**: 104 with JobPageClient components
- **Top Traffic**: /fractional-jobs-london (115 clicks), /london (40), /fractional-jobs-uk (23)

### Working Features
- CopilotKit sidebar on all pages
- Hume voice widget with CLM on Railway
- User authentication (Neon Auth + Stack Auth)
- User profile with preferences (location, role, skills, companies)
- EmbeddedJobBoard with filters
- RoleCalculator for earnings
- 3D ForceGraph for user interests
- MDX infrastructure (just completed)

### Architecture
```
Frontend (Next.js 15 + Vercel)
├── Static Pages (JobPageClient) → High-traffic, full components
├── Database Pages (PageRenderer) → Supporting content, 56 section types
└── MDX (compose_mdx_response) → Dynamic content composition by agent

Backend
├── Pydantic AI Agent (Railway) → CopilotKit + Hume CLM
├── Neon PostgreSQL → Pages, jobs, user profiles
└── Zep Memory → Conversation memory, fact extraction
```

### Rendering Technologies (Clarification)

| Technology | What It Does | Example |
|------------|--------------|---------|
| **CopilotKit Generative UI** | Agent tools return data → `useRenderToolCall` → React component | Charts, job cards in sidebar |
| **MDX (compose_mdx_response)** | Agent composes MDX string → runtime compile → rich content | Custom composed layouts |
| **PageRenderer** | JSONB sections from DB → switch/case → React components | Database page content |

**The charts and job cards you see in the CopilotKit sidebar are NOT MDX** - they're native CopilotKit Generative UI via `useRenderToolCall`. MDX adds flexibility for dynamic content composition but is not required for the core chart/card rendering.

### CSS/Tailwind Pattern

**CRITICAL:** Never set colors on base HTML elements (h1-h6, p, a) in `globals.css`. This blocks Tailwind class overrides. Only set: font-family, weight, spacing. Let Tailwind control colors per-context.

### Intelligent Document Pattern (NEW)

Inspired by the "Terminal Liberation" article - where content THINKS and responds to conversation.

**Architecture:**
```
IntelligentDocument (wrapper)
├── useCopilotReadable - Exposes document state to agent
├── useCopilotAction - update_document_filters, highlight_section, clear_highlights
└── DocumentContext - Shared state for child components

LiveComponents (children)
├── LiveMarketChart - Responds to state.filters
├── LiveJobGrid - Refetches based on filters
├── DocumentSection - Highlights when state.highlights includes its ID
└── ActiveFilters - Shows current filter tags
```

**Key Files:**
- `src/components/mdx/IntelligentDocument.tsx` - Context provider with CopilotKit actions
- `src/components/mdx/LiveComponents.tsx` - Conversation-reactive components
- `src/app/intelligent-cfo/page.tsx` - Demo page

**Gap Identified:** Frontend actions (via `useCopilotAction`) are passed to agent via AG-UI, but the Pydantic AI agent may prefer its own tools (like `search_jobs`) over page actions. To fix, agent must bind `state.copilotkit.actions` alongside its tools, or use strong system prompt guidance.

## In Scope - V2 MVP

### Phase 1: MDX Migration (Current)
- [x] Install MDX dependencies
- [x] Create component registry
- [x] Create MDXRenderer
- [x] Create personalized components (Hero, Timeline, Benchmark, etc.)
- [x] Create demo page (/fractional-jobs-london-mdx)
- [ ] Add mdx_content column to pages table
- [ ] Migrate high-traffic pages to MDX format
- [ ] Enable CopilotKit to generate MDX responses

### Phase 2: Content Quality
- [ ] Ensure all 9 core job pages exceed V1 quality
- [ ] All pages have CopilotKit + voice
- [ ] All pages have EmbeddedJobBoard where relevant
- [ ] Authority links and statistics on all pages

### Phase 3: Personalization
- [ ] Personalized job recommendations based on profile
- [ ] Salary benchmarking against market data
- [ ] Career trajectory planning
- [ ] Saved job collections
- [ ] Email alerts for matching jobs

### Phase 4: AI Features
- [ ] CopilotKit generates MDX with embedded components
- [ ] AI-powered job matching
- [ ] AI career advisor (voice + chat)
- [ ] Interview preparation assistant

## Out of Scope (V2)

- Mobile app (web responsive only)
- Payment processing
- Direct job applications (redirect to company sites)
- Employer dashboard (future V3)
- International markets (UK only)

## Architecture

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Content | MDX with next-mdx-remote, PageRenderer fallback |
| AI Chat | CopilotKit (sidebar + in-content) |
| Voice | Hume EVI with CLM endpoint |
| Backend | Pydantic AI agent on Railway |
| Database | Neon PostgreSQL (Serverless) |
| Memory | Zep Cloud (conversation memory) |
| Auth | Neon Auth + Stack Auth |
| Hosting | Vercel (frontend), Railway (agent) |

### Key Files
```
/src/app/                          # Next.js pages
├── [slug]/page.tsx                # Dynamic database pages
├── fractional-jobs-london/        # Static high-traffic pages
├── fractional-jobs-london-mdx/    # MDX demo page
└── api/                           # API routes

/src/components/
├── job-pages/JobPageClient.tsx    # Full-featured job page template
├── pages/PageRenderer.tsx         # Database content renderer (56 types)
├── mdx/                           # MDX + Intelligent Document components
│   ├── IntelligentDocument.tsx    # Context provider with CopilotKit actions
│   ├── LiveComponents.tsx         # Conversation-reactive components
│   ├── PersonalizedHero.tsx
│   ├── SalaryBenchmarkChart.tsx
│   ├── CareerTimeline.tsx
│   ├── MarketOverview.tsx
│   └── CopilotMainPanel.tsx
├── EmbeddedJobBoard.tsx           # Filterable job listings
├── JobsSidebar.tsx                # Sidebar with jobs, CTAs, market stats
├── RoleCalculator.tsx             # Earnings calculator
├── voice-input.tsx                # Hume voice widget
└── charts.tsx                     # Recharts visualizations

/src/lib/
├── mdx-components.tsx             # MDX component registry
├── pages.ts                       # Database page fetching
├── jobs.ts                        # Job search API
└── seo-content/                   # SEO content by page

/agent/src/agent.py                # Pydantic AI agent with tools

/.claude/
├── commands/                      # Slash commands for workflows
└── reference/                     # Modular rules by task type
```

### Database Schema
```sql
-- Core pages table
pages (
  id, slug, page_type, title, meta_description,
  hero_title, hero_subtitle, sections JSONB,
  faqs JSONB, mdx_content TEXT,  -- NEW
  content_format VARCHAR(10),     -- NEW: 'sections' | 'mdx'
  is_published, created_at, updated_at
)

-- Jobs table
jobs (
  id, title, company_name, location, salary_min, salary_max,
  role_category, work_type, description_snippet, url,
  is_uk, created_at
)

-- User profiles
user_profile_items (
  id, user_id, item_type, value, metadata JSONB,
  confirmed, created_at, updated_at
)
```

## Success Metrics

### SEO
- Maintain or improve rankings for top 10 pages
- Zero 404s for indexed URLs
- All pages pass Core Web Vitals

### User Engagement
- Voice widget usage > 10% of sessions
- CopilotKit interactions per session > 2
- Profile completion rate > 30%

### Technical
- Build time < 5 minutes
- Page load < 2 seconds
- Zero critical TypeScript errors

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| SEO ranking drop during migration | High | Keep V1 live, gradual migration, monitor GSC |
| MDX complexity overwhelms PageRenderer | Medium | Hybrid approach, gradual adoption |
| CopilotKit rate limits | Medium | Caching, fallback responses |
| Hume voice latency | Low | CLM optimization, loading states |

## Timeline (Flexible - No Dates)

1. **MDX Foundation** - Complete infrastructure, demo page ✓
2. **High-Traffic Migration** - Convert top 9 job pages to MDX-enhanced
3. **Personalization** - Profile-based recommendations, benchmarking
4. **AI Generation** - CopilotKit returns MDX with components
5. **Polish** - Performance, edge cases, monitoring

## Appendix

### Page Types
- `jobs_uk` - Role-specific UK job listings (42 pages)
- `specialist` - Niche expertise pages (35 pages)
- `guide` - How-to and educational content (26 pages)
- `industry` - Sector-specific pages (19 pages)
- `comparison` - vs pages (12 pages)
- `definition` - What is X pages (12 pages)
- `location` - City-specific pages (23 pages)
- `pricing` - Cost/rate pages (8 pages)
- `career_guide` - How to become pages (8 pages)

### Commands Available
See `/.claude/commands/` for full list:
- `/prime` - Load project context
- `/plan` - Create structured plan for feature
- `/execute` - Build feature from plan
- `/create-prd` - Generate/update this PRD
- `/evolve` - System improvement after bugs

---

*Last Updated: 2026-01-12*
*Maintained by: Claude Code + Dan Keegan*
