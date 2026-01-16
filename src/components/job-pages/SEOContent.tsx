"use client";

import { Section, SectionHeading } from "@/components/ui";

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
      {/* Why Location Section - Enhanced mobile spacing */}
      <Section className="py-10 sm:py-16">
        <SectionHeading>{content.whyLocation.title}</SectionHeading>
        <div className="max-w-3xl space-y-5 sm:space-y-6 px-1 sm:px-0">
          {content.whyLocation.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed text-base sm:text-lg">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* Day Rates Section - Mobile cards, desktop table */}
      <Section background="muted" className="py-10 sm:py-16">
        <SectionHeading subtitle={content.dayRates.description}>
          {content.dayRates.title}
        </SectionHeading>
        {/* Mobile: Cards view */}
        <div className="sm:hidden space-y-3">
          {content.dayRates.rates.map((rate, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="font-semibold text-gray-900 mb-2">{rate.role}</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{rate.range}</span>
                <span className="font-bold text-emerald-600">{rate.typical}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: Table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full max-w-2xl">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Day Rate Range
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Typical
                </th>
              </tr>
            </thead>
            <tbody>
              {content.dayRates.rates.map((rate, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {rate.role}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{rate.range}</td>
                  <td className="py-3 px-4 text-emerald-600 font-medium">
                    {rate.typical}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Location Hubs Section - Better mobile spacing */}
      <Section className="py-10 sm:py-16">
        <SectionHeading>{content.locations.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {content.locations.areas.map((area, i) => (
            <div key={i} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">
                {area.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{area.description}</p>
              {area.sectors && area.sectors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {area.sectors.map((sector, j) => (
                    <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {sector}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Emerging Roles Section - Better mobile layout */}
      <Section background="muted" className="py-10 sm:py-16">
        <SectionHeading>{content.emergingRoles.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {content.emergingRoles.roles.map((role, i) => (
            <div key={i} className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900">{role.title}</h3>
                {role.rate && (
                  <span className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    {role.rate}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
