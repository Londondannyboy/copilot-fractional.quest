# MDX Content Development Rules

> Load this reference when working on MDX pages or content.

## Architecture Overview

MDX pages in Fractional Quest V2 use `next-mdx-remote/rsc` for runtime MDX compilation. This allows:
- MDX content stored in the database
- Server-side rendering with client component hydration
- CopilotKit integration via wrapper components

```
MDX Content (string)
    ↓ next-mdx-remote/rsc
Rendered HTML + React components
    ↓ Client Wrapper (MDXDemoWrapper)
CopilotKit context + Voice integration
    ↓ AG-UI Protocol
Pydantic AI Agent (tools, memory, database)
```

## File Structure

```
/mdx-components.tsx              # ROOT-LEVEL component registry (required!)
/src/app/mdx-demo/
├── page.tsx                     # Server component with MDXRemote
└── MDXDemoWrapper.tsx           # Client wrapper for CopilotKit
/src/components/mdx/
├── PersonalizedHero.tsx         # User-aware hero section
├── SalaryBenchmarkChart.tsx     # Salary visualization
├── CareerTimeline.tsx           # Career progression
├── MarketOverview.tsx           # Market statistics
└── CopilotMainPanel.tsx         # Embedded chat panel
```

## Component Registry

All MDX components must be registered in the **root-level** `/mdx-components.tsx`:

```typescript
// /mdx-components.tsx (PROJECT ROOT)
import type { MDXComponents } from "mdx/types";
import PersonalizedHero from "./src/components/mdx/PersonalizedHero";
// ... other imports

export const mdxComponents: MDXComponents = {
  PersonalizedHero,
  SalaryBenchmarkChart,
  CareerTimeline,
  MarketOverview,
  CopilotMainPanel,
  RoleCalculator,
  EmbeddedJobBoard,
  HotJobs,
  // HTML element overrides
  h1: (props) => <h1 className="text-4xl font-bold..." {...props} />,
  // ...
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents };
}
```

## Creating an MDX Page

### Step 1: Create Page Component (Server)

```tsx
// src/app/your-page/page.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../../../mdx-components";
import { YourPageWrapper } from "./YourPageWrapper";

const mdxContent = `
# Your Page Title

<PersonalizedHero role="CTO" location="London" />

## Section Title

<EmbeddedJobBoard defaultDepartment="Engineering" />
`;

export default function YourPage() {
  return (
    <YourPageWrapper>
      <MDXRemote source={mdxContent} components={mdxComponents} />
    </YourPageWrapper>
  );
}
```

### Step 2: Create Client Wrapper

```tsx
// src/app/your-page/YourPageWrapper.tsx
"use client";

import { CopilotSidebar } from "@copilotkit/react-ui";
import { VoiceInput } from "@/components/voice-input";
import { authClient } from "@/lib/auth/client";

export function YourPageWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const instructions = `
## Page Context
This page shows [page purpose].

User Profile:
- Name: ${user?.name || "Guest"}
`;

  return (
    <CopilotSidebar instructions={instructions}>
      <VoiceInput ... />
      <main>{children}</main>
    </CopilotSidebar>
  );
}
```

## Available Components

### PersonalizedHero
Dynamic hero with user greeting, location, role.
```mdx
<PersonalizedHero
  location="London"
  role="CMO"
  jobCount={47}
/>
```

### SalaryBenchmarkChart
Compare user rate to market percentiles.
```mdx
<SalaryBenchmarkChart
  role="CMO"
  location="London"
  yourRate={1100}
/>
```

### CareerTimeline
Interactive career progression visualization.
```mdx
<CareerTimeline
  currentRole="Marketing Director"
  targetRole="Fractional CMO"
/>
```

### MarketOverview
Live market statistics dashboard.
```mdx
<MarketOverview location="London" role="CMO" />
```

### CopilotMainPanel
In-content CopilotKit chat interface.
```mdx
<CopilotMainPanel
  title="Ask about this market"
  suggestedQuestions={[
    "What's the average day rate?",
    "Show me jobs"
  ]}
/>
```

### EmbeddedJobBoard
Filterable job listings.
```mdx
<EmbeddedJobBoard
  defaultDepartment="Marketing"
  title="CMO Jobs in London"
  accentColor="emerald"
  jobsPerPage={6}
/>
```

### RoleCalculator
Earnings calculator.
```mdx
<RoleCalculator role="CMO" />
```

## CopilotKit + AG-UI Integration

MDX components work fully with CopilotKit and AG-UI:

| Feature | Works? | How |
|---------|--------|-----|
| Agent sees page context | ✅ | Via `instructions` prop on CopilotSidebar |
| Agent sees user profile | ✅ | Via `instructions` prop |
| Embedded chat in MDX | ✅ | CopilotMainPanel component |
| Tool results as UI | ✅ | useRenderToolCall in wrapper |
| Human-in-the-loop | ✅ | useHumanInTheLoop in wrapper |
| Voice integration | ✅ | VoiceInput in wrapper |

### CopilotMainPanel Events

The embedded chat panel dispatches events to the sidebar:

```tsx
// CopilotMainPanel dispatches
window.dispatchEvent(new CustomEvent("copilot-question", {
  detail: { question, context }
}));

// Wrapper listens
useEffect(() => {
  const handleQuestion = (e: CustomEvent) => {
    appendMessage(new TextMessage({
      content: e.detail.question,
      role: Role.User
    }));
  };
  window.addEventListener("copilot-question", handleQuestion);
  return () => window.removeEventListener("copilot-question", handleQuestion);
}, []);
```

## Database Storage Pattern

For database-stored MDX content:

```sql
-- Add columns to pages table
ALTER TABLE pages ADD COLUMN mdx_content TEXT;
ALTER TABLE pages ADD COLUMN content_format VARCHAR(10) DEFAULT 'sections';
```

Then in your dynamic route:

```tsx
// src/app/[slug]/page.tsx
if (page.content_format === 'mdx') {
  return (
    <PageWrapper>
      <MDXRemote source={page.mdx_content} components={mdxComponents} />
    </PageWrapper>
  );
}
// Fall back to PageRenderer for sections format
return <PageRenderer page={page} />;
```

## Creating New MDX Components

### Template

```tsx
// src/components/mdx/YourComponent.tsx
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

interface Props {
  title?: string;
}

export default function YourComponent({ title = "Default" }: Props) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="my-8 bg-white rounded-xl p-6 shadow-lg">
      <h3>{title}</h3>
      {/* UI */}
    </div>
  );
}
```

### Register Component

Add to `/mdx-components.tsx`:

```tsx
import YourComponent from "./src/components/mdx/YourComponent";

export const mdxComponents: MDXComponents = {
  ...existingComponents,
  YourComponent,
};
```

## Best Practices

1. **Client Directive**: All MDX components using hooks need `"use client"`
2. **Root Registry**: Components MUST be in root `/mdx-components.tsx`, NOT `/src/lib/`
3. **Prop Types**: Define clear interfaces for all props
4. **Loading States**: Handle loading gracefully with skeletons
5. **Fallbacks**: Work for logged-out users too
6. **Mobile**: Test on mobile viewports

## Troubleshooting

### "Component X not defined"
- Check component is in root `/mdx-components.tsx`
- Check name matches exactly (case-sensitive)

### SSR Errors
- Add `"use client"` to components with hooks
- Use `next/dynamic` with `ssr: false` only in client components

### CopilotKit Not Working
- Ensure wrapper has CopilotSidebar
- Check `instructions` prop is populated
- Verify wrapper is client component

## Demo Page

See `/mdx-demo` for a working example:
- `src/app/mdx-demo/page.tsx` - Server component with MDXRemote
- `src/app/mdx-demo/MDXDemoWrapper.tsx` - Client wrapper with CopilotKit

---

## Dynamic Agent MDX Composition (NEW)

The agent can now compose rich UI responses using MDX components dynamically. This allows the agent to return interactive visualizations, job boards, calculators, etc. based on user queries.

### Architecture

```
User: "Show me salary data for CFOs in London"
    ↓
Agent calls: get_available_mdx_components(category="chart")
    ↓
Agent learns: SalaryBenchmarkChart is available
    ↓
Agent calls: compose_mdx_response(
  title="CFO Salary Benchmark",
  mdx_content="<SalaryBenchmarkChart role='CFO' location='London' yourRate={1200} />"
)
    ↓
Frontend: AgentMDXRenderer compiles and renders the component
    ↓
User sees: Interactive salary chart in the chat
```

### Agent Tools

| Tool | Purpose |
|------|---------|
| `get_available_mdx_components` | Query the database for available components and their props |
| `compose_mdx_response` | Return MDX content for the frontend to render |
| `query_page_content` | Read existing page content from the database |

### Database: mdx_components table

```sql
CREATE TABLE mdx_components (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,  -- hero, chart, visualization, dashboard, chat, job-board, calculator
  props JSONB DEFAULT '[]',
  example_usage TEXT,
  requires_auth BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Frontend: AgentMDXRenderer

The `AgentMDXRenderer` component compiles MDX content client-side:

```tsx
// In JobPageClient.tsx
useRenderToolCall({
  name: "compose_mdx_response",
  render: ({ result, status }) => {
    if (status !== "complete" || !result) return <Loading />;
    return (
      <AgentMDXRenderer
        mdxContent={result.mdx}
        title={result.title}
        suggestedActions={result.suggested_actions}
      />
    );
  },
}, []);
```

### Example Agent Response

When a user asks "Show me salary data for CFOs":

```python
# Agent calls compose_mdx_response with:
{
  "title": "CFO Salary Benchmark",
  "mdx_content": '''
## CFO Day Rates in London

Based on current market data, here's how CFO rates compare:

<SalaryBenchmarkChart role="CFO" location="London" yourRate={1200} />

The median CFO day rate in London is £1,100. You're in the 65th percentile!
''',
  "suggested_actions": ["Show CFO jobs", "Compare to CTO rates"]
}
```

### API Endpoint

Initialize/query components via `/api/mdx-components`:

```bash
# Initialize components table
curl -X POST http://localhost:3000/api/mdx-components \
  -H "Content-Type: application/json" \
  -d '{"action":"initialize"}'

# Get all components
curl http://localhost:3000/api/mdx-components
```

### Files

| File | Purpose |
|------|---------|
| `src/app/api/mdx-components/route.ts` | API for component metadata |
| `src/components/AgentMDXRenderer.tsx` | Client-side MDX compiler |
| `agent/src/agent.py` | Agent tools for MDX composition |

---

*Last Updated: 2026-01-12*
