"use client";

import { ReactNode, useEffect } from "react";
import { CopilotKit, useCoAgent, useRenderToolCall } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import dynamic from "next/dynamic";
import { Job } from "@/lib/jobs";

// Lazy load chart components for render tool calls
const JobsBarChart = dynamic(
  () => import("@/components/charts").then((mod) => mod.JobsBarChart),
  { ssr: false }
);
const SalaryAreaChart = dynamic(
  () => import("@/components/charts").then((mod) => mod.SalaryAreaChart),
  { ssr: false }
);
const MarketDashboard = dynamic(
  () => import("@/components/charts").then((mod) => mod.MarketDashboard),
  { ssr: false }
);

// Chart loading component
function ChartLoading({ title }: { title: string }) {
  return (
    <div className="animate-pulse bg-gray-100 rounded-xl p-4 h-48 flex items-center justify-center">
      <span className="text-gray-500 text-sm">{title}</span>
    </div>
  );
}

// Agent state type
interface AgentState {
  jobs: Job[];
  search_query: string;
  user: {
    id: string;
    name: string;
    firstName?: string;
    email?: string;
  } | null;
}

interface CopilotKitWrapperProps {
  children: ReactNode;
  instructions?: string;
  title?: string;
  initialMessage?: string;
  accentColor?: string;
  initialJobs?: Job[];
  onLoad?: () => void;
}

/**
 * Inner component that uses CopilotKit hooks
 * Must be inside CopilotKit provider
 */
function CopilotKitInner({
  children,
  instructions,
  title,
  initialMessage,
  initialJobs = [],
  onLoad,
}: CopilotKitWrapperProps) {
  // CopilotKit agent state
  useCoAgent<AgentState>({
    name: "my_agent",
    initialState: {
      jobs: initialJobs,
      search_query: "",
      user: null,
    },
  });

  // Render tool results as UI
  useRenderToolCall({
    name: "search_jobs",
    render: ({ result, status }: { result: any; status: string }) => {
      if (status === "executing") return <ChartLoading title="Searching jobs..." />;
      if (!result?.jobs) return <></>;
      return (
        <div className="space-y-3 max-w-md">
          <h4 className="font-semibold text-gray-900">{result.title || 'Job Results'}</h4>
          {result.jobs.slice(0, 5).map((job: Job, index: number) => (
            <a
              key={job.id || index}
              href={`/fractional-jobs-uk`}
              className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-gray-900 text-sm">{job.title}</div>
              <div className="text-xs text-gray-500 mt-1">{job.company} • {job.location}</div>
            </a>
          ))}
          {result.jobs.length > 5 && (
            <p className="text-xs text-gray-500 text-center">+{result.jobs.length - 5} more jobs</p>
          )}
        </div>
      );
    },
  });

  useRenderToolCall({
    name: "show_jobs_bar_chart",
    render: ({ result, status }: { result: any; status: string }) => {
      if (status === "executing") return <ChartLoading title="Loading chart..." />;
      if (!result?.data) return <></>;
      return <JobsBarChart data={result.data} title={result.title} />;
    },
  });

  useRenderToolCall({
    name: "show_salary_area_chart",
    render: ({ result, status }: { result: any; status: string }) => {
      if (status === "executing") return <ChartLoading title="Loading salary data..." />;
      if (!result?.data) return <></>;
      return <SalaryAreaChart data={result.data} title={result.title} />;
    },
  });

  useRenderToolCall({
    name: "show_market_dashboard",
    render: ({ result, status }: { result: any; status: string }) => {
      if (status === "executing") return <ChartLoading title="Loading dashboard..." />;
      if (!result) return <></>;
      return <MarketDashboard data={result} />;
    },
  });

  // Notify parent when loaded
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <CopilotSidebar
      instructions={instructions}
      labels={{
        title: title || "Fractional AI",
        initial: initialMessage || "Hi! How can I help you today?",
      }}
      defaultOpen={false}
      clickOutsideToClose={true}
      className="z-50"
    >
      {children}
    </CopilotSidebar>
  );
}

/**
 * CopilotKitWrapper - Wraps content with CopilotKit provider and sidebar
 *
 * This component is lazy loaded so it doesn't block initial page render.
 * The hero section renders immediately, then this loads and enhances the page.
 */
export function CopilotKitWrapper(props: CopilotKitWrapperProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="my_agent">
      <CopilotKitInner {...props} />
    </CopilotKit>
  );
}

export default CopilotKitWrapper;
