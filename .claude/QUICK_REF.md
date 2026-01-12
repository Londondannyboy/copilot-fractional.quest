# Quick Reference Card

## Stack
- **Frontend**: Next.js 15 + CopilotKit + MDX (Vercel)
- **Agent**: Pydantic AI + FastAPI (Railway)
- **Voice**: Hume EVI (CLM → Agent)
- **Database**: Neon PostgreSQL
- **Auth**: Neon Auth

## Key Principle
ONE BRAIN (Pydantic AI), TWO INTERFACES (Chat + Voice)

## Essential Commands
```bash
npm run dev                    # Frontend
cd agent && uv run uvicorn src.agent:app --port 8000  # Agent
```

## CopilotKit Pattern
```tsx
<CopilotKit runtimeUrl="https://agent.railway.app">
  <CopilotSidebar instructions={userContext}>
    <App />
  </CopilotSidebar>
</CopilotKit>
```

## Agent Pattern
```python
agent = Agent("google-gla:gemini-2.0-flash", system_prompt="...")

@agent.tool
async def my_tool(ctx, query: str) -> dict:
    return {"result": ...}

app = agent.to_ag_ui(deps=StateDeps(AppState()))
```

## User Context (CRITICAL)
Pass via `instructions` prop → Agent extracts via middleware

## MDX
```tsx
// Registry: src/lib/mdx-components.tsx
export const mdxComponents = { MyComponent, ... };

// Usage in .mdx:
<MyComponent prop="value" />
```

## Generative UI
```tsx
useRenderToolCall({
  name: "tool_name",
  render: ({ result }) => <Component data={result} />
});
```

## Files
- `/.claude/MASTER_TEMPLATE.md` - Full architecture guide
- `/PRD.md` - Product requirements
- `/agent/src/agent.py` - Agent code
- `/src/lib/mdx-components.tsx` - MDX registry
