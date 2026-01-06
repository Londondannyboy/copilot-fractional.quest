# CopilotKit Demo - Comprehensive Restart Plan

**Created**: 2025-01-06
**Project**: `/Users/dankeegan/copilotkit-demo`
**Goal**: Fix Voice + CopilotKit + Charts integration on SEO job pages

---

## Current State

### What's Working
- Page loads at `/fractional-jobs-london` (no more hanging)
- Agent runs on port 8000, executes tools
- Build passes with no TypeScript errors
- Database connection works (5 London jobs found)

### What's Broken
1. **Voice Widget**: Resets/disconnects after speaking
2. **CopilotKit Charts/Cards**: Agent tools execute but UI doesn't render results
3. **Page Context**: Not confirmed if agent receives page context

---

## Architecture Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js 16)                                          │
│  ├── /fractional-jobs-london/page.tsx (Server Component)        │
│  │   └── Fetches jobs from Neon, passes to JobPageClient        │
│  │                                                               │
│  ├── JobPageClient.tsx (Client Component)                        │
│  │   ├── useCoAgent → syncs state with Pydantic AI              │
│  │   ├── CopilotSidebar → chat UI with instructions              │
│  │   ├── useRenderToolCall → renders charts/cards from tools    │
│  │   └── VoiceInput → Hume voice widget                          │
│  │                                                               │
│  └── /api/copilotkit/route.ts → proxies to agent:8000           │
├─────────────────────────────────────────────────────────────────┤
│  BACKEND (Pydantic AI + FastAPI)                                │
│  ├── agent/src/agent.py                                          │
│  │   ├── AppState (jobs, user, page_context, last_discussed_job)│
│  │   ├── Tools: search_jobs, show_jobs_chart, show_salary_*     │
│  │   └── System prompt: injects user name, Zep memory, page ctx │
│  │                                                               │
│  └── agent/src/main.py → uvicorn entry point                    │
├─────────────────────────────────────────────────────────────────┤
│  EXTERNAL SERVICES                                               │
│  ├── Neon PostgreSQL (DATABASE_URL) - test_jobs table           │
│  ├── Hume EVI (HUME_API_KEY, HUME_SECRET_KEY) - voice I/O       │
│  └── Zep (ZEP_API_KEY) - user memory/facts                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Files to Investigate

### 1. Voice Widget Issues
**File**: `/src/components/voice-input.tsx`
- Check: Is VoiceProvider remounting on state changes?
- Check: Is `status.value` correctly tracking connection state?
- Check: Does disconnect happen on component unmount?

**File**: `/src/components/job-pages/HeroSection.tsx`
- Check: Is VoiceInput receiving stable props?
- Check: Does onVoiceMessage callback cause re-renders?

### 2. Charts Not Rendering
**File**: `/src/app/page.tsx` (lines 150-270)
- Check: `useRenderToolCall` - are tool names matching agent tool names exactly?
- Check: Tool names in agent.py: `show_jobs_chart`, `show_location_chart`, `show_salary_insights`

**File**: `/src/components/job-pages/JobPageClient.tsx`
- Check: Does it have `useRenderToolCall` at all? (It might be missing!)

**File**: `/src/components/charts.tsx`
- Check: Are chart components exported correctly?

### 3. Page Context
**File**: `/src/components/job-pages/JobPageClient.tsx`
- Check: Is `page_context` in initialState being sent to agent?
- Check: useCoAgent name matches agent name in agent.py

**File**: `/agent/src/agent.py`
- Check: Does system prompt actually use `state.page_context`?
- Verify logs show page context when request comes in

---

## Restart Steps (In Order)

### Step 1: Verify Agent Tools
```bash
# Check agent logs show tool execution
tail -f /tmp/claude/-Users-dankeegan/tasks/b5ac8f7.output

# In another terminal, ask CopilotKit: "Show me a salary chart"
# Should see: 💰 Generating salary insights
```

### Step 2: Check Tool Name Matching
Compare tool names:
- **agent.py**: `show_jobs_chart`, `show_location_chart`, `show_salary_insights`, `show_market_dashboard`, `search_jobs`
- **page.tsx useRenderToolCall**: Must match EXACTLY

### Step 3: Add useRenderToolCall to JobPageClient
The London jobs page might be missing the tool renderers. Check if `/src/components/job-pages/JobPageClient.tsx` has:
```typescript
import { useRenderToolCall } from "@copilotkit/react-core";

// Inside component:
useRenderToolCall({
  name: "show_jobs_chart",
  render: ({ result }) => <JobsBarChart data={result.chartData} ... />
});
```

If missing, copy from `/src/app/page.tsx`.

### Step 4: Fix Voice Widget State
The VoiceInput component should NOT be inside components that re-render frequently. Options:
1. Lift VoiceProvider to a higher level (layout.tsx)
2. Memoize the VoiceInput component
3. Use stable callback refs

### Step 5: Verify Page Context Flow
Add logging to confirm page context reaches agent:
```python
# In agent.py add_user_context:
print(f"📍 Page context received: {state.page_context}", file=sys.stderr)
```

---

## Database Schema Reference

```sql
-- test_jobs table
CREATE TABLE test_jobs (
  id SERIAL PRIMARY KEY,
  title TEXT,
  company TEXT,
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  description TEXT,
  role_type TEXT
);

-- Sample query:
SELECT title, company, location FROM test_jobs WHERE location ILIKE '%London%';
```

---

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.neon.tech/neondb?sslmode=require

# Hume Voice
HUME_API_KEY=xxx
HUME_SECRET_KEY=xxx

# Zep Memory
ZEP_API_KEY=z_xxx

# Auth (Stack/Neon Auth)
NEXT_PUBLIC_STACK_PROJECT_ID=xxx
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=xxx
STACK_SECRET_SERVER_KEY=xxx

# AI Models
GOOGLE_API_KEY=xxx
```

---

## Commands

```bash
# Start frontend
cd /Users/dankeegan/copilotkit-demo
npm run dev

# Start agent (separate terminal)
cd /Users/dankeegan/copilotkit-demo/agent
uv run uvicorn src.main:app --reload --port 8000

# Check build
npm run build

# Kill stuck processes
lsof -ti :8000 | xargs kill -9
lsof -ti :3000 | xargs kill -9
```

---

## Priority Fix Order

1. **HIGH**: Add `useRenderToolCall` hooks to JobPageClient.tsx (charts won't render without this)
2. **HIGH**: Verify tool names match between frontend and agent
3. **MEDIUM**: Fix Voice widget state persistence
4. **LOW**: Enhance page context logging

---

## Reference: Working Implementation

The homepage `/src/app/page.tsx` has working chart rendering. Key sections:
- Lines 150-180: `useRenderToolCall` for `show_jobs_chart`
- Lines 180-210: `useRenderToolCall` for `show_salary_insights`
- Lines 210-240: `useRenderToolCall` for `show_market_dashboard`
- Lines 240-270: `useRenderToolCall` for `search_jobs`

Copy these patterns to `JobPageClient.tsx`.

---

## Testing Checklist

After fixes, verify:
- [ ] `/fractional-jobs-london` loads without hanging
- [ ] CopilotKit sidebar opens and shows greeting
- [ ] "Show me a salary chart" renders chart in sidebar
- [ ] "Find CTO jobs" renders job cards
- [ ] Voice button connects and speaks
- [ ] Voice stays connected between messages
- [ ] Agent logs show page context: `📍 Page context: jobs_london`
