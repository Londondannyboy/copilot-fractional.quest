import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createDbQuery } from '@/lib/db'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'

export const revalidate = 3600

type Props = {
  params: Promise<{ slug: string }>
}

async function getJob(slug: string) {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, workplace_type, is_remote,
        compensation, posted_date, updated_date, description_snippet,
        full_description, requirements, responsibilities, benefits,
        qualifications, skills_required, role_category, hours_per_week,
        url, about_company, about_team, appeal_summary, key_deliverables
      FROM jobs
      WHERE slug = ${slug} AND is_active = true
    `
    return jobs[0] as any || null
  } catch {
    return null
  }
}

async function getRelatedJobs(job: any) {
  if (!job) return []
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, compensation
      FROM jobs
      WHERE is_active = true
        AND id != ${job.id}
        AND (role_category = ${job.role_category} OR company_name = ${job.company_name})
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs as any[]
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    return { title: 'Job Not Found | Fractional Quest' }
  }

  const title = `${job.title} at ${job.company_name} | Fractional Quest`
  const description = job.description_snippet ||
    `${job.title} - ${job.workplace_type || 'Flexible'} role at ${job.company_name}. ${job.compensation || 'Competitive salary'}. Apply now on Fractional Quest.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://fractional.quest/fractional-job/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://fractional.quest/fractional-job/${slug}`,
    },
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = await getRelatedJobs(job)

  // Determine role category for color theming
  const roleColors: Record<string, string> = {
    'Finance': 'emerald',
    'Technology': 'cyan',
    'Marketing': 'pink',
    'Operations': 'amber',
    'HR': 'purple',
    'Sales': 'green',
  }
  const colorTheme = roleColors[job.role_category] || 'slate'

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title={`${job.title} at ${job.company_name}`}
        description={job.description_snippet || `${job.title} role at ${job.company_name}`}
        url={`https://fractional.quest/fractional-job/${slug}`}
        datePublished={job.posted_date}
        dateModified={job.updated_at || job.posted_date}
      />

      {/* Hero */}
      <section className={`bg-gradient-to-br from-${colorTheme}-950 via-${colorTheme}-900 to-slate-950 text-white py-12 lg:py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbsLight
            items={[
              { label: 'Home', href: '/' },
              { label: 'Jobs', href: '/fractional-jobs-uk' },
              { label: job.title },
            ]}
          />

          <div className="mt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {job.role_category && (
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">{job.role_category}</span>
              )}
              {job.workplace_type && (
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm">{job.workplace_type}</span>
              )}
              {job.is_remote && (
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Remote</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="font-semibold text-white">{job.company_name}</span>
              {job.location && <span>• {job.location}</span>}
              {job.compensation && <span className="text-emerald-400 font-medium">• {job.compensation}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Role</h2>

                {job.full_description ? (
                  <div
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: job.full_description }}
                  />
                ) : job.description_snippet ? (
                  <p className="text-gray-600 leading-relaxed">{job.description_snippet}</p>
                ) : (
                  <p className="text-gray-600">
                    This is a {job.workplace_type || 'flexible'} {job.title} role at {job.company_name}.
                    {job.location && ` Based in ${job.location}.`}
                    {job.compensation && ` Offering ${job.compensation}.`}
                  </p>
                )}

                {job.skills_required && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(job.skills_required) ? job.skills_required : job.skills_required.split(',')).map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>

                <dl className="space-y-4">
                  {job.company_name && (
                    <div>
                      <dt className="text-sm text-gray-500">Company</dt>
                      <dd className="font-medium text-gray-900">{job.company_name}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt className="text-sm text-gray-500">Location</dt>
                      <dd className="font-medium text-gray-900">{job.location}</dd>
                    </div>
                  )}
                  {job.compensation && (
                    <div>
                      <dt className="text-sm text-gray-500">Compensation</dt>
                      <dd className="font-medium text-emerald-600">{job.compensation}</dd>
                    </div>
                  )}
                  {job.hours_per_week && (
                    <div>
                      <dt className="text-sm text-gray-500">Hours/Week</dt>
                      <dd className="font-medium text-gray-900">{job.hours_per_week}</dd>
                    </div>
                  )}
                  {job.posted_date && (
                    <div>
                      <dt className="text-sm text-gray-500">Posted</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(job.posted_date).toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </dd>
                    </div>
                  )}
                </dl>

                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block w-full text-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Apply Now
                  </a>
                )}

                <Link
                  href="/fractional-jobs-uk"
                  className="mt-3 block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Browse All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Jobs */}
      {relatedJobs.length > 0 && (
        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Jobs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedJobs.map((relatedJob: any) => (
                <Link
                  key={relatedJob.id}
                  href={`/fractional-job/${relatedJob.slug}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedJob.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{relatedJob.company_name}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{relatedJob.location}</span>
                    {relatedJob.compensation && (
                      <span className="text-emerald-600 font-medium">{relatedJob.compensation}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Find Your Next Fractional Role</h2>
          <p className="text-gray-400 mb-6">Browse hundreds of fractional and interim executive positions</p>
          <Link
            href="/fractional-jobs-uk"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            View All Jobs
          </Link>
        </div>
      </section>
    </div>
  )
}
