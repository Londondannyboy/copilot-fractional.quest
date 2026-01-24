"use client";

import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui";

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
            <p key={i} className="text-gray-600 leading-relaxed text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: p }} />
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

      {/* Location Hubs Section - Image overlay cards */}
      <Section className="py-10 sm:py-16">
        <SectionHeading>{content.locations.title}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {content.locations.areas.map((area, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden shadow-md h-56 sm:h-64 group">
              <Image
                src={SECTOR_IMAGES[i % SECTOR_IMAGES.length]}
                alt={`${area.name} - fractional jobs`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
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
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
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
