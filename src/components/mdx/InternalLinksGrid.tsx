'use client'

import Link from 'next/link'
import Image from 'next/image'

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

// Background images by category for visual cards
const categoryImages: Record<string, string[]> = {
  jobs: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=250&fit=crop',
  ],
  guide: [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=250&fit=crop',
  ],
  salary: [
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&h=250&fit=crop',
  ],
  hire: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
  ],
  services: [
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=250&fit=crop',
  ],
  location: [
    'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=250&fit=crop',
    'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&h=250&fit=crop',
  ],
}

function getCategoryImage(category: string | undefined, index: number): string {
  const images = categoryImages[category || ''] || categoryImages.jobs
  return images[index % images.length]
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

        {/* Featured cards with background images */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {featured.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="block relative rounded-xl overflow-hidden group h-48 shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={getCategoryImage(link.category, idx)}
                alt={link.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {link.category && showCategories && (
                  <span className="inline-block px-2 py-0.5 text-xs font-bold uppercase bg-white/20 text-white rounded mb-2 backdrop-blur-sm">
                    {categoryLabels[link.category] || link.category}
                  </span>
                )}
                <h4 className="font-bold text-white text-lg leading-tight">{link.name}</h4>
                {link.description && <p className="text-sm text-white/80 mt-1 line-clamp-2">{link.description}</p>}
              </div>
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

  // Default: cards with image overlays
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
            className="block relative rounded-xl overflow-hidden group h-36 shadow-sm hover:shadow-lg transition-shadow"
          >
            <Image
              src={getCategoryImage(link.category, idx)}
              alt={link.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              {link.category && showCategories && (
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase bg-white/20 text-white rounded mb-1.5 backdrop-blur-sm">
                  {categoryLabels[link.category] || link.category}
                </span>
              )}
              <h4 className="font-bold text-white text-sm leading-tight">
                {link.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
