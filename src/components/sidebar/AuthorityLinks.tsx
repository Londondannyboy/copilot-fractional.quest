'use client'

interface AuthorityLink {
  name: string
  url: string
  context: string
}

interface AuthorityLinksProps {
  links: AuthorityLink[]
  title?: string
}

export function AuthorityLinks({ links, title = "Trusted Sources" }: AuthorityLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="font-bold text-gray-900 mb-1">{title}</p>
      <p className="text-xs text-gray-500 mb-4">Industry authorities & official data</p>
      <div className="space-y-3">
        {links.slice(0, 6).map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-emerald-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                {link.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {link.context}
              </p>
            </div>
          </a>
        ))}
      </div>
      {links.length > 6 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          +{links.length - 6} more sources
        </p>
      )}
    </div>
  )
}

export default AuthorityLinks
