import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { createDbQuery } from '@/lib/db'
import { partTimeCfoSEO } from '@/lib/seo-content/part-time-cfo'

export const revalidate = 3600

// Table of Contents
const tocItems = [
  { id: 'definition', title: 'What is a Part-Time CFO?' },
  { id: 'comparison', title: 'Part-Time vs Fractional vs Interim' },
  { id: 'day-rates', title: 'Day Rates UK 2026' },
  { id: 'who-hires', title: 'Who Hires Part-Time CFOs?' },
  { id: 'responsibilities', title: 'Responsibilities' },
  { id: 'how-to-become', title: 'How to Become One' },
  { id: 'services', title: 'Services & Packages' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'faq', title: 'FAQ' },
  { id: 'jobs', title: 'Part-Time CFO Jobs' },
]

export const metadata: Metadata = {
  title: partTimeCfoSEO.meta.title,
  description: partTimeCfoSEO.meta.description,
  keywords: partTimeCfoSEO.meta.keywords.join(', '),
  alternates: { canonical: 'https://fractional.quest/part-time-cfo' },
  openGraph: {
    title: 'Part-Time CFO | Portfolio Finance Leadership Guide UK 2026',
    description: 'Part-time CFO guide: what they do, day rates (£900-£1,500), who hires them, and how to become one.',
    url: 'https://fractional.quest/part-time-cfo',
    images: [{ url: 'https://fractional.quest/api/og?title=Part-Time%20CFO%20Guide', width: 1200, height: 630, alt: 'Part-Time CFO Guide UK' }],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Finance Roles', href: '/fractional-cfo' },
  { label: 'Part-Time CFO', href: '/part-time-cfo' },
]

const PART_TIME_CFO_FAQS = partTimeCfoSEO.faqs

async function getPartTimeCFOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date
      FROM jobs
      WHERE is_active = true
      AND (title ILIKE '%part%time%cfo%' OR title ILIKE '%part%time%finance director%' OR title ILIKE '%fractional%cfo%')
      AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 6
    `
    return jobs as any[]
  } catch { return [] }
}

export default async function PartTimeCfoPage() {
  const jobs = await getPartTimeCFOJobs()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Part-Time CFO | Portfolio Finance Leadership Guide UK 2026"
        description="Complete guide to part-time CFO roles: what they do, day rates, responsibilities, and how to become one."
        url="https://fractional.quest/part-time-cfo"
        dateModified={new Date('2026-01-27')}
      />
      <FAQPageSchema faqs={PART_TIME_CFO_FAQS} />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section with Overlay */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&q=80"
          alt="Part-time CFO reviewing financial strategy with business leadership team"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-teal-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {partTimeCfoSEO.hero.badge}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Part-Time CFO: Your Complete Guide
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                Everything you need to know about <strong>part-time CFO</strong> roles.
                <br className="hidden md:block" />
                <br />
                Day rates, responsibilities, who hires <strong>part-time finance directors</strong>, and how to build a portfolio career.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#jobs" className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-emerald-50 transition-colors">
                  Browse Part-Time CFO Jobs
                </a>
                <Link href="/part-time-cfo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  All CFO Jobs UK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-emerald-400">{partTimeCfoSEO.hero.stats.avgDayRate}</div>
              <div className="text-gray-400 text-sm">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">{partTimeCfoSEO.hero.stats.typicalDays}</div>
              <div className="text-gray-400 text-sm">Typical Commitment</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">{partTimeCfoSEO.hero.stats.marketGrowth}</div>
              <div className="text-gray-400 text-sm">Market Growth</div>
            </div>
            <div>
              <div className="text-3xl font-black text-emerald-400">70%</div>
              <div className="text-gray-400 text-sm">Hybrid Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Main Content with Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Column */}
            <article className="prose prose-lg prose-gray max-w-none">

              {/* Section: Definition */}
              <div id="definition" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Part-Time CFO?</h2>

                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  A <strong>part-time CFO</strong> is an experienced Chief Financial Officer who works with companies on a reduced schedule, typically 1-3 days per week.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Unlike a full-time CFO, a <strong>part-time finance director</strong> provides senior financial leadership without the commitment or cost of a permanent executive hire.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The <strong>part-time CFO</strong> model has grown 250% since 2020, driven by SMEs, startups, and PE-backed companies recognising they can access CFO-level expertise at a fraction of full-time cost.
                </p>

                {/* Authority context box */}
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
                  <p className="text-sm text-gray-700">
                    <strong>UK Market Context:</strong> According to <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-medium">ICAEW</a>, 45% of growing UK SMEs now use part-time finance leadership. As <a href="https://www.bbc.co.uk/news/articles/c0r4zd29n5no" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-medium">BBC reports</a>, fractional executive work is transforming how companies access senior talent.
                  </p>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether called a <strong>part-time CFO</strong>, fractional CFO, or portfolio finance director, these roles provide strategic financial guidance, board-level reporting, fundraising support, and financial systems implementation on a flexible basis.
                </p>
              </div>

              {/* Section: Comparison */}
              <div id="comparison" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Part-Time CFO vs Fractional CFO vs Interim CFO</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Understanding the differences between engagement types helps companies choose the right model for their needs.
                </p>

                <div className="overflow-x-auto my-8 not-prose">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Factor</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-emerald-700">Part-Time CFO</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Fractional CFO</th>
                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-900">Interim CFO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Schedule</td>
                        <td className="px-4 py-3 text-sm text-emerald-700 font-medium">1-3 days/week ongoing</td>
                        <td className="px-4 py-3 text-sm text-gray-600">1-3 days/week, flexible</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Full-time (5 days)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Duration</td>
                        <td className="px-4 py-3 text-sm text-emerald-700 font-medium">12+ months typical</td>
                        <td className="px-4 py-3 text-sm text-gray-600">6-24 months</td>
                        <td className="px-4 py-3 text-sm text-gray-600">3-12 months</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Annual Cost</td>
                        <td className="px-4 py-3 text-sm text-emerald-700 font-medium">£50,000-£150,000</td>
                        <td className="px-4 py-3 text-sm text-gray-600">£50,000-£180,000</td>
                        <td className="px-4 py-3 text-sm text-gray-600">£200,000-£400,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">Best For</td>
                        <td className="px-4 py-3 text-sm text-emerald-700 font-medium">SMEs, ongoing support</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Growing companies</td>
                        <td className="px-4 py-3 text-sm text-gray-600">Vacancy, M&A, turnaround</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  The terms &quot;part-time CFO&quot; and &quot;fractional CFO&quot; are often used interchangeably. &quot;<strong>Part-time CFO</strong>&quot; emphasizes the reduced hours on a set schedule, while &quot;fractional CFO&quot; emphasizes working across multiple clients.
                </p>
              </div>

              {/* Section: Day Rates */}
              <div id="day-rates" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Part-Time CFO Day Rates UK 2026</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Day rates for <strong>part-time CFOs</strong> vary by sector, complexity, and location. Here are current UK market rates:
                </p>

                <div className="grid gap-4 not-prose my-8">
                  {partTimeCfoSEO.content.dayRates.rates.map((rate, i) => (
                    <div key={i} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-gray-900">{rate.sector}</h4>
                          <p className="text-sm text-gray-500">{rate.notes}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-700 font-bold text-lg">{rate.range}</div>
                          <div className="text-gray-500 text-sm">Typical: {rate.typical}/day</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-500">
                  Source: <a href="https://www.glassdoor.co.uk" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Glassdoor UK</a>, <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">ICAEW</a>, Fractional Quest market data
                </p>
              </div>

              {/* Section: Who Hires */}
              <div id="who-hires" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Who Hires Part-Time CFOs?</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Part-time CFO</strong> roles are most common in these company types:
                </p>

                <div className="grid gap-6 not-prose my-8">
                  {partTimeCfoSEO.content.whoHires.segments.map((segment, i) => (
                    <div key={i} className="bg-white p-6 rounded-lg border-2 border-gray-100 hover:border-emerald-200 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2">{segment.type}</h4>
                          <p className="text-gray-600">{segment.description}</p>
                        </div>
                        <div className="bg-emerald-50 px-4 py-2 rounded-lg text-center md:text-right">
                          <div className="text-emerald-700 font-bold text-sm">{segment.typical}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Responsibilities */}
              <div id="responsibilities" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Part-Time CFO Responsibilities</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Core deliverables that <strong>part-time CFOs</strong> provide across engagements:
                </p>

                <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                  {partTimeCfoSEO.content.responsibilities.items.map((item, i) => (
                    <div key={i} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-3">{item.area}</h4>
                      <ul className="space-y-2">
                        {item.tasks.map((task, j) => (
                          <li key={j} className="flex items-start gap-2 text-gray-600">
                            <span className="text-emerald-500 mt-1">&#10003;</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: How to Become */}
              <div id="how-to-become" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">How to Become a Part-Time CFO</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Building a career as a <strong>part-time CFO</strong> requires strategic planning and the right qualifications.
                </p>

                <div className="space-y-6 not-prose my-8">
                  {partTimeCfoSEO.content.howToBecome.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Authority links */}
                <div className="bg-gray-50 p-6 rounded-lg my-8 not-prose">
                  <h4 className="font-bold text-gray-900 mb-4">Professional Bodies & Resources</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-700 hover:underline">
                      <span>&#127970;</span> ICAEW - Chartered Accountants
                    </a>
                    <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-700 hover:underline">
                      <span>&#127970;</span> ACCA - Global Accountancy
                    </a>
                    <a href="https://www.cimaglobal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-700 hover:underline">
                      <span>&#127970;</span> CIMA - Management Accounting
                    </a>
                    <a href="https://www.bvca.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-700 hover:underline">
                      <span>&#127970;</span> BVCA - Private Equity
                    </a>
                  </div>
                </div>
              </div>

              {/* Section: Services */}
              <div id="services" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-black text-gray-900 mb-6">Part-Time CFO Services & Packages</h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  <strong>Part-time CFO</strong> engagements typically follow these service models:
                </p>

                <div className="grid gap-6 not-prose my-8">
                  {partTimeCfoSEO.content.services.packages.map((pkg, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-emerald-300 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-xl">{pkg.name}</h4>
                          <p className="text-emerald-700 font-medium">{pkg.days}</p>
                        </div>
                        <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-center">
                          <div className="text-emerald-400 font-bold">{pkg.rate}</div>
                          <div className="text-gray-400 text-xs">{pkg.annualCost}/year</div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2"><strong>Focus:</strong> {pkg.focus}</p>
                      <p className="text-gray-500 text-sm"><strong>Best for:</strong> {pkg.bestFor}</p>
                    </div>
                  ))}
                </div>
              </div>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              <div className="sticky top-24 space-y-6">
                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Part-Time CFO Snapshot</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Day Rate Range</span>
                      <span className="font-bold text-emerald-700">£800-£1,800</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Typical Days</span>
                      <span className="font-bold text-gray-900">1-3/week</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Annual Cost</span>
                      <span className="font-bold text-emerald-700">£50-150k</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">vs Full-Time</span>
                      <span className="font-bold text-gray-900">50-70% savings</span>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <h3 className="font-bold mb-2">Find Part-Time CFO Jobs</h3>
                  <p className="text-gray-300 text-sm mb-4">Browse live part-time CFO and Finance Director roles UK.</p>
                  <Link href="/part-time-cfo-jobs-uk" className="block w-full py-3 bg-emerald-500 text-black font-bold rounded-lg text-center hover:bg-emerald-400 transition-colors">
                    View Part-Time CFO Jobs
                  </Link>
                </div>

                {/* Table of Contents */}
                <TableOfContents items={tocItems} />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/part-time-cfo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>&#128188;</span> Part-Time CFO Jobs UK
                    </Link>
                    <Link href="/fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>&#128214;</span> What is a Fractional CFO?
                    </Link>
                    <Link href="/fractional-cfo-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>&#128176;</span> CFO Salary Guide
                    </Link>
                    <Link href="/hire-fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>&#128203;</span> How to Hire a CFO
                    </Link>
                  </div>
                </div>

                {/* Authority Links */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Authority Sources</h3>
                  <div className="space-y-2">
                    {partTimeCfoSEO.authorityLinks.slice(0, 4).map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-gray-600 hover:text-emerald-700">
                        &#8594; {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Part-Time CFO Day Rate Calculator
            </h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Part-Time CFO FAQ
            </h2>
          </div>
          <FAQ items={PART_TIME_CFO_FAQS} title="" />
        </div>
      </section>

      {/* Expert Profile & Case Study */}
      <ExpertProfile />
      <ExpertProfileSchema />
      <CaseStudy />
      <CaseStudySchema />

      {/* Jobs Section */}
      {jobs.length > 0 && (
        <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Part-Time CFO Jobs UK</h2>
              <p className="text-xl text-gray-500">Latest part-time CFO and Finance Director opportunities</p>
            </div>
            <ServerJobGrid
              jobs={jobs}
              roleCategory="Finance"
              ctaLink="/part-time-cfo-jobs-uk"
              ctaText="View All Part-Time CFO Jobs"
              maxJobs={6}
              showViewAll={true}
            />
          </div>
        </section>
      )}

      {/* Related Pages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Related</span>
            <h2 className="text-2xl font-black text-gray-900">Explore More Resources</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/part-time-cfo-jobs-uk" className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">&#128188;</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Part-Time CFO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse all part-time CFO and Finance Director jobs</p>
            </Link>
            <Link href="/fractional-cfo-salary" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">&#128176;</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">CFO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK day rates, annual earnings, and benchmarks</p>
            </Link>
            <Link href="/hire-fractional-cfo" className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">&#128203;</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">How to Hire a Part-Time CFO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and interview questions</p>
            </Link>
          </div>

          {/* Cross-links */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Related Part-Time Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/part-time-cmo-jobs-uk" className="text-sm text-emerald-700 hover:underline">Part-Time CMO</Link>
              <span className="text-gray-300">&#8226;</span>
              <Link href="/part-time-cto-jobs-uk" className="text-sm text-emerald-700 hover:underline">Part-Time CTO</Link>
              <span className="text-gray-300">&#8226;</span>
              <Link href="/fractional-coo-jobs-uk" className="text-sm text-emerald-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">&#8226;</span>
              <Link href="/fractional-chro-jobs-uk" className="text-sm text-emerald-700 hover:underline">Fractional CHRO</Link>
            </div>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
