"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Standard components (not lazy - they're light)
import { ExpertProfile, ExpertProfileSchema } from "@/components/ExpertProfile";
import { CaseStudy, CaseStudySchema } from "@/components/CaseStudy";
import { Testimonials, TestimonialsSchema } from "@/components/Testimonials";
import { RoleCalculator } from "@/components/RoleCalculator";
import { LazyYouTube } from "@/components/LazyYouTube";
import { HotJobs } from "@/components/HotJobs";
import { JobsSidebar } from "@/components/JobsSidebar";
import { HeyCompanies } from "@/components/HeyCompanies";
import { TrustSignals, TrustSignalsSchema } from "@/components/TrustSignals";

// SEO Content Components
import AuthorityLinksPanel from "@/components/mdx/AuthorityLinksPanel";
import StatisticsPanel from "@/components/mdx/StatisticsPanel";
import InternalLinksGrid from "@/components/mdx/InternalLinksGrid";

import { FAQSection, SEOContent } from "./index";
import { Job, JobStats } from "@/lib/jobs";
import { ImageCategory, getImage, getHeroImageUrl, getLocalImage, hasLocalImage } from "@/lib/images";

// ============================================================================
// LAZY LOADED COMPONENTS - These load AFTER initial paint for better LCP
// ============================================================================

// Lazy load CopilotKit - it's the main culprit for slow LCP
const CopilotKitWrapper = dynamic(
  () => import("./CopilotKitWrapper"),
  {
    ssr: false,
    loading: () => null // Don't show loading - content already visible
  }
);

// Lazy load IntelligentDocument components
const IntelligentDocument = dynamic(
  () => import("@/components/mdx/IntelligentDocument").then((mod) => mod.IntelligentDocument),
  { ssr: false }
);

const PersonalizedGreeting = dynamic(
  () => import("@/components/mdx/LiveComponents").then((mod) => mod.PersonalizedGreeting),
  { ssr: false }
);

const LiveMarketChart = dynamic(
  () => import("@/components/mdx/LiveComponents").then((mod) => mod.LiveMarketChart),
  { ssr: false }
);

const LiveJobGrid = dynamic(
  () => import("@/components/mdx/LiveComponents").then((mod) => mod.LiveJobGrid),
  { ssr: false }
);

const ActiveFilters = dynamic(
  () => import("@/components/mdx/LiveComponents").then((mod) => mod.ActiveFilters),
  { ssr: false }
);

const DocumentSection = dynamic(
  () => import("@/components/mdx/LiveComponents").then((mod) => mod.DocumentSection),
  { ssr: false }
);

// ============================================================================
// TYPES
// ============================================================================

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

// ============================================================================
// HERO SECTION - Renders IMMEDIATELY (no lazy loading, no CopilotKit)
// ============================================================================

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
  const fallbackUrl = getHeroImageUrl(imageCategory, 1920, 800);

  return (
    <section className="relative text-white py-16 px-6 min-h-[400px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {hasLocal && localImage ? (
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={localImage.mobile}
              type="image/webp"
            />
            <Image
              src={localImage.desktop}
              alt={`${headline} - ${image.alt}`}
              title={headline}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="100vw"
            />
          </picture>
        ) : (
          <Image
            src={fallbackUrl}
            alt={`${headline} - ${image.alt}`}
            title={headline}
            fill
            priority
            fetchPriority="high"
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

// ============================================================================
// LOADING SKELETON for lazy content
// ============================================================================

function ContentSkeleton() {
  return (
    <div className="animate-pulse space-y-8 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function IntelligentJobPageClient({
  location,
  locationDisplay,
  seoContent,
  initialJobs,
  stats,
  imageCategory = 'finance',
  roleFilter,
  accentColor = 'emerald',
}: IntelligentJobPageClientProps) {
  const [aiLoaded, setAiLoaded] = useState(false);

  // Get accent color value
  const accentColorValue = accentColor === 'emerald' ? "#059669" :
    accentColor === 'blue' ? "#2563eb" :
    accentColor === 'amber' ? "#d97706" :
    accentColor === 'purple' ? "#7c3aed" :
    accentColor === 'red' ? "#dc2626" : "#4f46e5";

  // Build page context for the agent
  const pageContext = `${locationDisplay} Fractional Executive Jobs`;

  // Build instructions for the agent
  const agentInstructions = `
## Page Context: ${pageContext}

You are helping a user browse fractional executive jobs in ${locationDisplay}.

### CRITICAL: Use Page Actions for Filtering
This page has INTELLIGENT DOCUMENT features. When the user asks to filter or focus on something:

1. **For filtering jobs**: Use the \`update_document_filters\` action
2. **For highlighting sections**: Use the \`highlight_section\` action
3. **To clear filters**: Use \`clear_highlights\` action

### Available Roles
CFO, CTO, CMO, COO, CEO, CHRO, CPO, CISO

### Current Page Info
- Location: ${locationDisplay}
- Total Jobs: ${stats.total}
- Average Day Rate: ${seoContent.hero.stats.avgDayRate}
`;

  return (
    <main
      className="min-h-screen bg-white"
      style={{ '--copilot-kit-primary-color': accentColorValue } as React.CSSProperties}
    >
      {/* CRITICAL: Hero renders IMMEDIATELY - no CopilotKit dependency */}
      <IntelligentHero
        headline={seoContent.hero.headline}
        subtitle={seoContent.hero.subtitle}
        stats={seoContent.hero.stats}
        imageCategory={imageCategory}
        breadcrumb={seoContent.breadcrumb}
      />

      {/* Everything below loads lazily with CopilotKit */}
      <Suspense fallback={<ContentSkeleton />}>
        <CopilotKitWrapper
          instructions={agentInstructions}
          title="Fractional AI"
          initialMessage={`Hi! I can help you explore ${locationDisplay} fractional jobs. Try asking me to filter by role, show salary data, or find remote opportunities.`}
          accentColor={accentColorValue}
          initialJobs={initialJobs}
          onLoad={() => setAiLoaded(true)}
        >
          <IntelligentDocument
            pageContext={pageContext}
            initialFilters={{
              location: location === 'london' ? 'London' : '',
              role: roleFilter || '',
            }}
          >
            {/* Personalized Greeting */}
            <section className="py-6 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PersonalizedGreeting
                  userRole={roleFilter}
                  userLocation={locationDisplay}
                />
                <ActiveFilters />
              </div>
            </section>

            {/* Statistics Banner */}
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

            {/* Live Market Chart */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <DocumentSection id="salary" title={`${locationDisplay} Day Rates`}>
                <LiveMarketChart
                  location={locationDisplay}
                  role={roleFilter}
                  type="bar"
                />
              </DocumentSection>
            </div>

            {/* Main Content + Sidebar Layout */}
            <section className="py-8 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content Column */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Live Job Grid */}
                    <DocumentSection id="jobs" title={`${locationDisplay} Fractional Jobs`}>
                      <LiveJobGrid
                        location={location === 'london' ? 'London' : ''}
                        role={roleFilter}
                        limit={9}
                      />
                    </DocumentSection>

                    {/* Hot Jobs */}
                    <HotJobs
                      location={location === "london" ? "London" : undefined}
                      maxJobs={8}
                      title={`Hot ${locationDisplay} Jobs`}
                    />

                    {/* Hey Companies - Employer CTA */}
                    <HeyCompanies location={locationDisplay} />

                    {/* Trust Signals */}
                    <TrustSignals variant="compact" className="py-6" />

                    {/* SEO Content */}
                    <DocumentSection id="market" title="">
                      <SEOContent content={seoContent.content} />
                    </DocumentSection>

                    {/* Authority Links */}
                    {seoContent.authorityLinks && seoContent.authorityLinks.length > 0 && (
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
                    )}

                    {/* Internal Links */}
                    {seoContent.relatedPages && seoContent.relatedPages.length > 0 && (
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
                        columns={2}
                        accentColor={accentColor}
                      />
                    )}

                    {/* Rate Calculator */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {locationDisplay} Fractional Rate Calculator
                      </h2>
                      <RoleCalculator role="cfo" />
                    </div>

                    {/* Video Section */}
                    <div className="py-8">
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
                  </div>

                  {/* Sidebar Column */}
                  <div className="hidden lg:block">
                    <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin">
                      <JobsSidebar
                        location={location}
                        locationDisplay={locationDisplay}
                        roleCategory={roleFilter}
                        showCalendly={true}
                        authorityLinks={seoContent.authorityLinks}
                        statistics={seoContent.statistics}
                        relatedPages={seoContent.relatedPages}
                        accentColor={accentColor}
                        currentPath={`/fractional-jobs-${location}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </IntelligentDocument>
        </CopilotKitWrapper>
      </Suspense>
    </main>
  );
}

export default IntelligentJobPageClient;
