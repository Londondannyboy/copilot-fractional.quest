"use client";

import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";
import { LazyDayRateChart } from "./LazyChart";

// Authority source URLs for citations
const AUTHORITY_SOURCES = {
  glassdoor: {
    name: 'Glassdoor UK',
    url: 'https://www.glassdoor.co.uk/Salaries/london-cfo-salary-SRCH_IL.0,6_IM1035_KO7,10.htm',
  },
  cipd: {
    name: 'CIPD',
    url: 'https://www.cipd.org/uk/knowledge/reports/reward-management-survey/',
  },
  scaleup: {
    name: 'ScaleUp Institute',
    url: 'https://www.scaleupinstitute.org.uk/reports/annual-scaleup-review/',
  },
  cbi: {
    name: 'CBI',
    url: 'https://www.cbi.org.uk/articles/uk-business-trends/',
  },
  techNation: {
    name: 'Tech Nation',
    url: 'https://technation.io/report/',
  },
  ncsc: {
    name: 'NCSC',
    url: 'https://www.ncsc.gov.uk/section/reports-advisories/cyber-threat-assessments',
  },
};

// Tiny base64 blur placeholder for smooth image loading (dark to match card overlays)
const BLUR_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAMklEQVQImWNgYPj/n4EBCxg1atR/BgYGBgYmBjIBEwMDAwMjIyMjAwMDA8P///8ZAAAH3wTCMlKvOAAAAABJRU5ErkJggg=='

// Background images for sector/location cards
const SECTOR_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
];

// Background images for specialist role cards
const ROLE_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=250&fit=crop',
];

// Citation component for inline references
function Citation({ source, url }: { source: string; url?: string }) {
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors ml-1"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {source}
      </a>
    );
  }
  return (
    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
      {source}
    </span>
  );
}

// Stat callout box
function StatCallout({ value, label, source, sourceUrl, icon }: {
  value: string;
  label: string;
  source?: string;
  sourceUrl?: string;
  icon?: string;
}) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 flex items-start gap-4">
      {icon && <span className="text-3xl">{icon}</span>}
      <div className="flex-1">
        <div className="text-3xl font-bold text-emerald-800">{value}</div>
        <div className="text-gray-700 font-medium">{label}</div>
        {source && (
          <div className="mt-2">
            <Citation source={source} url={sourceUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

// Key insight card
function InsightCard({ title, children, icon }: { title: string; children: React.ReactNode; icon?: string }) {
  return (
    <div className="bg-white border-l-4 border-emerald-500 rounded-r-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-xl">{icon}</span>}
        <p className="font-bold text-gray-900">{title}</p>
      </div>
      <div className="text-gray-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

// Flexible content interface that works with both enriched and basic pages
interface SEOContentData {
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
}

interface SEOContentProps {
  content: SEOContentData;
}

export function SEOContent({ content }: SEOContentProps) {
  return (
    <>
      {/* Why Location Section - Enhanced with callouts and citations */}
      <Section className="py-10 sm:py-16" id="why-location">
        <SectionHeading>{content.whyLocation.title}</SectionHeading>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCallout
            value="60%+"
            label="of UK fractional appointments"
            source="ScaleUp Institute"
            sourceUrl={AUTHORITY_SOURCES.scaleup.url}
            icon="📊"
          />
          <StatCallout
            value="70%"
            label="of companies using fractional are London-based"
            source="ScaleUp Institute"
            sourceUrl={AUTHORITY_SOURCES.scaleup.url}
            icon="🏙️"
          />
          <StatCallout
            value="£900-£1,500"
            label="typical London day rates"
            source="Glassdoor UK"
            sourceUrl={AUTHORITY_SOURCES.glassdoor.url}
            icon="💰"
          />
        </div>

        {/* Content with better formatting */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {content.whyLocation.paragraphs.map((p, i) => (
              <div key={i} className={i === 0 ? "text-lg text-gray-700 leading-relaxed" : "text-gray-600 leading-relaxed"}>
                <p dangerouslySetInnerHTML={{ __html: p }} />
              </div>
            ))}
          </div>

          {/* Sidebar with insights */}
          <div className="space-y-4">
            <InsightCard title="Market Leaders" icon="🚀">
              <p>London hosts headquarters for fintech leaders including <strong>Revolut</strong>, <strong>Monzo</strong>, and <strong>Starling</strong> - all active users of fractional talent.</p>
            </InsightCard>
            <InsightCard title="Flexible Working" icon="🏠">
              <p>65% of London fractional roles offer hybrid arrangements, per{' '}
                <a href={AUTHORITY_SOURCES.cipd.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                  CIPD research
                </a>.
              </p>
            </InsightCard>
          </div>
        </div>
      </Section>

      {/* Day Rates Section - Interactive Chart + Citation Links */}
      <Section background="muted" className="py-10 sm:py-16" id="day-rates">
        <SectionHeading>
          {content.dayRates.title}
        </SectionHeading>

        {/* Source Citation Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
          <span className="text-gray-600">Data sources:</span>
          <a
            href={AUTHORITY_SOURCES.glassdoor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-medium text-gray-700">Glassdoor UK</span>
          </a>
          <a
            href={AUTHORITY_SOURCES.cipd.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
          >
            <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="font-medium text-gray-700">CIPD Pay Report</span>
          </a>
        </div>

        {/* Interactive Bar Chart - Lazy Loaded */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="h-72 sm:h-80">
            <LazyDayRateChart rates={content.dayRates.rates} />
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Typical daily rates for fractional executives. Hover over bars for details.
          </p>
        </div>

        {/* Mobile-friendly cards with full data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {content.dayRates.rates.map((rate, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-gray-900">{rate.role}</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                  {rate.typical}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Range: <span className="font-medium text-gray-800">{rate.range}</span>
              </div>
              {rate.annual && (
                <div className="text-xs text-gray-500">
                  Annual equiv: {rate.annual}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Location Hubs Section - Image overlay cards */}
      <Section className="py-10 sm:py-16">
        <SectionHeading>{content.locations.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {content.locations.areas.map((area, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden shadow-md h-56 sm:h-64 group">
              <Image
                src={SECTOR_IMAGES[i % SECTOR_IMAGES.length]}
                alt={`${area.name} - fractional jobs`}
                title={`${area.name} - fractional jobs UK`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-lg text-white mb-2">
                  {area.name}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{area.description}</p>
                {area.sectors && area.sectors.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {area.sectors.slice(0, 4).map((sector, j) => (
                      <span key={j} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {sector}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Emerging Roles Section - Image overlay cards */}
      <Section background="muted" className="py-10 sm:py-16">
        <SectionHeading>{content.emergingRoles.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {content.emergingRoles.roles.map((role, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden shadow-md h-52 sm:h-56 group">
              <Image
                src={ROLE_IMAGES[i % ROLE_IMAGES.length]}
                alt={`${role.title} - fractional jobs UK`}
                title={`${role.title} - fractional jobs UK`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white text-lg">{role.title}</h3>
                  {role.rate && (
                    <span className="text-xs font-semibold text-white bg-white/20 px-2 py-1 rounded backdrop-blur-sm ml-2 flex-shrink-0">
                      {role.rate}
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Future Outlook Section */}
      {content.futureOutlook && (
        <Section className="py-10 sm:py-16">
          <SectionHeading>{content.futureOutlook.title}</SectionHeading>
          <div className="max-w-3xl space-y-5 sm:space-y-6 px-1 sm:px-0">
            {content.futureOutlook.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
