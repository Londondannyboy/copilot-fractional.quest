"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCoAgent, useCopilotChat, useRenderToolCall, useHumanInTheLoop } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";
import {
  JobsBarChart, JobsPieChart, SalaryAreaChart,
  MarketDashboard, ArticlesGrid, ChartLoading
} from "@/components/charts";
import { ForceGraph3DComponent, ForceGraphLoading } from "@/components/ForceGraph3D";
import { A2UIRenderer, A2UILoading } from "@/components/a2ui-renderer";

import { HeroSection, InitialCharts, FAQSection, SEOContent, JobGrid } from "./index";
import { Job, JobStats } from "@/lib/jobs";
import { LondonSEOContent } from "@/lib/seo-content/london";
import { ImageCategory } from "@/lib/images";

// Generic SEO content type that matches the structure
export type LocationSEOContent = LondonSEOContent;

// Helper to convert annual salary to day rate (assuming ~220 working days)
function salaryToDayRate(salaryStr: string): string {
  const match = salaryStr.match(/£(\d+)k\s*-\s*£(\d+)k/);
  if (!match) return salaryStr;
  const minDay = Math.round((parseInt(match[1]) * 1000) / 220);
  const maxDay = Math.round((parseInt(match[2]) * 1000) / 220);
  return `£${minDay} - £${maxDay}/day`;
}

// Agent state type - extends base with page context
interface PageAgentState {
  jobs: { title: string; company: string; location: string }[];
  search_query: string;
  user?: {
    id: string;
    name: string;
    firstName?: string;
    email: string;
  };
  page_context?: {
    page_type: string;
    location_filter: string;
    total_jobs_on_page: number;
    top_roles: string[];
  };
}

interface JobPageClientProps {
  location: string;
  locationDisplay: string;
  initialJobs: Job[];
  stats: JobStats;
  seoContent: LondonSEOContent;
  imageCategory?: ImageCategory;
}

export function JobPageClient({
  location,
  locationDisplay,
  initialJobs,
  stats,
  seoContent,
  imageCategory,
}: JobPageClientProps) {
  // Auth
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || null;

  // Agent state with page context
  const { state, setState } = useCoAgent<PageAgentState>({
    name: "my_agent",
    initialState: {
      jobs: initialJobs.map((j) => ({
        title: j.title,
        company: j.company,
        location: j.location,
      })),
      search_query: "",
      page_context: {
        page_type: `jobs_${location}`,
        location_filter: locationDisplay,
        total_jobs_on_page: stats.total,
        top_roles: stats.topRoles.slice(0, 5).map((r) => r.role),
      },
    },
  });

  // Sync user to agent state (only when user changes)
  useEffect(() => {
    if (user && !state?.user) {
      setState((prev) => ({
        jobs: prev?.jobs ?? [],
        search_query: prev?.search_query ?? "",
        page_context: prev?.page_context,
        user: {
          id: user.id,
          name: user.name || "",
          firstName: firstName || undefined,
          email: user.email || "",
        },
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Chat integration
  const { appendMessage } = useCopilotChat();

  // Pre-rendered initial jobs component for instant display
  const InitialJobsPreview = useCallback(() => {
    const topJobs = initialJobs.slice(0, 2);
    if (topJobs.length === 0) return null;

    return (
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">🔥 Hot in {locationDisplay}</span>
        </div>
        <div className="grid gap-3">
          {topJobs.map((job, i) => (
            <div key={i} className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{job.location}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-green-600">
                  £{Math.round((job.salaryMin || 150000) / 220)} - £{Math.round((job.salaryMax || 200000) / 220)}/day
                </span>
                <span className="text-xs text-gray-400">
                  (£{Math.round((job.salaryMin || 150000) / 1000)}k - £{Math.round((job.salaryMax || 200000) / 1000)}k/yr)
                </span>
              </div>
              {job.description && <p className="text-sm text-gray-600 mb-3">{job.description.slice(0, 100)}...</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }, [initialJobs, locationDisplay]);

  // User interest graph state
  const [userGraphData, setUserGraphData] = useState<{ nodes: any[]; edges: any[] } | null>(null);

  // Fetch user graph on mount if logged in - using clean ontological entities
  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/zep-context?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        const nodes: any[] = [{ id: 'user', type: 'user', label: firstName || 'You' }];
        const edges: any[] = [];
        let nodeIdx = 0;

        // Add clean entities from categorized API response
        const { entities } = data;
        if (entities) {
          // Add role nodes
          entities.roles?.forEach((role: string) => {
            const id = `role_${nodeIdx++}`;
            nodes.push({ id, type: 'role', label: role.slice(0, 30) });
            edges.push({ source: 'user', target: id, label: 'interested in' });
          });

          // Add location nodes
          entities.locations?.forEach((loc: string) => {
            const id = `loc_${nodeIdx++}`;
            nodes.push({ id, type: 'location', label: loc.slice(0, 30) });
            edges.push({ source: 'user', target: id, label: 'prefers' });
          });

          // Add interest nodes (limit to avoid clutter)
          entities.interests?.slice(0, 4).forEach((interest: string) => {
            const id = `int_${nodeIdx++}`;
            nodes.push({ id, type: 'interest', label: interest.slice(0, 30) });
            edges.push({ source: 'user', target: id, label: 'wants' });
          });

          // Add experience nodes (limit to 2)
          entities.experiences?.slice(0, 2).forEach((exp: string) => {
            const id = `exp_${nodeIdx++}`;
            nodes.push({ id, type: 'skill', label: exp.slice(0, 30) });
            edges.push({ source: 'user', target: id, label: 'has' });
          });
        }

        // Only show graph if we have data beyond just the user node
        if (nodes.length > 1) {
          setUserGraphData({ nodes, edges });
        }
      })
      .catch(e => console.warn('Failed to fetch user graph:', e));
  }, [user?.id, firstName]);

  // Handle voice messages - forward to CopilotKit AND store to Zep for memory
  const handleVoiceMessage = useCallback(
    (text: string, role: "user" | "assistant" = "user") => {
      console.log(`🎤 Voice (${role}):`, text.slice(0, 100) + (text.length > 100 ? '...' : ''));

      // Store message to Zep for persistent memory (fire-and-forget, don't block)
      if (user?.id && text.length > 5) {
        fetch('/api/zep-store', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            role: role,
            content: text,
            // Include page context in metadata for richer memory
            metadata: { page: `jobs_${location}`, location: locationDisplay }
          }),
        }).catch(e => console.warn('Failed to store to Zep:', e));
      }

      const messageRole = role === "user" ? Role.User : Role.Assistant;
      appendMessage(new TextMessage({ content: text, role: messageRole }));
    },
    [appendMessage, user?.id, location, locationDisplay]
  );

  // ===== AG-UI Tool Renderers =====
  // These render rich UI when the agent calls tools

  useRenderToolCall({
    name: "show_jobs_chart",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading role distribution..." />;
      return <JobsBarChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_location_chart",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading location data..." />;
      return <JobsPieChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_salary_insights",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading salary insights..." />;
      return <SalaryAreaChart data={result.chartData || []} title={result.title} subtitle={result.subtitle} />;
    },
  }, []);

  useRenderToolCall({
    name: "show_market_dashboard",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading market dashboard..." />;
      return <MarketDashboard data={result} />;
    },
  }, []);

  useRenderToolCall({
    name: "get_featured_articles",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Loading articles..." />;
      return <ArticlesGrid articles={result.articles || []} title={result.title} />;
    },
  }, []);

  // Search Jobs - Render job cards in chat
  useRenderToolCall({
    name: "search_jobs",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Searching jobs..." />;

      const jobs = result.jobs || [];
      if (jobs.length === 0) {
        return (
          <div className="p-4 bg-gray-50 rounded-lg text-gray-600">
            No jobs found for "{result.query}" in {locationDisplay}
          </div>
        );
      }

      return (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">{result.title}</h3>
          <div className="grid gap-3">
            {jobs.map((job: { title: string; company: string; location: string; salary: string; description: string; url: string }, i: number) => (
              <div key={i} className="p-4 bg-white rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-600">{job.company}</p>
                  </div>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{job.location}</span>
                </div>
                {/* Show both day rate and annual salary */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-semibold text-green-600">{salaryToDayRate(job.salary)}</span>
                  <span className="text-xs text-gray-400">({job.salary}/yr)</span>
                </div>
                {job.description && <p className="text-sm text-gray-600 mb-3">{job.description}</p>}
                <div className="flex gap-2">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
  }, [locationDisplay]);

  // A2UI Widgets
  useRenderToolCall({
    name: "show_a2ui_job_card",
    render: ({ result, status }) => {
      if (status !== "complete" || !result?.a2ui) return <A2UILoading title="Rendering..." />;
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
      if (status !== "complete" || !result?.a2ui) return <A2UILoading title="Rendering..." />;
      return (
        <div className="space-y-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">A2UI Widget</span>
          <A2UIRenderer widget={result.a2ui} />
        </div>
      );
    },
  }, []);

  // 3D Force Graph - User's Interest Graph from Zep memory
  useRenderToolCall({
    name: "show_user_graph",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ForceGraphLoading title="Building your interest graph..." />;
      return (
        <div className="space-y-2">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">3D Interest Graph</span>
          <ForceGraph3DComponent data={result} height={400} />
        </div>
      );
    },
  }, []);

  // Human-in-the-Loop: Confirm job interest and add to Zep memory
  useHumanInTheLoop({
    name: "confirm_job_interest",
    description: "Ask user to confirm interest in a job role/location",
    parameters: [
      { name: "job_title", type: "string", description: "The job title", required: true },
      { name: "company", type: "string", description: "The company name", required: true },
      { name: "location", type: "string", description: "The job location", required: true },
      { name: "role_type", type: "string", description: "Role type (CTO, CFO, etc)", required: false },
    ],
    render: ({ args, respond, status, result }) => {
      if (status === "executing" && respond) {
        return (
          <div className="p-4 bg-white rounded-lg shadow-lg border border-green-200 max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Add to Your Interests?
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="font-medium text-gray-800">{args.job_title}</p>
              <p className="text-sm text-gray-600">{args.company}</p>
              <p className="text-sm text-gray-500">📍 {args.location}</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Should I remember that you're interested in {args.role_type || 'this role'} roles in {args.location}?
            </p>
            <div className="flex gap-2">
              <button
                onClick={async () => {
                  // Store interest in Zep
                  if (user?.id) {
                    await fetch('/api/zep-store', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        userId: user.id,
                        role: 'user',
                        content: `I'm interested in ${args.role_type || args.job_title} roles in ${args.location}. I liked the ${args.job_title} position at ${args.company}.`,
                      }),
                    });
                  }
                  respond({ confirmed: true, role_type: args.role_type, location: args.location });
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ✓ Yes, remember this
              </button>
              <button
                onClick={() => respond({ confirmed: false })}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
        );
      }

      if (status === "complete" && result) {
        return (
          <div className="p-2 text-sm bg-green-50 rounded-lg">
            {result.confirmed
              ? `✨ Great! I'll remember you're interested in ${result.role_type || 'these'} roles in ${result.location}.`
              : "👍 No problem!"}
          </div>
        );
      }

      return <></>;
    },
  });

  // Dynamic suggestions based on location
  const suggestions = [
    {
      title: "Show all jobs",
      message: `Show me all fractional jobs in ${locationDisplay}`,
    },
    {
      title: "CTO roles",
      message: `Find CTO positions in ${locationDisplay}`,
    },
    {
      title: "Day rates",
      message: `What are typical day rates in ${locationDisplay}?`,
    },
    {
      title: "Compare locations",
      message: `How does ${locationDisplay} compare to Remote roles?`,
    },
  ];

  return (
    <main
      style={{ "--copilot-kit-primary-color": "#6366f1" } as CopilotKitCSSProperties}
    >
      <CopilotSidebar
        instructions={`## Page Context: ${locationDisplay.toUpperCase()} JOBS

You're helping someone explore **${stats.total} fractional roles** in ${locationDisplay}.

**What's here:**
${stats.topRoles.slice(0, 3).map((r) => `- ${r.role}: ${r.count} positions`).join("\n")}

**Featured roles:**
${initialJobs.slice(0, 2).map(j => `- ${j.title} at ${j.company}`).join("\n")}

**Your approach:**
1. When they say "jobs here" or "these roles" → they mean ${locationDisplay}
2. Reference actual job titles: "${initialJobs[0]?.title || 'CTO'}" not generic roles
3. Be specific: "We have ${stats.total} roles here in ${locationDisplay}..."
4. After showing jobs → suggest a salary chart or market dashboard
5. Always mention day rates alongside annual salaries`}
        labels={{
          title: `${locationDisplay} Jobs AI`,
          initial: stats.total > 0
            ? (firstName
              ? `Hey ${firstName}! 👋\n\n🔥 I see **${stats.total} fractional roles** here in ${locationDisplay}${stats.topRoles.length > 0 ? ` — including ${stats.topRoles[0]?.role} and ${stats.topRoles[1]?.role} positions` : ''}.\n\n✨ What catches your eye?`
              : `Welcome! 🚀\n\n📍 There are **${stats.total} fractional executive roles** right here in ${locationDisplay}.\n\nAsk me about specific roles, day rates, or I can show you some charts! 📊`)
            : `Welcome to ${locationDisplay} Jobs! 👋\n\nLet me help you discover fractional executive opportunities here.`,
        }}
        suggestions={suggestions}
        clickOutsideToClose={false}
      >
        {/* Hero with Voice */}
        <HeroSection
          headline={seoContent.hero.headline}
          subtitle={seoContent.hero.subtitle}
          stats={stats}
          location={locationDisplay}
          imageCategory={imageCategory}
          firstName={firstName}
          userId={user?.id}
          onVoiceMessage={handleVoiceMessage}
        />

        {/* User Interest Graph - show if logged in with data */}
        {user && userGraphData && userGraphData.nodes.length > 1 && (
          <section className="py-8 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="container-content">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Interest Profile</h2>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">✨ Built from your conversations</span>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-4">
                <ForceGraph3DComponent
                  data={userGraphData}
                  height={300}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This graph grows as we learn about your interests. Ask me about roles you like!
              </p>
            </div>
          </section>
        )}

        {/* Charts - render immediately from server data */}
        <InitialCharts stats={stats} location={locationDisplay} />

        {/* Job Grid */}
        <JobGrid jobs={initialJobs} title={`${locationDisplay} Opportunities`} />

        {/* SEO Content */}
        <SEOContent content={seoContent.content} />

        {/* FAQ */}
        <FAQSection faqs={seoContent.faqs} location={locationDisplay} />
      </CopilotSidebar>
    </main>
  );
}
