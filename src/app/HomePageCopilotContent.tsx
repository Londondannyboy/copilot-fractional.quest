"use client";

// This component contains all CopilotKit-dependent code
// It's dynamically imported by HomePageClient only when user is signed in
// This prevents loading the ~1MB CopilotKit bundle for non-signed-in users

import {
  JobsBarChart, JobsPieChart, SalaryAreaChart,
  MarketDashboard, ArticlesGrid, ChartLoading
} from "@/components/charts";
import { A2UIRenderer, A2UILoading } from "@/components/a2ui-renderer";
import { VoiceInput } from "@/components/voice-input";
import { OnboardingWizard } from "@/components/onboarding";

import { AgentState } from "@/lib/types";
import { CopilotProvider } from "@/components/CopilotProvider";
import { useCoAgent, useRenderToolCall, useCopilotChat, useHumanInTheLoop } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { UserButton } from "@neondatabase/auth/react/ui";
import { usePathname } from "next/navigation";

// Calculate onboarding step based on profile items
interface ProfileItemForStep {
  item_type: string
  value: string
}

function calculateOnboardingStep(items: ProfileItemForStep[]): number {
  const has = (type: string) => items.some(i => i.item_type === type);

  if (!has('trinity')) return 1;
  if (!has('employment_status')) return 2;
  if (!has('professional_vertical')) return 3;
  if (!has('location')) return 4;
  if (!has('role_preference') || !has('experience_level')) return 5;
  return 6; // Complete
}

// Dynamic suggestions based on context
function useDynamicSuggestions(state: AgentState, lastQuery: string) {
  return useMemo(() => {
    const suggestions = [];
    const query = lastQuery.toLowerCase();

    // If they searched for a role, suggest related actions
    if (query.includes('cto') || state.search_query?.includes('CTO')) {
      suggestions.push({ title: "CTO Salaries", message: "What are CTO salary ranges?" });
      suggestions.push({ title: "CFO Jobs", message: "Show me CFO positions" });
      suggestions.push({ title: "Tech Market", message: "Show the market dashboard" });
    } else if (query.includes('cfo') || state.search_query?.includes('CFO')) {
      suggestions.push({ title: "CFO Salaries", message: "What are CFO salary ranges?" });
      suggestions.push({ title: "CTO Jobs", message: "Show me CTO positions" });
      suggestions.push({ title: "Finance Articles", message: "Show featured articles" });
    } else if (query.includes('chart') || query.includes('visual')) {
      suggestions.push({ title: "Location Chart", message: "Show jobs by location" });
      suggestions.push({ title: "Role Distribution", message: "Show role distribution chart" });
      suggestions.push({ title: "Search Jobs", message: "Find me CMO roles in London" });
    } else if (state.jobs?.length > 0) {
      // They have jobs loaded - suggest deeper exploration
      suggestions.push({ title: "Salary Insights", message: "What are the salary ranges?" });
      suggestions.push({ title: "Job Details", message: "Tell me more about the first job" });
      suggestions.push({ title: "Location Chart", message: "Show jobs by location" });
    } else {
      // Default suggestions
      suggestions.push({ title: "CTO Jobs", message: "Show me CTO positions" });
      suggestions.push({ title: "Market Dashboard", message: "Show the market dashboard" });
      suggestions.push({ title: "Salary Chart", message: "What are executive salary ranges?" });
      suggestions.push({ title: "Featured Articles", message: "Show featured articles" });
    }

    return suggestions.slice(0, 4);
  }, [state.jobs, state.search_query, lastQuery]);
}

interface HomePageCopilotContentProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
  firstName: string | null;
}

export default function HomePageCopilotContent({ user, firstName }: HomePageCopilotContentProps) {
  const [lastQuery, setLastQuery] = useState("");

  return (
    <CopilotProvider>
      {/* SEO H1 - Visually hidden but accessible to crawlers */}
      <h1 className="sr-only">Fractional Executive Jobs UK - AI-Powered Job Search Platform</h1>

      <main style={{ "--copilot-kit-primary-color": "#6366f1" } as CopilotKitCSSProperties}>
        <YourMainContent
          lastQuery={lastQuery}
          setLastQuery={setLastQuery}
          user={user}
          firstName={firstName}
        />
      </main>
    </CopilotProvider>
  );
}

function YourMainContent({ lastQuery, setLastQuery, user, firstName }: {
  lastQuery: string;
  setLastQuery: (q: string) => void;
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
  firstName: string | null;
}) {
  // Get current page path for context
  const pathname = usePathname();

  // Parse pathname to human-readable page context
  const getPageContext = (path: string): string => {
    if (path === "/" || path === "") return "Homepage - main job search and profile view";
    if (path === "/dashboard") return "Dashboard - managing messages, connections, and profile";
    if (path.includes("fractional-jobs-london")) return "London Jobs page - focused on London fractional executive positions";
    if (path.includes("fractional-cto")) return "CTO Jobs page - focused on Chief Technology Officer roles";
    if (path.includes("fractional-cfo")) return "CFO Jobs page - focused on Chief Financial Officer roles";
    if (path.includes("fractional-cmo")) return "CMO Jobs page - focused on Chief Marketing Officer roles";
    if (path.includes("fractional-coo")) return "COO Jobs page - focused on Chief Operating Officer roles";
    if (path.includes("fractional-chro")) return "CHRO Jobs page - focused on Chief HR Officer roles";
    if (path.includes("profile")) return "Profile page - viewing/editing user profile";
    return `Page: ${path}`;
  };

  const pageContext = getPageContext(pathname);

  const { state, setState } = useCoAgent<AgentState>({
    name: "my_agent",
    initialState: {
      jobs: [],
      search_query: "",
      user: undefined,
      scene: undefined,  // Dynamic background scene
    },
  });

  // Refresh trigger for live profile graph - increment to force update
  const [profileRefreshTrigger, setProfileRefreshTrigger] = useState(0);
  const refreshProfile = useCallback(() => {
    setProfileRefreshTrigger(prev => prev + 1);
    console.log("Profile refresh triggered");
  }, []);

  // Sync user to agent state when session changes
  // IMPORTANT: Always sync if user exists but state.user doesn't match (handles state resets)
  useEffect(() => {
    console.log("User sync effect - user:", user?.name, "state.user:", state.user?.name);
    if (user && (!state.user || state.user.id !== user.id)) {
      console.log("Setting user state:", { id: user.id, firstName, name: user.name, email: user.email });
      setState(prev => ({
        jobs: prev?.jobs ?? [],
        search_query: prev?.search_query ?? "",
        scene: prev?.scene,
        user: {
          id: user.id,
          name: user.name ? user.name : undefined,
          firstName: firstName ? firstName : undefined,
          email: user.email ? user.email : undefined,
          liked_jobs: prev?.user?.liked_jobs ?? [],
        }
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Dynamic suggestions based on context
  const suggestions = useDynamicSuggestions(state, lastQuery);

  // CopilotKit chat hook for voice integration
  const { appendMessage } = useCopilotChat();

  // Use ref for user.id to prevent callback recreation on auth complete
  const userIdRef = useRef<string | undefined>(user?.id);
  useEffect(() => {
    userIdRef.current = user?.id;
  }, [user?.id]);

  // Handle voice input → send to CopilotKit with correct role
  // Stable callback - uses refs to prevent recreation
  const handleVoiceMessage = useCallback((text: string, role: "user" | "assistant" = "user") => {
    console.log(`Voice (${role}):`, text.slice(0, 100) + (text.length > 100 ? '...' : ''));

    // Only track user queries for suggestions
    if (role === "user") {
      setLastQuery(text);
    }

    // Store message to Zep for memory (fire-and-forget, don't block)
    const currentUserId = userIdRef.current;
    if (currentUserId && text.length > 5) {
      fetch('/api/zep-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserId,
          role: role,
          content: text,
        }),
      }).catch(e => console.warn('Failed to store to Zep:', e));
    }

    // Send with correct role so Pydantic AI gets full conversation context
    const messageRole = role === "user" ? Role.User : Role.Assistant;
    appendMessage(new TextMessage({ content: text, role: messageRole }));
  }, [appendMessage, setLastQuery]); // Removed user?.id - using ref instead

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

  // Search Jobs - Render polished job cards in chat
  useRenderToolCall({
    name: "search_jobs",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Searching jobs..." />;

      const jobs = result.jobs || [];
      if (jobs.length === 0) {
        return (
          <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center">
            <span className="text-3xl mb-2 block">Search</span>
            <p className="text-gray-600 font-medium">No jobs found for "{result.query}"</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg">{result.title}</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              {jobs.length} found
            </span>
          </div>

          {/* Job Cards */}
          <div className="space-y-3">
            {jobs.map((job: { title: string; company: string; location: string; salary: string; description: string; url: string; role_type?: string }, i: number) => (
              <div
                key={i}
                className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200"
              >
                {/* Top row: Title + Role badge */}
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                      {job.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{job.company}</p>
                  </div>
                  {job.role_type && (
                    <span className="shrink-0 text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full font-semibold">
                      {job.role_type}
                    </span>
                  )}
                </div>

                {/* Meta row: Location + Salary */}
                <div className="flex flex-wrap gap-3 mb-3 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  {job.salary && (
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {job.salary}
                    </span>
                  )}
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Apply Now
                  </a>
                  <button
                    onClick={() => {
                      // Trigger job assessment flow via chat
                      appendMessage(new TextMessage({
                        content: `Assess my fit for the "${job.title}" job at ${job.company}`,
                        role: Role.User
                      }));
                    }}
                    className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Assess match & save"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
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

  // Ambient Scene - Dynamic background (no UI needed, just state sync)
  useRenderToolCall({
    name: "set_ambient_scene",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <></>;
      // The background updates via state.scene, just show a subtle confirmation
      return (
        <div className="text-xs text-gray-500 italic">
          Background updated to {result.query}
        </div>
      );
    },
  }, []);

  // Job Match Assessment - AG-UI Card with Recruiter
  useRenderToolCall({
    name: "assess_job_match",
    render: ({ result, status }) => {
      if (status !== "complete" || !result) return <ChartLoading title="Assessing match..." />;
      if (result.error) return <div className="text-red-500 text-sm p-2">{result.error}</div>;

      const { job, assessment, skills, recruiter } = result;
      const isHotMatch = assessment.match_percentage >= 90 && recruiter;
      const matchColor = assessment.match_percentage >= 90 ? "text-orange-500" :
                        assessment.match_percentage >= 80 ? "text-green-500" :
                        assessment.match_percentage >= 60 ? "text-yellow-500" :
                        assessment.match_percentage >= 40 ? "text-orange-500" : "text-red-500";
      const bgColor = isHotMatch ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-300" :
                      assessment.match_percentage >= 80 ? "bg-green-50 border-green-200" :
                      assessment.match_percentage >= 60 ? "bg-yellow-50 border-yellow-200" :
                      assessment.match_percentage >= 40 ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200";

      return (
        <div className={`p-4 rounded-xl border-2 ${bgColor} max-w-md`}>
          {/* Hot Match Badge */}
          {isHotMatch && (
            <div className="mb-3 flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                HOT MATCH - Active Recruitment
              </span>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company} - {job.location}</p>
            </div>
            <div className={`text-3xl font-bold ${matchColor}`}>
              {assessment.icon} {assessment.match_percentage}%
            </div>
          </div>

          {/* Match Bar */}
          <div className="h-3 bg-gray-200 rounded-full mb-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                isHotMatch ? "bg-gradient-to-r from-orange-500 to-amber-500" :
                assessment.match_percentage >= 80 ? "bg-green-500" :
                assessment.match_percentage >= 60 ? "bg-yellow-500" :
                assessment.match_percentage >= 40 ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${assessment.match_percentage}%` }}
            />
          </div>

          {/* Message */}
          <p className="text-sm text-gray-700 mb-3">{assessment.message}</p>

          {/* Recruiter Card - Only for 90%+ matches */}
          {recruiter && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-orange-200 shadow-sm">
              <p className="text-xs text-orange-600 font-semibold mb-2">Your Recruiter Contact</p>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">{recruiter.name}</p>
                <p className="text-sm text-gray-600">{recruiter.title} @ {recruiter.company}</p>
                {recruiter.email && (
                  <p className="text-sm">
                    <a href={`mailto:${recruiter.email}`} className="text-blue-600 hover:underline">
                      {recruiter.email}
                    </a>
                  </p>
                )}
                {recruiter.phone && (
                  <p className="text-sm">
                    <a href={`tel:${recruiter.phone}`} className="text-blue-600 hover:underline">
                      {recruiter.phone}
                    </a>
                  </p>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                {recruiter.email && (
                  <a
                    href={`mailto:${recruiter.email}?subject=Interest in ${job.title} role&body=Hi ${recruiter.name},%0D%0A%0D%0AI scored ${assessment.match_percentage}% on your ${job.title} position at ${job.company} and would love to discuss the opportunity.%0D%0A%0D%0ABest regards`}
                    className="flex-1 text-center px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Email {recruiter.name.split(' ')[0]}
                  </a>
                )}
                {recruiter.calendly_url && (
                  <a
                    href={recruiter.calendly_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Book Call
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="space-y-2">
            {skills.matching.length > 0 && (
              <div>
                <p className="text-xs font-medium text-green-700 mb-1">Matching Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.matching.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
            {skills.missing.length > 0 && (
              <div>
                <p className="text-xs font-medium text-red-700 mb-1">Missing Skills</p>
                <div className="flex flex-wrap gap-1">
                  {skills.missing.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action hint */}
          {!recruiter && skills.missing.length > 0 && (
            <p className="text-xs text-gray-500 mt-3 italic">
              Tip: Add missing skills to your profile to improve your match!
            </p>
          )}
        </div>
      );
    },
  }, []);

  // Human-in-the-Loop: Job Interest Confirmation
  useHumanInTheLoop({
    name: "confirm_job_interest",
    description: "Ask user to confirm interest in a specific job",
    parameters: [
      { name: "job_id", type: "string", description: "The job ID", required: true },
      { name: "job_title", type: "string", description: "The job title", required: true },
      { name: "company", type: "string", description: "The company name", required: true },
      { name: "location", type: "string", description: "The job location", required: false },
    ],
    render: ({ args, respond, status, result }) => {
      if (status === "executing" && respond) {
        return (
          <div className="p-4 bg-white rounded-lg shadow-lg border border-indigo-100 max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                Human-in-the-Loop
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Interested in this role?</h3>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="font-medium text-gray-800">{args.job_title}</p>
              <p className="text-sm text-gray-600">{args.company}</p>
              {args.location && <p className="text-sm text-gray-500">{args.location}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  respond({ confirmed: true, job_id: args.job_id });
                  setTimeout(() => refreshProfile(), 500);
                }}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Yes, save it
              </button>
              <button
                onClick={() => {
                  respond({ confirmed: false, job_id: args.job_id });
                  setTimeout(() => refreshProfile(), 500);
                }}
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
          <div className="p-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
            {result.confirmed ? "Added to your saved jobs" : "Skipped"}
          </div>
        );
      }

      return <></>;
    },
  });

  // Fetch profile items for instructions AND graph
  const [profileItems, setProfileItems] = useState<{location?: string; role?: string; skills?: string[]; companies?: string[]; trinity?: string; trinityLabel?: string; employmentStatus?: string; vertical?: string}>({});
  const [fullProfileItems, setFullProfileItems] = useState<Array<{id: number; item_type: string; value: string; metadata: Record<string, unknown>; confirmed: boolean}>>([]);

  // Edit modal state
  const [editingItem, setEditingItem] = useState<{id: number; item_type: string; value: string; metadata: Record<string, unknown>; confirmed: boolean} | null>(null);
  const [showAddModal, setShowAddModal] = useState<string | null>(null);
  const [newValue, setNewValue] = useState("");

  // Handler for adding profile items
  const handleGraphAdd = useCallback((type: string) => {
    setEditingItem(null);
    setShowAddModal(type);
    setNewValue("");
  }, []);

  const saveItem = async () => {
    if (!newValue.trim() || !showAddModal || !user?.id) return;
    try {
      if (editingItem) {
        await fetch(`/api/user-profile?id=${editingItem.id}&userId=${user.id}`, { method: "DELETE" });
      }
      await fetch("/api/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          itemType: showAddModal,
          value: newValue.trim(),
          metadata: { source: "homepage" },
          confirmed: false,
        }),
      });
      refreshProfile();
      setShowAddModal(null);
      setNewValue("");
      setEditingItem(null);
    } catch (e) {
      console.error("Failed to save:", e);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/user-profile?userId=${user.id}`);
        const data = await res.json();
        const items = data.items || [];

        // Store full items for graph
        setFullProfileItems(items);

        // Group by type for instructions
        const grouped: typeof profileItems = {};
        items.forEach((item: { item_type: string; value: string; metadata?: Record<string, unknown> }) => {
          if (item.item_type === 'location') grouped.location = item.value;
          if (item.item_type === 'role_preference') grouped.role = item.value;
          if (item.item_type === 'trinity') {
            grouped.trinity = item.value;
            grouped.trinityLabel = (item.metadata?.label as string) || item.value;
          }
          if (item.item_type === 'employment_status') {
            grouped.employmentStatus = (item.metadata?.label as string) || item.value;
          }
          if (item.item_type === 'professional_vertical') {
            grouped.vertical = (item.metadata?.label as string) || item.value;
          }
          if (item.item_type === 'skill') {
            if (!grouped.skills) grouped.skills = [];
            grouped.skills.push(item.value);
          }
          if (item.item_type === 'company') {
            if (!grouped.companies) grouped.companies = [];
            grouped.companies.push(item.value);
          }
        });
        setProfileItems(grouped);
      } catch (e) {
        console.error('Failed to fetch profile for instructions:', e);
      }
    };

    fetchProfile();
  }, [user?.id, profileRefreshTrigger]);

  // Build instructions with FULL user context
  const stage1Complete = !!(profileItems.trinity && profileItems.employmentStatus && profileItems.vertical);
  const missingStage1: string[] = [];
  if (!profileItems.trinity) missingStage1.push('Trinity (purpose)');
  if (!profileItems.employmentStatus) missingStage1.push('Employment Status');
  if (!profileItems.vertical) missingStage1.push('Professional Vertical');

  // Calculate onboarding step for wizard
  const onboardingStep = calculateOnboardingStep(fullProfileItems);
  const isOnboardingComplete = onboardingStep > 5;

  const agentInstructions = `CRITICAL USER CONTEXT:
- User Name: ${firstName || user.name}
- User ID: ${user.id}
- User Email: ${user.email}

STAGE 1 PROFILE (${stage1Complete ? 'COMPLETE' : 'INCOMPLETE'}):
- Trinity: ${profileItems.trinity ? `${profileItems.trinityLabel} (${profileItems.trinity})` : 'Not set - MUST ASK FIRST!'}
- Employment Status: ${profileItems.employmentStatus || 'Not set'}
- Professional Vertical: ${profileItems.vertical || 'Not set'}
- Location: ${profileItems.location || 'Not set'}

EXTENDED PROFILE:
- Target Role: ${profileItems.role || 'Not set'}
- Skills: ${profileItems.skills?.join(', ') || 'None saved'}
- Companies: ${profileItems.companies?.join(', ') || 'None saved (add with URL for validation)'}

${!stage1Complete ? `STAGE 1 INCOMPLETE - Missing: ${missingStage1.join(', ')}` : 'Stage 1 complete - ready to search jobs and match!'}

PAGE CONTEXT:
- Current Page: ${pageContext}
- URL Path: ${pathname}

When user asks about their profile, skills, companies, location, etc., use the above info.
When they ask about messages, use their User ID for database lookups.
When they mention "jobs here" or "on this page", reference the current page context.
If they're on a specific role page (CTO, CFO, etc.), assume they're interested in that role type.
Always greet them as ${firstName || user.name} and be friendly.`;

  // Show OnboardingWizard if user is logged in but hasn't completed onboarding
  if (!isOnboardingComplete) {
    return (
      <OnboardingWizard
        userId={user.id}
        userName={firstName || user.name || 'You'}
        profileItems={fullProfileItems}
        currentStep={onboardingStep}
        onVoiceMessage={handleVoiceMessage}
      />
    );
  }

  return (
    <CopilotSidebar
      disableSystemMessage={true}
      clickOutsideToClose={false}
      instructions={agentInstructions}
      labels={{
        title: "Fractional AI",
        initial: firstName ? `Hey ${firstName}! Your profile is complete. Ask me about jobs, salaries, or market trends.` : "Welcome! Use voice or text to explore jobs, charts, and A2UI widgets.",
      }}
      suggestions={suggestions}
    >
      <div className="h-screen flex flex-col bg-gray-900">
        {/* Single Navbar */}
        <nav className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
          {/* Left - Logo */}
          <div className="text-white font-bold text-lg">Fractional Quest</div>

          {/* Center - Add buttons (only when signed in) */}
          <div className="flex items-center gap-2">
            {[
              { type: 'location', label: '+ Location', color: '#10B981' },
              { type: 'role_preference', label: '+ Role', color: '#3B82F6' },
              { type: 'company', label: '+ Company', color: '#EC4899' },
              { type: 'skill', label: '+ Skill', color: '#F59E0B' },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => handleGraphAdd(item.type)}
                className="px-2 py-1 text-xs rounded-full transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                  border: `1px solid ${item.color}40`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right - Auth */}
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">{firstName || user?.name}</span>
            <a href="/dashboard" className="text-gray-300 hover:text-white text-sm">Dashboard</a>
            <UserButton />
          </div>
        </nav>

        {/* Main Content - Graph + Voice */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Profile Section - Welcome and quick actions */}
          <div className="flex-1 min-h-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="text-center px-6 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Welcome back, {firstName || user.name || 'there'}!
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Ready to explore fractional executive opportunities? Use the chat to search for jobs, get salary insights, or find your next role.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/fractional-jobs-uk" className="px-6 py-3 bg-emerald-700 text-white font-semibold rounded-lg hover:bg-emerald-800 transition-colors">
                  Browse Jobs
                </a>
                <a href="/rate-calculator" className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                  Rate Calculator
                </a>
              </div>
            </div>
          </div>

          {/* Voice Input - Fixed at bottom */}
          <div className="shrink-0 bg-gray-800 border-t border-gray-700 px-4 py-3">
            <div className="max-w-2xl mx-auto flex items-center gap-4">
              <VoiceInput onMessage={handleVoiceMessage} firstName={firstName} userId={user.id} />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">Talk to your AI assistant</p>
                <p className="text-gray-400 text-xs">Search for jobs, get recommendations, or explore the market</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingItem ? "Edit" : "Add"} {showAddModal.replace('_', ' ')}
              </h3>

              {showAddModal === "location" ? (
                <select
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select location...</option>
                  {["London", "Manchester", "Birmingham", "Remote", "Edinburgh", "Bristol", "Leeds"].map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              ) : showAddModal === "role_preference" ? (
                <select
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select role...</option>
                  {["CEO", "CFO", "CMO", "CTO", "COO", "CHRO", "CIO", "CISO", "CPO", "CRO", "VP", "Director"].map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => e.stopPropagation()}
                  placeholder={showAddModal === "skill" ? "e.g., Python, Leadership, M&A" : "Enter value..."}
                  className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(null);
                    setNewValue("");
                    setEditingItem(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveItem}
                  disabled={!newValue.trim()}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  {editingItem ? "Save Changes" : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CopilotSidebar>
  );
}
