import { Metadata } from 'next'
import { neon } from '@neondatabase/serverless'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/navigation/Header'

interface Job {
  id: string
  title: string
  company_name: string
  location: string
  description_snippet: string
  full_description: string | null
  requirements: string[] | null
  responsibilities: string[] | null
  benefits: string[] | null
  about_company: string | null
  role_category: string
  salary_min: number | null
  salary_max: number | null
  salary_currency: string | null
  workplace_type: string | null
  hours_per_week: number | null
  url: string
  posted_date: string | null
  slug: string
  is_fractional: boolean
  is_interim: boolean
}

async function getJob(slug: string): Promise<Job | null> {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const jobs = await sql`
      SELECT
        id, title, company_name, location, description_snippet,
        full_description, requirements, responsibilities, benefits,
        about_company, role_category, salary_min, salary_max, salary_currency,
        workplace_type, hours_per_week, url, posted_date, slug,
        is_fractional, is_interim
      FROM jobs
      WHERE slug = ${slug} AND is_active = true
      LIMIT 1
    `
    return jobs[0] as Job || null
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    return { title: 'Job Not Found | Fractional Quest' }
  }

  const salaryText = job.salary_min && job.salary_max
    ? ` | £${job.salary_min.toLocaleString()}-£${job.salary_max.toLocaleString()}`
    : ''

  return {
    title: `${job.title} at ${job.company_name}${salaryText} | Fractional Quest`,
    description: job.description_snippet || `${job.title} - ${job.is_fractional ? 'Fractional' : 'Interim'} role at ${job.company_name} in ${job.location}`,
    openGraph: {
      title: `${job.title} at ${job.company_name}`,
      description: job.description_snippet,
      type: 'website',
    },
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) {
    notFound()
  }

  const roleTypeLabel = job.is_fractional ? 'Fractional' : job.is_interim ? 'Interim' : 'Executive'

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
              <Link href="/fractional-jobs-uk" className="hover:text-white">Jobs</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{job.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-emerald-600 rounded-full text-sm font-medium">
                {roleTypeLabel}
              </span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {job.role_category}
              </span>
              {job.workplace_type && (
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {job.workplace_type}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>

            {/* Company & Location */}
            <div className="flex flex-wrap items-center gap-4 text-lg text-gray-300">
              <span className="font-medium text-white">{job.company_name}</span>
              <span className="text-gray-500">|</span>
              <span>{job.location}</span>
              {job.hours_per_week && (
                <>
                  <span className="text-gray-500">|</span>
                  <span>{job.hours_per_week} hours/week</span>
                </>
              )}
            </div>

            {/* Salary */}
            {(job.salary_min || job.salary_max) && (
              <div className="mt-4 text-2xl font-semibold text-emerald-400">
                {job.salary_currency || '£'}
                {job.salary_min?.toLocaleString()}
                {job.salary_max && job.salary_min !== job.salary_max && (
                  <> - {job.salary_currency || '£'}{job.salary_max.toLocaleString()}</>
                )}
                <span className="text-base text-gray-400 ml-2">per day</span>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About This Role</h2>
                  <div className="prose prose-gray max-w-none">
                    {job.full_description ? (
                      <div dangerouslySetInnerHTML={{ __html: job.full_description.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <p>{job.description_snippet}</p>
                    )}
                  </div>
                </div>

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {job.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
                    <ul className="space-y-2">
                      {job.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">★</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* About Company */}
                {job.about_company && (
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">About {job.company_name}</h2>
                    <p className="text-gray-700">{job.about_company}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested?</h3>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-lg font-medium transition-colors mb-3"
                  >
                    Apply Now
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    You'll be redirected to the company's application page
                  </p>

                  {/* Quick Info */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Role Type</span>
                      <span className="text-gray-900 font-medium">{roleTypeLabel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category</span>
                      <span className="text-gray-900 font-medium">{job.role_category}</span>
                    </div>
                    {job.workplace_type && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Work Type</span>
                        <span className="text-gray-900 font-medium">{job.workplace_type}</span>
                      </div>
                    )}
                    {job.posted_date && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Posted</span>
                        <span className="text-gray-900 font-medium">
                          {new Date(job.posted_date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Similar Jobs CTA */}
                <div className="bg-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Looking for more?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse similar {job.role_category} opportunities
                  </p>
                  <Link
                    href={`/fractional-${job.role_category.toLowerCase()}-jobs-uk`}
                    className="text-emerald-700 hover:text-emerald-700 font-medium text-sm"
                  >
                    View {job.role_category} Jobs →
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
