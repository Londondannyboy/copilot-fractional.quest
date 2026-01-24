"use client";

import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";

// Color palette for card thumbnails
const CARD_COLORS = [
  '0ea5e9', '8b5cf6', '06b6d4', 'f59e0b', 'ef4444',
  '10b981', '6366f1', 'ec4899', '14b8a6', 'f97316',
  '3b82f6', 'a855f7', '22c55e', 'e11d48', '0891b2',
];

function getCardThumbnail(title: string, index: number): string {
  const colorIndex = (index * 3 + title.length) % CARD_COLORS.length;
  const bgColor = CARD_COLORS[colorIndex];
  const words = title.split(/[\s\-\/]+/).filter(w => w.length > 0);
  let initials = '';
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    initials = words[0].substring(0, 2).toUpperCase();
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=ffffff&size=80&font-size=0.4&bold=true&format=png`;
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
                <span className="font-bold text-emerald-700">{rate.typical}</span>
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
                  <td className="py-3 px-4 text-emerald-700 font-medium">
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
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getCardThumbnail(area.name, i)}
                    alt={area.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 pt-1">
                  {area.name}
                </h3>
              </div>
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
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={getCardThumbnail(role.title, i + 10)}
                    alt={role.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900">{role.title}</h3>
                    {role.rate && (
                      <span className="text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded ml-2 flex-shrink-0">
                        {role.rate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{role.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
