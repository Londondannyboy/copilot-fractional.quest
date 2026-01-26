import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { getRoleImageCategory, getHeroImageUrl, getImage } from '@/lib/images'

export const revalidate = 3600

// Color themes for different roles
const ROLE_COLORS: Record<string, { gradient: string, accent: string, badge: string }> = {
  CDO: { gradient: 'from-cyan-950 via-cyan-900 to-slate-950', accent: 'cyan', badge: 'bg-cyan-100 text-cyan-800' },
  CRO: { gradient: 'from-green-950 via-green-900 to-slate-950', accent: 'green', badge: 'bg-green-100 text-green-800' },
  CGO: { gradient: 'from-orange-950 via-orange-900 to-slate-950', accent: 'orange', badge: 'bg-orange-100 text-orange-800' },
  CAO: { gradient: 'from-purple-950 via-purple-900 to-slate-950', accent: 'purple', badge: 'bg-purple-100 text-purple-800' },
  CSO: { gradient: 'from-indigo-950 via-indigo-900 to-slate-950', accent: 'indigo', badge: 'bg-indigo-100 text-indigo-800' },
  DEFAULT: { gradient: 'from-slate-950 via-slate-900 to-slate-950', accent: 'emerald', badge: 'bg-emerald-100 text-emerald-800' },
}

// Get article from database
async function getArticle(slug: string) {
  try {
    const sql = createDbQuery()
    const articles = await sql`
      SELECT * FROM articles WHERE slug = ${slug} AND published = true
    `
    return articles[0] as any || null
  } catch {
    return null
  }
}

// Get FAQs for role from database
async function getFAQsForRole(role: string | null) {
  if (!role) return []
  try {
    const sql = createDbQuery()
    const faqs = await sql`
      SELECT question, answer FROM content_faqs
      WHERE role = ${role} AND page_type = 'jobs'
      ORDER BY sort_order
    `
    return faqs as any[]
  } catch {
    return []
  }
}

// Get salary data for role
async function getSalaryData(role: string | null) {
  if (!role) return null
  try {
    const sql = createDbQuery()
    const salary = await sql`
      SELECT * FROM salary_benchmarks
      WHERE role = ${role} AND region = 'UK' AND engagement_type = 'fractional'
      LIMIT 1
    `
    return salary[0] as any || null
  } catch {
    return null
  }
}

// Get related jobs
async function getRelatedJobs(role: string | null) {
  if (!role) return []
  try {
    const sql = createDbQuery()
    // Map role to category keywords
    const categoryMap: Record<string, string> = {
      CDO: 'Data',
      CRO: 'Revenue',
      CGO: 'Growth',
      CAO: 'Analytics',
      CSO: 'Strategy',
    }
    const category = categoryMap[role] || role
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, compensation
      FROM jobs
      WHERE is_active = true
        AND (title ILIKE ${'%' + role + '%'} OR title ILIKE ${'%' + category + '%'})
        AND (country ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%UK%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs as any[]
  } catch {
    return []
  }
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.meta_description,
    alternates: {
      canonical: `https://fractional.quest/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.meta_description,
      url: `https://fractional.quest/articles/${slug}`,
      images: article.hero_image_url ? [article.hero_image_url] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const [faqs, salary, relatedJobs] = await Promise.all([
    getFAQsForRole(article.role_category),
    getSalaryData(article.role_category),
    getRelatedJobs(article.role_category),
  ])

  const colors = ROLE_COLORS[article.role_category] || ROLE_COLORS.DEFAULT
  const roleName = article.role_category ? `Fractional ${article.role_category}` : 'Fractional Executive'

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Schemas */}
      <WebPageSchema
        title={article.title}
        description={article.meta_description}
        url={`https://fractional.quest/articles/${slug}`}
        datePublished={article.created_at}
        dateModified={article.updated_at}
      />
      {faqs.length > 0 && <FAQPageSchema faqs={faqs} />}

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${colors.gradient} text-white py-16 lg:py-24 overflow-hidden`}>
        {(() => {
          const imageCategory = article.role_category ? getRoleImageCategory(article.role_category.toLowerCase()) : 'default'
          const heroImageUrl = getHeroImageUrl(imageCategory, 1920, 800)
          const imageCredit = getImage(imageCategory)
          return (
            <>
              <Image src={heroImageUrl} alt={article.title} fill priority sizes="100vw" className="object-cover opacity-30" />
              <div className="absolute bottom-2 right-2 z-10">
                <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white/60">Photo: {imageCredit.credit}</a>
              </div>
            </>
          )
        })()}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbsLight
            items={[
              { label: 'Home', href: '/' },
              { label: 'Articles', href: '/articles' },
              { label: article.title },
            ]}
          />

          <div className="mt-8 max-w-4xl">
            {article.role_category && (
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.badge} mb-4`}>
                {roleName}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {article.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              {article.meta_description}
            </p>
          </div>
        </div>
      </section>

      {/* Salary Stats (if available) */}
      {salary && (
        <section className="bg-gray-50 border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">£{salary.min_day_rate.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Min Day Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">£{salary.max_day_rate.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Max Day Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">£{salary.avg_day_rate.toLocaleString()}</div>
                <div className="text-sm text-gray-600 mt-1">Avg Day Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">£{(salary.max_annual / 1000).toFixed(0)}k</div>
                <div className="text-sm text-gray-600 mt-1">Annual Equivalent</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-emerald-700 prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content || '' }}
          />
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="bg-gray-50 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related {roleName} Jobs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedJobs.filter((job: any) => job.slug).map((job: any) => (
                <Link
                  key={job.id}
                  href={`/fractional-job/${job.slug}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{job.company_name}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{job.location}</span>
                    <span className="text-emerald-700 font-medium">{job.compensation}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/fractional-jobs-uk"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ items={faqs} skipSchema={true} />
          </div>
        </section>
      )}

      {/* Related Articles CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Roles</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover fractional executive opportunities across all C-suite functions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/fractional-cfo-jobs-uk" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              CFO Jobs
            </Link>
            <Link href="/fractional-cto-jobs-uk" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              CTO Jobs
            </Link>
            <Link href="/fractional-cmo-jobs-uk" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              CMO Jobs
            </Link>
            <Link href="/fractional-coo-jobs-uk" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              COO Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
