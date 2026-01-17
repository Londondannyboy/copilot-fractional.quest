'use client'

import Link from 'next/link'

interface ContentSection {
  type: 'intro' | 'rates' | 'sectors' | 'specialists' | 'outlook' | 'qualifications'
  title: string
  content: string | string[]
  items?: Array<{
    title?: string
    name?: string
    description: string
    rate?: string
    range?: string
    typical?: string
    annual?: string
    sectors?: string[]
  }>
}

interface SEOContentSectionProps {
  section: ContentSection
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red'
}

const accentColors = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-800' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
}

/**
 * SEOContentSection - Renders rich SEO content sections
 *
 * Different section types render different layouts optimized for SEO and readability.
 */
export default function SEOContentSection({
  section,
  accentColor = 'emerald',
}: SEOContentSectionProps) {
  const colors = accentColors[accentColor]
  const content = Array.isArray(section.content) ? section.content : [section.content]

  switch (section.type) {
    case 'rates':
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {content.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4">{p}</p>
          ))}
          {section.items && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className={`${colors.bg}`}>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Sector/Type</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Day Rate Range</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Typical</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 hidden md:table-cell">Annual Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {section.items.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name || item.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{item.range}</td>
                      <td className={`px-4 py-3 text-sm font-semibold ${colors.text}`}>{item.typical}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{item.annual || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )

    case 'sectors':
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {section.items && (
            <div className="grid md:grid-cols-2 gap-6">
              {section.items.map((item, idx) => (
                <div key={idx} className={`p-6 ${colors.bg} border ${colors.border} rounded-lg`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name || item.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{item.description}</p>
                  {item.sectors && (
                    <div className="flex flex-wrap gap-2">
                      {item.sectors.map((sector, i) => (
                        <span key={i} className={`px-2 py-1 text-xs font-medium ${colors.badge} rounded-full`}>
                          {sector}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )

    case 'specialists':
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {section.items && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map((item, idx) => (
                <div key={idx} className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title || item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  {item.rate && (
                    <p className={`text-sm font-semibold ${colors.text}`}>{item.rate}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )

    case 'outlook':
      return (
        <div className={`py-8 px-6 ${colors.bg} border ${colors.border} rounded-lg my-8`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {content.map((p, i) => (
            <p key={i} className="text-gray-700 mb-4 last:mb-0">{p}</p>
          ))}
        </div>
      )

    case 'qualifications':
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {content.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4">{p}</p>
          ))}
        </div>
      )

    default: // intro
      return (
        <div className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
          {content.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 leading-relaxed">{p}</p>
          ))}
        </div>
      )
  }
}

/**
 * FullSEOContent - Renders complete SEO content for a page
 */
interface FullSEOContentProps {
  content: {
    whyLocation?: { title: string; paragraphs: string[] }
    dayRates?: { title: string; description?: string; rates: any[] }
    locations?: { title: string; areas: any[] }
    emergingRoles?: { title: string; roles: any[] }
    futureOutlook?: { title: string; paragraphs: string[] }
  }
  authorityLinks?: Array<{ name: string; url: string; context: string }>
  statistics?: Record<string, { value: string; description: string; source: string }>
  relatedPages?: Array<{ name: string; url: string }>
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red'
}

export function FullSEOContent({
  content,
  authorityLinks,
  statistics,
  relatedPages,
  accentColor = 'emerald',
}: FullSEOContentProps) {
  const colors = accentColors[accentColor]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Statistics Banner */}
      {statistics && Object.keys(statistics).length > 0 && (
        <div className={`${colors.bg} border ${colors.border} rounded-xl p-6 mb-12`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Key Market Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(statistics).slice(0, 5).map(([key, stat]) => (
              <div key={key} className="text-center">
                <div className={`text-2xl md:text-3xl font-black ${colors.text}`}>{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">({stat.source})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Why Location / Intro */}
      {content.whyLocation && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.whyLocation.title}</h2>
          {content.whyLocation.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 mb-4 leading-relaxed text-lg">{p}</p>
          ))}
        </section>
      )}

      {/* Day Rates Table */}
      {content.dayRates && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.dayRates.title}</h2>
          {content.dayRates.description && (
            <p className="text-gray-600 mb-6">{content.dayRates.description}</p>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className={`${colors.bg}`}>
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Sector/Type</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Day Rate Range</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Typical</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900 hidden md:table-cell">Annual (2-3 days/wk)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {content.dayRates.rates.map((rate, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{rate.role}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{rate.range}</td>
                    <td className={`px-4 py-4 text-sm font-bold ${colors.text}`}>{rate.typical}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 hidden md:table-cell">{rate.annual || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sectors/Locations */}
      {content.locations && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.locations.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.locations.areas.map((area, idx) => (
              <div key={idx} className={`p-6 ${colors.bg} border ${colors.border} rounded-xl`}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.name}</h3>
                <p className="text-gray-700 mb-4">{area.description}</p>
                {area.sectors && (
                  <div className="flex flex-wrap gap-2">
                    {area.sectors.map((sector: string, i: number) => (
                      <span key={i} className={`px-3 py-1 text-xs font-medium ${colors.badge} rounded-full`}>
                        {sector}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Emerging/Specialist Roles */}
      {content.emergingRoles && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.emergingRoles.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.emergingRoles.roles.map((role, idx) => (
              <div key={idx} className="p-5 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                {role.rate && (
                  <p className={`text-sm font-bold ${colors.text}`}>{role.rate}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Future Outlook */}
      {content.futureOutlook && (
        <section className={`mb-12 p-8 ${colors.bg} border ${colors.border} rounded-xl`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.futureOutlook.title}</h2>
          {content.futureOutlook.paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 mb-4 last:mb-0">{p}</p>
          ))}
        </section>
      )}

      {/* Authority Links */}
      {authorityLinks && authorityLinks.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Industry Resources & Professional Bodies</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {authorityLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 bg-white border border-gray-200 rounded-lg hover:border-${accentColor}-300 hover:shadow-md transition-all group`}
              >
                <h4 className={`font-bold text-gray-900 group-hover:${colors.text} mb-1`}>{link.name}</h4>
                <p className="text-xs text-gray-600">{link.context}</p>
                <p className="text-xs text-gray-400 mt-2">{new URL(link.url).hostname}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related Pages */}
      {relatedPages && relatedPages.length > 0 && (
        <section className="border-t border-gray-200 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-3">
            {relatedPages.map((page, idx) => (
              <Link
                key={idx}
                href={page.url}
                className={`px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:${colors.text} hover:border-${accentColor}-300 transition-colors`}
              >
                {page.name} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
