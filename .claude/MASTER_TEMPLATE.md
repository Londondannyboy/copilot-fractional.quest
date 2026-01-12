# Master Template: CopilotKit + Pydantic AI + Hume + MDX

> **Purpose**: This is the definitive guide for building AI-first web applications using our proven stack.
> **Use**: Point Claude at this document when starting any new project.
> **Reference Implementation**: `/Users/dankeegan/fractional.quest` (Fractional Quest V2)
> **Version**: 1.0 (January 2026)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────────┐         ┌──────────────────┐                     │
│   │     VERCEL       │         │     RAILWAY      │                     │
│   │   (Next.js 15)   │         │   (FastAPI)      │                     │
│   │                  │         │                  │                     │
│   │ • Frontend       │ ──────► │ • Pydantic AI    │                     │
│   │ • CopilotKit     │  AG-UI  │   Agent          │                     │
│   │ • MDX Rendering  │         │ • CLM Endpoint   │                     │
│   │ • Auth (Neon)    │         │ • Tools          │                     │
│   │                  │         │ • Neon DB Access │                     │
│   └──────────────────┘         └──────────────────┘                     │
│          │                            ▲                                  │
│          │                            │                                  │
│          ▼                            │                                  │
│   ┌──────────────────┐         ┌──────────────────┐                     │
│   │    HUME AI       │ ──────► │  CLM Endpoint    │                     │
│   │   (Voice EVI)    │         │  /chat/          │                     │
│   │                  │         │  completions     │                     │
│   └──────────────────┘         └──────────────────┘                     │
│                                                                          │
│   ┌──────────────────┐                                                  │
│   │  NEON PostgreSQL │ ◄─── Both Frontend & Agent connect               │
│   │   (Database)     │                                                  │
│   └──────────────────┘                                                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Principle: Single Brain, Multiple Interfaces

- **Pydantic AI Agent** = THE BRAIN (has all tools, memory, database access)
- **CopilotKit** = Chat interface (connects via AG-UI protocol)
- **Hume Voice** = Voice interface (connects via CLM endpoint)
- Both interfaces use the SAME agent = consistent responses

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 15 + React 19 | App framework |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Content** | MDX + next-mdx-remote | React components in Markdown |
| **Chat UI** | CopilotKit | AI chat sidebar + in-content |
| **Voice** | Hume EVI | Speech-to-text, text-to-speech |
| **Agent** | Pydantic AI | Python agent with tools |
| **API** | FastAPI | Agent hosting |
| **Database** | Neon PostgreSQL | Serverless Postgres |
| **Auth** | Neon Auth | Authentication |
| **Hosting** | Vercel (frontend) + Railway (agent) | Deployment |

---

## Cole Medin Methodology

> "Don't just fix the bug - fix the system that allowed the bug."

### The 5 Principles

1. **PRD-First Development**
   - Create `/PRD.md` before writing any code
   - This is the north star - all features reference it
   - Update PRD as scope changes

2. **Modular Rules Architecture**
   - Don't put everything in CLAUDE.md
   - Split into `/.claude/reference/` files
   - Load only what's needed for current task

3. **Command-ify Everything**
   - Create `/.claude/commands/` for repeatable workflows
   - `/prime` - Load context at session start
   - `/plan` - Create structured plans
   - `/execute` - Build from plans
   - `/evolve` - Improve system after bugs

4. **Context Reset Pattern**
   - Planning and execution are SEPARATE phases
   - After `/plan`, clear context, then `/execute`
   - Plan file contains ALL needed context

5. **System Evolution Mindset**
   - Every bug is an opportunity
   - Update rules/commands to prevent recurrence
   - The system gets smarter over time

---

## Project Structure

```
project-root/
├── .claude/
│   ├── commands/           # Slash commands
│   │   ├── prime.md        # Load context
│   │   ├── plan.md         # Create plans
│   │   ├── execute.md      # Execute plans
│   │   ├── evolve.md       # System evolution
│   │   └── create-page.md  # Create pages
│   ├── reference/          # Modular rules
│   │   ├── mdx-content.md
│   │   ├── copilotkit-integration.md
│   │   ├── database-pages.md
│   │   └── seo-content.md
│   ├── plans/              # Generated plans
│   └── RESTART.md          # Quick restart prompt
├── agent/                  # Pydantic AI agent
│   ├── src/
│   │   └── agent.py        # Main agent with tools
│   ├── pyproject.toml
│   └── Procfile            # Railway deployment
├── src/
│   ├── app/                # Next.js pages
│   ├── components/
│   │   ├── mdx/            # MDX components
│   │   └── ...
│   └── lib/
│       ├── mdx-components.tsx
│       └── ...
├── CLAUDE.md               # Main instructions
├── PRD.md                  # Product requirements
├── package.json
└── next.config.ts          # MDX enabled
```

---

## Setup Instructions

### Phase 1: Scaffold with CopilotKit CLI

```bash
# Create new project with CopilotKit + Pydantic AI
npx copilotkit@latest create -f pydantic-ai

# This creates:
# ├── frontend/    (Next.js with CopilotKit)
# └── agent/       (Pydantic AI agent template)
```

### Phase 2: Add MDX Support

```bash
# Install MDX dependencies
npm install @next/mdx @mdx-js/loader @mdx-js/react next-mdx-remote
npm install -D @types/mdx
```

**Update `next.config.ts`:**
```typescript
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // ... other config
};

const withMDX = createMDX({
  options: { remarkPlugins: [], rehypePlugins: [] },
});

export default withMDX(nextConfig);
```

### Phase 3: Set Up Database (Neon)

```bash
# Create Neon project via MCP or dashboard
# Get connection string

# Add to .env:
DATABASE_URL=postgresql://user:pass@host.neon.tech/neondb
```

### Phase 4: Set Up Auth (Neon Auth)

```bash
# Provision Neon Auth via Neon Console or MCP:
# - Enable Auth in your Neon project settings
# - Creates neon_auth schema with users table
# - Syncs user data automatically

# Add to .env.local:
NEON_AUTH_TOKEN=...
# (or use DATABASE_URL which already has auth access)
```

### Phase 5: Set Up Hume Voice

1. Create account at platform.hume.ai
2. Create EVI config, get Config ID
3. Add to `.env`:
```
HUME_API_KEY=...
HUME_SECRET_KEY=...
HUME_CONFIG_ID=...
```

4. Create `/api/hume-token/route.ts` for access tokens

### Phase 6: Deploy Agent to Railway

```bash
cd agent

# Create Procfile
echo "web: uvicorn src.agent:app --host 0.0.0.0 --port \$PORT" > Procfile

# Deploy
railway up
```

### Phase 7: Configure Hume CLM

In Hume dashboard:
1. Set CLM URL to your Railway agent URL
2. Enable "CLM-only mode" (disable Hume's built-in LLM)

---

## Key Integration Patterns

### 1. CopilotKit Frontend Setup

```tsx
// app/layout.tsx or page.tsx
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="https://your-agent.railway.app">
      <CopilotSidebar
        instructions={agentInstructions}
        labels={{ title: "AI Assistant" }}
      >
        <YourApp />
      </CopilotSidebar>
    </CopilotKit>
  );
}
```

### 2. Pydantic AI Agent with AG-UI

```python
# agent/src/agent.py
from pydantic_ai import Agent
from pydantic import BaseModel

class AppState(BaseModel):
    user: dict | None = None
    data: list = []

agent = Agent(
    "google-gla:gemini-2.0-flash",
    system_prompt="You are a helpful assistant...",
)

@agent.tool
async def search_data(ctx, query: str) -> dict:
    """Search for data."""
    # Your logic here
    return {"results": [...]}

# Export AG-UI app
app = agent.to_ag_ui(deps=StateDeps(AppState()))
```

### 3. CLM Endpoint for Hume (Add to Same Agent)

```python
# Add to agent/src/agent.py
from fastapi import FastAPI, Request
from starlette.responses import StreamingResponse
import json

main_app = FastAPI()

async def stream_sse(content: str, msg_id: str):
    """Stream OpenAI-compatible SSE for Hume."""
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

@main_app.post("/chat/completions")
async def clm_endpoint(request: Request):
    body = await request.json()
    messages = body.get("messages", [])
    user_msg = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")

    # TODO: Call your agent and get response
    response = f"You said: {user_msg}"

    return StreamingResponse(
        stream_sse(response, f"clm-{hash(user_msg)}"),
        media_type="text/event-stream"
    )

# Mount AG-UI
ag_ui_app = agent.to_ag_ui(deps=StateDeps(AppState()))
main_app.mount("/", ag_ui_app)

app = main_app
```

### 4. Passing User Context to Agent (CRITICAL)

The `instructions` prop is the reliable way to pass user context:

```tsx
// Frontend: Build instructions with user data
const agentInstructions = user
  ? `CRITICAL USER CONTEXT:
- User Name: ${user.name}
- User ID: ${user.id}
- User Email: ${user.email}
- Location: ${profile.location || 'Not set'}
- Role: ${profile.role || 'Not set'}

When the user asks about their profile, use the above info.`
  : undefined;

<CopilotSidebar instructions={agentInstructions}>
```

```python
# Agent: Extract from system message via middleware
@main_app.middleware("http")
async def extract_user_middleware(request: Request, call_next):
    if request.method == "POST":
        body = await request.body()
        if body:
            data = json.loads(body)
            for msg in data.get("messages", []):
                if msg.get("role") == "system" and "User ID:" in msg.get("content", ""):
                    # Extract and cache user context
                    extract_user_from_instructions(msg["content"])
    return await call_next(request)
```

### 5. MDX Component Registry

```tsx
// src/lib/mdx-components.tsx
import { RoleCalculator } from '@/components/RoleCalculator';
import { JobBoard } from '@/components/JobBoard';
import { Chart } from '@/components/Chart';

export const mdxComponents = {
  RoleCalculator,
  JobBoard,
  Chart,
  // Add all components you want available in MDX
};
```

### 6. MDX Renderer

```tsx
// src/components/MDXRenderer.tsx
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from '@/lib/mdx-components';

interface Props {
  source: MDXRemoteSerializeResult;
  className?: string;
}

export function MDXRenderer({ source, className }: Props) {
  return (
    <div className={className || "prose prose-lg max-w-none"}>
      <MDXRemote {...source} components={mdxComponents} />
    </div>
  );
}
```

---

## Generative UI (Tool Results → React Components)

```tsx
// Frontend: Render tool results as React components
import { useRenderToolCall } from "@copilotkit/react-ui";

useRenderToolCall({
  name: "show_chart",
  render: ({ result }) => <BarChart data={result.data} />
});

useRenderToolCall({
  name: "search_jobs",
  render: ({ result }) => <JobCards jobs={result.jobs} />
});
```

---

## Human-in-the-Loop (HITL)

```tsx
// Frontend: Confirm before agent actions
import { useHumanInTheLoop } from "@copilotkit/react-ui";

useHumanInTheLoop({
  name: "confirm_purchase",
  Description: ({ args }) => (
    <div>Confirm purchase of {args.item} for ${args.price}?</div>
  ),
  onApprove: async ({ args }) => {
    // Execute the action
    await purchaseItem(args.item);
    return { success: true };
  },
  onReject: async () => {
    return { cancelled: true };
  }
});
```

---

## Environment Variables Template

```env
# Database (Neon)
DATABASE_URL=postgresql://user:pass@host.neon.tech/neondb

# Auth (Neon Auth)
# Neon Auth uses your DATABASE_URL connection
# User data synced to neon_auth.users table

# Hume Voice
HUME_API_KEY=...
HUME_SECRET_KEY=...
HUME_CONFIG_ID=...

# AI Models
GOOGLE_API_KEY=...  # For Gemini
OPENAI_API_KEY=...  # Optional

# Agent URL (after Railway deployment)
NEXT_PUBLIC_AGENT_URL=https://your-agent.railway.app
```

---

## Starting a New Project Checklist

- [ ] Create project folder
- [ ] Run `npx copilotkit@latest create -f pydantic-ai`
- [ ] Add MDX dependencies and config
- [ ] Create `.claude/` directory structure
- [ ] Create `PRD.md` with project requirements
- [ ] Create `CLAUDE.md` with project-specific rules
- [ ] Set up Neon database
- [ ] Provision Neon Auth
- [ ] Create Hume EVI config
- [ ] Deploy agent to Railway
- [ ] Configure Hume CLM URL
- [ ] Create MDX component registry
- [ ] Add first MDX page
- [ ] Test chat + voice work together

---

## Common Issues & Solutions

| Issue | Cause | Fix |
|-------|-------|-----|
| "I don't know who you are" | Agent not receiving user context | Use `instructions` prop + middleware |
| Voice and chat give different answers | Two separate LLMs | Use CLM-only mode, same agent |
| MDX components not rendering | Component not in registry | Add to `mdxComponents` |
| SSR errors with Three.js/charts | Client-only components | Use `dynamic(() => import(...), { ssr: false })` |
| Agent tools not appearing in chat | Missing `useRenderToolCall` | Add renderer for each tool |
| Hume returns generic responses | CLM not configured | Set CLM URL in Hume dashboard |

---

## Reference Projects

- **Fractional Quest V2**: `/Users/dankeegan/fractional.quest` - Full implementation
- **CopilotKit Examples**: https://github.com/CopilotKit/CopilotKit/tree/main/examples
- **Pydantic AI Docs**: https://ai.pydantic.dev

---

## How to Use This Template

When starting a new project, tell Claude:

```
I'm starting a new project. Please read the master template at:
/Users/dankeegan/fractional.quest/.claude/MASTER_TEMPLATE.md

Project name: [Your Project]
Purpose: [What it does]
Key features: [List features]

Please set up the project following the template.
```

Claude will:
1. Create the project structure
2. Set up all integrations
3. Create PRD.md and CLAUDE.md
4. Configure Cole Medin methodology files
5. Get you to a working state quickly

---

*This template represents hundreds of hours of learning and iteration. Use it wisely.*
