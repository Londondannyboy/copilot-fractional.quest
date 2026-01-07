import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ, CTO_FAQS } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleNews } from '@/components/RoleNews'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { JobListingSchema } from '@/components/seo/JobPostingSchema'
import { getRoleBreadcrumbs } from '@/lib/seo-config'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { LazyYouTube } from '@/components/LazyYouTube'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

// Target keywords: "fractional cto jobs uk", "fractional cto uk", "fractional technology jobs", "cto salary uk", "part time cto"
export const metadata: Metadata = {
  title: 'Fractional CTO Jobs UK | Part-Time CTO & Technology Leadership Roles 2025',
  description: 'Fractional CTO jobs UK for experienced technology leaders. Part-time CTO and fractional technology jobs paying £800-£1,600/day. Browse fractional CTO UK roles, CTO salary UK rates, and fractional CTO services across London, Manchester, Bristol.',
  keywords: 'fractional cto jobs uk, fractional cto jobs, fractional cto uk, fractional technology jobs, part time cto, part-time cto, cto salary uk, fractional cto roles, fractional cto services, cto jobs uk, part time chief technology officer, fractional cto bristol',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cto-jobs-uk',
  },
  openGraph: {
    title: 'Fractional CTO Jobs UK | Part-Time CTO & Fractional Technology Jobs',
    description: 'Fractional CTO jobs UK & fractional technology jobs. Part-time CTO positions paying £800-£1,600/day. CTO salary UK guide included.',
    url: 'https://fractional.quest/fractional-cto-jobs-uk',
    images: ['/images/fractional-cto-jobs-uk.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CTO Jobs UK | Part-Time CTO Roles',
    description: 'Fractional CTO UK - Part-time CTO & fractional technology jobs £800-£1,600/day.',
  },
}

// UK location filter for all queries
const UK_FILTER = `(country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')`

async function getEngineeringStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Engineering' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS BIGINT)) as avg FROM jobs WHERE is_active = true AND role_category = 'Engineering' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Engineering' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '1100')),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 42, avgRate: 1100, remoteCount: 18 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Engineering'
        AND company_name IS NOT NULL
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')
      ORDER BY company_name
      LIMIT 30
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

// Server-side job fetch for SEO - renders in initial HTML for crawlers (UK only)
async function getEngineeringJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, country, city, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week, salary_min, salary_max, salary_currency,
        description_snippet
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Engineering'
        AND title NOT ILIKE '%interim%'
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 20
    `
    return jobs as any[]
  } catch {
    return []
  }
}

// Get related jobs from OTHER C-suite roles for cross-linking (UK only)
async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs
      WHERE is_active = true
        AND role_category IS NOT NULL
        AND role_category != 'Engineering'
        AND title NOT ILIKE '%interim%'
        AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 15
    `
    return jobs
  } catch {
    return []
  }
}

export default async function FractionalCtoJobsUkPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([
    getEngineeringStats(),
    getFeaturedCompanies(),
    getEngineeringJobs(),
    getRelatedJobs()
  ])

  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CTO Jobs UK | Part-Time CTO & Fractional Technology Jobs"
        description="Fractional CTO jobs UK and fractional technology jobs for experienced technology leaders. Part-time CTO positions paying £800-£1,600/day. CTO salary UK guide and fractional CTO services across the UK."
        url="https://fractional.quest/fractional-cto-jobs-uk"
        dateModified={lastUpdatedDate}
        itemCount={stats.total}
      />
      <FAQPageSchema faqs={CTO_FAQS} />

      {/* Video Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "What is a Fractional CTO? Role Explained",
            "description": "Learn what a fractional CTO UK does and how part-time CTO leaders help UK businesses grow. Discover fractional CTO jobs, fractional technology jobs, CTO salary UK rates, and how fractional CTO services provide technical guidance to startups and scale-ups.",
            "thumbnailUrl": "https://img.youtube.com/vi/8xLjRN-JFiE/maxresdefault.jpg",
            "uploadDate": "2024-02-01",
            "duration": "PT9M30S",
            "contentUrl": "https://www.youtube.com/watch?v=8xLjRN-JFiE",
            "embedUrl": "https://www.youtube.com/embed/8xLjRN-JFiE",
            "publisher": {
              "@type": "Organization",
              "name": "Fractional Quest",
              "logo": { "@type": "ImageObject", "url": "https://fractional.quest/logo.png" }
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Fractional CTO vs Technical Consultant",
            "description": "Understand the difference between a fractional CTO UK and a technical consultant. Learn about fractional CTO roles, part-time CTO options, and how fractional technology jobs provide embedded leadership versus project-based advice.",
            "thumbnailUrl": "https://img.youtube.com/vi/Qk6v8vKXlS0/maxresdefault.jpg",
            "uploadDate": "2024-03-20",
            "duration": "PT11M45S",
            "contentUrl": "https://www.youtube.com/watch?v=Qk6v8vKXlS0",
            "embedUrl": "https://www.youtube.com/embed/Qk6v8vKXlS0",
            "publisher": {
              "@type": "Organization",
              "name": "Fractional Quest",
              "logo": { "@type": "ImageObject", "url": "https://fractional.quest/logo.png" }
            }
          })
        }}
      />

      <JobListingSchema jobs={jobs} pageUrl="https://fractional.quest/fractional-cto-jobs-uk" />

      {/* Hero with Aspirational Image */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image - Technology professional */}
        <Image
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80"
          alt="Fractional CTO UK - Part-time CTO and fractional technology jobs professional"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/85 via-blue-500/70 to-indigo-500/50" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={getRoleBreadcrumbs('cto', 'jobs')} className="mb-8" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Fractional Technology Jobs
                  </span>
                  <LastUpdatedBadge date={lastUpdatedDate} className="text-white/70" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <strong>Fractional CTO Jobs UK</strong> & Part-Time CTO Roles
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                  <strong>Fractional CTO UK</strong> and <strong>part-time CTO</strong> roles for experienced technology leaders.
                  Browse <strong>fractional technology jobs</strong> with <strong>CTO salary UK</strong> rates of £800-£1,600/day.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#jobs" className="px-8 py-4 bg-white text-cyan-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Browse Jobs
                  </Link>
                  <Link href="/fractional-cto-salary" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                    Salary Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">{stats.total}+</div>
              <div className="text-sm text-gray-400">Live Roles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">£{stats.avgRate}</div>
              <div className="text-sm text-gray-400">Avg Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.remoteCount}</div>
              <div className="text-sm text-gray-400">Remote Roles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2-3 days</div>
              <div className="text-sm text-gray-400">Avg Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Jobs Lines - Latest CTO Jobs */}
      {(jobs as any[]).length > 0 && (
        <section className="py-6 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <HotJobsLines
              jobs={(jobs as any[]).map(job => ({
                id: job.id,
                slug: job.slug,
                title: job.title,
                company_name: job.company_name,
                location: job.location,
                is_remote: job.is_remote,
                compensation: job.compensation,
                role_category: job.role_category,
                posted_date: job.posted_date
              }))}
              title="Latest CTO Jobs"
              maxJobs={12}
              viewAllHref="#jobs"
              viewAllText="See all jobs"
            />
          </div>
        </section>
      )}

      {/* JOBS SECTION - Server-rendered for SEO */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CTO Jobs UK & Part-Time CTO Roles</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional CTO UK and fractional technology jobs</p>
          </div>

          {/* Server-rendered job grid - visible to search engines */}
          <ServerJobGrid
            jobs={jobs}
            roleCategory="Engineering"
            ctaLink="/fractional-jobs-uk?department=Engineering"
            ctaText={`View All ${stats.total}+ Fractional Technology Jobs`}
            maxJobs={9}
            showViewAll={true}
          />
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">CTO Salary UK</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              CTO Salary UK Calculator - Fractional CTO Rates
            </h2>
          </div>
          <RoleCalculator role="cto" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional CTOs</h2>
              <p className="text-gray-600 mt-2">These UK companies are actively looking for fractional CTO talent</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span
                  key={index}
                  className="text-xl md:text-2xl font-light text-gray-400 hover:text-cyan-500 transition-colors cursor-default"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Content Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Lead-in */}
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-4 block">The Guide</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to Know About<br />
              <span className="text-cyan-700">Fractional CTO UK & Part-Time CTO Jobs</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-500"></div>
          </div>

          {/* SEO Image - Editorial Style */}
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fractional CTO UK - part-time CTO and fractional technology jobs team strategy meeting"
              title="Fractional CTO Jobs UK - Part-Time CTO & Fractional Technology Jobs"
              className="w-full h-80 md:h-96 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
              Fractional CTO UK: Technology leaders are embracing part-time CTO and fractional technology jobs with competitive CTO salary UK rates
            </figcaption>
          </figure>

          {/* Article Content - Editorial Typography */}
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CTO jobs</strong> and <strong className="font-semibold text-gray-900">fractional technology jobs</strong> represent the new frontier of technology leadership. <strong>Part-time CTO</strong> positions where experienced leaders provide technical strategy and engineering guidance to multiple companies simultaneously—delivering world-class <strong>fractional CTO services</strong> at a fraction of the cost. According to <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline">IPSE (Association of Independent Professionals and the Self-Employed)</a>, the UK&apos;s senior contractor market continues to expand, with <strong>fractional CTO UK</strong> and technology leadership roles among the fastest-growing segments.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CTO UK & Fractional Technology Jobs</h3>
            <p>
              The UK market for <strong>fractional CTO jobs UK</strong> and <strong>fractional technology jobs</strong> has exploded, with a 250% year-on-year increase in searches. Startups, scale-ups, and SMEs are accessing senior technology talent through <strong>fractional CTO UK</strong> arrangements without the £150,000-£250,000 annual cost of a full-time Chief Technology Officer. <strong>Part-time CTO</strong> and <strong>part-time cto</strong> positions now represent a significant portion of the market.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-cyan-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                &ldquo;Companies access CTO expertise for £2,000-£5,000/week instead of £12,000+ monthly for full-time.&rdquo;
              </p>
            </div>

            {/* Video 1: What is a Fractional CTO */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">What is a Fractional CTO?</h4>
              <LazyYouTube
                videoId="8xLjRN-JFiE"
                title="What is a Fractional CTO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Learn how fractional CTOs provide technical leadership to UK businesses</p>
            </div>

            <div className="bg-cyan-50 p-6 border border-cyan-200 rounded-lg my-8 not-prose">
              <p className="text-cyan-800 font-medium mb-3">Looking to hire a fractional CTO instead?</p>
              <Link href="/hire-fractional-cto" className="inline-flex items-center text-cyan-700 font-bold hover:text-cyan-900">
                How to Hire a Fractional CTO →
              </Link>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional CTO UK & Part-Time CTO Jobs Are Booming</h3>
            <p>
              The growth in <strong>fractional CTO UK</strong> and <strong>part-time CTO</strong> demand is supported by broader economic trends. The <a href="https://www.britishbusinessbank.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline">British Business Bank&apos;s research</a> shows UK SMEs are increasingly seeking flexible access to senior talent through <strong>fractional technology jobs</strong>, while <a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline">Tech Nation data</a> highlights the UK tech sector&apos;s continued expansion, creating strong demand for <strong>fractional CTO services</strong>.
            </p>
            <ul className="space-y-3">
              <li><strong>Cost efficiency:</strong> <strong>Fractional CTO UK</strong> provides senior expertise at a fraction of the cost</li>
              <li><strong>Diverse experience:</strong> <strong>Part-time CTO</strong> leaders bring insights from multiple tech stacks and industries</li>
              <li><strong>Immediate impact:</strong> <strong>Fractional technology jobs</strong> deliver architecture and strategy from day one</li>
              <li><strong>Scalability:</strong> Flex engagement based on development phase</li>
              <li><strong>VC expectations:</strong> Professional technical leadership post-Series A through <strong>fractional CTO roles</strong></li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CTO Roles & Fractional Technology Jobs</h3>
            <p>
              <strong>Fractional CTO roles</strong> and <strong>fractional technology jobs</strong> in the UK span a wide range of specialisations, each commanding different <strong>CTO salary UK</strong> rates based on the complexity and demand. B2B SaaS <strong>part-time CTO</strong> positions tend to pay the highest rates due to the technical expertise required in platform architecture and engineering leadership.
            </p>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'B2B SaaS CTO', desc: 'Platform architecture & engineering leadership', rate: '£1,200-£1,600/day' },
                { title: 'AI/ML CTO', desc: 'Machine learning strategy & data infrastructure', rate: '£1,300-£1,800/day' },
                { title: 'Startup CTO', desc: 'Building technical foundations Series A-C', rate: '£1,000-£1,400/day' },
                { title: 'DevOps/Platform CTO', desc: 'Cloud infrastructure & deployment pipelines', rate: '£1,100-£1,500/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-cyan-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">CTO Salary UK: Fractional CTO Rates</h3>
            <p>
              <strong>CTO salary UK</strong> rates for <strong>fractional CTO</strong> positions vary significantly based on experience, specialisation, and location. Understanding <strong>CTO salary UK</strong> benchmarks is essential for both candidates seeking <strong>fractional CTO roles</strong> and companies hiring <strong>part-time CTO</strong> talent.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">CTO Salary UK - Typical Day Rates (2025)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Entry-level Fractional CTO:</strong> £800-£1,000/day</li>
                <li><strong>Mid-level Fractional CTO UK:</strong> £1,000-£1,300/day</li>
                <li><strong>Senior Part-Time CTO:</strong> £1,300-£1,600/day</li>
                <li><strong>Specialist CTO (AI/FinTech):</strong> £1,500-£2,000/day</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">CTO salary UK rates based on 2-3 days per week engagement. Full-time equivalent CTO salary UK ranges from £150,000-£250,000 annually.</p>
            </div>

            {/* Video 2: Fractional CTO vs Technical Consultant */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Fractional CTO vs Technical Consultant</h4>
              <LazyYouTube
                videoId="Qk6v8vKXlS0"
                title="Fractional CTO vs Technical Consultant"
              />
              <p className="text-gray-500 text-sm mt-3">Understand the key differences between fractional CTO and technical consultant roles</p>
            </div>

            {/* Second SEO Image */}
            <figure className="my-10 -mx-6 lg:-mx-16">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fractional CTO UK - Part-time CTO and fractional technology jobs reviewing architecture"
                title="Fractional CTO Jobs UK - Part-Time CTO & CTO Salary UK"
                className="w-full h-64 md:h-80 object-cover"
              />
              <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
                Fractional CTO UK and part-time CTO roles offer flexible fractional technology jobs opportunities with competitive CTO salary UK rates
              </figcaption>
            </figure>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CTO Services: What Companies Need</h3>
            <p>
              <strong>Fractional CTO services</strong> encompass the full spectrum of strategic technology leadership delivered on a flexible basis. Companies seeking <strong>fractional CTO UK</strong> talent typically need experienced leaders who can provide:
            </p>
            <ul className="space-y-2">
              <li><strong>Technical Strategy:</strong> Developing comprehensive technology roadmaps aligned with business objectives</li>
              <li><strong>Architecture Design:</strong> Building scalable, secure system architectures</li>
              <li><strong>Team Building:</strong> Hiring, mentoring, and leading engineering teams</li>
              <li><strong>Code Quality:</strong> Establishing engineering best practices, code reviews, and testing standards</li>
              <li><strong>DevOps & Infrastructure:</strong> Cloud architecture, CI/CD pipelines, and deployment strategies</li>
              <li><strong>Security & Compliance:</strong> Implementing security protocols and ensuring regulatory compliance</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CTO Jobs by Location</h3>
            <p>
              London leads <strong>fractional CTO UK</strong> opportunities with 60% of roles, but <strong>fractional technology jobs</strong> exist nationwide. Regional hubs like Manchester and Edinburgh are rapidly expanding their <strong>part-time CTO</strong> markets:
            </p>
            <ul className="space-y-2">
              <li><strong><Link href="/fractional-jobs-london" className="text-cyan-700 hover:text-cyan-700 underline">London Tech City</Link>:</strong> £1,100-£1,600/day - highest <strong>CTO salary UK</strong> rates</li>
              <li><strong>Manchester:</strong> £900-£1,200/day - growing <strong>fractional CTO UK</strong> hub</li>
              <li><strong>Bristol:</strong> £850-£1,150/day - <strong>fractional CTO services Bristol</strong> market expanding</li>
              <li><strong>Edinburgh:</strong> £900-£1,200/day - strong Scottish <strong>fractional technology jobs</strong></li>
              <li><strong>Remote UK:</strong> £800-£1,100/day - nationwide <strong>part-time CTO</strong> opportunities</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CTO Jobs</h3>
            <p>
              Professional credentials and continuous development are increasingly valued in fractional CTO roles. Many successful CTOs hold qualifications from bodies like the <a href="https://www.bcs.org" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline">BCS (British Computer Society)</a>. Understanding <a href="https://www.gov.uk/topic/business-tax/ir35" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline">IR35 compliance</a> is also essential for most fractional arrangements.
            </p>
            <ul className="space-y-2">
              <li>12-15+ years technology experience, 5+ in senior leadership</li>
              <li>Proven track record of scaling engineering teams and systems</li>
              <li>Deep expertise in modern tech stacks (cloud, microservices, AI/ML)</li>
              <li>Team building and engineering management experience</li>
              <li>Board-level communication skills</li>
            </ul>

            <div className="bg-gray-50 text-gray-900 p-6 rounded-lg my-10 not-prose">
              <p className="text-gray-600 mb-3">Want to understand fractional CTO pricing?</p>
              <Link href="/fractional-cto-cost" className="inline-flex items-center text-cyan-500 font-bold hover:text-cyan-400">
                View Fractional CTO Cost Guide →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* IR35 Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              UK IR35 Calculator for Fractional CTO UK & Part-Time CTO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              As a <strong>fractional CTO UK</strong> or <strong>part-time CTO</strong>, your IR35 status significantly impacts your <strong>CTO salary UK</strong> take-home pay
            </p>
          </div>
          <IR35Calculator defaultDayRate={1100} />
        </div>
      </section>

      {/* Engineering News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Engineering" title="Latest UK Fractional Technology Jobs & CTO News" limit={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Common Questions About Fractional CTO UK & Part-Time CTO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              Answers about <strong>fractional CTO jobs</strong>, <strong>fractional technology jobs</strong>, <strong>CTO salary UK</strong> rates, and <strong>fractional CTO services</strong>
            </p>
          </div>
          <FAQ items={CTO_FAQS} title="" />
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Resources</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">UK Resources for Fractional CTO Jobs</h2>
            <p className="text-xl text-gray-500">Authoritative UK sources for fractional CTO professionals</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500">Professional Bodies</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline font-medium">
                    BCS, The Chartered Institute for IT
                  </a>
                  {' '}&mdash; Leading UK professional body for IT
                </li>
                <li>
                  <a href="https://www.techuk.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline font-medium">
                    techUK
                  </a>
                  {' '}&mdash; UK technology industry trade association
                </li>
                <li>
                  <a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline font-medium">
                    Institute of Directors (IoD)
                  </a>
                  {' '}&mdash; Professional development for C-level executives
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-500">Government & Regulation</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.gov.uk/set-up-business" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline font-medium">
                    Gov.uk Business Setup Guide
                  </a>
                  {' '}&mdash; Official guidance for setting up as a fractional executive
                </li>
                <li>
                  <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:text-cyan-700 underline font-medium">
                    National Cyber Security Centre (NCSC)
                  </a>
                  {' '}&mdash; UK cybersecurity guidance and compliance
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T: Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />

      {/* E-E-A-T: Case Study */}
      <CaseStudy />
      <CaseStudySchema />

      {/* Related C-Suite Jobs */}
      {(relatedJobs as any[]).length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Other C-Suite Opportunities
              </h2>
              <p className="text-gray-600">
                Explore other executive roles across the UK.
              </p>
            </div>
            <HotJobsLines
              jobs={(relatedJobs as any[]).map(job => ({
                id: job.id,
                slug: job.slug,
                title: job.title,
                company_name: job.company_name,
                location: job.location,
                is_remote: job.is_remote,
                compensation: job.compensation,
                role_category: job.role_category,
                posted_date: job.posted_date
              }))}
              title="Related Executive Roles"
              maxJobs={15}
              viewAllHref="/fractional-jobs-uk"
              viewAllText="View all UK jobs"
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Fractional CTO UK</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Find Fractional CTO UK & Part-Time CTO Jobs
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Create your profile and get matched with UK companies seeking <strong>fractional CTO</strong> and <strong>part-time CTO</strong> leadership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/handler/sign-up"
              className="px-10 py-5 bg-cyan-500 text-black font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors"
            >
              Browse Fractional CTO Jobs
            </Link>
            <Link
              href="/fractional-cto-salary"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              CTO Salary UK Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related Pages</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-jobs-london" className="text-gray-600 hover:text-cyan-700 font-medium transition-colors">London Jobs</Link>
              <Link href="/fractional-cto-salary" className="text-gray-600 hover:text-cyan-700 font-medium transition-colors">CTO Salary UK</Link>
              <Link href="/hire-fractional-cto" className="text-gray-600 hover:text-cyan-700 font-medium transition-colors">Hire a CTO</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-cyan-700 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-cyan-700 font-medium transition-colors">CFO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Hub - Internal Linking */}
      <RoleContentHub currentRole="cto" />
    </div>
  )
}
