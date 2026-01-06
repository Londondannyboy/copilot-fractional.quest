"use client";

import { Section, SectionHeading } from "@/components/ui";
import { LondonSEOContent } from "@/lib/seo-content/london";

interface SEOContentProps {
  content: LondonSEOContent["content"];
}

export function SEOContent({ content }: SEOContentProps) {
  return (
    <>
      {/* Why London Section */}
      <Section>
        <SectionHeading>{content.whyLondon.title}</SectionHeading>
        <div className="max-w-3xl space-y-4">
          {content.whyLondon.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* Day Rates Section */}
      <Section background="muted">
        <SectionHeading subtitle={content.dayRates.description}>
          {content.dayRates.title}
        </SectionHeading>
        <div className="overflow-x-auto">
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
                  <td className="py-3 px-4 text-[var(--color-primary)] font-medium">
                    {rate.typical}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* London Hubs Section */}
      <Section>
        <SectionHeading>{content.locations.title}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-6">
          {content.locations.areas.map((area, i) => (
            <div key={i} className="card p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {area.name}
              </h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Emerging Roles Section */}
      <Section background="muted">
        <SectionHeading>{content.emergingRoles.title}</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.emergingRoles.roles.map((role, i) => (
            <div key={i} className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 text-sm">{role.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
