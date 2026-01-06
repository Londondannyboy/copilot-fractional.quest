# How We Built This: CopilotKit + Pydantic AI Integration Guide

## The Correct Build Order (Lessons Learned)

**Key Insight: Build CopilotKit + Pydantic AI FIRST. Add Hume voice LAST.**

### Phase 1: CopilotKit + Pydantic AI (DO THIS FIRST)

```
Step 1: Scaffold with CopilotKit CLI
────────────────────────────────────
$ npx copilotkit@latest create -f pydantic-ai

This creates:
├── frontend/          # Next.js with CopilotKit
│   └── src/app/
│       └── page.tsx   # Has <CopilotKit>, <CopilotSidebar>
└── agent/             # Pydantic AI agent
    └── src/
        └── agent.py   # Basic agent template
```

```
Step 2: Run both services locally
─────────────────────────────────
Terminal 1: cd frontend && npm run dev     # Port 3000
Terminal 2: cd agent && uv run uvicorn src.agent:app --port 8000
```

```
Step 3: Verify chat works
─────────────────────────
- Open localhost:3000
- Chat should work via CopilotKit sidebar
- Agent responds via AG-UI protocol
```

```
Step 4: Add your tools to agent.py
──────────────────────────────────
@agent.tool
def search_jobs(ctx, query: str) -> dict:
    # Your business logic
    return {"jobs": [...]}
```

```
Step 5: Add useRenderToolCall for Generative UI
───────────────────────────────────────────────
// In frontend
useRenderToolCall({
  name: "search_jobs",
  render: ({ result }) => <JobCards jobs={result.jobs} />
})
```

```
Step 6: Add shared state with useCoAgent
────────────────────────────────────────
const { state, setState } = useCoAgent<AppState>({
  name: "agent",
  initialState: { jobs: [], user: null }
})
```

**✅ CHECKPOINT: Chat works, tools work, Generative UI works. NOW you can add voice.**

### Phase 2: Add Hume Voice (DO THIS SECOND)

```
Step 7: Create Hume account and config
──────────────────────────────────────
- Go to platform.hume.ai
- Create EVI config
- Get Config ID and API keys
```

```
Step 8: Add Hume token endpoint
───────────────────────────────
// app/api/hume-token/route.ts
// Returns access token for Hume WebSocket
```

```
Step 9: Add voice widget to frontend
────────────────────────────────────
// Uses @humeai/voice-react
<VoiceProvider configId={...}>
  <VoiceWidget />
</VoiceProvider>
```

```
Step 10: Create CLM endpoint for Hume
─────────────────────────────────────
// Hume needs OpenAI-compatible /chat/completions
// Add this to your agent.py (see CLM Consolidation Pattern below)
// OR deploy separate CLM service (not recommended)
```

```
Step 11: Configure Hume to use your CLM
───────────────────────────────────────
- In Hume dashboard, set CLM URL to your deployed agent
- Enable "CLM-only mode" (disable Hume's built-in LLM)
```

### Why This Order Matters

| Order | Result |
|-------|--------|
| ✅ CopilotKit first, Hume second | Chat works, then voice works, same brain |
| ❌ Hume first, CopilotKit second | Voice works but disconnected, debugging nightmare |

**The mistake we made:** We had Hume configured pointing to `simple-clm` before the Pydantic AI agent was deployed. Result: Voice used a dumb fallback while Chat used the smart agent. Different brains = confusion.

---

## References Used

### Primary Documentation
| Source | URL | Used For |
|--------|-----|----------|
| **CopilotKit Docs** | https://docs.copilotkit.ai | React components, AG-UI protocol |
| **CopilotKit MCP** | Via Claude Code MCP | Code examples, best practices |
| **Pydantic AI Docs** | https://ai.pydantic.dev | Agent definition, `to_ag_ui()` |
| **Pydantic AI + Vercel** | https://ai.pydantic.dev/ui/vercel-ai/ | VercelAIAdapter (didn't use, but researched) |

### Code References
| Source | URL | Used For |
|--------|-----|----------|
| **CopilotKit GitHub** | https://github.com/CopilotKit/CopilotKit | Example agents, patterns |
| **CopilotKit Examples** | /examples/coagents-starter | FastAPI integration pattern |

### Key Patterns We Used

**1. Pydantic AI Agent Export (from Pydantic AI docs):**
```python
app = agent.to_ag_ui(deps=StateDeps(AppState()))
```

**2. CopilotKit Frontend (from CopilotKit docs):**
```tsx
<CopilotKit runtimeUrl="http://localhost:8000">
  <CopilotSidebar>
    <YourApp />
  </CopilotSidebar>
</CopilotKit>
```

**3. Shared State (from CopilotKit docs):**
```tsx
const { state, setState } = useCoAgent<AppState>({ name: "agent" })
```

**4. Generative UI (from CopilotKit docs):**
```tsx
useRenderToolCall({ name: "tool_name", render: ({ result }) => <Component /> })
```

---

## What NOT to Do

| Mistake | Why It's Bad | What To Do Instead |
|---------|--------------|---------------------|
| Deploy Hume CLM before agent | Voice has no brain to call | Deploy agent first |
| Separate CLM service | Extra complexity, latency | Add CLM endpoint to agent |
| Skip `useRenderToolCall` | Tools return data but UI doesn't show it | Always add renderers |
| Use CopilotRuntime with custom agent | Redundant, conflicts | Use `to_ag_ui()` directly |

---

# Three.js Voice Visualization Learnings

Summary of implementing audio-reactive 3D visuals for a Hume AI voice widget in fractional.quest.

## What We Built

1. **AudioReactiveOrb** - A perfectly round 3D sphere with internal flowing color ripples
2. **EntityGraph3D** - 3D knowledge graph visualization for extracted entities
3. **VoiceWaveform** - Particle-based waveform tunnel effect
4. **VoiceVisualizer** - Unified component that switches between modes

## Key Dependencies

```bash
npm install three @react-three/fiber @react-three/drei @types/three
```

## Architecture

```
HumeWidget3D.tsx          # Fetches Hume token, provides VoiceProvider, extracts FFT
  └── VoiceVisualizer.tsx # Mode switcher (orb/waveform/graph/combined)
       └── AudioReactiveOrb.tsx  # Custom GLSL shader orb
       └── VoiceWaveform.tsx     # Particle tunnel
       └── EntityGraph3D.tsx     # 3D graph
```

## Critical Learnings

### 1. WebGL Availability
Most users don't have WebGL enabled by default. Always provide CSS fallbacks:

```tsx
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch (e) {
    return false
  }
}
```

### 2. SSR Issues with Three.js
Use dynamic imports to avoid SSR problems:

```tsx
const VoiceVisualizer = dynamic(
  () => import('./three/VoiceVisualizer').then(mod => mod.VoiceVisualizer),
  { ssr: false, loading: () => <LoadingPlaceholder /> }
)
```

### 3. Hume FFT Data
The `@humeai/voice-react` hook provides `fft` and `micFft` properties:

```tsx
const { fft, micFft, isPlaying } = useVoice()

// Use assistant FFT when AI is speaking, mic FFT when user speaks
const currentFft = isPlaying ? fft : micFft
```

**WARNING**: Not all Hume configs provide FFT data. You may get empty arrays.

### 4. Converting FFT to Amplitude (0-1)

```tsx
function calculateAmplitude(fftValues: number[] | undefined): number {
  if (!fftValues || fftValues.length === 0) return 0
  let sum = 0
  for (let i = 0; i < fftValues.length; i++) {
    sum += Math.abs(fftValues[i])
  }
  const avg = sum / fftValues.length
  return Math.min(avg / 50, 1)  // Normalize to 0-1
}
```

### 5. Amplitude Smoothing
Raw amplitude is jittery. Always smooth it:

```tsx
// In useFrame or useEffect
smoothedAmplitude.current = smoothedAmplitude.current * 0.85 + rawAmplitude * 0.15
```

### 6. Custom GLSL Shaders for Organic Effects
For Harmony-like flowing colors, use Simplex noise in fragment shader:

```glsl
// Multiple noise layers for flowing color ribbons
float noise1 = snoise(vPosition * 1.2 + vec3(time, time * 0.7, 0.0)) * 0.5 + 0.5;
float noise2 = snoise(vPosition * 1.8 - vec3(time * 0.8, 0.0, time * 0.6)) * 0.5 + 0.5;

// Audio-reactive ripples
float audioRipple = snoise(vPosition * 3.0 + time * rippleSpeed) * amplitude;

// Blend colors
vec3 color = mix(color1, color2, smoothstep(0.2, 0.6, noise1 + audioRipple));
```

### 7. BufferAttribute TypeScript Fix
Don't use individual props, use `args`:

```tsx
// WRONG - causes TypeScript errors
<bufferAttribute attach="attributes-position" count={100} array={positions} itemSize={3} />

// CORRECT
<bufferAttribute attach="attributes-position" args={[positions, 3]} />
```

### 8. useRef TypeScript Fix

```tsx
// WRONG
const ref = useRef<number>()

// CORRECT
const ref = useRef<number | null>(null)
```

## Failures & Debugging

1. **Orb not reacting to audio**: Added console logging to trace FFT data flow:
   ```tsx
   console.log(`[Hume FFT] isPlaying: ${isPlaying}, amplitude: ${amplitude}`)
   ```

2. **Effects too subtle**: Had to increase amplitude multipliers significantly (from 0.1 to 0.25 for scale, etc.)

3. **Harsh geometric look**: Replaced rings with soft glow halos, changed colors from purple to peach/coral palette

4. **Shape distortion unwanted**: User preferred perfectly round orb with internal ripples only - removed vertex displacement from shader

## File Locations (fractional.quest)

- `components/three/AudioReactiveOrb.tsx` - Main orb with GLSL shader
- `components/three/VoiceVisualizer.tsx` - Mode switcher
- `components/three/EntityGraph3D.tsx` - 3D graph
- `components/three/VoiceWaveform.tsx` - Particle waveform
- `components/HumeWidget3D.tsx` - Hume integration wrapper
- `app/voice/page.tsx` - Demo page

## Quick Start for CopilotKit

To add similar visualization:

1. Install deps: `npm install three @react-three/fiber @react-three/drei`
2. Copy the `components/three/` folder from fractional.quest
3. Create a wrapper component that passes amplitude from your audio source
4. Use dynamic import with `ssr: false`
5. Add WebGL fallback for users without GPU acceleration

---

# CopilotKit Demo - Session Learnings (Jan 2025)

## Project Architecture

```
Frontend (Next.js 15)          Backend (FastAPI/Pydantic AI)
├── src/app/page.tsx           ├── agent/src/agent.py
├── src/components/            │   ├── Tools (search_jobs, show_charts, etc.)
│   ├── voice-input.tsx        │   └── State management
│   ├── charts.tsx             └── Neon PostgreSQL
│   ├── ForceGraph3D.tsx
│   └── a2ui-renderer.tsx
└── src/app/api/
    ├── hume-token/            Hume EVI access tokens
    ├── zep-context/           Fetch user memory facts
    ├── zep-store/             Store conversation messages
    └── saved-jobs/            User's saved jobs
```

## Key Integrations

### 1. Hume EVI (Voice)
- **Config ID**: `acb5575c-e22f-44c0-a9c8-b03305d1ea92`
- **Session ID Format**: `{firstName}|fractional_{userId}` for stable sessions
- **Anti-re-greeting**: Track `greetedThisSession` and `lastInteractionTime` to prevent Hume from re-greeting on reconnect

```typescript
// voice-input.tsx pattern
const isQuickReconnect = timeSinceLastInteraction < 5 * 60 * 1000;
if (wasGreeted || isQuickReconnect) {
  // Don't trigger greeting, say "Welcome back!" instead
}
```

### 2. Zep Memory
- **API Key**: Set `ZEP_API_KEY` in `.env`
- **User ID**: Use Neon Auth user ID (e.g., `5e421f23-16a6-42de-a4a4-fa412414f1d8`)
- **Facts are auto-extracted** from conversations (e.g., "CTO roles are sought in London")

**Store messages:**
```typescript
// POST /api/zep-store
{ userId, role: "user"|"assistant", content }
```

**Fetch context:**
```typescript
// GET /api/zep-context?userId=xxx
// Returns: { context: "## What I remember...", facts: [...] }
```

### 3. CopilotKit + AG-UI
- **useRenderToolCall**: Render rich UI for tool results (charts, job cards, graphs)
- **useHumanInTheLoop**: Confirm/reject actions (save job, apply to job)
- **useAgentState**: Sync state between frontend and Pydantic AI agent

### 4. Pydantic AI Agent Tools

| Tool | Purpose | Returns |
|------|---------|---------|
| `search_jobs` | Search job listings | `{ jobs: [...], title, query }` |
| `show_jobs_bar_chart` | Role distribution chart | `{ data: [...], title }` |
| `show_salary_area_chart` | Salary trends | `{ data: [...], title }` |
| `show_market_dashboard` | Full dashboard | `{ stats: {...}, charts: {...} }` |
| `show_user_graph` | 3D force graph of interests | `{ nodes: [...], edges: [...] }` |
| `get_featured_articles` | Related articles | `{ articles: [...] }` |

### 5. 3D Force Graph (react-force-graph-3d)
- **Library**: `react-force-graph-3d` + `three` + `three-spritetext`
- **Node types**: user (center), role, location, skill, interest, fact
- **Colors**: User=gold, Role=blue, Location=green, Skill=purple, Interest=pink
- **File**: `src/components/ForceGraph3D.tsx`

## Common Issues & Solutions

### Issue: Hume re-greets user on every message
**Cause**: Session ID was `Date.now()` based, creating new sessions
**Fix**: Use stable session ID based on userId: `fractional_${userId}`

### Issue: Zep facts not showing in profile
**Cause**: `ZEP_API_KEY` missing from `.env`
**Fix**: Add `ZEP_API_KEY=z_...` to `.env` and restart server

### Issue: Job links return 404
**Cause**: URLs pointed to non-existent `/job/{slug}` pages
**Fix**: Link to existing pages like `fractional.quest/fractional-cto-jobs-uk`

### Issue: Voice messages not stored to Zep
**Cause**: No integration between voice and Zep storage
**Fix**: Call `/api/zep-store` in `handleVoiceMessage` callback (page.tsx)

### Issue: ForceGraph3D SSR error
**Cause**: Three.js doesn't work server-side
**Fix**: Use `dynamic(() => import(...), { ssr: false })`

### Issue: Hume loses context mid-conversation
**Cause**: Hume EVI doesn't persist conversation state between messages
**Fix**: Include Zep context in system prompt on each connect, use stable session IDs

## Environment Variables

```env
# Required
DATABASE_URL=postgresql://...@neon.tech/neondb
HUME_API_KEY=...
HUME_SECRET_KEY=...
ZEP_API_KEY=z_...

# Auth (Neon Auth / Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID=...
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=...
STACK_SECRET_SERVER_KEY=...

# Optional
GOOGLE_API_KEY=...
OPENAI_API_KEY=...
```

## Development Commands

```bash
# Start frontend (Next.js)
npm run dev:ui

# Start backend (Pydantic AI agent)
cd agent && uv run uvicorn src.agent:app --reload --port 8000

# Both together
npm run dev
```

## File Locations

| Feature | Frontend | Backend |
|---------|----------|---------|
| Voice input | `src/components/voice-input.tsx` | - |
| Charts | `src/components/charts.tsx` | `agent/src/agent.py` |
| 3D Graph | `src/components/ForceGraph3D.tsx` | `agent/src/agent.py` |
| Zep integration | `src/app/api/zep-*/route.ts` | `agent/src/agent.py` |
| Job search | `src/app/page.tsx` (renderer) | `agent/src/agent.py` (tool) |
| Profile/Memory | `src/app/profile/page.tsx` | - |

## Testing Checklist

- [ ] Voice connects and greets user by name
- [ ] Reconnecting says "Welcome back!" not re-greeting
- [ ] "Show me CTO jobs" renders job cards with working links
- [ ] "Show my interest graph" renders 3D force graph
- [ ] Profile page shows Zep memory facts
- [ ] Correct/Wrong buttons appear on hover for facts (HITL)

## Related Projects

- `fractional.quest` - Main job board (has ForceGraph3DRepo, reference implementations)
- `lost.london-clm` - Reference for Zep + Hume integration patterns
- `lost.london-app` - Reference for profile/memory dashboard UI

---

# Session Learnings: 2025-01-06

## Voice + CopilotKit + Pydantic AI Sync

### Problem
Hume Voice Widget and CopilotKit/Pydantic AI were out of sync:
- Voice would speak but CopilotKit didn't have the transcript
- When user said "I'm interested in that CTO job", agent didn't know which job
- Human-in-the-loop couldn't work because agent lacked context

### Key Architecture Insight
> "Hume is just an enabler, surely"

Correct! The architecture is:
- **Hume**: Speech-to-text, text-to-speech (I/O layer)
- **CopilotKit**: Message transport, UI rendering
- **Pydantic AI**: THE BRAIN - has DB access, state, tools, Zep memory

### Fixes Applied
1. **Added `last_discussed_job` to AppState** (`agent.py`)
   - Tracks the current job in conversation context
   - Includes full details for "print it" / "apply" actions

2. **Updated `search_jobs` to track context**
   - First job from results becomes `last_discussed_job`
   - Agent knows: "When user says 'that job', they mean THIS job"

---

## SEO Job Pages with Voice + CopilotKit

### Goal
Create job pages that supersede fractional.quest by combining:
- SEO-ranked content (preserved for rankings)
- Hume Voice Agent (contextually aware of page)
- CopilotKit Sidebar (page-aware, showing relevant tools)
- Clean, maintainable code (< 200 lines per file)

### Key Principle
**DO NOT port fractional.quest code.** Rebuild fresh with:
- Global design tokens (single source of truth)
- Templated components
- SEO content in JSON (not inline JSX)

### Components Created
| Location | Files |
|----------|-------|
| `/src/components/ui/` | Section, SectionHeading, StatsBar, JobCard |
| `/src/components/job-pages/` | HeroSection, InitialCharts, JobGrid, SEOContent, FAQSection, JobPageClient |
| `/src/lib/` | jobs.ts, seo-content/london.ts |
| `/src/app/fractional-jobs-london/` | page.tsx |

### Page Context Architecture
```
User lands on /fractional-jobs-london
  ↓
Page sets context in useCoAgent:
  { page_context: { page_type: "jobs_london", location_filter: "London" } }
  ↓
Agent system prompt injects:
  "User is on LONDON JOBS page. When user says 'jobs here', mean London"
```

---

## Build Fixes (Evening Session)

### 1. TypeScript setState Error
**Error**: `prev` could be undefined in setState callback
```typescript
// WRONG
setState(prev => ({ ...prev, user: {...} }));

// CORRECT
setState(prev => ({
  jobs: prev?.jobs ?? [],
  search_query: prev?.search_query ?? "",
  user: {...}
}));
```

### 2. Render Function Returning Null
**Error**: CopilotKit render functions can't return `null`
```typescript
// WRONG
return null;

// CORRECT
return <></>;
```

### 3. Infinite Render Loop
**Cause**: Array dependencies in useEffect get new references each render
```typescript
// WRONG - infinite loop
useEffect(() => {...}, [stats.topRoles, initialJobs]);

// CORRECT
useEffect(() => {...}, [user?.id]);
```

---

## Known Issues (To Fix Next Session)

### 1. Voice Widget Resets
- Voice connects, speaks, then button resets
- Suspected: VoiceProvider remounting on state changes

### 2. CopilotKit Charts Not Rendering
- Agent tools execute (logs show data)
- UI doesn't render results
- Suspected: `useRenderToolCall` missing in JobPageClient.tsx

### Priority Fix
JobPageClient.tsx is likely missing `useRenderToolCall` hooks. Copy from page.tsx.

---

# Session Learnings: 2025-01-06 (Evening) - Production Architecture

## The Three-Service Architecture (Option A)

After debugging why Voice and CopilotKit were out of sync, we established the correct production architecture:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────────┐         ┌──────────────┐         ┌────────────┐ │
│   │   VERCEL     │         │   VERCEL     │         │  RAILWAY   │ │
│   │  (Next.js)   │         │  (Python)    │         │  (Python)  │ │
│   │              │         │              │         │            │ │
│   │ copilotkit-  │ ──────► │  simple-clm  │ ──────► │  Pydantic  │ │
│   │ demo.vercel  │         │ .vercel.app  │         │  AI Agent  │ │
│   │              │         │              │         │            │ │
│   │ • Frontend   │         │ • CLM for    │         │ • THE BRAIN│ │
│   │ • CopilotKit │         │   Hume Voice │         │ • Tools    │ │
│   │ • Auth       │         │ • SSE stream │         │ • Zep      │ │
│   │              │         │ • DB fallback│         │ • Neon DB  │ │
│   └──────────────┘         └──────────────┘         └────────────┘ │
│          │                        ▲                       ▲        │
│          │                        │                       │        │
│          │    ┌───────────────────┼───────────────────────┤        │
│          │    │                   │                       │        │
│          ▼    │                   │                       │        │
│   ┌──────────────┐         ┌──────────────┐               │        │
│   │   HUME AI    │ ──────► │ CLM Endpoint │ ──────────────┘        │
│   │   (Voice)    │         │ /chat/       │                        │
│   │              │         │ completions  │                        │
│   └──────────────┘         └──────────────┘                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Three Services?

| Service | Purpose | Why Separate? |
|---------|---------|---------------|
| **copilotkit-demo** (Vercel) | Next.js frontend, auth, API routes | Fast edge deployment, static assets |
| **simple-clm** (Vercel Python) | OpenAI-compatible SSE endpoint for Hume | Hume requires specific CLM format |
| **Pydantic AI Agent** (Railway) | Tools, database, Zep memory, business logic | Long-running Python process, needs Railway |

### The Problem We Solved

**Before**: Hume and CopilotKit were two separate brains
- Hume used its own LLM (would say "I don't have access to personal info")
- CopilotKit used Pydantic AI agent (had all the tools)
- User got different responses depending on voice vs chat

**After**: Single brain (Pydantic AI), two interfaces
- Hume → CLM → Pydantic AI Agent
- CopilotKit → AG-UI → Pydantic AI Agent
- Same tools, same memory, same responses

---

## Onboarding Flow (Added This Session)

### Problem
New users would ask for jobs immediately but agent didn't know their preferences. Result: generic responses.

### Solution
Added proactive onboarding to `agent.py`:

1. **Profile Completeness Check** (`get_user_memory_context`)
   - Returns `(context, is_complete, missing_fields)`
   - Checks Zep facts for: location, role_preference, experience

2. **Dynamic System Prompt Injection**
   - If profile incomplete, injects onboarding instructions
   - Agent asks: "Which city are you based in?" → "What role interests you?" → "Tell me about your experience"

3. **Preference Saving Tool** (`save_user_preference`)
   - When user says "I'm in London", agent calls `save_user_preference("location", "London")`
   - Stored to Zep, auto-extracted as fact

### Code Pattern
```python
# In agent.py system prompt
if not profile_complete and missing_fields:
    prompt_parts.append(f"""
## ONBOARDING MODE - Profile Incomplete!
This user's profile is missing: {', '.join(missing_fields)}

CRITICAL: Before recommending jobs, you MUST gather this info naturally.
First question to ask: "{onboarding_prompts.get(first_missing)}"
""")
```

---

## CLM (Custom Language Model) Deep Dive

### What is CLM?
Hume EVI uses a "Custom Language Model" endpoint instead of its built-in LLM. This allows you to:
- Use your own AI (Pydantic AI, OpenAI, Claude, etc.)
- Inject context (user profile, page info, memory)
- Control tool execution

### CLM Requirements
1. **Endpoint**: OpenAI-compatible `/chat/completions`
2. **Format**: Must return SSE (Server-Sent Events), NOT JSON
3. **Response**: `data: {"choices": [{"delta": {"content": "..."}}]}\n\n`

### simple-clm Architecture
```python
# /Users/dankeegan/simple-clm/api/index.py

async def stream_response(content: str, msg_id: str):
    """Stream OpenAI-compatible SSE chunks - required by Hume EVI."""
    words = content.split(' ')
    for i, word in enumerate(words):
        chunk = {
            "id": msg_id,
            "object": "chat.completion.chunk",
            "choices": [{
                "index": 0,
                "delta": {"content": word + ' '},
                "finish_reason": None
            }]
        }
        yield f"data: {json.dumps(chunk)}\n\n"
    yield "data: [DONE]\n\n"

# Return StreamingResponse, NOT JSONResponse!
return StreamingResponse(stream_response(text, msg_id), media_type="text/event-stream")
```

### Hume Config
- **Config ID**: `acb5575c-e22f-44c0-a9c8-b03305d1ea92`
- **CLM URL**: `https://simple-clm.vercel.app/chat/completions`
- **IMPORTANT**: Disable "Fallback to Hume LLM" in dashboard to ensure CLM-only mode

---

## Railway Deployment Plan

### Files Needed for Agent Deployment

```
/agent/
├── src/
│   └── agent.py          # Pydantic AI agent with tools
├── pyproject.toml        # Dependencies
├── Procfile              # Railway start command
└── railway.json          # Railway config (optional)
```

### Procfile
```
web: uvicorn src.agent:app --host 0.0.0.0 --port $PORT
```

### Environment Variables (Railway)
```
DATABASE_URL=postgresql://...@neon.tech/neondb
ZEP_API_KEY=z_...
GOOGLE_API_KEY=...  # For Gemini model
```

### Deployment Steps
1. Create Railway project (or use existing `fractional-quest-agent`)
2. Link to GitHub repo subdirectory `/agent`
3. Set environment variables
4. Deploy and get public URL
5. Update `simple-clm` to call Railway URL instead of localhost

---

## Key Files Modified This Session

| File | Changes |
|------|---------|
| `agent/src/agent.py` | Added onboarding flow, `save_user_preference` tool, profile completeness check |
| `simple-clm/api/index.py` | SSE streaming, personalization, page context |
| `CLAUDE.md` | This documentation |

---

## Next Steps

1. **Deploy Agent to Railway**
   - Create Procfile
   - Set env vars
   - Get public URL

2. **Update simple-clm**
   - Change agent URL from localhost to Railway
   - Redeploy to Vercel

3. **Configure Hume Dashboard**
   - Ensure CLM-only mode (no fallback)
   - Verify config ID matches

4. **Test Full Flow**
   - Voice → CLM → Agent → Response
   - Chat → AG-UI → Agent → Response
   - Both should give identical answers

---

## Debugging Tips

### Check if Agent is Responding
```bash
curl -X POST https://your-railway-app.up.railway.app/ \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "hello"}]}'
```

### Check Vercel Logs for CLM
```bash
vercel logs simple-clm --follow
```

### Check Railway Logs
```bash
railway logs --follow
```

### Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "Illegal header value" | Newline in API key | Re-add env var without trailing `\n` |
| 404 from agent | Auth protection or wrong URL | Check Railway URL, remove Vercel auth |
| Silent voice | CLM returning JSON not SSE | Use `StreamingResponse` |
| "I don't have access" | Hume using its own LLM | Enable CLM-only mode in dashboard |

---

# Key Concepts Explained

## AG-UI vs A2UI vs CopilotRuntime

| Term | What It Is | Do We Use It? |
|------|------------|---------------|
| **AG-UI** | "Agent-to-UI" protocol - streaming format for agent ↔ frontend communication | **Yes** - via `agent.to_ag_ui()` |
| **A2UI** | Google's version of same concept, CopilotKit supports both | Same as AG-UI |
| **CopilotRuntime** | CopilotKit's backend proxy (handles LLM calls, tools) | **No** - we have our own Pydantic AI agent |
| **Copilot Cloud** | CopilotKit's hosted CopilotRuntime service | **No** - we self-host |

### Why We Don't Need CopilotRuntime

CopilotRuntime is for apps that want CopilotKit to handle LLM calls. Since we have a **custom Pydantic AI agent** with tools, database access, and Zep memory, we bypass CopilotRuntime entirely:

```
Typical CopilotKit App:
  Frontend → CopilotRuntime → LLM

Our App:
  Frontend → Pydantic AI Agent → LLM
           (via AG-UI protocol)
```

## Generative UI (Charts in Chat)

When the agent returns tool results, the frontend renders custom React components. This is **dynamic** - data comes from real-time database queries.

**Flow:**
```
1. User: "Show job distribution"
2. Agent calls: show_jobs_chart() → queries Neon DB
3. Agent returns: { chartData: [...], title: "..." }
4. AG-UI streams: tool_result event to frontend
5. Frontend: useRenderToolCall renders <BarChart />
6. User sees: Live chart with real data
```

**Frontend code pattern:**
```typescript
useRenderToolCall({
  name: "show_jobs_chart",
  render: ({ result }) => <BarChart data={result.chartData} />
})
```

## What Lives Where

```
YOUR DEPLOYMENTS:
├── Vercel: copilotkit-demo
│   ├── Next.js frontend
│   ├── CopilotKit React components (library, runs in browser)
│   ├── API routes (/api/hume-token, /api/zep-context, etc.)
│   └── NO CopilotRuntime needed
│
└── Railway: unified-agent (TO BE DEPLOYED)
    ├── Pydantic AI agent (the brain)
    ├── AG-UI endpoint (for CopilotKit)
    └── CLM endpoint (for Hume voice)

EXTERNAL SERVICES (not your hosting):
├── Zep Cloud: api.getzep.com (memory/facts)
├── Neon Cloud: *.neon.tech (PostgreSQL database)
├── Hume AI: (voice interface)
└── Google AI: (Gemini LLM)
```

---

# Next Session: Railway Deployment Plan

## Goal
Deploy unified Python service to Railway with both AG-UI and CLM endpoints.

## Files to Create/Modify

### 1. Create `agent/Procfile`
```
web: uvicorn src.agent:app --host 0.0.0.0 --port $PORT
```

### 2. Modify `agent/src/agent.py`
Add CLM endpoint to the same FastAPI app:
```python
from fastapi import FastAPI, Request
from starlette.responses import StreamingResponse

# Existing agent
agent = Agent(...)
ag_ui_app = agent.to_ag_ui(deps=...)

# New: Main app with CLM endpoint
main_app = FastAPI()

@main_app.post("/chat/completions")
async def clm_endpoint(request: Request):
    # Parse Hume request, call agent, return SSE stream
    ...

# Mount AG-UI at root
main_app.mount("/", ag_ui_app)

app = main_app  # Export this
```

### 3. Set Railway Environment Variables
```
DATABASE_URL=postgresql://...@neon.tech/neondb
ZEP_API_KEY=z_...
GOOGLE_API_KEY=...
```

### 4. Update Hume Dashboard
Change CLM URL from `simple-clm.vercel.app` to Railway URL

### 5. Update CopilotKit Frontend
Point `agentUrl` to Railway URL

## Deployment Steps
1. Create Procfile
2. Add CLM endpoint to agent.py
3. Push to GitHub
4. Create/link Railway project
5. Set env vars
6. Deploy
7. Get public URL
8. Update Hume config
9. Update frontend config
10. Test voice + chat

## Success Criteria
- [ ] Voice: "What's my name?" → Agent responds with user's name
- [ ] Chat: Same query → Same response
- [ ] Onboarding: New user gets profile questions
- [ ] Charts: "Show job distribution" → Live chart renders

---

# Code Health Assessment (Jan 2025)

## Status: MVP-Ready ✅

The code is **production-ready for MVP**. Deploy first, refactor later.

## Known Issues (Non-Blocking)

| Issue | Impact | Action |
|-------|--------|--------|
| No DB connection pooling | Performance (not critical) | Add asyncpg pool later |
| 957-line agent.py | Maintainability | Split into modules later |
| Mixed sync/async tools | Inconsistency | Standardize later |

## CLM Consolidation Pattern

When adding CLM endpoint to agent.py, use this pattern:

```python
# At top of agent.py
from fastapi import FastAPI, Request
from starlette.responses import StreamingResponse
import json

# Create main FastAPI app
main_app = FastAPI()

# === CLM ENDPOINT FOR HUME ===
async def stream_sse_response(content: str, msg_id: str):
    """Stream OpenAI-compatible SSE chunks for Hume."""
    words = content.split(' ')
    for i, word in enumerate(words):
        chunk = {
            "id": msg_id,
            "object": "chat.completion.chunk",
            "choices": [{
                "index": 0,
                "delta": {"content": word + (' ' if i < len(words) - 1 else '')},
                "finish_reason": None
            }]
        }
        yield f"data: {json.dumps(chunk)}\n\n"

    yield f"data: {json.dumps({'choices': [{'delta': {}, 'finish_reason': 'stop'}]})}\n\n"
    yield "data: [DONE]\n\n"

@main_app.post("/chat/completions")
async def clm_endpoint(request: Request):
    """OpenAI-compatible endpoint for Hume EVI."""
    body = await request.json()
    messages = body.get("messages", [])

    # Extract user message
    user_msg = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")

    # Parse session ID: "firstName|fractional_userId|location:London,jobs:25"
    # (Copy parsing logic from simple-clm/api/index.py)

    # TODO: Call agent with user context and get response
    # For now, use the same fallback logic as simple-clm

    response_text = f"Hello! You said: {user_msg}"
    msg_id = f"clm-{hash(user_msg)}"

    return StreamingResponse(
        stream_sse_response(response_text, msg_id),
        media_type="text/event-stream"
    )

# === EXISTING AGENT CODE ===
# ... (all existing agent definition, tools, etc.)

# === AG-UI APP ===
ag_ui_app = agent.to_ag_ui(deps=StateDeps(AppState()))

# Mount AG-UI under the main app
main_app.mount("/ag-ui", ag_ui_app)

# Export main_app instead of ag_ui_app
app = main_app
```

**Key Points:**
- CLM at `/chat/completions` for Hume
- AG-UI at `/ag-ui` (or `/`) for CopilotKit
- Same agent handles both
- Copy SSE streaming from `simple-clm/api/index.py`

## Future Refactoring (Post-MVP)

```
agent/src/
├── agent.py          # Agent definition only
├── models.py         # Pydantic models
├── zep_client.py     # Zep integration
├── db.py             # Connection pool
├── clm.py            # CLM endpoint
└── tools/            # One file per tool category
```
