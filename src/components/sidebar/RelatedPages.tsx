'use client'

import Link from 'next/link'

interface RelatedPage {
  name: string
  url: string
}

interface RelatedPagesProps {
  pages: RelatedPage[]
  title?: string
  currentPath?: string
}

export function RelatedPages({ pages, title = "Related Pages", currentPath }: RelatedPagesProps) {
  if (!pages || pages.length === 0) return null

  // Filter out current page if provided
  const filteredPages = currentPath
    ? pages.filter(p => p.url !== currentPath)
    : pages

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="font-bold text-gray-900 mb-4">{title}</p>
      <div className="space-y-2">
        {filteredPages.slice(0, 8).map((page) => (
          <Link
            key={page.url}
            href={page.url}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium truncate">
              {page.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedPages
