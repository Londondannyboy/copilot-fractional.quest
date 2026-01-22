"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCoAgent, useCopilotChat, useRenderToolCall, useHumanInTheLoop } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { CopilotProvider } from "@/components/CopilotProvider";
import { authClient } from "@/lib/auth/client";
import {
  JobsBarChart, JobsPieChart, SalaryAreaChart,
  MarketDashboard, ArticlesGrid, ChartLoading
} from "@/components/charts";
// ForceGraph3D removed for performance - 3D visualizations disabled
import { A2UIRenderer, A2UILoading } from "@/components/a2ui-renderer";
import { ExpertProfile, ExpertProfileSchema } from "@/components/ExpertProfile";
import { CaseStudy, CaseStudySchema } from "@/components/CaseStudy";
import { Testimonials, TestimonialsSchema } from "@/components/Testimonials";
import { LazyYouTube } from "@/components/LazyYouTube";
import { EmbeddedJobBoard } from "@/components/EmbeddedJobBoard";
import { HotJobs } from "@/components/HotJobs";
import { EmailCapture } from "@/components/EmailCapture";
import { AgentMDXRenderer } from "@/components/AgentMDXRenderer";
import { ProfileCard } from "@/components/ProfileCard";

// Dynamic imports for heavy components (lazy loading for LCP optimization)
import dynamic from "next/dynamic";

// Calculator and chart components - only load when scrolled into view
const RoleCalculator = dynamic(
  () => import("@/components/RoleCalculator").then(mod => ({ default: mod.RoleCalculator })),
  { ssr: false, loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl" /> }
);
const SavingsCalculator = dynamic(
  () => import("@/components/SavingsCalculator").then(mod => ({ default: mod.SavingsCalculator })),
  { ssr: false, loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-xl" /> }
);
const SkillsDemandChart = dynamic(
  () => import("@/components/SkillsDemandChart").then(mod => ({ default: mod.SkillsDemandChart })),
  { ssr: false, loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-xl" /> }
);
const RoleComparisonTool = dynamic(
  () => import("@/components/RoleComparisonTool").then(mod => ({ default: mod.RoleComparisonTool })),
  { ssr: false, loading: () => <div className="h-72 bg-gray-100 animate-pulse rounded-xl" /> }
);

// Personalized MDX-style components (show when user logged in)
const PersonalizedHero = dynamic(() => import("@/components/mdx/PersonalizedHero"), { ssr: false });
const SalaryBenchmarkChart = dynamic(() => import("@/components/mdx/SalaryBenchmarkChart"), { ssr: false });
const CareerTimeline = dynamic(() => import("@/components/mdx/CareerTimeline"), { ssr: false });
const MarketOverview = dynamic(() => import("@/components/mdx/MarketOverview"), { ssr: false });
const CopilotMainPanel = dynamic(() => import("@/components/mdx/CopilotMainPanel"), { ssr: false });

import { HeroSection, InitialCharts, FAQSection, SEOContent } from "./index";
import { Job, JobStats } from "@/lib/jobs";
import { ImageCategory } from "@/lib/images";
import { HeyCompanies } from "@/components/HeyCompanies";
import { MarketStatistics } from "@/components/MarketStatistics";
import { AuthorityLinks } from "@/components/AuthorityLinks";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { LiveMarketPulse } from "@/components/LiveMarketPulse";

// Flexible SEO content interface that works with both enriched and basic pages
// Only requires the fields that JobPageClient actually uses
export interface LocationSEOContent {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  breadcrumb: Array<{ name: string; url: string }>;
  hero: {
    headline: string;
    subtitle: string;
    stats: {
      avgDayRate: string;
      hubStatus: string;
      hybridOptions: string;
    };
  };
  content: {
    whyLocation: {
      title: string;
      paragraphs: string[];
    };
    dayRates: {
      title: string;
      description: string;
      rates: Array<{ role: string; range: string; typical: string; annual?: string }>;
    };
    locations: {
      title: string;
      areas: Array<{ name: string; description: string; sectors?: string[] }>;
    };
    emergingRoles: {
      title: string;
      roles: Array<{ title: string; description: string; rate?: string }>;
    };
    futureOutlook?: {
      title: string;
      paragraphs: string[];
    };
    [key: string]: unknown; // Allow additional content sections
  };
  faqs: Array<{ question: string; answer: string }>;
  schema: {
    organization: {
      "@type": string;
      name: string;
      url: string;
    };
  };
  // Optional enriched fields
  authorityLinks?: Array<{ name: string; url: string; context: string }>;
  statistics?: Record<string, { value: string; description: string; source: string }>;
  relatedPages?: Array<{ name: string; url: string }>;
}

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
  seoContent: LocationSEOContent;
  imageCategory?: ImageCategory;
  // Personalized section options (enhanced experience when user logged in)
  enablePersonalizedSections?: boolean;  // Master toggle for personalized content
  targetRole?: string;                   // Role for salary benchmark (e.g., "CMO", "CTO")
  showEmbeddedChat?: boolean;            // Show CopilotMainPanel in content area
  userDayRate?: number;                  // User's current day rate for comparison
  // Job filtering options
  roleCategory?: string;                 // Filter jobs by category (Finance, Engineering, Marketing, etc.)
  hideMoreOpportunities?: boolean;       // Hide the "More Opportunities" sidebar section
}

// Outer component that provides CopilotKit context
export function JobPageClient(props: JobPageClientProps) {
  return (
    <CopilotProvider>
      <JobPageClientInner {...props} />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks (must be inside CopilotProvider)
function JobPageClientInner({
  location,
  locationDisplay,
  initialJobs,
  stats,
  seoContent,
  imageCategory,
  enablePersonalizedSections = true,
  targetRole,
  showEmbeddedChat = false,
  userDayRate,
  roleCategory,
  hideMoreOpportunities = false,
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
                <span className="text-sm font-semibold text-green-700">
                  £{Math.round((job.salaryMin || 150000) / 220)} - £{Math.round((job.salaryMax || 200000) / 220)}/day
                </span>
                <span className="text-xs text-gray-500">
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
                  <span className="text-sm font-semibold text-green-700">{salaryToDayRate(job.salary)}</span>
                  <span className="text-xs text-gray-500">({job.salary}/yr)</span>
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

  // 3D Force Graph removed for performance optimization
  // show_user_graph tool disabled

  // MDX Response Renderer - Agent can compose rich UI with MDX components
  useRenderToolCall({
    name: "compose_mdx_response",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) {
        return (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        );
      }

      // Render the MDX content with the AgentMDXRenderer
      return (
        <AgentMDXRenderer
          mdxContent={result.mdx || ""}
          title={result.title}
          suggestedActions={result.suggested_actions || []}
          onActionClick={(action) => {
            // Send the action as a new message to the chat
            console.log("User clicked suggested action:", action);
          }}
        />
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

        {/* Live Market Pulse - Animated stats bar */}
        <LiveMarketPulse location={locationDisplay} />

        {/* Personalized Insights Section - Enhanced experience for logged-in users */}
        {user && enablePersonalizedSections && (
          <section className="py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Personalized Insights
                </h2>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  Tailored for {firstName || "you"}
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Card - Compact sidebar showing user's saved profile */}
                <div className="lg:col-span-1">
                  <ProfileCard />
                </div>

                {/* Main insights - 2 columns */}
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                {/* Market Overview */}
                <div>
                  <MarketOverview
                    location={locationDisplay}
                    role={targetRole || stats.topRoles?.[0]?.role || "Executive"}
                  />
                </div>

                {/* Salary Benchmark */}
                <div>
                  <SalaryBenchmarkChart
                    role={targetRole || stats.topRoles?.[0]?.role || "CFO"}
                    location={locationDisplay}
                    yourRate={userDayRate || 1000}
                  />
                </div>
                </div>
              </div>

              {/* Career Timeline - full width */}
              {targetRole && (
                <div className="mt-8">
                  <CareerTimeline
                    currentRole={`${targetRole} Professional`}
                    targetRole={`Fractional ${targetRole}`}
                    userName={firstName || undefined}
                  />
                </div>
              )}

              {/* Embedded Chat Panel - optional */}
              {showEmbeddedChat && (
                <div className="mt-8">
                  <CopilotMainPanel
                    title={`Ask about ${locationDisplay} opportunities`}
                    suggestedQuestions={[
                      `What's the average day rate for ${targetRole || "executives"} in ${locationDisplay}?`,
                      `Show me ${targetRole || "senior"} jobs here`,
                      "How can I increase my rate?",
                      "What skills are most valuable?",
                    ]}
                    context={{
                      pageType: `jobs_${location}`,
                      location: locationDisplay,
                      role: targetRole,
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Charts - render immediately from server data */}
        <InitialCharts stats={stats} location={locationDisplay} />

        {/* Primary Job Board - Full Width, ABOVE Hot Jobs for role-specific pages */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <EmbeddedJobBoard
              defaultDepartment={roleCategory}
              defaultLocation={location === "london" ? "London" : ""}
              title={`Fractional Jobs ${locationDisplay}`}
              showFilters={true}
              jobsPerPage={9}
              accentColor="emerald"
            />
          </div>
        </section>

        {/* Hot Jobs + Calculator Section - Compact layout */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <HotJobs
                  location={location === "london" ? "London" : undefined}
                  department={roleCategory}
                  maxJobs={8}
                  title={`🔥 Hot ${locationDisplay} Jobs`}
                />
                {/* Rate Calculator - mobile responsive container */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                    Calculate Your {locationDisplay} Day Rate
                  </h3>
                  <RoleCalculator role="cfo" />
                </div>
              </div>
              <div className="space-y-6">
                <EmailCapture
                  variant="sidebar"
                  title="Get Job Alerts"
                  description={`New ${locationDisplay} fractional roles straight to your inbox.`}
                />
                {/* More Opportunities - only show if not hidden */}
                {!hideMoreOpportunities && (
                  <HotJobs
                    maxJobs={6}
                    title="🚀 More Opportunities"
                    className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100"
                  />
                )}
                {/* Quick Stats Card - fills remaining space */}
                <div className="bg-gray-900 text-white rounded-xl p-5">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span>📈</span>
                    {locationDisplay} Market Snapshot
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">£{stats.avgDayRate || 900}</p>
                      <p className="text-xs text-gray-500">Avg Day Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">{stats.total}</p>
                      <p className="text-xs text-gray-500">Active Jobs</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">{stats.topRoles?.[0]?.count || 0}</p>
                      <p className="text-xs text-gray-500">{stats.topRoles?.[0]?.role || 'Top'} Roles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">78%</p>
                      <p className="text-xs text-gray-500">Remote Options</p>
                    </div>
                  </div>
                </div>
                {/* Book a Call CTA */}
                <a
                  href="/book-call"
                  className="block bg-gradient-to-br from-orange-500 via-rose-500 to-purple-600 rounded-xl p-5 text-white hover:opacity-95 transition-opacity"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <h3 className="font-bold">Talk to an Expert</h3>
                      <p className="text-white/80 text-sm">Free 15-min consultation</p>
                    </div>
                  </div>
                  <span className="inline-block bg-white/20 px-4 py-2 rounded-lg text-sm font-medium">
                    Book a Call →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hey Companies - Employer CTA */}
        <HeyCompanies location={locationDisplay} />

        {/* AI Insights Panel - Interactive CopilotKit integration */}
        <AIInsightsPanel
          location={locationDisplay}
          initialPrompts={[
            `What's the ${locationDisplay} market like?`,
            "Show me salary trends",
            "Compare roles by day rate",
            "What skills are in demand?",
          ]}
        />

        {/* Quick Links Bar - Horizontal, no white space */}
        <section className="py-8 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="text-sm text-gray-500 font-medium">Quick Links:</span>
              <a href="/fractional-cfo-jobs-uk" className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors">💰 CFO Jobs</a>
              <a href="/fractional-cto-jobs-uk" className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">💻 CTO Jobs</a>
              <a href="/fractional-cmo-jobs-uk" className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium hover:bg-pink-100 transition-colors">📣 CMO Jobs</a>
              <a href="/fractional-coo-jobs-uk" className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-100 transition-colors">⚙️ COO Jobs</a>
              <a href="/remote-fractional-jobs" className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors">🏠 Remote Jobs</a>
            </div>
          </div>
        </section>

        {/* Market Statistics */}
        {seoContent.statistics && Object.keys(seoContent.statistics).length > 0 && (
          <MarketStatistics
            statistics={seoContent.statistics}
            title={`${locationDisplay} Fractional Market in Numbers`}
            location={locationDisplay}
          />
        )}

        {/* SEO Content */}
        <SEOContent content={seoContent.content} />

        {/* Skills Demand Chart - Visual skills analysis */}
        <SkillsDemandChart location={locationDisplay} />


        {/* Savings Calculator */}
        <SavingsCalculator location={locationDisplay} />

        {/* YouTube Videos */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Fractional Executive Insights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <LazyYouTube videoId="zxMG2m6yLdc" title="Fractional Executive Jobs - Market Overview" />
                <p className="text-sm text-gray-600 mt-2">Market Overview for Fractional Executives</p>
              </div>
              <div>
                <LazyYouTube videoId="m8UOqjRRHHk" title="How to Build a Portfolio Career" />
                <p className="text-sm text-gray-600 mt-2">Building a Portfolio Career in {locationDisplay}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authority Links */}
        {seoContent.authorityLinks && seoContent.authorityLinks.length > 0 && (
          <AuthorityLinks
            links={seoContent.authorityLinks}
            title="Trusted Industry Resources"
            location={locationDisplay}
          />
        )}

        {/* Role Comparison Tool - Interactive comparison */}
        <RoleComparisonTool />

        {/* Case Study */}
        <CaseStudy />
        <CaseStudySchema />

        {/* Testimonials - Client Success Stories */}
        <Testimonials variant="carousel" />
        <TestimonialsSchema />

        {/* FAQ */}
        <FAQSection faqs={seoContent.faqs} location={locationDisplay} />

        {/* Expert Profile */}
        <ExpertProfile />
        <ExpertProfileSchema />
      </CopilotSidebar>
    </main>
  );
}
