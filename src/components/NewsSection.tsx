'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCopilotReadable } from '@copilotkit/react-core'

interface NewsArticle {
  id: number
  title: string
  url: string
  source_name: string
  published_date: string | null
  summary: string
  key_insights: string[]
  category: string
  tags: string[]
  sentiment: string
  image_url: string | null
  imported_at: string
}

const categoryColors: Record<string, string> = {
  trends: 'bg-blue-100 text-blue-800',
  hiring: 'bg-green-100 text-green-800',
  opinion: 'bg-purple-100 text-purple-800',
  case_study: 'bg-amber-100 text-amber-800',
  market_report: 'bg-red-100 text-red-800',
  other: 'bg-gray-100 text-gray-800',
}

const sentimentIcons: Record<string, string> = {
  positive: '📈',
  neutral: '📊',
  negative: '📉',
}

export function NewsSection({ limit = 6 }: { limit?: number }) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?limit=${limit}`)
        if (!res.ok) throw new Error('Failed to fetch news')
        const data = await res.json()
        setArticles(data.articles || [])
      } catch (err) {
        setError('Unable to load news')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [limit])

  // Make news available to CopilotKit
  useCopilotReadable({
    description: 'Latest fractional executive news articles',
    value: articles.length > 0
      ? `Latest news: ${articles.map(a => `"${a.title}" (${a.category}) - ${a.summary}`).join('; ')}`
      : 'No news articles loaded yet',
  })

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Industry News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || articles.length === 0) {
    return null // Don't show section if no news
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Industry News</h2>
            <p className="text-gray-600 mt-2">
              Stay updated on fractional executive trends and opportunities
            </p>
          </div>
          <Link
            href="/news"
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            View all news
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || categoryColors.other}`}>
                  {article.category.replace('_', ' ')}
                </span>
                <span className="text-gray-400 text-sm">
                  {sentimentIcons[article.sentiment] || '📰'}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600 transition-colors"
                >
                  {article.title}
                </a>
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {article.summary}
              </p>

              {article.key_insights && article.key_insights.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Key Insight:</p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {article.key_insights[0]}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t">
                <span className="font-medium">{article.source_name}</span>
                <span>
                  {new Date(article.imported_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
