import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { createDbQuery } from '@/lib/db'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { getRoleImageCategory, getHeroImageUrl, getImage } from '@/lib/images'

export const revalidate = 3600

// Parse job description into structured sections
function parseJobDescription(text: string): React.ReactNode[] {
  if (!text) return []

  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let key = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-2 my-4 text-gray-600">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Check if it's a bullet point (starts with ·, •, -, *)
    if (/^[·•\-\*]\s*/.test(line)) {
      const bulletText = line.replace(/^[·•\-\*]\s*/, '')
      currentList.push(bulletText)
      continue
    }

    // Flush any pending list
    flushList()

    // Check if it's a section heading (short line, no ending punctuation, followed by content)
    const isHeading = line.length < 60 &&
                      !/[.,:;!?]$/.test(line) &&
                      i < lines.length - 1 &&
                      (lines[i + 1]?.trim().length > 0 || /^[·•\-\*]/.test(lines[i + 1]?.trim() || ''))

    // Check if it looks like a metadata line (Key: Value format)
    const metaMatch = line.match(/^([A-Za-z\s]+):\s*(.+)$/)
    if (metaMatch && metaMatch[1].length < 30) {
      elements.push(
        <div key={key++} className="flex flex-wrap gap-2 my-3 py-2 px-3 bg-gray-50 rounded-lg">
          <span className="font-semibold text-gray-700">{metaMatch[1]}:</span>
          <span className="text-gray-600">{metaMatch[2]}</span>
        </div>
      )
      continue
    }

    if (isHeading) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-gray-900 mt-8 mb-3 first:mt-0">
          {line}
        </h3>
      )
    } else {
      // Regular paragraph
      elements.push(
        <p key={key++} className="text-gray-600 leading-relaxed my-3">
          {line}
        </p>
      )
    }
  }

  // Flush any remaining list
  flushList()

  return elements
}

type Props = {
  params: Promise<{ slug: string }>
}

// Internal function to fetch job from database
async function fetchJob(slug: string) {
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

// Cached version - revalidates every hour
const getJob = unstable_cache(
  fetchJob,
  ['job-by-slug'],
  { revalidate: 3600, tags: ['jobs'] }
)

// Internal function to fetch related jobs
async function fetchRelatedJobs(jobId: number, roleCategory: string | null, companyName: string | null) {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, compensation
      FROM jobs
      WHERE is_active = true
        AND id != ${jobId}
        AND (role_category = ${roleCategory} OR company_name = ${companyName})
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs as any[]
  } catch {
    return []
  }
}

// Cached version - revalidates every hour
const getRelatedJobsCached = unstable_cache(
  fetchRelatedJobs,
  ['related-jobs'],
  { revalidate: 3600, tags: ['jobs'] }
)

// Wrapper to match original interface
async function getRelatedJobs(job: any) {
  if (!job) return []
  return getRelatedJobsCached(job.id, job.role_category, job.company_name)
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

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title={`${job.title} at ${job.company_name}`}
        description={job.description_snippet || `${job.title} role at ${job.company_name}`}
        url={`https://fractional.quest/fractional-job/${slug}`}
        datePublished={job.posted_date}
        dateModified={job.updated_at || job.posted_date}
      />

      {/* Hero with Image */}
      <section className="relative min-h-[350px] lg:min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getHeroImageUrl(getRoleImageCategory(job.role_category || 'default'), 1600, 600)}
            alt={getImage(getRoleImageCategory(job.role_category || 'default')).alt}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">{job.role_category}</span>
              )}
              {job.workplace_type && (
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">{job.workplace_type}</span>
              )}
              {job.is_remote && (
                <span className="px-3 py-1 bg-green-500/30 backdrop-blur-sm text-green-300 rounded-full text-sm">Remote</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-200">
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
                  <div className="max-w-none">
                    {/* Parse description into structured sections with headings, lists, and paragraphs */}
                    {job.full_description.includes('<p>') || job.full_description.includes('<br') ? (
                      <div
                        className="prose prose-lg text-gray-600"
                        dangerouslySetInnerHTML={{ __html: job.full_description }}
                      />
                    ) : (
                      parseJobDescription(job.full_description)
                    )}
                  </div>
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
