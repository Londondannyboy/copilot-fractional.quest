# MDX Integration Restart Prompt

> **Copy this entire file when starting a new session focused on MDX implementation**

## Project Context

**Project**: Fractional Quest V2 (`/Users/dankeegan/copilotkit-demo`)
**Goal**: Implement MDX-first content architecture where pages are written in MDX with embedded React components and CopilotKit integration.

## What Already Exists

### Infrastructure (Ready to Use)
- `next.config.ts` - MDX enabled via `@next/mdx`
- `src/lib/mdx-components.tsx` - Component registry with 10+ components
- `src/components/mdx/` - 5 personalized MDX components:
  - `PersonalizedHero.tsx` - User-aware hero section
  - `SalaryBenchmarkChart.tsx` - Role-based salary data
  - `CareerTimeline.tsx` - Career progression viz
  - `MarketOverview.tsx` - Market stats
  - `CopilotMainPanel.tsx` - Embedded chat panel

### Components Available in MDX
```tsx
// From mdx-components.tsx registry:
RoleCalculator, EmbeddedJobBoard, HotJobs,
JobsBarChart, SalaryAreaChart, MarketDashboard, ForceGraph3D,
PersonalizedHero, SalaryBenchmarkChart, CareerTimeline, MarketOverview, CopilotMainPanel
```

## What Needs to Be Built

### Phase 1: First MDX Page (Proof of Concept)
Create `/src/app/mdx-demo/page.mdx`:
- Uses PersonalizedHero with user context
- Embeds RoleCalculator
- Shows SalaryBenchmarkChart
- Has CopilotMainPanel for in-page chat

### Phase 2: Convert High-Traffic Page
Convert `/fractional-cto-jobs-uk` from TSX to MDX:
- Maintain SEO structure
- Add interactive components inline
- Keep CopilotKit sidebar

### Phase 3: Content Authoring Pattern
Establish the pattern for content editors:
- MDX templates for each page type (jobs, salary, hire)
- Frontmatter schema
- Component usage guidelines

## Key Architecture Decision

**MDX + CopilotKit Integration Pattern:**
```mdx
---
title: "Fractional CTO Jobs UK"
role: "CTO"
---

import { PersonalizedHero, EmbeddedJobBoard, CopilotMainPanel } from '@/lib/mdx-components'

<PersonalizedHero role="CTO" />

## Current Opportunities

<EmbeddedJobBoard defaultDepartment="Engineering" />

## Have Questions?

<CopilotMainPanel />
```

## Files to Read First

1. `/.claude/MASTER_TEMPLATE.md` - Full architecture reference
2. `/PRD.md` - Product requirements
3. `/src/lib/mdx-components.tsx` - Available components
4. `/src/components/mdx/PersonalizedHero.tsx` - Example MDX component

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Test build passes
```

## Success Criteria

- [ ] `/mdx-demo` page renders with all components
- [ ] Components receive user context from CopilotKit
- [ ] Page is SEO-friendly (metadata works)
- [ ] Build passes with no errors
- [ ] Pattern is documented for replication

## Methodology

Follow Cole Medin's approach:
1. Read this restart prompt
2. Run `/plan mdx-implementation` to create detailed plan
3. Clear context
4. Run `/execute` to build from plan
5. Run `/evolve` if bugs found

---

**Start by reading**: `/Users/dankeegan/copilotkit-demo/PRD.md` and `/Users/dankeegan/copilotkit-demo/.claude/MASTER_TEMPLATE.md`
