'use client'

interface AuthorityLink {
  name: string
  url: string
  context: string
  type?: 'professional_body' | 'government' | 'research' | 'industry' | 'news'
}

interface AuthorityLinksPanelProps {
  title?: string
  links: AuthorityLink[]
  variant?: 'grid' | 'list' | 'compact'
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
}

const typeIcons: Record<string, string> = {
  professional_body: '🏛️',
  government: '🏢',
  research: '📊',
  industry: '💼',
  news: '📰',
}

const accentColors = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', hover: 'hover:border-emerald-400' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', hover: 'hover:border-blue-400' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', hover: 'hover:border-amber-400' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:border-purple-400' },
  red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', hover: 'hover:border-red-400' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', hover: 'hover:border-indigo-400' },
}

/**
 * AuthorityLinksPanel - Display external authority links for E-E-A-T
 *
 * Renders authoritative external links with context, improving SEO trust signals.
 *
 * Usage in MDX:
 * ```mdx
 * <AuthorityLinksPanel
 *   title="Industry Resources"
 *   links={[
 *     { name: "ICAEW", url: "https://icaew.com", context: "Institute of Chartered Accountants", type: "professional_body" }
 *   ]}
 *   variant="grid"
 *   accentColor="emerald"
 * />
 * ```
 */
export default function AuthorityLinksPanel({
  title = 'Industry Resources & Authority Links',
  links = [],
  variant = 'grid',
  accentColor = 'emerald',
}: AuthorityLinksPanelProps) {
  const colors = accentColors[accentColor]

  if (links.length === 0) return null

  if (variant === 'compact') {
    return (
      <div className="py-4 border-t border-gray-200">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</p>
        <div className="flex flex-wrap gap-2">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm ${colors.bg} ${colors.border} border rounded-full ${colors.text} ${colors.hover} transition-colors`}
              title={link.context}
            >
              {link.type && <span className="text-xs">{typeIcons[link.type] || '🔗'}</span>}
              {link.name}
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-6`}>
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        <ul className="space-y-3">
          {links.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-start gap-3 group`}
              >
                <span className="text-lg mt-0.5">{link.type ? typeIcons[link.type] : '🔗'}</span>
                <div>
                  <span className={`font-semibold ${colors.text} group-hover:underline`}>
                    {link.name}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">— {link.context}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Default: grid
  return (
    <div className="py-8">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">External Resources</span>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 bg-white border ${colors.border} rounded-lg ${colors.hover} transition-all hover:shadow-md group`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{link.type ? typeIcons[link.type] : '🔗'}</span>
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold ${colors.text} group-hover:underline mb-1`}>{link.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{link.context}</p>
                <p className="text-xs text-gray-500 mt-2 truncate">{new URL(link.url).hostname}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
