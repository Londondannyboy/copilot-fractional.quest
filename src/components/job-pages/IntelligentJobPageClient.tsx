"use client";

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
  locale?: 'uk' | 'us' | 'au' | 'nz';
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
    <section className="relative text-white py-12 sm:py-16 px-4 sm:px-6 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] flex items-center overflow-hidden">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance font-playfair text-white">
            {headline}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="text-xl sm:text-2xl font-bold">{stats.avgDayRate}</div>
            <div className="text-xs sm:text-sm opacity-80">Avg Day Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="text-xl sm:text-2xl font-bold">{stats.hubStatus}</div>
            <div className="text-xs sm:text-sm opacity-80">Hub Status</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4">
            <div className="text-xl sm:text-2xl font-bold">{stats.hybridOptions}</div>
            <div className="text-xs sm:text-sm opacity-80">Hybrid Options</div>
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
// MAIN COMPONENT
// ============================================================================

export function IntelligentJobPageClient({
  location,
  locationDisplay,
  seoContent,
  imageCategory = 'finance',
  roleFilter,
  accentColor = 'emerald',
}: IntelligentJobPageClientProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* CRITICAL: Hero renders IMMEDIATELY - no CopilotKit dependency */}
      <IntelligentHero
        headline={seoContent.hero.headline}
        subtitle={seoContent.hero.subtitle}
        stats={seoContent.hero.stats}
        imageCategory={imageCategory}
        breadcrumb={seoContent.breadcrumb}
      />

      {/* Statistics Banner - Full width, SSR */}
      {seoContent.statistics && Object.keys(seoContent.statistics).length > 0 && (
        <section className="py-6 bg-gray-50 border-y border-gray-200">
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

      {/* ============================================================== */}
      {/* MAIN CONTENT SECTION - Unified 2-column layout with sidebar    */}
      {/* Jobs at TOP, SEO content below, sidebar extends full height    */}
      {/* ============================================================== */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">

              {/* ====== JOB BOARDS - TOP OF PAGE ====== */}

              {/* Hot Jobs - SSR, renders immediately */}
              <HotJobs
                location={location === "london" ? "London" : undefined}
                maxJobs={8}
                title={`Hot ${locationDisplay} Jobs`}
              />

              {/* Rate Calculator */}
              <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {locationDisplay} Fractional Rate Calculator
                </h2>
                <RoleCalculator role="cfo" />
              </div>

              {/* ====== SEO CONTENT - Renders Server-Side ====== */}

              {/* Primary text content for search engines */}
              <div id="market">
                <SEOContent content={seoContent.content} />
              </div>

              {/* Authority Links - External links for E-E-A-T */}
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

              {/* FAQ Section - Important for featured snippets */}
              <FAQSection faqs={seoContent.faqs} location={locationDisplay} />

              {/* Internal Links - For crawlability and topic authority */}
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

              {/* ====== SOCIAL PROOF & MEDIA ====== */}

              {/* Trust Signals */}
              <TrustSignals variant="compact" className="py-6" />

              {/* Case Study */}
              <CaseStudy variant="grid" />
              <CaseStudySchema />

              {/* Testimonials */}
              <Testimonials variant="carousel" />
              <TestimonialsSchema />

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

              {/* ====== EMPLOYER CTA & EXPERT PROFILE - Bottom ====== */}

              {/* Hey Companies - Employer CTA */}
              <HeyCompanies location={locationDisplay} />

              {/* Expert Profile - E-E-A-T */}
              <ExpertProfile />
              <ExpertProfileSchema />
              <TrustSignalsSchema />
            </div>

            {/* Sidebar Column - Sticky, extends full height */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
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
    </main>
  );
}

export default IntelligentJobPageClient;
