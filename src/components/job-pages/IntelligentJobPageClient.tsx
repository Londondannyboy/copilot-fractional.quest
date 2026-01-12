"use client";

import { useCallback, useEffect, useState } from "react";
import { useCoAgent, useCopilotChat, useRenderToolCall } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { authClient } from "@/lib/auth/client";

// Charts and visualizations
import {
  JobsBarChart, JobsPieChart, SalaryAreaChart,
  MarketDashboard, ArticlesGrid, ChartLoading
} from "@/components/charts";
import { ForceGraph3DComponent, ForceGraphLoading } from "@/components/ForceGraph3D";

// Intelligent Document components
import { IntelligentDocument } from "@/components/mdx/IntelligentDocument";
import {
  PersonalizedGreeting,
  LiveMarketChart,
  LiveJobGrid,
  ActiveFilters,
  DocumentSection
} from "@/components/mdx/LiveComponents";

// Standard components
import { ExpertProfile, ExpertProfileSchema } from "@/components/ExpertProfile";
import { CaseStudy, CaseStudySchema } from "@/components/CaseStudy";
import { Testimonials, TestimonialsSchema } from "@/components/Testimonials";
import { RoleCalculator } from "@/components/RoleCalculator";
import { LazyYouTube } from "@/components/LazyYouTube";
import { HotJobs } from "@/components/HotJobs";
import { EmailCapture } from "@/components/EmailCapture";
import { JobsSidebar } from "@/components/JobsSidebar";
import { HeyCompanies } from "@/components/HeyCompanies";
import { TrustSignals, TrustSignalsSchema } from "@/components/TrustSignals";

import { HeroSection, FAQSection, SEOContent } from "./index";
import { Job, JobStats } from "@/lib/jobs";
import { ImageCategory } from "@/lib/images";

// SEO Content interface
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
    [key: string]: unknown;
  };
  faqs: Array<{ question: string; answer: string }>;
  schema: {
    organization: {
      "@type": string;
      name: string;
      url: string;
    };
  };
  authorityLinks?: Array<{ name: string; url: string; context: string }>;
  statistics?: Record<string, { value: string; description: string; source: string }>;
  relatedPages?: Array<{ name: string; url: string }>;
}

interface IntelligentJobPageClientProps {
  location: string;
  locationDisplay: string;
  seoContent: LocationSEOContent;
  initialJobs: Job[];
  stats: JobStats;
  imageCategory?: ImageCategory;
  roleFilter?: string; // e.g., "Finance", "Engineering"
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo';
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

/**
 * IntelligentJobPageClient - Combines IntelligentDocument with JobPageClient
 *
 * This component makes job pages "intelligent":
 * - Page content responds to AI conversation in real-time
 * - Filters, highlights, and charts update when user talks to the agent
 * - Maintains all SEO and credibility components from JobPageClient
 */
export function IntelligentJobPageClient({
  location,
  locationDisplay,
  seoContent,
  initialJobs,
  stats,
  imageCategory = 'Finance',
  roleFilter,
  accentColor = 'emerald',
}: IntelligentJobPageClientProps) {
  const [user, setUser] = useState<AgentState['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const authUser = await authClient.getUser();
        if (authUser) {
          setUser({
            id: authUser.id,
            name: authUser.name || authUser.email || 'User',
            firstName: authUser.name?.split(' ')[0],
            email: authUser.email,
          });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  // CopilotKit agent state
  const { state } = useCoAgent<AgentState>({
    name: "agent",
    initialState: {
      jobs: initialJobs,
      search_query: "",
      user: null,
    },
  });

  // Render tool results as UI
  useRenderToolCall({
    name: "search_jobs",
    render: ({ result, status }) => {
      if (status === "executing") return <ChartLoading title="Searching jobs..." />;
      if (!result?.jobs) return <></>;
      return (
        <div className="space-y-3 max-w-md">
          <h4 className="font-semibold text-gray-900">{result.title || 'Job Results'}</h4>
          {result.jobs.slice(0, 5).map((job: Job) => (
            <a
              key={job.id}
              href={`/fractional-job/${job.slug}`}
              className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="font-medium text-gray-900 text-sm">{job.title}</div>
              <div className="text-xs text-gray-500 mt-1">{job.company_name} • {job.location}</div>
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
    render: ({ result, status }) => {
      if (status === "executing") return <ChartLoading title="Loading chart..." />;
      if (!result?.data) return <></>;
      return <JobsBarChart data={result.data} title={result.title} />;
    },
  });

  useRenderToolCall({
    name: "show_salary_area_chart",
    render: ({ result, status }) => {
      if (status === "executing") return <ChartLoading title="Loading salary data..." />;
      if (!result?.data) return <></>;
      return <SalaryAreaChart data={result.data} title={result.title} />;
    },
  });

  useRenderToolCall({
    name: "show_market_dashboard",
    render: ({ result, status }) => {
      if (status === "executing") return <ChartLoading title="Loading dashboard..." />;
      if (!result) return <></>;
      return <MarketDashboard data={result} />;
    },
  });

  useRenderToolCall({
    name: "show_user_graph",
    render: ({ result, status }) => {
      if (status === "executing") return <ForceGraphLoading />;
      if (!result?.nodes) return <></>;
      return <ForceGraph3DComponent graphData={result} />;
    },
  });

  // Build page context for the agent
  const pageContext = `${locationDisplay} Fractional Executive Jobs`;

  // Build instructions for the agent
  const agentInstructions = `
## Page Context: ${pageContext}

You are helping a user browse fractional executive jobs in ${locationDisplay}.

### CRITICAL: Use Page Actions for Filtering
This page has INTELLIGENT DOCUMENT features. When the user asks to filter or focus on something:

1. **For filtering jobs**: Use the \`update_document_filters\` action
   - "Show me CFO jobs" → update_document_filters({role: "CFO"})
   - "Only remote jobs" → update_document_filters({remote: true})
   - "Jobs in Manchester" → update_document_filters({location: "Manchester"})
   - "Show me high-paying roles" → update_document_filters({minRate: 1200})

2. **For highlighting sections**: Use the \`highlight_section\` action
   - "Show me salary data" → highlight_section({section: "salary"})
   - "Focus on the jobs" → highlight_section({section: "jobs"})
   - "Tell me about the market" → highlight_section({section: "market"})

3. **To clear filters**: Use \`clear_highlights\` action

### Available Roles
CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO

### Current Page Info
- Location: ${locationDisplay}
- Average Day Rate: ${seoContent.hero.stats.avgDayRate}
- Hybrid Options: ${seoContent.hero.stats.hybridOptions}

${user ? `### User Info
- Name: ${user.firstName || user.name}
- Email: ${user.email}` : ''}

Remember: When filtering, UPDATE THE PAGE directly using the document actions. Don't just describe what to do - actually call the action.
`;

  return (
    <main className="min-h-screen bg-white">
      <CopilotSidebar
        instructions={agentInstructions}
        labels={{
          title: "Fractional AI",
          initial: `Hi${user?.firstName ? ` ${user.firstName}` : ''}! I can help you explore ${locationDisplay} fractional jobs. Try asking me to filter by role, show salary data, or find remote opportunities.`,
        }}
        defaultOpen={false}
        clickOutsideToClose={true}
        className="z-50"
        style={{
          "--copilot-kit-primary-color": accentColor === 'emerald' ? "#059669" :
            accentColor === 'blue' ? "#2563eb" :
            accentColor === 'amber' ? "#d97706" :
            accentColor === 'purple' ? "#7c3aed" :
            accentColor === 'red' ? "#dc2626" : "#4f46e5",
        } as CopilotKitCSSProperties}
      >
        {/* Wrap everything in IntelligentDocument for state management */}
        <IntelligentDocument
          pageContext={pageContext}
          initialFilters={{
            location: location === 'london' ? 'London' : '',
            role: roleFilter || '',
          }}
        >
          {/* Hero Section */}
          <HeroSection
            headline={seoContent.hero.headline}
            subtitle={seoContent.hero.subtitle}
            stats={seoContent.hero.stats}
            location={locationDisplay}
            imageCategory={imageCategory}
            breadcrumb={seoContent.breadcrumb}
          />

          {/* Personalized Greeting */}
          <section className="py-6 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PersonalizedGreeting
                userName={user?.firstName}
                userRole={roleFilter}
                userLocation={locationDisplay}
              />

              {/* Active Filters - Shows what's currently filtered */}
              <ActiveFilters />
            </div>
          </section>

          {/* Live Market Chart - Responds to conversation */}
          <DocumentSection id="salary" title={`${locationDisplay} Day Rates`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LiveMarketChart
                location={locationDisplay}
                role={roleFilter}
                type="bar"
              />
            </div>
          </DocumentSection>

          {/* Live Job Grid - Responds to filters */}
          <DocumentSection id="jobs" title={`${locationDisplay} Fractional Jobs`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <LiveJobGrid
                    location={location === 'london' ? 'London' : ''}
                    role={roleFilter}
                    limit={9}
                  />
                </div>
                <div className="lg:col-span-1">
                  <JobsSidebar
                    location={location}
                    locationDisplay={locationDisplay}
                    roleCategory={roleFilter}
                    authorityLinks={seoContent.authorityLinks}
                    statistics={seoContent.statistics}
                    relatedPages={seoContent.relatedPages}
                    currentPath={`/fractional-jobs-${location}`}
                  />
                </div>
              </div>
            </div>
          </DocumentSection>

          {/* Hot Jobs Carousel */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <HotJobs
                    location={location === "london" ? "London" : undefined}
                    maxJobs={8}
                    title={`🔥 Hot ${locationDisplay} Jobs`}
                  />
                </div>
                <div>
                  <EmailCapture
                    variant="sidebar"
                    title="Get Job Alerts"
                    description={`New ${locationDisplay} fractional roles straight to your inbox.`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Hey Companies - Employer CTA */}
          <HeyCompanies location={locationDisplay} />

          {/* Trust Signals */}
          <TrustSignals variant="compact" className="py-8 bg-gray-50" />

          {/* SEO Content - Market insights */}
          <DocumentSection id="market" title="">
            <SEOContent content={seoContent.content} />
          </DocumentSection>

          {/* Rate Calculator */}
          <section className="py-12 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {locationDisplay} Fractional Rate Calculator
              </h2>
              <RoleCalculator role="cfo" />
            </div>
          </section>

          {/* Video Section */}
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

          {/* Case Study */}
          <CaseStudy variant="grid" />
          <CaseStudySchema />

          {/* Testimonials */}
          <Testimonials variant="carousel" />
          <TestimonialsSchema />

          {/* FAQ */}
          <FAQSection faqs={seoContent.faqs} location={locationDisplay} />

          {/* Expert Profile */}
          <ExpertProfile />
          <ExpertProfileSchema />
          <TrustSignalsSchema />
        </IntelligentDocument>
      </CopilotSidebar>
    </main>
  );
}

export default IntelligentJobPageClient;
