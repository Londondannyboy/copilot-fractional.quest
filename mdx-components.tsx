import type { MDXComponents } from "mdx/types";

// Import components directly - they handle their own client-side rendering
import { RoleCalculator } from "./src/components/RoleCalculator";
import { EmbeddedJobBoard } from "./src/components/EmbeddedJobBoard";
import { HotJobs } from "./src/components/HotJobs";

// Import MDX-specific components
import PersonalizedHero from "./src/components/mdx/PersonalizedHero";
import SalaryBenchmarkChart from "./src/components/mdx/SalaryBenchmarkChart";
import CareerTimeline from "./src/components/mdx/CareerTimeline";
import MarketOverview from "./src/components/mdx/MarketOverview";
import CopilotMainPanel from "./src/components/mdx/CopilotMainPanel";

/**
 * MDX Components Registry
 *
 * These components are available in all MDX content.
 * Client components (with hooks) should have "use client" in their own files.
 */
export const mdxComponents: MDXComponents = {
  // Interactive job components
  RoleCalculator,
  EmbeddedJobBoard,
  HotJobs,
  // Personalized MDX components
  PersonalizedHero,
  SalaryBenchmarkChart,
  CareerTimeline,
  MarketOverview,
  CopilotMainPanel,
  // HTML element overrides for MDX styling
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold text-gray-900 mb-6" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium text-gray-700 mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside space-y-2 mb-4 text-gray-600"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside space-y-2 mb-4 text-gray-600"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-emerald-600 hover:text-emerald-700 underline"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        className="min-w-full border-collapse border border-gray-200"
        {...props}
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-200 px-4 py-2" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-gray-200" {...props} />
  ),
};

/**
 * Required export for @next/mdx
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
  };
}
