import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/seo/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { ServerJobGrid } from '@/components/ServerJobGrid'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { JobListingSchema } from '@/components/seo/JobPostingSchema'
import { WebPageSchema, LastUpdatedBadge } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Advisory CEO Jobs UK | Executive Leadership Advisory Roles 2026',
  description: 'Find advisory CEO jobs UK with day rates £800-£1,200. Browse advisory Chief Executive Officer and Managing Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory ceo jobs uk, advisory ceo, advisory managing director jobs, advisory chief executive officer, advisory ceo roles uk, advisory executive jobs, advisory ceo london, advisory ceo remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-ceo-jobs-uk' },
  openGraph: {
    title: 'Advisory CEO Jobs UK | Executive Leadership Advisory Roles 2026',
    description: 'Find advisory CEO jobs UK with day rates £800-£1,200. Browse advisory Chief Executive Officer and Managing Director roles.',
    url: 'https://www.fractional.quest/advisory-ceo-jobs-uk',
  },
}

const ADVISORY_CEO_FAQS = [
  { question: "What is an advisory CEO?", answer: "An advisory CEO is an experienced chief executive who provides strategic leadership guidance and expertise on a consultative basis. Unlike interim CEOs who take on full executive responsibility, advisory CEOs offer high-level counsel on specific challenges such as strategic planning, board relations, leadership development, or business transformation. They typically work fewer hours but bring deep expertise to critical executive decisions." },
  { question: "What are typical advisory CEO day rates in the UK?", answer: "Advisory CEO day rates in the UK typically range from £800-£1,200 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like turnaround advisory or PE portfolio leadership can command rates of £1,200-£1,800/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CEO engagement work?", answer: "Advisory CEO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CEO might support strategic planning, mentor the CEO or leadership team, advise on board matters, or provide guidance during major transitions. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory CEO and executive coach?", answer: "Advisory CEOs bring operational CEO experience and provide strategic business guidance, often with hands-on involvement in specific challenges. Executive coaches focus on personal development and leadership skills. Advisory CEOs might work alongside the board; executive coaches typically work one-on-one with the individual leader." },
  { question: "What qualifications do advisory CEOs need?", answer: "Most advisory CEOs have 20+ years of executive experience including prior CEO, MD, or President roles. Essential qualifications include proven P&L responsibility, successful exits or transformations, board-level experience, and the ability to mentor and develop other leaders. Many have sector-specific expertise or specialise in certain company stages (startup, scale-up, turnaround)." },
  { question: "What situations call for an advisory CEO?", answer: "The highest demand for advisory CEOs comes from: first-time CEOs seeking mentorship, boards wanting independent oversight, founders transitioning to CEO roles, PE-backed companies needing strategic guidance, and organisations undergoing significant transformation or transition." },
  { question: "Do advisory CEO roles fall inside or outside IR35?", answer: "Advisory CEO roles often fall outside IR35 due to their consultative nature, lack of operational control, and strategic focus. However, each engagement must be assessed individually. Key factors include: providing advice not direction, working for multiple clients, and clearly defined project scope. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CEOs?", answer: "Advisory CEO hiring focuses on chemistry and trust. The process typically includes: initial discussion with the board or CEO about challenges, assessment of relevant experience and leadership style, discussion of working relationship dynamics, and agreement on scope and confidentiality. Relationships are often built through referrals and networks." },
  { question: "Can advisory CEO work lead to board positions?", answer: "Yes, advisory CEO relationships frequently evolve into board positions. Many advisory CEOs are invited to join as Non-Executive Directors, Advisory Board members, or Chairs after demonstrating value. The advisory model is an excellent path to building a portfolio of board relationships." },
  { question: "What should I include in my advisory CEO profile?", answer: "Focus on: successful exits or transformations led, P&L scale managed, board experience and investor relations, leadership philosophy and mentoring approach, and sector expertise. Highlight your advisory approach and how you support rather than replace the executive team." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CEO Jobs UK', href: '/advisory-ceo-jobs-uk' },
]

async function getAdvisoryCEOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ceo%' OR title ILIKE '%advisory%managing director%' OR title ILIKE '%advisory%chief executive%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ceo%' OR title ILIKE '%advisory%managing%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 10, avgRate: 1000, remoteCount: Number(remoteCount?.count || 4) }
  } catch { return { total: 10, avgRate: 1000, remoteCount: 4 } }
}

async function getAdvisoryCEOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%ceo%' OR title ILIKE '%advisory%managing director%' OR title ILIKE '%advisory%chief executive%' OR (title ILIKE '%advisory%' AND role_category = 'Executive')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Executive') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%coo%' OR title ILIKE '%fractional%ceo%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCEOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCEOStats(), getFeaturedCompanies(), getAdvisoryCEOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CEO Jobs UK | Executive Leadership Advisory Roles 2026" description="Find advisory CEO jobs UK with day rates £800-£1,200. Browse advisory Chief Executive Officer and Managing Director roles." url="https://www.fractional.quest/advisory-ceo-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CEO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-ceo-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&q=80" alt="Advisory CEO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/95 via-yellow-800/90 to-amber-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Executive Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CEO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CEO</strong> and <strong>advisory Managing Director</strong> roles across the UK. Premium advisory executive leadership positions with day rates from £800-£1,200.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-yellow-900 font-bold rounded-lg hover:bg-yellow-50 transition-colors">Browse Advisory CEO Jobs</a>
                <Link href="/fractional-ceo-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CEO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-yellow-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CEO Roles</div></div>
            <div><div className="text-3xl font-black text-yellow-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-yellow-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-yellow-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-yellow-50 border-y border-yellow-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CEO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CEO & Managing Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory executive roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Executive" ctaLink="/fractional-jobs-uk?department=Executive" ctaText="View All Executive Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CEO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CEO Day Rate Calculator</h2></div><RoleCalculator role="ceo" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CEOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-yellow-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-yellow-600 hover:text-yellow-800 hover:underline">UK Advisory CEO Market</a>
                <a href="#when-needed" className="block text-yellow-600 hover:text-yellow-800 hover:underline">When Organisations Need Advisory CEOs</a>
                <a href="#skills" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-yellow-600 hover:text-yellow-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CEO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CEO</strong> market in the UK is growing as boards and investors seek experienced executive guidance without full-time commitments. According to the <a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Institute of Directors (IoD)</a>, demand for advisory and NED roles has increased as governance expectations rise and first-time CEOs seek mentorship.</p>
            <p>Unlike <Link href="/interim-ceo-jobs-uk" className="text-yellow-600 hover:underline">interim CEO roles</Link>, advisory positions focus on strategic counsel and mentorship rather than operational leadership. Advisory CEOs typically work with multiple organisations simultaneously, providing high-value input on critical strategic decisions.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Organisations Need Advisory CEOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage advisory CEOs for specific strategic situations:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>CEO mentorship</strong> — Supporting first-time CEOs or founders transitioning to the CEO role.</li>
              <li><strong>Strategic planning</strong> — Facilitating annual planning, vision setting, and strategic reviews.</li>
              <li><strong>Board effectiveness</strong> — Advising on governance, board composition, and investor relations.</li>
              <li><strong>Transition support</strong> — Guiding leadership transitions and succession planning.</li>
              <li><strong>Transformation guidance</strong> — Advising on major strategic shifts, M&A, or turnarounds.</li>
              <li><strong>Crisis navigation</strong> — Providing experienced counsel during challenging periods.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Advisory CEOs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Executive Expertise</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• P&L leadership and value creation</li>
                  <li>• Board management and governance</li>
                  <li>• Investor and stakeholder relations</li>
                  <li>• Strategic planning and execution</li>
                  <li>• M&A and exit experience</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Advisory Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Executive coaching and mentorship</li>
                  <li>• Strategic facilitation</li>
                  <li>• Crisis management</li>
                  <li>• Governance expertise</li>
                  <li>• Trusted advisor relationships</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Advisory CEOs</h3>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity</td><td className="py-3 px-4 text-gray-600">£1,000-£1,500</td><td className="py-3 px-4 text-gray-600">Portfolio oversight, value creation</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Venture-backed</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Founder coaching, scaling guidance</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Family Business</td><td className="py-3 px-4 text-gray-600">£800-£1,200</td><td className="py-3 px-4 text-gray-600">Succession, professionalisation</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Not-for-Profit</td><td className="py-3 px-4 text-gray-600">£700-£1,000</td><td className="py-3 px-4 text-gray-600">Governance, strategy</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Mid-Market</td><td className="py-3 px-4 text-gray-600">£850-£1,200</td><td className="py-3 px-4 text-gray-600">Transformation, growth</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £800-£1,200 standard, up to £1,800 for specialist engagements</li>
              <li><strong>Monthly commitment:</strong> Typically 2-4 days per month for advisory roles</li>
              <li><strong>IR35 status:</strong> Advisory CEO roles typically fall outside IR35 due to their strategic nature</li>
              <li><strong>Retainer models:</strong> Many advisory CEOs work on monthly retainers for ongoing availability</li>
            </ul>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Advisory CEO Work</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building a track record of successful CEO/MD leadership</li>
              <li>Developing board experience and governance expertise</li>
              <li>Building relationships with PE firms, VCs, and board networks</li>
              <li>Starting with 1-2 advisory relationships or NED positions</li>
              <li>Gradually building a portfolio of 3-5 advisory and board roles</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CEO Jobs</h4><p className="text-sm text-gray-600">Part-time CEO roles for portfolio careers</p></Link>
              <Link href="/fractional-ceo-salary" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">CEO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-ceo" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CEO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-ceo" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CEO</h4><p className="text-sm text-gray-600">Guide to hiring executive leaders</p></Link>
              <Link href="/interim-ceo-jobs-uk" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CEO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim executive roles</p></Link>
              <Link href="/advisory-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-yellow-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://www.iod.com/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Institute of Directors (IoD)</a> — Director development and governance</li>
              <li><a href="https://www.managers.org.uk/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Chartered Management Institute (CMI)</a> — Professional management body</li>
              <li><a href="https://www.frc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">Financial Reporting Council (FRC)</a> — UK Corporate Governance Code</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CEOs</h2></div><IR35Calculator defaultDayRate={1000} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CEO Jobs UK</h2></div><FAQ items={ADVISORY_CEO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
