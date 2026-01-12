import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../../../mdx-components";
import { MDXDemoWrapper } from "./MDXDemoWrapper";

/**
 * MDX Demo Page
 *
 * This page demonstrates:
 * 1. Runtime MDX compilation via next-mdx-remote/rsc
 * 2. Custom React components embedded in MDX
 * 3. CopilotKit integration (via layout wrapper)
 * 4. Pattern for database-stored MDX content
 */

// MDX content - in production, this would come from the database
const mdxContent = `
# MDX Demo: The Future of Content

<PersonalizedHero
  location="London"
  role="CMO"
  jobCount={47}
/>

---

## Welcome to MDX-Powered Content

This page demonstrates the power of **MDX** - a format that lets you write content as Markdown while embedding interactive React components inline. No separate templates, no complex CMS - just content and code, together.

With MDX + CopilotKit, your AI assistant understands the page context and can generate rich responses with embedded components - not just text.

### What Makes This Special

- **Content + Code**: Write prose as Markdown, add components where needed
- **AI-Friendly**: LLMs can read and generate MDX
- **Personalization**: Components access user data for dynamic content
- **SEO-Optimized**: Still renders as semantic HTML for search engines

---

## Live Market Data

The component below shows real-time market statistics for fractional executives in London.

<MarketOverview location="London" role="CMO" />

---

## Salary Benchmark

See how your rate compares to the London market for CMO roles. This chart personalizes based on your profile data.

<SalaryBenchmarkChart
  role="CMO"
  location="London"
  yourRate={1100}
/>

---

## Ask the AI

Instead of just a sidebar, CopilotKit can be embedded directly in your content. Questions here go to the same AI assistant - same context, same capabilities.

<CopilotMainPanel
  title="Ask about London opportunities"
  suggestedQuestions={[
    "What's the average day rate for CMOs in London?",
    "Show me available marketing leadership jobs",
    "How can I increase my day rate?",
    "What skills are most valuable for fractional CMOs?"
  ]}
/>

---

## Your Career Trajectory

This interactive timeline visualizes your potential career path from your current position to becoming a successful portfolio fractional executive.

<CareerTimeline
  currentRole="Marketing Director"
  targetRole="Fractional CMO"
/>

---

## Available Opportunities

Browse and filter jobs directly within the content. The job board is the same component used across the site, now seamlessly integrated into the MDX flow.

<EmbeddedJobBoard
  defaultDepartment="Marketing"
  title="CMO Jobs in London"
  accentColor="emerald"
  jobsPerPage={6}
/>

---

## Earnings Calculator

Calculate your potential earnings as a fractional executive. Adjust the parameters to see how different scenarios affect your income.

<RoleCalculator role="CMO" />

---

## Why MDX Matters for Fractional Quest

| Benefit | Description |
|---------|-------------|
| **Content + Code** | Write as Markdown, embed React components inline |
| **AI-Friendly** | MDX is readable by AI - CopilotKit can generate MDX responses |
| **Personalization** | Components access user data for dynamic content |
| **SEO-Optimized** | Renders as semantic HTML for search engines |
| **Fast Iteration** | Content editors can update pages without touching React code |

---

## Technical Implementation

This demo uses \`next-mdx-remote/rsc\` for runtime MDX compilation. The components available in MDX are registered in \`mdx-components.tsx\`:

- \`PersonalizedHero\` - User-aware hero section
- \`SalaryBenchmarkChart\` - Role-based salary visualization
- \`CareerTimeline\` - Career progression timeline
- \`MarketOverview\` - Market statistics panel
- \`CopilotMainPanel\` - Embedded chat interface
- \`EmbeddedJobBoard\` - Filterable job listings
- \`RoleCalculator\` - Earnings calculator

In production, you can:

1. Store MDX content in Neon PostgreSQL
2. Have CopilotKit generate MDX responses with components
3. Create personalized landing pages dynamically
4. Build interactive documentation

---

*This page is a proof of concept for MDX-first content architecture in Fractional Quest V2.*
`;

export const metadata = {
  title: "MDX Demo - Interactive Content | Fractional Quest",
  description:
    "Experience the future of content with MDX-powered pages featuring embedded React components and AI integration.",
};

export default function MDXDemoPage() {
  return (
    <MDXDemoWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* MDX Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          <span>✨</span>
          <span>MDX-Powered Page Demo</span>
        </div>

        {/* Render MDX content */}
        <article className="prose prose-lg max-w-none">
          <MDXRemote source={mdxContent} components={mdxComponents} />
        </article>
      </div>
    </MDXDemoWrapper>
  );
}
