import { Metadata } from 'next'
import { neon } from '@neondatabase/serverless'
import Link from 'next/link'
import { Header } from '@/components/navigation/Header'

export const metadata: Metadata = {
  title: 'Fractional Executive News | Industry Trends & Insights',
  description: 'Stay updated with the latest fractional executive news, interim CFO appointments, market trends, and insights for portfolio executives in the UK.',
  openGraph: {
    title: 'Fractional Executive News | Fractional Quest',
    description: 'Latest news and insights for fractional executives in the UK.',
    url: 'https://fractional.quest/news',
  },
}

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
  trends: 'bg-blue-100 text-blue-800 border-blue-200',
  hiring: 'bg-green-100 text-green-800 border-green-200',
  opinion: 'bg-purple-100 text-purple-800 border-purple-200',
  case_study: 'bg-amber-100 text-amber-800 border-amber-200',
  market_report: 'bg-red-100 text-red-800 border-red-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
}

const sentimentLabels: Record<string, { text: string; color: string }> = {
  positive: { text: 'Positive outlook', color: 'text-green-600' },
  neutral: { text: 'Neutral', color: 'text-gray-600' },
  negative: { text: 'Concerns raised', color: 'text-red-600' },
}

async function getNews(): Promise<NewsArticle[]> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const articles = await sql`
      SELECT
        id,
        title,
        url,
        source_name,
        published_date,
        summary,
        key_insights,
        category,
        tags,
        sentiment,
        image_url,
        imported_at
      FROM news_articles
      WHERE status = 'published'
      ORDER BY imported_at DESC
      LIMIT 50
    `
    return articles as NewsArticle[]
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export default async function NewsPage() {
  const articles = await getNews()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">News</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fractional Executive News
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Stay informed with the latest industry news, interim appointments, market trends, and insights for fractional executives.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No news articles yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col"
                  >
                    {/* Category Badge */}
                    <div className="px-6 pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[article.category] || categoryColors.other}`}>
                          {article.category.replace('_', ' ')}
                        </span>
                        <span className={`text-xs ${sentimentLabels[article.sentiment]?.color || 'text-gray-500'}`}>
                          {sentimentLabels[article.sentiment]?.text || article.sentiment}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6 flex-grow flex flex-col">
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-emerald-700 transition-colors">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </h2>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {article.summary}
                      </p>

                      {/* Key Insights */}
                      {article.key_insights && article.key_insights.length > 0 && (
                        <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                          <p className="text-xs font-semibold text-emerald-800 mb-1">Key Insight</p>
                          <p className="text-sm text-emerald-900 line-clamp-2">
                            {article.key_insights[0]}
                          </p>
                        </div>
                      )}

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t mt-auto">
                        <span className="font-medium">{article.source_name}</span>
                        <span>
                          {new Date(article.imported_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for Fractional Executive Roles?
            </h2>
            <p className="text-gray-600 mb-6">
              Browse our curated job board with AI-filtered fractional and interim executive positions.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/fractional-jobs-uk"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                AI Job Search
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
