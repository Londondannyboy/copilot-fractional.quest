import { Metadata } from 'next'
import { neon } from '@neondatabase/serverless'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/navigation/Header'

interface NewsArticle {
  id: number
  title: string
  url: string
  source_name: string
  published_date: string | null
  summary: string
  key_insights: string[] | null
  category: string
  tags: string[] | null
  sentiment: string
  image_url: string | null
  slug: string | null
  full_content: string | null
  imported_at: string
  // Unsplash attribution
  image_photographer: string | null
  image_photographer_url: string | null
  image_unsplash_url: string | null
}

async function getArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Try to find by slug first, then by ID if slug looks like a number
    let articles
    if (/^\d+$/.test(slug)) {
      articles = await sql`
        SELECT
          id, title, url, source_name, published_date, summary,
          key_insights, category, tags, sentiment, image_url,
          slug, full_content, imported_at,
          image_photographer, image_photographer_url, image_unsplash_url
        FROM news_articles
        WHERE id = ${parseInt(slug)} AND status = 'published'
        LIMIT 1
      `
    } else {
      articles = await sql`
        SELECT
          id, title, url, source_name, published_date, summary,
          key_insights, category, tags, sentiment, image_url,
          slug, full_content, imported_at,
          image_photographer, image_photographer_url, image_unsplash_url
        FROM news_articles
        WHERE slug = ${slug} AND status = 'published'
        LIMIT 1
      `
    }

    return articles[0] as NewsArticle || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

const categoryLabels: Record<string, string> = {
  trends: 'Industry Trends',
  hiring: 'Executive Hiring',
  opinion: 'Expert Opinion',
  case_study: 'Case Study',
  market_report: 'Market Report',
  other: 'News',
}

const sentimentColors: Record<string, string> = {
  positive: 'text-green-600 bg-green-50',
  neutral: 'text-gray-600 bg-gray-50',
  negative: 'text-red-600 bg-red-50',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Article Not Found | Fractional Quest' }
  }

  return {
    title: `${article.title} | Fractional Executive News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      images: article.image_url ? [article.image_url] : undefined,
    },
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/news" className="hover:text-white">News</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{categoryLabels[article.category] || 'Article'}</span>
            </nav>

            {/* Category & Sentiment */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium">
                {categoryLabels[article.category] || article.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${sentimentColors[article.sentiment] || 'bg-gray-700'}`}>
                {article.sentiment === 'positive' ? 'Positive outlook' :
                 article.sentiment === 'negative' ? 'Concerns raised' : 'Neutral'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span>Source: <strong className="text-white">{article.source_name}</strong></span>
              <span className="text-gray-500">|</span>
              <span>
                {new Date(article.imported_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Featured Image (if available) */}
        {article.image_url && (
          <section className="py-8 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                {/* Unsplash Attribution - Required by API terms */}
                {article.image_photographer && (
                  <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-3 py-1.5 rounded-tl-lg">
                    Photo by{' '}
                    <a
                      href={article.image_photographer_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-emerald-300"
                    >
                      {article.image_photographer}
                    </a>
                    {' on '}
                    <a
                      href={article.image_unsplash_url || 'https://unsplash.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-emerald-300"
                    >
                      Unsplash
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Summary Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">{article.summary}</p>
                </div>

                {/* Full Content (if available) */}
                {article.full_content && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Analysis</h2>
                    <div
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: article.full_content.replace(/\n/g, '<br/>') }}
                    />
                  </div>
                )}

                {/* Key Insights */}
                {article.key_insights && article.key_insights.length > 0 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-emerald-900 mb-4">Key Takeaways</h2>
                    <ul className="space-y-3">
                      {article.key_insights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-emerald-900">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Source Link Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Original Source</h3>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-emerald-700 hover:text-emerald-700 font-medium text-sm break-all"
                  >
                    Read on {article.source_name} →
                  </a>
                </div>

                {/* Related Jobs CTA */}
                <div className="bg-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Looking for Opportunities?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse fractional executive roles that match this trend
                  </p>
                  <Link
                    href="/fractional-jobs-uk"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </div>

                {/* More News CTA */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">More News</h3>
                  <Link
                    href="/news"
                    className="text-emerald-700 hover:text-emerald-700 font-medium text-sm"
                  >
                    View all articles →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
