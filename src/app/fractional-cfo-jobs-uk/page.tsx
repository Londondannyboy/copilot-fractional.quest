import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ, CFO_FAQS } from '@/components/seo/FAQ'
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
import { getOGImageUrl, getImage } from '@/lib/images'

export const revalidate = 3600

const ogImage = getOGImageUrl('cfo')
const imageAlt = getImage('cfo').alt

// Target keywords: "fractional cfo jobs uk", "fractional cfo uk", "fractional finance jobs", "cfo salary uk", "part time cfo"
export const metadata: Metadata = {
  title: 'Fractional CFO Jobs UK | Part-Time CFO & Finance Leadership Roles 2025',
  description: 'Fractional CFO jobs UK for experienced finance leaders. Part-time CFO and fractional finance jobs paying £700-£1,400/day. Browse fractional CFO UK roles, CFO salary UK rates, and fractional CFO services across London, Manchester, Bristol.',
  keywords: 'fractional cfo jobs uk, fractional cfo jobs, fractional cfo uk, fractional finance jobs, part time cfo, part-time cfo, cfo salary uk, fractional cfo roles, fractional cfo services, cfo jobs uk, part time chief financial officer, fractional cfo bristol',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo-jobs-uk',
  },
  openGraph: {
    title: 'Fractional CFO Jobs UK | Part-Time CFO & Fractional Finance Jobs',
    description: 'Fractional CFO jobs UK & fractional finance jobs. Part-time CFO positions paying £700-£1,400/day. CFO salary UK guide included.',
    url: 'https://fractional.quest/fractional-cfo-jobs-uk',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CFO Jobs UK | Part-Time CFO Roles',
    description: 'Fractional CFO UK - Part-time CFO & fractional finance jobs £700-£1,400/day.',
    images: [ogImage],
  },
}

async function getFinanceStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, avgRateResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Finance' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%')`,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS BIGINT)) as avg FROM jobs WHERE is_active = true AND role_category = 'Finance' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND role_category = 'Finance' AND (country ILIKE '%UK%' OR country ILIKE '%United Kingdom%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%' OR location ILIKE '%Edinburgh%' OR location ILIKE '%Birmingham%' OR location ILIKE '%Bristol%' OR location ILIKE '%Leeds%' OR location ILIKE '%Glasgow%' OR location ILIKE '%England%' OR location ILIKE '%Scotland%' OR location ILIKE '%Wales%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      avgRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '1050')),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 40, avgRate: 1050, remoteCount: 14 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Finance'
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
async function getFinanceJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, country, city, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week, salary_min, salary_max, salary_currency,
        description_snippet
      FROM jobs
      WHERE is_active = true
        AND role_category = 'Finance'
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
        AND role_category != 'Finance'
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

export default async function FractionalCfoJobsUkPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([
    getFinanceStats(),
    getFeaturedCompanies(),
    getFinanceJobs(),
    getRelatedJobs()
  ])

  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CFO Jobs UK | Part-Time CFO & Fractional Finance Jobs"
        description="Fractional CFO jobs UK and fractional finance jobs for experienced finance leaders. Part-time CFO positions paying £700-£1,400/day. CFO salary UK guide and fractional CFO services across the UK."
        url="https://fractional.quest/fractional-cfo-jobs-uk"
        dateModified={lastUpdatedDate}
        itemCount={stats.total}
      />
      <FAQPageSchema faqs={CFO_FAQS} />

      {/* Video Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "What is a Fractional CFO? Role Explained",
            "description": "Learn what a fractional CFO UK does and how part-time CFO leaders help UK businesses grow. Discover fractional CFO jobs, fractional finance jobs, CFO salary UK rates, and how fractional CFO services provide financial guidance to startups and scale-ups.",
            "thumbnailUrl": "https://img.youtube.com/vi/vFTB5pWJY4A/maxresdefault.jpg",
            "uploadDate": "2024-02-01",
            "duration": "PT9M20S",
            "contentUrl": "https://www.youtube.com/watch?v=vFTB5pWJY4A",
            "embedUrl": "https://www.youtube.com/embed/vFTB5pWJY4A",
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
            "name": "Fractional CFO vs Financial Consultant",
            "description": "Understand the difference between a fractional CFO UK and a financial consultant. Learn about fractional CFO roles, part-time CFO options, and how fractional finance jobs provide embedded leadership versus project-based advice.",
            "thumbnailUrl": "https://img.youtube.com/vi/QfNvhPx5Px8/maxresdefault.jpg",
            "uploadDate": "2024-03-20",
            "duration": "PT10M45S",
            "contentUrl": "https://www.youtube.com/watch?v=QfNvhPx5Px8",
            "embedUrl": "https://www.youtube.com/embed/QfNvhPx5Px8",
            "publisher": {
              "@type": "Organization",
              "name": "Fractional Quest",
              "logo": { "@type": "ImageObject", "url": "https://fractional.quest/logo.png" }
            }
          })
        }}
      />

      <JobListingSchema jobs={jobs} pageUrl="https://fractional.quest/fractional-cfo-jobs-uk" />

      {/* Hero with Aspirational Image */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image - Finance professional */}
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
          alt="Fractional CFO UK - Part-time CFO and fractional finance jobs professional"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/85 via-teal-500/70 to-green-500/50" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={getRoleBreadcrumbs('cfo', 'jobs')} className="mb-8" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Fractional Finance Jobs
                  </span>
                  <LastUpdatedBadge date={lastUpdatedDate} className="text-white/70" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <strong>Fractional CFO Jobs UK</strong> & Part-Time CFO Roles
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                  <strong>Fractional CFO UK</strong> and <strong>part-time CFO</strong> roles for experienced finance leaders.
                  Browse <strong>fractional finance jobs</strong> with <strong>CFO salary UK</strong> rates of £700-£1,400/day.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#jobs" className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Browse Jobs
                  </Link>
                  <Link href="/fractional-cfo-salary" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
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

      {/* Hot Jobs Lines - Latest CFO Jobs */}
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
              title="Latest CFO Jobs"
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
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CFO Jobs UK & Part-Time CFO Roles</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional CFO UK and fractional finance jobs</p>
          </div>

          {/* Server-rendered job grid - visible to search engines */}
          <ServerJobGrid
            jobs={jobs}
            roleCategory="Finance"
            ctaLink="/fractional-jobs-uk?department=Finance"
            ctaText={`View All ${stats.total}+ Fractional Finance Jobs`}
            maxJobs={9}
            showViewAll={true}
          />
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">CFO Salary UK</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              CFO Salary UK Calculator - Fractional CFO Rates
            </h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Fractional CFOs</h2>
              <p className="text-gray-600 mt-2">These UK companies are actively looking for fractional CFO talent</p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span
                  key={index}
                  className="text-xl md:text-2xl font-light text-gray-400 hover:text-emerald-500 transition-colors cursor-default"
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
              <span className="text-emerald-700">Fractional CFO UK & Part-Time CFO Jobs</span>
            </h2>
            <div className="w-24 h-1 bg-emerald-500"></div>
          </div>

          {/* SEO Image - Editorial Style */}
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Fractional CFO UK - part-time CFO and fractional finance jobs team strategy meeting"
              title="Fractional CFO Jobs UK - Part-Time CFO & Fractional Finance Jobs"
              className="w-full h-80 md:h-96 object-cover"
            />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
              Fractional CFO UK: Finance leaders are embracing part-time CFO and fractional finance jobs with competitive CFO salary UK rates
            </figcaption>
          </figure>

          {/* Article Content - Editorial Typography */}
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CFO jobs</strong> and <strong className="font-semibold text-gray-900">fractional finance jobs</strong> represent the new frontier of financial leadership. <strong>Part-time CFO</strong> positions where experienced leaders provide financial strategy and fiscal guidance to multiple companies simultaneously—delivering world-class <strong>fractional CFO services</strong> at a fraction of the cost. According to <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">IPSE (Association of Independent Professionals and the Self-Employed)</a>, the UK&apos;s senior contractor market continues to expand, with <strong>fractional CFO UK</strong> and finance leadership roles among the fastest-growing segments.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CFO UK & Fractional Finance Jobs</h3>
            <p>
              The UK market for <strong>fractional CFO jobs UK</strong> and <strong>fractional finance jobs</strong> has exploded, with a 220% year-on-year increase in searches. Startups, scale-ups, and SMEs are accessing senior finance talent through <strong>fractional CFO UK</strong> arrangements without the £130,000-£220,000 annual cost of a full-time Chief Financial Officer. <strong>Part-time CFO</strong> and <strong>part-time cfo</strong> positions now represent a significant portion of the market.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-emerald-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                &ldquo;Companies access CFO expertise for £1,500-£4,500/week instead of £11,000+ monthly for full-time.&rdquo;
              </p>
            </div>

            {/* Video 1: What is a Fractional CFO */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">What is a Fractional CFO?</h4>
              <LazyYouTube
                videoId="vFTB5pWJY4A"
                title="What is a Fractional CFO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Learn how fractional CFOs provide financial leadership to UK businesses</p>
            </div>

            <div className="bg-emerald-50 p-6 border border-emerald-200 rounded-lg my-8 not-prose">
              <p className="text-emerald-800 font-medium mb-3">Looking to hire a fractional CFO instead?</p>
              <Link href="/hire-fractional-cfo" className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-900">
                How to Hire a Fractional CFO →
              </Link>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional CFO UK & Part-Time CFO Jobs Are Booming</h3>
            <p>
              The growth in <strong>fractional CFO UK</strong> and <strong>part-time CFO</strong> demand is supported by broader economic trends. The <a href="https://www.britishbusinessbank.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">British Business Bank&apos;s research</a> shows UK SMEs are increasingly seeking flexible access to senior talent through <strong>fractional finance jobs</strong>, while <a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">Tech Nation data</a> highlights the UK tech sector&apos;s continued expansion, creating strong demand for <strong>fractional CFO services</strong>.
            </p>
            <ul className="space-y-3">
              <li><strong>Cost efficiency:</strong> <strong>Fractional CFO UK</strong> provides senior expertise at a fraction of the cost</li>
              <li><strong>Diverse experience:</strong> <strong>Part-time CFO</strong> leaders bring insights from multiple fundraising rounds and exits</li>
              <li><strong>Immediate impact:</strong> <strong>Fractional finance jobs</strong> deliver financial clarity from day one</li>
              <li><strong>Investor readiness:</strong> Professional financial leadership for fundraising</li>
              <li><strong>VC expectations:</strong> Investor-grade reporting through <strong>fractional CFO roles</strong></li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CFO Roles & Fractional Finance Jobs</h3>
            <p>
              <strong>Fractional CFO roles</strong> and <strong>fractional finance jobs</strong> in the UK span a wide range of specialisations, each commanding different <strong>CFO salary UK</strong> rates based on the complexity and demand. According to <a href="https://www.cipd.org/uk/knowledge/reports/flexible-working-trends/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">CIPD research on flexible working</a>, senior finance roles are increasingly adopting portfolio and fractional arrangements.
            </p>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'VC-Backed Startup CFO', desc: 'Fundraising & investor relations', rate: '£1,100-£1,400/day' },
                { title: 'PE Portfolio CFO', desc: 'Value creation & exit planning', rate: '£1,200-£1,500/day' },
                { title: 'Scale-up CFO', desc: 'Growth finance & cash management', rate: '£900-£1,200/day' },
                { title: 'Turnaround CFO', desc: 'Restructuring & crisis management', rate: '£1,000-£1,300/day' },
                { title: 'Fractional Finance Director', desc: 'Day-to-day financial operations', rate: '£850-£1,100/day' },
                { title: 'Interim CFO', desc: 'Full-time temporary coverage', rate: '£1,100-£1,500/day' },
                { title: 'Part-Time CFO', desc: '1-3 days per week ongoing', rate: '£950-£1,300/day' },
                { title: 'Exit-Ready CFO', desc: 'M&A and sale preparation', rate: '£1,100-£1,500/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-emerald-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">CFO Salary UK: Fractional CFO Rates</h3>
            <p>
              <strong>CFO salary UK</strong> rates for <strong>fractional CFO</strong> positions vary significantly based on experience, specialisation, and location. Understanding <strong>CFO salary UK</strong> benchmarks is essential for both candidates seeking <strong>fractional CFO roles</strong> and companies hiring <strong>part-time CFO</strong> talent.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">CFO Salary UK - Typical Day Rates (2025)</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Entry-level Fractional CFO:</strong> £650-£850/day</li>
                <li><strong>Mid-level Fractional CFO UK:</strong> £850-£1,100/day</li>
                <li><strong>Senior Part-Time CFO:</strong> £1,100-£1,400/day</li>
                <li><strong>Specialist CFO (PE/VC):</strong> £1,300-£1,600/day</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">CFO salary UK rates based on 2-3 days per week engagement. Full-time equivalent CFO salary UK ranges from £130,000-£220,000 annually.</p>
            </div>

            {/* Video 2: Fractional CFO vs Financial Consultant */}
            <div className="my-10 not-prose">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Fractional CFO vs Financial Consultant</h4>
              <LazyYouTube
                videoId="QfNvhPx5Px8"
                title="Fractional CFO vs Financial Consultant"
              />
              <p className="text-gray-500 text-sm mt-3">Understand the key differences between fractional CFO and financial consultant roles</p>
            </div>

            {/* Second SEO Image */}
            <figure className="my-10 -mx-6 lg:-mx-16">
              <img
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fractional CFO UK - Part-time CFO and fractional finance jobs reviewing financial strategy"
                title="Fractional CFO Jobs UK - Part-Time CFO & CFO Salary UK"
                className="w-full h-64 md:h-80 object-cover"
              />
              <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
                Fractional CFO UK and part-time CFO roles offer flexible fractional finance jobs opportunities with competitive CFO salary UK rates
              </figcaption>
            </figure>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CFO Services: What Companies Need</h3>
            <p>
              <strong>Fractional CFO services</strong> encompass the full spectrum of strategic financial leadership delivered on a flexible basis. Companies seeking <strong>fractional CFO UK</strong> talent typically need experienced leaders who can provide:
            </p>
            <ul className="space-y-2">
              <li><strong>Financial Strategy:</strong> Developing comprehensive financial plans aligned with business objectives</li>
              <li><strong>Cash Flow Management:</strong> Optimising working capital and runway planning</li>
              <li><strong>Fundraising Support:</strong> Leading Series A-C rounds and investor relations</li>
              <li><strong>Board Reporting:</strong> Preparing investor-grade financial presentations</li>
              <li><strong>FP&A:</strong> Budgeting, forecasting, and variance analysis</li>
              <li><strong>Compliance & Audit:</strong> Ensuring regulatory compliance and audit readiness</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CFO Jobs by Location</h3>
            <p>
              London leads <strong>fractional CFO UK</strong> opportunities with 55% of roles, but <strong>fractional finance jobs</strong> exist nationwide. Regional hubs like Manchester and Edinburgh are rapidly expanding their <strong>part-time CFO</strong> markets:
            </p>
            <ul className="space-y-2">
              <li><strong><Link href="/fractional-jobs-london" className="text-emerald-700 hover:text-emerald-700 underline">London City</Link>:</strong> £950-£1,400/day - highest <strong>CFO salary UK</strong> rates</li>
              <li><strong>Manchester:</strong> £750-£1,050/day - growing <strong>fractional CFO UK</strong> hub</li>
              <li><strong>Bristol:</strong> £700-£1,000/day - <strong>fractional CFO services Bristol</strong> market expanding</li>
              <li><strong>Edinburgh:</strong> £750-£1,050/day - strong Scottish <strong>fractional finance jobs</strong></li>
              <li><strong>Remote UK:</strong> £650-£950/day - nationwide <strong>part-time CFO</strong> opportunities</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">How to Access Fractional CFO Opportunities</h3>
            <p>
              According to <a href="https://www.ons.gov.uk/employmentandlabourmarket" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">ONS employment data</a>, the UK&apos;s flexible executive market continues to grow. Here&apos;s how to position yourself for the best <strong>fractional CFO</strong> opportunities:
            </p>
            <ol className="space-y-3">
              <li><strong>1. Build your portfolio profile:</strong> Document your track record with fundraising amounts, exits, and companies scaled</li>
              <li><strong>2. Register with specialist platforms:</strong> Create profiles on Fractional.Quest and other executive networks</li>
              <li><strong>3. Leverage VC/PE networks:</strong> Many <strong>fractional CFO roles</strong> come through investor introductions</li>
              <li><strong>4. Establish thought leadership:</strong> Write about finance topics, speak at events, build your personal brand</li>
              <li><strong>5. Consider IR35 status early:</strong> Structure your practice correctly from the start</li>
            </ol>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">CFO vs Finance Director: Understanding the Terminology</h3>
            <p>
              In the UK market, &ldquo;CFO&rdquo; and &ldquo;Finance Director&rdquo; (FD) are often used interchangeably, though CFO typically implies a more strategic, board-level role. According to the <a href="https://www.bvca.co.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">British Private Equity & Venture Capital Association (BVCA)</a>, PE-backed companies increasingly prefer the CFO title to signal investor-grade financial leadership. Both <strong>fractional CFO</strong> and <strong>fractional Finance Director</strong> roles offer excellent opportunities for senior finance professionals.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CFO Jobs</h3>
            <p>
              Professional credentials and continuous development are highly valued in fractional CFO roles. Most successful CFOs are qualified accountants with bodies like <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">ICAEW</a>, <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">ACCA</a>, or <a href="https://www.cimaglobal.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">CIMA</a>. Understanding <a href="https://www.gov.uk/topic/business-tax/ir35" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline">IR35 compliance</a> is essential for most fractional arrangements.</p>
            <ul className="space-y-2">
              <li>Professional accounting qualification (ACA, ACCA, CIMA)</li>
              <li>12-15+ years finance experience, 5+ in senior leadership</li>
              <li>Proven track record of fundraising and investor management</li>
              <li>Deep expertise in SaaS metrics, unit economics, and growth finance</li>
              <li>Board-level communication and presentation skills</li>
            </ul>

            <div className="bg-gray-50 text-gray-900 p-6 rounded-lg my-10 not-prose">
              <p className="text-gray-600 mb-3">Want to understand fractional CFO pricing?</p>
              <Link href="/fractional-cfo-cost" className="inline-flex items-center text-emerald-500 font-bold hover:text-emerald-400">
                View Fractional CFO Cost Guide →
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
              UK IR35 Calculator for Fractional CFO UK & Part-Time CFO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              As a <strong>fractional CFO UK</strong> or <strong>part-time CFO</strong>, your IR35 status significantly impacts your <strong>CFO salary UK</strong> take-home pay
            </p>
          </div>
          <IR35Calculator defaultDayRate={1050} />
        </div>
      </section>

      {/* Finance News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Finance" title="Latest UK Fractional Finance Jobs & CFO News" limit={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Common Questions About Fractional CFO UK & Part-Time CFO Jobs
            </h2>
            <p className="text-gray-600 mt-4">
              Answers about <strong>fractional CFO jobs</strong>, <strong>fractional finance jobs</strong>, <strong>CFO salary UK</strong> rates, and <strong>fractional CFO services</strong>
            </p>
          </div>
          <FAQ items={CFO_FAQS} title="" />
        </div>
      </section>

      {/* Related Finance Leadership Roles */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Related Roles</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Related Finance Leadership Roles</h2>
            <p className="text-xl text-gray-500">Explore other fractional finance opportunities in the UK</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/part-time-cfo-jobs-uk" className="group bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Part-Time CFO Jobs UK</h3>
              <p className="text-gray-600 mb-4">Ongoing 1-3 days per week CFO positions for experienced finance leaders seeking portfolio careers.</p>
              <span className="text-emerald-700 font-semibold">View Part-Time CFO Jobs →</span>
            </Link>
            <Link href="/interim-cfo-jobs-uk" className="group bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Interim CFO Jobs UK</h3>
              <p className="text-gray-600 mb-4">Full-time temporary CFO roles covering leadership gaps, transformations, or crisis situations.</p>
              <span className="text-emerald-700 font-semibold">View Interim CFO Jobs →</span>
            </Link>
            <Link href="/fractional-cfo" className="group bg-gray-50 p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Fractional CFO Guide</h3>
              <p className="text-gray-600 mb-4">Complete guide to what a fractional CFO does, typical responsibilities, and how to become one.</p>
              <span className="text-emerald-700 font-semibold">Read the Guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">By Location</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Fractional CFO Jobs by UK Location</h2>
            <p className="text-xl text-gray-500">Find fractional CFO opportunities near you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/fractional-jobs-london" className="group bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">London</h3>
              <p className="text-gray-600 mb-2">The UK&apos;s largest market for fractional CFO roles. Home to VC-backed startups, PE portfolio companies, and scale-ups seeking senior finance leadership.</p>
              <p className="text-emerald-700 font-semibold">Day rates: £950-£1,400</p>
            </Link>
            <Link href="/manchester" className="group bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Manchester</h3>
              <p className="text-gray-600 mb-2">Growing tech hub with strong demand for fractional finance leaders. MediaCityUK and Northern Quarter driving growth.</p>
              <p className="text-emerald-700 font-semibold">Day rates: £750-£1,050</p>
            </Link>
            <Link href="/remote-fractional-jobs" className="group bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700">Remote UK</h3>
              <p className="text-gray-600 mb-2">Work from anywhere in the UK with remote-first companies. Hybrid and fully remote fractional CFO positions available.</p>
              <p className="text-emerald-700 font-semibold">Day rates: £650-£950</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Resources</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">UK Resources for Fractional CFO Jobs</h2>
            <p className="text-xl text-gray-500">Authoritative UK sources for fractional CFO professionals</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-emerald-500">Professional Bodies</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline font-medium">
                    ICAEW (Chartered Accountants)
                  </a>
                  {' '}&mdash; Institute of Chartered Accountants in England and Wales
                </li>
                <li>
                  <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline font-medium">
                    ACCA (Global Accountants)
                  </a>
                  {' '}&mdash; Association of Chartered Certified Accountants
                </li>
                <li>
                  <a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline font-medium">
                    Institute of Directors (IoD)
                  </a>
                  {' '}&mdash; Professional development for C-level executives
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-emerald-500">Government & Regulation</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="https://www.gov.uk/set-up-business" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline font-medium">
                    Gov.uk Business Setup Guide
                  </a>
                  {' '}&mdash; Official guidance for setting up as a fractional executive
                </li>
                <li>
                  <a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:text-emerald-700 underline font-medium">
                    Financial Reporting Council (FRC)
                  </a>
                  {' '}&mdash; UK accounting standards and corporate governance
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
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Fractional CFO UK</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Find Fractional CFO UK & Part-Time CFO Jobs
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Create your profile and get matched with UK companies seeking <strong>fractional CFO</strong> and <strong>part-time CFO</strong> leadership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/handler/sign-up"
              className="px-10 py-5 bg-emerald-500 text-black font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors"
            >
              Browse Fractional CFO Jobs
            </Link>
            <Link
              href="/fractional-cfo-salary"
              className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              CFO Salary UK Guide
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
              <Link href="/fractional-jobs-london" className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">London Jobs</Link>
              <Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">CFO Salary UK</Link>
              <Link href="/hire-fractional-cfo" className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">Hire a CFO</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-emerald-700 font-medium transition-colors">CTO Jobs UK</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Hub - Internal Linking */}
      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
