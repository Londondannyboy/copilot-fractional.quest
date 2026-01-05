"use client";

import { JobsCard } from "@/components/jobs";
import {
  JobsBarChart, JobsPieChart, SalaryAreaChart,
  MarketDashboard, ArticlesGrid, ChartLoading
} from "@/components/charts";
import { A2UIRenderer, A2UILoading } from "@/components/a2ui-renderer";
import { VoiceInput } from "@/components/voice-input";
import { AgentState } from "@/lib/types";
import { useCoAgent, useRenderToolCall, useCopilotChat } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { useState, useCallback } from "react";

export default function CopilotKitPage() {
  const [themeColor, setThemeColor] = useState("#6366f1");

  return (
    <main style={{ "--copilot-kit-primary-color": themeColor } as CopilotKitCSSProperties}>
      <CopilotSidebar
        disableSystemMessage={true}
        clickOutsideToClose={false}
        labels={{
          title: "Fractional AI",
          initial: "Welcome! Use voice or text to explore jobs, charts, and A2UI widgets. Powered by Hume + CopilotKit + AG-UI + A2UI!",
        }}
        suggestions={[
          { title: "A2UI Job Card", message: "Show me an A2UI job card for a CTO position" },
          { title: "Market Dashboard", message: "Show me the market dashboard" },
          { title: "Salary Chart", message: "What are fractional executive salary ranges?" },
          { title: "Featured Articles", message: "Show featured articles with images" },
        ]}
      >
        <YourMainContent themeColor={themeColor} />
      </CopilotSidebar>
    </main>
  );
}

function YourMainContent({ themeColor }: { themeColor: string }) {
  const { state } = useCoAgent<AgentState>({
    name: "my_agent",
    initialState: { jobs: [], search_query: "" },
  });

  // CopilotKit chat hook for voice integration
  const { appendMessage } = useCopilotChat();

  // Handle voice input → send to CopilotKit
  const handleVoiceMessage = useCallback((text: string) => {
    console.log("🎤 Voice:", text);
    appendMessage(new TextMessage({ content: text, role: Role.User }));
  }, [appendMessage]);

  // AG-UI Generative UI: Charts
  useRenderToolCall({
    name: "show_jobs_chart",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading..." />;
      return <JobsBarChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_location_chart",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading..." />;
      return <JobsPieChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_salary_insights",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading..." />;
      return <SalaryAreaChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_market_dashboard",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading..." />;
      return <MarketDashboard data={result} />;
    },
  }, []);

  useRenderToolCall({
    name: "get_featured_articles",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading..." />;
      return <ArticlesGrid articles={result.articles || []} title={result.title} />;
    },
  }, []);

  // A2UI Widgets
  useRenderToolCall({
    name: "show_a2ui_job_card",
    render: ({ result, status }) => {
      if (status !== "complete" || !result?.a2ui) return <A2UILoading title="Rendering A2UI..." />;
      return (
        <div className="space-y-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">A2UI Widget</span>
          <A2UIRenderer widget={result.a2ui} />
        </div>
      );
    },
  }, []);

  useRenderToolCall({
    name: "show_a2ui_stats_widget",
    render: ({ result, status }) => {
      if (status !== "complete" || !result?.a2ui) return <A2UILoading title="Rendering A2UI..." />;
      return (
        <div className="space-y-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">A2UI Widget</span>
          <A2UIRenderer widget={result.a2ui} />
        </div>
      );
    },
  }, []);

  return (
    <div
      style={{ backgroundColor: themeColor }}
      className="min-h-screen flex justify-center items-center flex-col transition-colors duration-300 p-8"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Fractional Executive Platform
        </h1>
        <p className="text-white/80 text-lg mb-4">
          Voice + Chat powered by the full stack
        </p>
        <div className="flex gap-2 justify-center flex-wrap mb-6">
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">Hume Voice</span>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">CopilotKit</span>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">AG-UI</span>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">A2UI</span>
          <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur">Neon DB</span>
        </div>

        {/* Voice Input Button */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <VoiceInput onMessage={handleVoiceMessage} />
          <p className="text-white/60 text-sm">Tap to speak</p>
        </div>
      </div>

      <JobsCard state={state} />

      {/* Architecture diagram */}
      <div className="mt-8 text-center text-white/50 text-xs max-w-md">
        <p className="font-mono">
          Voice (Hume) → CopilotKit → AG-UI → Pydantic Agent → Neon DB → A2UI/Charts
        </p>
      </div>
    </div>
  );
}
