'use client'

interface AuthorityLink {
  name: string
  url: string
  context: string
}

interface AuthorityLinksProps {
  links: AuthorityLink[]
  title?: string
  location?: string
}

export function AuthorityLinks({
  links,
  title = 'Trusted Resources',
  location = 'London'
}: AuthorityLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">
            Industry authorities and official sources for {location} fractional executive insights
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                  {link.name}
                </div>
                <div className="text-sm text-gray-500 line-clamp-2">
                  {link.context}
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          External links open in new tabs. Fractional Quest is not affiliated with these organizations.
        </p>
      </div>
    </section>
  )
}
