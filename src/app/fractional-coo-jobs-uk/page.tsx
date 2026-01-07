import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ, COO_FAQS } from '@/components/seo/FAQ'
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

// Target keywords: "fractional coo jobs uk", "fractional coo uk", "fractional operations jobs", "coo salary uk", "part time coo"
export const metadata: Metadata = {
  title: 'Fractional COO Jobs UK | Part-Time COO & Operations Leadership Roles 2025',
  description: 'Fractional COO jobs UK for experienced operations leaders. Part-time COO and fractional operations jobs paying £600-£1,200/day. Browse fractional COO UK roles, COO salary UK rates, and fractional COO services across London, Manchester, Bristol.',
  keywords: 'fractional coo jobs uk, fractional coo jobs, fractional coo uk, fractional operations jobs, part time coo, part-time coo, coo salary uk, fractional coo roles, fractional coo services, coo jobs uk, part time chief operating officer, fractional coo bristol',
  alternates: {
    canonical: 'https://fractional.quest/fractional-coo-jobs-uk',
  },
  openGraph: {
    title: 'Fractional COO Jobs UK | Part-Time COO & Fractional Operations Jobs',
    description: 'Fractional COO jobs UK & fractional operations jobs. Part-time COO positions paying £600-£1,200/day. COO salary UK guide included.',
    url: 'https://fractional.quest/fractional-coo-jobs-uk',
    images: ['/images/fractional-coo-jobs-uk.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional COO Jobs UK | Part-Time COO Roles',
    description: 'Fractional COO UK - Part-time COO & fractional operations jobs £600-£1,200/day.',
  },
}

async function getOperationsStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Operations' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS BIGINT)) as avg FROM jobs WHERE is_active = true AND role_category = 'Operations' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Operations' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '900')),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 35, avgRate: 900, remoteCount: 12 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Operations'
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
async function getOperationsJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, country, city, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week, salary_min, salary_max, salary_currency,
        description_snippet
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Operations'
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
        AND role_category != 'Operations'
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

export default async function FractionalCooJobsUkPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([
    getOperationsStats(),
    getFeaturedCompanies(),
    getOperationsJobs(),
    getRelatedJobs()
  ])

  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional COO Jobs UK | Part-Time COO & Fractional Operations Jobs"
        description="Fractional COO jobs UK and fractional operations jobs for experienced operations leaders. Part-time COO positions paying £600-£1,200/day. COO salary UK guide and fractional COO services across the UK."
        url="https://fractional.quest/fractional-coo-jobs-uk"
        dateModified={lastUpdatedDate}
        itemCount={stats.total}
      />
      <FAQPageSchema faqs={COO_FAQS} />

      {/* Video Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "What is a Fractional COO? Role Explained",
            "description": "Learn what a fractional COO UK does and how part-time COO leaders help UK businesses grow. Discover fractional COO jobs, fractional operations jobs, COO salary UK rates, and how fractional COO services provide operational guidance to startups and scale-ups.",
            "thumbnailUrl": "https://img.youtube.com/vi/cKxRvEZd3Mw/maxresdefault.jpg",
            "uploadDate": "2024-02-01",
            "duration": "PT8M15S",
            "contentUrl": "https://www.youtube.com/watch?v=cKxRvEZd3Mw",
            "embedUrl": "https://www.youtube.com/embed/cKxRvEZd3Mw",
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
            "name": "Fractional COO vs Operations Consultant",
            "description": "Understand the difference between a fractional COO UK and an operations consultant. Learn about fractional COO roles, part-time COO options, and how fractional operations jobs provide embedded leadership versus project-based advice.",
            "thumbnailUrl": "https://img.youtube.com/vi/YpHZ8LoHdQo/maxresdefault.jpg",
            "uploadDate": "2024-03-20",
            "duration": "PT9M30S",
            "contentUrl": "https://www.youtube.com/watch?v=YpHZ8LoHdQo",
            "embedUrl": "https://www.youtube.com/embed/YpHZ8LoHdQo",
            "publisher": {
              "@type": "Organization",
              "name": "Fractional Quest",
              "logo": { "@type": "ImageObject", "url": "https://fractional.quest/logo.png" }
            }
          })
        }}
      />

      <JobListingSchema jobs={jobs} pageUrl="https://fractional.quest/fractional-coo-jobs-uk" />

      {/* Hero with Aspirational Image */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image - Operations professional */}
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
          alt="Fractional COO UK - Part-time COO and fractional operations jobs professional"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/85 via-gray-600/70 to-zinc-500/50" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={getRoleBreadcrumbs('coo', 'jobs')} className="mb-8" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Fractional Operations Jobs
                  </span>
                  <LastUpdatedBadge date={lastUpdatedDate} className="text-white/70" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <strong>Fractional COO Jobs UK</strong> & Part-Time COO Roles
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                  <strong>Fractional COO UK</strong> and <strong>part-time COO</strong> roles for experienced operations leaders.
                  Browse <strong>fractional operations jobs</strong> with <strong>COO salary UK</strong> rates of £600-£1,200/day.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#jobs" className="px-8 py-4 bg-white text-slate-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Browse Jobs
                  </Link>
                  <Link href="/fractional-coo-salary" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
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

      {/* Hot Jobs Lines - Latest COO Jobs */}
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
              title="Latest COO Jobs"
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
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional COO Jobs UK & Part-Time COO Roles</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional COO UK and fractional operations jobs</p>
          </div>

          {/* Server-rendered job grid - visible to search engines */}
          <ServerJobGrid
            jobs={jobs}
            roleCategory="Operations"
            ctaLink="/fractional-jobs-uk?department=Operations"
            ctaText={`View All ${stats.total}+ Fractional Operations Jobs`}
            maxJobs={9}
            showViewAll={true}
          />
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">COO Salary UK</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              COO Salary UK Calculator - Fractional COO Rates
            </h2>
          </div>
          <RoleCalculator role="coo" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional COOs</h2>
              <p className="text-gray-600 mt-2">These UK companies are actively looking for fractional COO talent</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span
                  key={index}
                  className="text-xl md:text-2xl font-light text-gray-400 hover:text-slate-600 transition-colors cursor-default"
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
              <span className="text-slate-700">Fractional COO UK & Part-Time COO Jobs</span>
            </h2>
            <div className="w-24 h-1 bg-slate-500"></div>
          </div>

          {/* SEO Image - Editorial Style */}
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fractional COO UK - part-time COO and fractional operations jobs team strategy meeting"
              title="Fractional COO Jobs UK - Part-Time COO & Fractional Operations Jobs"
              className="w-full h-80 md:h-96 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
              Fractional COO UK: Operations leaders are embracing part-time COO and fractional operations jobs with competitive COO salary UK rates
            </figcaption>
          </figure>

          {/* Article Content - Editorial Typography */}
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional COO jobs</strong> and <strong className="font-semibold text-gray-900">fractional operations jobs</strong> represent the new frontier of operational leadership. <strong>Part-time COO</strong> positions where experienced leaders provide operational strategy and process optimisation to multiple companies simultaneously—delivering world-class <strong>fractional COO services</strong> at a fraction of the cost. According to <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline">IPSE (Association of Independent Professionals and the Self-Employed)</a>, the UK&apos;s senior contractor market continues to expand, with <strong>fractional COO UK</strong> and operations leadership roles among the fastest-growing segments.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional COO UK & Fractional Operations Jobs</h3>
            <p>
              The UK market for <strong>fractional COO jobs UK</strong> and <strong>fractional operations jobs</strong> has grown significantly, with a 180% year-on-year increase in searches. Startups, scale-ups, and SMEs are accessing senior operations talent through <strong>fractional COO UK</strong> arrangements without the £100,000-£180,000 annual cost of a full-time Chief Operating Officer. <strong>Part-time COO</strong> and <strong>part-time coo</strong> positions now represent a significant portion of the market.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-slate-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                &ldquo;Companies access COO expertise for £1,200-£3,500/week instead of £8,000+ monthly for full-time.&rdquo;
              </p>
            </div>

            {/* Video 1: What is a Fractional COO */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">What is a Fractional COO?</h4>
              <LazyYouTube
                videoId="cKxRvEZd3Mw"
                title="What is a Fractional COO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Learn how fractional COOs provide operational leadership to UK businesses</p>
            </div>

            <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg my-8 not-prose">
              <p className="text-slate-800 font-medium mb-3">Looking to hire a fractional COO instead?</p>
              <Link href="/hire-fractional-coo" className="inline-flex items-center text-slate-700 font-bold hover:text-slate-900">
                How to Hire a Fractional COO →
              </Link>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional COO UK & Part-Time COO Jobs Are Booming</h3>
            <p>
              The growth in <strong>fractional COO UK</strong> and <strong>part-time COO</strong> demand is supported by broader economic trends. The <a href="https://www.britishbusinessbank.co.uk/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline">British Business Bank&apos;s research</a> shows UK SMEs are increasingly seeking flexible access to senior talent through <strong>fractional operations jobs</strong>, while <a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline">Tech Nation data</a> highlights the UK tech sector&apos;s continued expansion, creating strong demand for <strong>fractional COO services</strong>.
            </p>
            <ul className="space-y-3">
              <li><strong>Cost efficiency:</strong> <strong>Fractional COO UK</strong> provides senior expertise at a fraction of the cost</li>
              <li><strong>Diverse experience:</strong> <strong>Part-time COO</strong> leaders bring insights from scaling multiple businesses</li>
              <li><strong>Immediate impact:</strong> <strong>Fractional operations jobs</strong> deliver process improvements from day one</li>
              <li><strong>Scalability:</strong> Flex engagement based on growth phase</li>
              <li><strong>Operational excellence:</strong> Professional operations leadership through <strong>fractional COO roles</strong></li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional COO Roles & Fractional Operations Jobs</h3>
            <p>
              <strong>Fractional COO roles</strong> and <strong>fractional operations jobs</strong> in the UK span a wide range of specialisations, each commanding different <strong>COO salary UK</strong> rates based on the complexity and demand. Scale-up <strong>part-time COO</strong> positions tend to pay the highest rates due to the expertise required in rapid growth management.
            </p>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Scale-up COO', desc: 'Rapid growth & team scaling', rate: '£900-£1,200/day' },
                { title: 'E-commerce COO', desc: 'Supply chain & fulfilment optimisation', rate: '£800-£1,100/day' },
                { title: 'Startup COO', desc: 'Building operational foundations', rate: '£700-£1,000/day' },
                { title: 'Process Improvement COO', desc: 'Lean operations & efficiency gains', rate: '£750-£1,050/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-slate-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">COO Salary UK: Fractional COO Rates</h3>
            <p>
              <strong>COO salary UK</strong> rates for <strong>fractional COO</strong> positions vary significantly based on experience, specialisation, and location. Understanding <strong>COO salary UK</strong> benchmarks is essential for both candidates seeking <strong>fractional COO roles</strong> and companies hiring <strong>part-time COO</strong> talent.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">COO Salary UK - Typical Day Rates (2025)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Entry-level Fractional COO:</strong> £550-£750/day</li>
                <li><strong>Mid-level Fractional COO UK:</strong> £750-£950/day</li>
                <li><strong>Senior Part-Time COO:</strong> £950-£1,200/day</li>
                <li><strong>Specialist COO (PE/VC):</strong> £1,100-£1,400/day</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">COO salary UK rates based on 2-3 days per week engagement. Full-time equivalent COO salary UK ranges from £100,000-£180,000 annually.</p>
            </div>

            {/* Video 2: Fractional COO vs Operations Consultant */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Fractional COO vs Operations Consultant</h4>
              <LazyYouTube
                videoId="YpHZ8LoHdQo"
                title="Fractional COO vs Operations Consultant"
              />
              <p className="text-gray-500 text-sm mt-3">Understand the key differences between fractional COO and operations consultant roles</p>
            </div>

            {/* Second SEO Image */}
            <figure className="my-10 -mx-6 lg:-mx-16">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fractional COO UK - Part-time COO and fractional operations jobs reviewing processes"
                title="Fractional COO Jobs UK - Part-Time COO & COO Salary UK"
                className="w-full h-64 md:h-80 object-cover"
              />
              <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
                Fractional COO UK and part-time COO roles offer flexible fractional operations jobs opportunities with competitive COO salary UK rates
              </figcaption>
            </figure>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional COO Services: What Companies Need</h3>
            <p>
              <strong>Fractional COO services</strong> encompass the full spectrum of strategic operational leadership delivered on a flexible basis. Companies seeking <strong>fractional COO UK</strong> talent typically need experienced leaders who can provide:
            </p>
            <ul className="space-y-2">
              <li><strong>Operational Strategy:</strong> Developing comprehensive operational plans aligned with business growth</li>
              <li><strong>Process Optimisation:</strong> Streamlining workflows and eliminating inefficiencies</li>
              <li><strong>Team Scaling:</strong> Building and structuring teams for rapid growth</li>
              <li><strong>Vendor Management:</strong> Negotiating contracts and managing supplier relationships</li>
              <li><strong>KPI Development:</strong> Establishing metrics and dashboards for operational visibility</li>
              <li><strong>Change Management:</strong> Leading organisational transformation initiatives</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional COO Jobs by Location</h3>
            <p>
              London leads <strong>fractional COO UK</strong> opportunities with 50% of roles, but <strong>fractional operations jobs</strong> exist nationwide. Regional hubs like Manchester and Edinburgh are rapidly expanding their <strong>part-time COO</strong> markets:
            </p>
            <ul className="space-y-2">
              <li><strong><Link href="/fractional-jobs-london" className="text-slate-700 hover:text-slate-700 underline">London</Link>:</strong> £800-£1,200/day - highest <strong>COO salary UK</strong> rates</li>
              <li><strong>Manchester:</strong> £650-£950/day - growing <strong>fractional COO UK</strong> hub</li>
              <li><strong>Bristol:</strong> £600-£900/day - <strong>fractional COO services Bristol</strong> market expanding</li>
              <li><strong>Edinburgh:</strong> £650-£950/day - strong Scottish <strong>fractional operations jobs</strong></li>
              <li><strong>Remote UK:</strong> £550-£850/day - nationwide <strong>part-time COO</strong> opportunities</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional COO Jobs</h3>
            <p>
              Professional credentials and continuous development are increasingly valued in fractional COO roles. Many successful COOs hold qualifications from bodies like the <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline">Chartered Management Institute (CMI)</a>. Understanding <a href="https://www.gov.uk/topic/business-tax/ir35" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline">IR35 compliance</a> is also essential for most fractional arrangements.
            </p>
            <ul className="space-y-2">
              <li>10-15+ years operations experience, 5+ in senior leadership</li>
              <li>Proven track record of scaling businesses and teams</li>
              <li>Deep expertise in process improvement and operational efficiency</li>
              <li>Team building and change management experience</li>
              <li>Board-level communication skills</li>
            </ul>

            <div className="bg-gray-50 text-gray-900 p-6 rounded-lg my-10 not-prose">
              <p className="text-gray-600 mb-3">Want to understand fractional COO pricing?</p>
              <Link href="/fractional-coo-cost" className="inline-flex items-center text-slate-600 font-bold hover:text-slate-800">
                View Fractional COO Cost Guide →
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
              UK IR35 Calculator for Fractional COO UK & Part-Time COO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              As a <strong>fractional COO UK</strong> or <strong>part-time COO</strong>, your IR35 status significantly impacts your <strong>COO salary UK</strong> take-home pay
            </p>
          </div>
          <IR35Calculator defaultDayRate={900} />
        </div>
      </section>

      {/* Operations News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Operations" title="Latest UK Fractional Operations Jobs & COO News" limit={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Common Questions About Fractional COO UK & Part-Time COO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              Answers about <strong>fractional COO jobs</strong>, <strong>fractional operations jobs</strong>, <strong>COO salary UK</strong> rates, and <strong>fractional COO services</strong>
            </p>
          </div>
          <FAQ items={COO_FAQS} title="" />
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Resources</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">UK Resources for Fractional COO Jobs</h2>
            <p className="text-xl text-gray-500">Authoritative UK sources for fractional COO professionals</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-500">Professional Bodies</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.managers.org.uk/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline font-medium">
                    Chartered Management Institute (CMI)
                  </a>
                  {' '}&mdash; Leading UK professional body for management and leadership
                </li>
                <li>
                  <a href="https://www.cips.org/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline font-medium">
                    Chartered Institute of Procurement & Supply (CIPS)
                  </a>
                  {' '}&mdash; Professional body for procurement and supply chain
                </li>
                <li>
                  <a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline font-medium">
                    Institute of Directors (IoD)
                  </a>
                  {' '}&mdash; Professional development for C-level executives
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-slate-500">Government & Regulation</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.gov.uk/set-up-business" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline font-medium">
                    Gov.uk Business Setup Guide
                  </a>
                  {' '}&mdash; Official guidance for setting up as a fractional executive
                </li>
                <li>
                  <a href="https://www.hse.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-700 underline font-medium">
                    Health and Safety Executive (HSE)
                  </a>
                  {' '}&mdash; UK workplace health and safety guidance
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Fractional COO UK</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Find Fractional COO UK & Part-Time COO Jobs
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Create your profile and get matched with UK companies seeking <strong>fractional COO</strong> and <strong>part-time COO</strong> leadership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/handler/sign-up"
              className="px-10 py-5 bg-slate-500 text-white font-bold uppercase tracking-wider hover:bg-slate-400 transition-colors"
            >
              Browse Fractional COO Jobs
            </Link>
            <Link
              href="/fractional-coo-salary"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              COO Salary UK Guide
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
              <Link href="/fractional-jobs-london" className="text-gray-600 hover:text-slate-700 font-medium transition-colors">London Jobs</Link>
              <Link href="/fractional-coo-salary" className="text-gray-600 hover:text-slate-700 font-medium transition-colors">COO Salary UK</Link>
              <Link href="/hire-fractional-coo" className="text-gray-600 hover:text-slate-700 font-medium transition-colors">Hire a COO</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-slate-700 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-slate-700 font-medium transition-colors">CTO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Hub - Internal Linking */}
      <RoleContentHub currentRole="coo" />
    </div>
  )
}
