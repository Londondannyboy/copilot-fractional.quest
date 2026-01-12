# CopilotKit Integration Rules

> Load this reference when working on CopilotKit features.

## Architecture

```
Frontend (Next.js)
├── CopilotKit Provider (wraps app)
├── CopilotSidebar (chat interface)
├── useCoAgent (state sync)
├── useRenderToolCall (generative UI)
└── useCopilotChat (message handling)

Backend (Pydantic AI on Railway)
├── Agent with tools
├── AG-UI protocol
├── CLM endpoint for Hume
└── Neon database access
```

## Provider Setup

In `/src/components/providers.tsx`:
```typescript
<CopilotKit runtimeUrl="https://copilotkit-agent-production.up.railway.app">
  {children}
</CopilotKit>
```

## CopilotSidebar Usage

```typescript
<CopilotSidebar
  instructions={contextualInstructions}
  labels={{
    title: "Fractional Quest AI",
    initial: "How can I help?",
  }}
>
  {/* Page content */}
</CopilotSidebar>
```

### Instructions Pattern
Pass user context via `instructions` prop:
```typescript
const instructions = user
  ? `CRITICAL USER CONTEXT:
- User Name: ${firstName}
- User ID: ${user.id}
- Location: ${profileItems.location || 'Not set'}
- Target Role: ${profileItems.role || 'Not set'}
- Skills: ${profileItems.skills?.join(', ') || 'None'}`
  : undefined;
```

## Hooks

### useCoAgent - State Sync
```typescript
const { state, setState } = useCoAgent<AgentState>({
  name: "my_agent",
  initialState: { jobs: [], user: undefined },
});
```

### useRenderToolCall - Generative UI
```typescript
useRenderToolCall({
  name: "show_jobs_chart",
  render: ({ result, status }) => {
    if (status !== "complete") return <Loading />;
    return <JobsBarChart data={result.chartData} />;
  },
}, []);
```

### useCopilotChat - Messages
```typescript
const { appendMessage } = useCopilotChat();

const handleVoiceMessage = (text: string) => {
  const message = new TextMessage({
    content: text,
    role: Role.User,
  });
  appendMessage(message);
};
```

## Agent Tools (Backend)

Available tools in `/agent/src/agent.py`:
- `search_jobs(query, department, location)` - Search jobs
- `show_jobs_chart(role)` - Return chart data
- `show_salary_chart(role)` - Salary trends
- `show_market_dashboard()` - Market stats
- `show_user_graph()` - 3D interest graph
- `save_user_preference(field, value)` - Save to Neon
- `confirm_company(name, url)` - HITL confirmation

## Human-in-the-Loop

```typescript
useHumanInTheLoop({
  name: "confirm_company",
  onAccept: (result) => { /* save to DB */ },
  onReject: () => { /* cancel */ },
});
```

## Page Context

Pass page context to agent:
```typescript
const pageContext = {
  pageType: "jobs" as const,
  pageH1: "CMO Jobs London",
  pageUrl: "/fractional-cmo-jobs-uk",
};
```

## Voice Integration

Voice messages go through CopilotKit:
```typescript
<VoiceInput
  onMessage={handleVoiceMessage}
  firstName={firstName}
  userId={user?.id}
  pageContext={pageContext}
/>
```

## MDX + CopilotKit

In MDX content, use `<CopilotMainPanel>` for in-content chat:
```mdx
<CopilotMainPanel
  title="Ask about jobs"
  context={{ location: "London", role: "CMO" }}
/>
```

Questions dispatch to sidebar via custom event.

## Best Practices

1. **Always pass context** - Agent needs page/user info
2. **Handle loading states** - useRenderToolCall has `status`
3. **Graceful degradation** - Work without login
4. **Clear instructions** - Be explicit about user context
5. **Test voice + chat** - Both should give same answers
