"use client";

import { useState, useEffect } from "react";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

// Import all MDX components
import { RoleCalculator } from "./RoleCalculator";
import { EmbeddedJobBoard } from "./EmbeddedJobBoard";
import { HotJobs } from "./HotJobs";
import PersonalizedHero from "./mdx/PersonalizedHero";
import SalaryBenchmarkChart from "./mdx/SalaryBenchmarkChart";
import CareerTimeline from "./mdx/CareerTimeline";
import MarketOverview from "./mdx/MarketOverview";
import CopilotMainPanel from "./mdx/CopilotMainPanel";

// Component registry for client-side MDX rendering
const mdxComponents = {
  RoleCalculator,
  EmbeddedJobBoard,
  HotJobs,
  PersonalizedHero,
  SalaryBenchmarkChart,
  CareerTimeline,
  MarketOverview,
  CopilotMainPanel,
  // HTML element styling
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-600 leading-relaxed mb-3" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside space-y-1 mb-3 text-gray-600" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
};

interface AgentMDXRendererProps {
  mdxContent: string;
  title?: string;
  suggestedActions?: string[];
  onActionClick?: (action: string) => void;
}

export function AgentMDXRenderer({
  mdxContent,
  title,
  suggestedActions = [],
  onActionClick,
}: AgentMDXRendererProps) {
  const [compiledSource, setCompiledSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(true);

  useEffect(() => {
    async function compileMDX() {
      if (!mdxContent) {
        setIsCompiling(false);
        return;
      }

      try {
        setIsCompiling(true);
        setError(null);

        // Serialize MDX content
        const serialized = await serialize(mdxContent, {
          parseFrontmatter: false,
        });

        setCompiledSource(serialized);
      } catch (err) {
        console.error("MDX compilation error:", err);
        setError(err instanceof Error ? err.message : "Failed to compile MDX");
      } finally {
        setIsCompiling(false);
      }
    }

    compileMDX();
  }, [mdxContent]);

  if (isCompiling) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-32 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <p className="text-red-700 font-medium mb-2">Failed to render content</p>
        <p className="text-red-600 text-sm">{error}</p>
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer text-red-500">Show raw content</summary>
          <pre className="mt-2 p-4 bg-red-100 rounded text-xs overflow-auto">
            {mdxContent}
          </pre>
        </details>
      </div>
    );
  }

  if (!compiledSource) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      {title && (
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      )}

      {/* MDX Content */}
      <div className="p-6">
        <article className="prose prose-sm max-w-none">
          <MDXRemote {...compiledSource} components={mdxComponents} />
        </article>
      </div>

      {/* Suggested Actions */}
      {suggestedActions.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Suggested actions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onActionClick?.(action)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-emerald-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hook to handle MDX response tool results from the agent
 */
export function useMDXResponseHandler() {
  return {
    isValidMDXResponse: (result: unknown): result is { type: string; title: string; mdx: string; suggested_actions?: string[] } => {
      if (!result || typeof result !== "object") return false;
      const r = result as Record<string, unknown>;
      return r.type === "mdx_response" && typeof r.mdx === "string";
    },
  };
}
