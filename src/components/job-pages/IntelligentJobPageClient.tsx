"use client";

import { useState } from "react";
import { useCoAgent, useRenderToolCall } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { CopilotProvider } from "@/components/CopilotProvider";

// Charts and visualizations
import {
  JobsBarChart, SalaryAreaChart,
  MarketDashboard, ChartLoading
} from "@/components/charts";
// ForceGraph3D removed for performance

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
import Link from "next/link";

// SEO Content Components
import AuthorityLinksPanel from "@/components/mdx/AuthorityLinksPanel";
import StatisticsPanel from "@/components/mdx/StatisticsPanel";
import InternalLinksGrid from "@/components/mdx/InternalLinksGrid";

import { FAQSection, SEOContent } from "./index";
import { Job, JobStats } from "@/lib/jobs";
import { ImageCategory } from "@/lib/images";

// Simple Hero Section for Intelligent Pages (without voice widget complexity)
import Image from "next/image";
import { getImage, getHeroImageUrl, getLocalImage, hasLocalImage } from "@/lib/images";

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
  roleFilter?: string;
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

// Simple Hero for Intelligent Document pages
function IntelligentHero({
  headline,
  subtitle,
  stats,
  imageCategory = "uk",
  breadcrumb,
}: {
  headline: string;
  subtitle: string;
  stats: { avgDayRate: string; hubStatus: string; hybridOptions: string };
  imageCategory?: ImageCategory;
  breadcrumb?: Array<{ name: string; url: string }>;
}) {
  const image = getImage(imageCategory);
  const localImage = getLocalImage(imageCategory);
  const hasLocal = hasLocalImage(imageCategory);
  // Fallback to Unsplash if no local image available
  const fallbackUrl = getHeroImageUrl(imageCategory, 1920, 800);

  return (
    <section className="relative text-white py-16 px-6 min-h-[400px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {hasLocal && localImage ? (
          // Use local WebP images with responsive sizing for better performance
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={localImage.mobile}
              type="image/webp"
            />
            <Image
              src={localImage.desktop}
              alt={`${headline} - ${image.alt}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </picture>
        ) : (
          // Fallback to Unsplash for categories without local images
          <Image
            src={fallbackUrl}
            alt={`${headline} - ${image.alt}`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {breadcrumb && (
          <nav className="text-sm mb-6 opacity-80">
            {breadcrumb.map((item, i) => (
              <span key={item.url}>
                <a href={item.url} className="hover:underline">{item.name}</a>
                {i < breadcrumb.length - 1 && <span className="mx-2">→</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance font-playfair text-white">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
            <div className="text-2xl font-bold">{stats.avgDayRate}</div>
            <div className="text-sm opacity-80">Avg Day Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
            <div className="text-2xl font-bold">{stats.hubStatus}</div>
            <div className="text-sm opacity-80">Hub Status</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
            <div className="text-2xl font-bold">{stats.hybridOptions}</div>
            <div className="text-sm opacity-80">Hybrid Options</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-white/70"
        >
          Photo: {image.credit}
        </a>
      </div>
    </section>
  );
}

/**
 * IntelligentJobPageClient - Combines IntelligentDocument with JobPageClient
 *
 * This component makes job pages "intelligent":
 * - Page content responds to AI conversation in real-time
 * - Filters, highlights, and charts update when user talks to the agent
 * - Maintains all SEO and credibility components from JobPageClient
 */
// Outer component that provides CopilotKit context
export function IntelligentJobPageClient(props: IntelligentJobPageClientProps) {
  return (
    <CopilotProvider>
      <IntelligentJobPageClientInner {...props} />
    </CopilotProvider>
  );
}

// Inner component with CopilotKit hooks
function IntelligentJobPageClientInner({
  location,
  locationDisplay,
  seoContent,
  initialJobs,
  stats,
  imageCategory = 'finance',
  roleFilter,
  accentColor = 'emerald',
}: IntelligentJobPageClientProps) {
  const [user, setUser] = useState<AgentState['user']>(null);

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

  // show_user_graph disabled for performance (3D removed)

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
- Total Jobs: ${stats.total}
- Average Day Rate: ${seoContent.hero.stats.avgDayRate}
- Hybrid Options: ${seoContent.hero.stats.hybridOptions}

${user ? `### User Info
- Name: ${user.firstName || user.name}
- Email: ${user.email}` : ''}

Remember: When filtering, UPDATE THE PAGE directly using the document actions. Don't just describe what to do - actually call the action.
`;

  // Get accent color value
  const accentColorValue = accentColor === 'emerald' ? "#059669" :
    accentColor === 'blue' ? "#2563eb" :
    accentColor === 'amber' ? "#d97706" :
    accentColor === 'purple' ? "#7c3aed" :
    accentColor === 'red' ? "#dc2626" : "#4f46e5";

  return (
    <main
      className="min-h-screen bg-white"
      style={{ '--copilot-kit-primary-color': accentColorValue } as React.CSSProperties}
    >
      <CopilotSidebar
        instructions={agentInstructions}
        labels={{
          title: "Fractional AI",
          initial: `Hi${user?.firstName ? ` ${user.firstName}` : ''}! I can help you explore ${locationDisplay} fractional jobs. Try asking me to filter by role, show salary data, or find remote opportunities.`,
        }}
        defaultOpen={false}
        clickOutsideToClose={true}
        className="z-50"
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
          <IntelligentHero
            headline={seoContent.hero.headline}
            subtitle={seoContent.hero.subtitle}
            stats={seoContent.hero.stats}
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

          {/* Statistics Banner - Prominent market data with citations */}
          {seoContent.statistics && Object.keys(seoContent.statistics).length > 0 && (
            <section className="py-8 bg-gray-50 border-y border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <StatisticsPanel
                  title={`${locationDisplay} Market Statistics`}
                  statistics={seoContent.statistics}
                  variant="horizontal"
                  accentColor={accentColor}
                />
              </div>
            </section>
          )}

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
                    title={`Hot ${locationDisplay} Jobs`}
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

          {/* Authority Links - External resources for E-E-A-T */}
          {seoContent.authorityLinks && seoContent.authorityLinks.length > 0 && (
            <section className="py-12 bg-white border-t border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AuthorityLinksPanel
                  title="Industry Resources & Professional Bodies"
                  links={seoContent.authorityLinks.map(link => ({
                    ...link,
                    type: link.url.includes('gov.uk') ? 'government' as const :
                          link.url.includes('icaew') || link.url.includes('acca') || link.url.includes('cima') ? 'professional_body' as const :
                          link.url.includes('glassdoor') || link.url.includes('linkedin') ? 'research' as const :
                          'industry' as const
                  }))}
                  variant="grid"
                  accentColor={accentColor}
                />
              </div>
            </section>
          )}

          {/* Internal Links - Related pages for topical authority */}
          {seoContent.relatedPages && seoContent.relatedPages.length > 0 && (
            <section className="py-12 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <InternalLinksGrid
                  title={`Explore More ${roleFilter || 'Fractional'} Resources`}
                  subtitle="Discover related guides, job boards, and resources"
                  links={seoContent.relatedPages.map(page => ({
                    name: page.name,
                    url: page.url,
                    category: page.url.includes('jobs') ? 'jobs' as const :
                              page.url.includes('salary') ? 'salary' as const :
                              page.url.includes('hire') ? 'hire' as const :
                              'guide' as const
                  }))}
                  variant="featured"
                  columns={3}
                  accentColor={accentColor}
                />
              </div>
            </section>
          )}

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
