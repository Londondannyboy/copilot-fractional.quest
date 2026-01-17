'use client'

import Link from 'next/link'

interface InternalLink {
  name: string
  url: string
  description?: string
  icon?: string
  category?: 'jobs' | 'guide' | 'salary' | 'hire' | 'services' | 'location'
}

interface InternalLinksGridProps {
  title?: string
  subtitle?: string
  links: InternalLink[]
  variant?: 'cards' | 'list' | 'compact' | 'featured'
  columns?: 2 | 3 | 4
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
  showCategories?: boolean
}

const categoryIcons: Record<string, string> = {
  jobs: '💼',
  guide: '📖',
  salary: '💰',
  hire: '🤝',
  services: '⚙️',
  location: '📍',
}

const categoryLabels: Record<string, string> = {
  jobs: 'Jobs',
  guide: 'Guide',
  salary: 'Salary',
  hire: 'Hiring',
  services: 'Services',
  location: 'Location',
}

const accentColors = {
  emerald: { border: 'border-emerald-300', text: 'text-emerald-700', bg: 'bg-emerald-50', hover: 'hover:border-emerald-500' },
  blue: { border: 'border-blue-300', text: 'text-blue-700', bg: 'bg-blue-50', hover: 'hover:border-blue-500' },
  amber: { border: 'border-amber-300', text: 'text-amber-700', bg: 'bg-amber-50', hover: 'hover:border-amber-500' },
  purple: { border: 'border-purple-300', text: 'text-purple-700', bg: 'bg-purple-50', hover: 'hover:border-purple-500' },
  red: { border: 'border-red-300', text: 'text-red-700', bg: 'bg-red-50', hover: 'hover:border-red-500' },
  indigo: { border: 'border-indigo-300', text: 'text-indigo-700', bg: 'bg-indigo-50', hover: 'hover:border-indigo-500' },
}

/**
 * InternalLinksGrid - Internal linking for topical authority
 *
 * Creates an internal link network for better SEO and user navigation.
 *
 * Usage in MDX:
 * ```mdx
 * <InternalLinksGrid
 *   title="Related Pages"
 *   links={[
 *     { name: "CFO Jobs UK", url: "/fractional-cfo-jobs-uk", category: "jobs" },
 *     { name: "What is a Fractional CFO?", url: "/fractional-cfo", category: "guide" }
 *   ]}
 *   variant="cards"
 *   columns={3}
 * />
 * ```
 */
export default function InternalLinksGrid({
  title = 'Related Pages',
  subtitle,
  links = [],
  variant = 'cards',
  columns = 3,
  accentColor = 'emerald',
  showCategories = true,
}: InternalLinksGridProps) {
  const colors = accentColors[accentColor]

  if (links.length === 0) return null

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  if (variant === 'compact') {
    return (
      <div className="py-4 border-t border-gray-200">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</p>
        <div className="flex flex-wrap gap-2">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full ${colors.text} ${colors.hover} transition-colors`}
            >
              {link.icon || (link.category && categoryIcons[link.category]) || '→'}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    // Group by category if categories exist
    const grouped = showCategories && links.some(l => l.category)
      ? links.reduce((acc, link) => {
          const cat = link.category || 'other'
          if (!acc[cat]) acc[cat] = []
          acc[cat].push(link)
          return acc
        }, {} as Record<string, InternalLink[]>)
      : { all: links }

    return (
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 my-8`}>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        {Object.entries(grouped).map(([category, categoryLinks]) => (
          <div key={category} className="mb-4 last:mb-0">
            {showCategories && category !== 'all' && (
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                {categoryIcons[category] || '📄'} {categoryLabels[category] || category}
              </p>
            )}
            <ul className="space-y-2">
              {categoryLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className={`flex items-center gap-2 ${colors.text} hover:underline`}
                  >
                    <span className="text-gray-400">→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'featured') {
    const featured = links.slice(0, 3)
    const rest = links.slice(3)

    return (
      <div className="py-8">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Explore More</span>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>

        {/* Featured cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {featured.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className={`block p-6 bg-white border-2 ${colors.border} rounded-xl ${colors.hover} transition-all hover:shadow-lg group`}
            >
              <div className="text-3xl mb-3">
                {link.icon || (link.category && categoryIcons[link.category]) || '📄'}
              </div>
              {link.category && showCategories && (
                <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase ${colors.bg} ${colors.text} rounded mb-2`}>
                  {categoryLabels[link.category] || link.category}
                </span>
              )}
              <h4 className={`font-bold text-gray-900 group-hover:${colors.text} mb-2`}>{link.name}</h4>
              {link.description && <p className="text-sm text-gray-600">{link.description}</p>}
            </Link>
          ))}
        </div>

        {/* Additional links */}
        {rest.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500 mr-2">Also see:</span>
            {rest.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                className={`text-sm ${colors.text} hover:underline`}
              >
                {link.name}
                {idx < rest.length - 1 && <span className="text-gray-300 ml-2">•</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Default: cards
  return (
    <div className="py-8">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Related Pages</span>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.url}
            className={`block p-5 bg-white border border-gray-200 rounded-lg ${colors.hover} transition-all hover:shadow-md group`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">
                {link.icon || (link.category && categoryIcons[link.category]) || '📄'}
              </span>
              <div className="flex-1 min-w-0">
                {link.category && showCategories && (
                  <span className="text-xs font-bold uppercase text-gray-400 block mb-1">
                    {categoryLabels[link.category] || link.category}
                  </span>
                )}
                <h4 className={`font-bold text-gray-900 group-hover:${colors.text} transition-colors`}>
                  {link.name}
                </h4>
                {link.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{link.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
