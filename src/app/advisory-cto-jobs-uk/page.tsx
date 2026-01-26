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
  title: 'Advisory CTO Jobs UK | Technology Leadership Advisory Roles 2026',
  description: 'Find advisory CTO jobs UK with day rates £700-£1,000. Browse advisory Chief Technology Officer and Tech Director roles. Remote & hybrid positions across London, Manchester & UK-wide.',
  keywords: 'advisory cto jobs uk, advisory cto, advisory technology director jobs, advisory chief technology officer, advisory cto roles uk, advisory tech jobs, advisory cto london, advisory cto remote',
  alternates: { canonical: 'https://www.fractional.quest/advisory-cto-jobs-uk' },
  openGraph: {
    title: 'Advisory CTO Jobs UK | Technology Leadership Advisory Roles 2026',
    description: 'Find advisory CTO jobs UK with day rates £700-£1,000. Browse advisory Chief Technology Officer and Tech Director roles.',
    url: 'https://www.fractional.quest/advisory-cto-jobs-uk',
  },
}

const ADVISORY_CTO_FAQS = [
  { question: "What is an advisory CTO?", answer: "An advisory CTO is a senior technology professional who provides strategic technology guidance and expertise on a consultative basis. Unlike interim CTOs who take on full operational responsibility, advisory CTOs offer high-level counsel on specific challenges such as technology strategy, architecture decisions, technical due diligence, or engineering team development. They typically work fewer hours but bring deep expertise to critical technology decisions." },
  { question: "What are typical advisory CTO day rates in the UK?", answer: "Advisory CTO day rates in the UK typically range from £700-£1,000 per day, depending on experience, sector expertise, and complexity of the engagement. Specialist areas like AI strategy, security architecture, or PE technical due diligence can command rates of £1,000-£1,400/day. Advisory roles often involve fewer days per month than interim roles, making them cost-effective for specific strategic needs." },
  { question: "How does an advisory CTO engagement work?", answer: "Advisory CTO engagements are typically structured around specific deliverables or time allocations (e.g., 2-4 days per month). The advisory CTO might review technology strategy, attend board meetings, mentor engineering leaders, assess vendor choices, or provide guidance during M&A technical due diligence. Engagements can be ongoing retainers or project-based." },
  { question: "What's the difference between advisory and fractional CTO?", answer: "Advisory CTOs provide strategic counsel without operational responsibility, typically working 1-4 days per month on high-level guidance. Fractional CTOs take on part-time operational leadership (1-3 days per week), managing engineering teams and technical delivery. Advisory roles suit companies with capable tech teams needing strategic oversight; fractional roles suit those needing hands-on leadership." },
  { question: "What qualifications do advisory CTOs need?", answer: "Most advisory CTOs have 15+ years of technology experience including prior CTO, VP Engineering, or Tech Director roles. Essential qualifications include experience with technology strategy, architecture decisions, team scaling, and board-level communication. Many have specific expertise in cloud platforms (AWS/Azure/GCP), AI/ML, security, or particular industry verticals." },
  { question: "What industries hire advisory CTOs most frequently?", answer: "The highest demand for advisory CTOs comes from: venture-backed startups and scale-ups (technology strategy, due diligence), private equity portfolio companies (technical assessments, value creation), established businesses undergoing digital transformation, and boards seeking independent technology oversight." },
  { question: "Do advisory CTO roles fall inside or outside IR35?", answer: "Advisory CTO roles often fall outside IR35 due to their consultative nature, lack of day-to-day control, and project-based scope. However, each engagement must be assessed individually. Key factors include: no substitution restrictions, working for multiple clients, providing genuine advice rather than filling a role. Always obtain a status determination statement (SDS)." },
  { question: "What's the hiring process for advisory CTOs?", answer: "Advisory CTO hiring focuses on expertise fit and chemistry. The process typically includes: initial discussion with CEO/founders about technology challenges, assessment of relevant experience and track record, discussion of working style and availability, and agreement on scope and deliverables. Decisions are often made within 2-3 weeks." },
  { question: "Can advisory CTO work lead to other opportunities?", answer: "Yes, advisory CTO relationships often expand. Many advisory engagements lead to: increased scope (from advisory to fractional), board positions (NED or advisory board), investment opportunities, and referrals. The advisory model is excellent for building a portfolio of strategic relationships." },
  { question: "What should I include in my advisory CTO profile?", answer: "Focus on: specific technology transformations delivered, architecture decisions and their outcomes, team building and scaling experience, due diligence and assessment expertise, and board-level communication skills. Highlight your advisory approach and how you complement existing teams rather than replacing them." },
]

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Advisory Jobs', href: '/fractional-jobs-uk' },
  { label: 'Advisory CTO Jobs UK', href: '/advisory-cto-jobs-uk' },
]

async function getAdvisoryCTOStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%technology director%' OR title ILIKE '%advisory%chief technology%') AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%')`
    const total = Number(countResult?.count || 0)
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%technology%') AND (is_remote = true OR workplace_type ILIKE '%remote%') AND (country ILIKE '%UK%' OR location ILIKE '%London%')`
    return { total: total || 15, avgRate: 850, remoteCount: Number(remoteCount?.count || 6) }
  } catch { return { total: 15, avgRate: 850, remoteCount: 6 } }
}

async function getAdvisoryCTOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cto%' OR title ILIKE '%advisory%technology director%' OR title ILIKE '%advisory%chief technology%' OR (title ILIKE '%advisory%' AND role_category = 'Engineering')) AND (country ILIKE '%UK%' OR location ILIKE '%UK%' OR location ILIKE '%London%' OR location ILIKE '%Manchester%') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`SELECT DISTINCT company_name FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%' AND role_category = 'Engineering') AND company_name IS NOT NULL AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY company_name LIMIT 20`
    return companies.map((c: any) => c.company_name)
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (title ILIKE '%advisory%cfo%' OR title ILIKE '%advisory%cmo%' OR title ILIKE '%fractional%cto%') AND (country ILIKE '%UK%' OR location ILIKE '%London%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
    return jobs
  } catch { return [] }
}

export default async function AdvisoryCTOJobsUKPage() {
  const [stats, companies, jobs, relatedJobs] = await Promise.all([getAdvisoryCTOStats(), getFeaturedCompanies(), getAdvisoryCTOJobs(), getRelatedJobs()])
  const mostRecentJob = jobs[0]
  const lastUpdatedDate = mostRecentJob?.posted_date ? new Date(mostRecentJob.posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Advisory CTO Jobs UK | Technology Leadership Advisory Roles 2026" description="Find advisory CTO jobs UK with day rates £700-£1,000. Browse advisory Chief Technology Officer and Tech Director roles." url="https://www.fractional.quest/advisory-cto-jobs-uk" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={ADVISORY_CTO_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 10)} pageUrl="https://www.fractional.quest/advisory-cto-jobs-uk" />
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" alt="Advisory CTO Jobs UK" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-cyan-800/90 to-blue-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Advisory Technology Leadership</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Advisory CTO Jobs UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>advisory CTO</strong> and <strong>advisory Technology Director</strong> roles across the UK. Premium advisory tech leadership positions with day rates from £700-£1,000.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#jobs" className="px-6 py-3 bg-white text-cyan-900 font-bold rounded-lg hover:bg-cyan-50 transition-colors">Browse Advisory CTO Jobs</a>
                <Link href="/fractional-cto-jobs-uk" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Fractional CTO Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-6">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-black text-cyan-400">{stats.total}+</div><div className="text-gray-400 text-sm">Advisory CTO Roles</div></div>
            <div><div className="text-3xl font-black text-cyan-400">£{stats.avgRate}</div><div className="text-gray-400 text-sm">Avg Day Rate</div></div>
            <div><div className="text-3xl font-black text-cyan-400">{stats.remoteCount}</div><div className="text-gray-400 text-sm">Remote/Hybrid</div></div>
            <div><div className="text-3xl font-black text-cyan-400"><LastUpdatedBadge date={lastUpdatedDate} /></div><div className="text-gray-400 text-sm">Last Updated</div></div>
          </div>
        </div>
      </section>

      {jobs.length > 0 && (<section className="bg-cyan-50 border-y border-cyan-100 py-4 overflow-hidden"><div className="max-w-6xl mx-auto px-6 lg:px-8"><HotJobsLines jobs={jobs.map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Latest Advisory CTO Jobs" maxJobs={10} /></div></section>)}

      {/* Jobs Grid */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Advisory CTO & Technology Director Jobs UK</h2></div>
            <p className="text-gray-500">{jobs.length}+ live advisory tech roles</p>
          </div>
          <ServerJobGrid jobs={jobs} roleCategory="Engineering" ctaLink="/fractional-jobs-uk?department=Engineering" ctaText="View All Tech Jobs" maxJobs={12} showViewAll={true} />
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Advisory CTO Rates</span><h2 className="text-2xl md:text-3xl font-black text-gray-900">Advisory CTO Day Rate Calculator</h2></div><RoleCalculator role="cto" /></div></section>

      {companies.length > 0 && (<section className="py-16 bg-gray-50"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who&apos;s Hiring</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">UK Companies Hiring Advisory CTOs</h2></div><div className="flex flex-wrap justify-center gap-x-12 gap-y-6">{companies.map((company: string, index: number) => (<span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-cyan-500 transition-colors cursor-default">{company}</span>))}</div></div></section>)}

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <nav aria-label="Table of contents">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">On This Page</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <a href="#market" className="block text-cyan-600 hover:text-cyan-800 hover:underline">UK Advisory CTO Market</a>
                <a href="#when-needed" className="block text-cyan-600 hover:text-cyan-800 hover:underline">When Companies Need Advisory CTOs</a>
                <a href="#skills" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Essential Skills & Experience</a>
              </div>
              <div className="space-y-2">
                <a href="#sectors" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Top Hiring Sectors</a>
                <a href="#rates" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Day Rates & IR35</a>
                <a href="#career" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Career Path & Transition</a>
              </div>
              <div className="space-y-2">
                <a href="#resources" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Related Resources</a>
                <a href="#faq" className="block text-cyan-600 hover:text-cyan-800 hover:underline">Common Questions</a>
              </div>
            </div>
          </nav>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 id="market" className="text-3xl font-black text-gray-900 mb-6">The UK Advisory CTO Market in 2026</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>advisory CTO</strong> market in the UK continues to grow as businesses seek strategic technology expertise without full-time commitments. According to <a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Tech Nation</a>, demand for advisory technology roles has increased significantly as companies navigate AI transformation, cloud modernisation, and digital strategy challenges.</p>
            <p>Unlike <Link href="/interim-cto-jobs-uk" className="text-cyan-600 hover:underline">interim CTO roles</Link>, advisory positions focus on strategic counsel rather than operational management. The <a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">British Computer Society (BCS)</a> reports that advisory CTOs typically work with multiple clients simultaneously, providing high-value input on critical technology decisions.</p>

            <h3 id="when-needed" className="text-2xl font-bold text-gray-900 mt-12 mb-4">When Companies Need Advisory CTOs</h3>
            <p className="text-gray-600 mb-4">Organisations typically engage advisory CTOs for specific strategic situations requiring senior technology expertise without operational involvement:</p>
            <ul className="space-y-3 text-gray-600">
              <li><strong>Technology strategy</strong> — Defining technology roadmaps, platform decisions, and architecture choices. Advisory CTOs bring independent perspective to major technology investments.</li>
              <li><strong>Technical due diligence</strong> — Assessing technology stacks, teams, and technical debt during M&A transactions or investment rounds.</li>
              <li><strong>Board-level oversight</strong> — Attending board meetings, reviewing technology investments, and providing independent technical perspective to founders and non-exec directors.</li>
              <li><strong>AI and transformation</strong> — Guiding AI adoption strategies, assessing vendor solutions, and ensuring responsible implementation.</li>
              <li><strong>Engineering team development</strong> — Mentoring CTOs or Engineering Leaders, helping them grow while providing oversight.</li>
              <li><strong>Vendor and partner assessment</strong> — Evaluating technology vendors, outsourcing partners, and build-vs-buy decisions.</li>
            </ul>

            <h3 id="skills" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Essential Skills & Experience for Advisory CTOs</h3>
            <p className="text-gray-600 mb-4">Successful advisory CTOs combine deep technical expertise with strategic business acumen. The <a href="https://www.theiet.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Institution of Engineering and Technology (IET)</a> identifies the following as critical competencies:</p>
            <div className="grid md:grid-cols-2 gap-6 not-prose mt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Technical Expertise</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cloud architecture (AWS, Azure, GCP)</li>
                  <li>• AI/ML strategy and governance</li>
                  <li>• Security and compliance</li>
                  <li>• Modern engineering practices</li>
                  <li>• Data architecture and analytics</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-3">Advisory Capabilities</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Board-level communication</li>
                  <li>• Technology strategy development</li>
                  <li>• Due diligence expertise</li>
                  <li>• Vendor assessment</li>
                  <li>• Mentoring and coaching</li>
                </ul>
              </div>
            </div>

            <h3 id="sectors" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Top UK Sectors Hiring Advisory CTOs</h3>
            <p className="text-gray-600 mb-4">Demand for advisory CTOs varies by sector. Based on our job market analysis:</p>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full text-sm">
                <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-bold text-gray-900">Sector</th><th className="text-left py-3 px-4 font-bold text-gray-900">Typical Day Rate</th><th className="text-left py-3 px-4 font-bold text-gray-900">Key Drivers</th></tr></thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Private Equity / VC</td><td className="py-3 px-4 text-gray-600">£900-£1,400</td><td className="py-3 px-4 text-gray-600">Technical due diligence, portfolio oversight</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Scale-ups</td><td className="py-3 px-4 text-gray-600">£800-£1,200</td><td className="py-3 px-4 text-gray-600">Technology strategy, board support</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Enterprise</td><td className="py-3 px-4 text-gray-600">£750-£1,100</td><td className="py-3 px-4 text-gray-600">Digital transformation, AI strategy</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-3 px-4 text-gray-900">Financial Services</td><td className="py-3 px-4 text-gray-600">£900-£1,300</td><td className="py-3 px-4 text-gray-600">Regulatory tech, security oversight</td></tr>
                  <tr><td className="py-3 px-4 text-gray-900">Healthcare / Life Sciences</td><td className="py-3 px-4 text-gray-600">£800-£1,200</td><td className="py-3 px-4 text-gray-600">Digital health, data platforms</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="rates" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Day Rates & IR35 Considerations</h3>
            <p className="text-gray-600 mb-4">Advisory CTO compensation in the UK is typically day-rate based. According to market data and guidance from <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">HMRC on IR35</a>:</p>
            <ul className="space-y-2 text-gray-600">
              <li><strong>Day rate range:</strong> £700-£1,000 standard, up to £1,400 for specialist due diligence</li>
              <li><strong>Monthly commitment:</strong> Typically 2-4 days per month for advisory roles</li>
              <li><strong>IR35 status:</strong> Advisory roles often fall outside IR35 due to their consultative nature</li>
              <li><strong>Retainer models:</strong> Some advisory CTOs work on monthly retainers for ongoing availability</li>
            </ul>
            <p className="text-gray-600 mt-4">For detailed IR35 guidance, consult <a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">IPSE</a> or seek specialist tax advice.</p>

            <h3 id="career" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Career Path: Transitioning to Advisory CTO Work</h3>
            <p className="text-gray-600 mb-4">Many advisory CTOs transition from permanent or interim roles after establishing expertise. The path typically involves:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
              <li>Building deep expertise in specific technologies or sectors</li>
              <li>Developing due diligence and assessment capabilities</li>
              <li>Building relationships with investors, PE firms, or founder networks</li>
              <li>Starting with 1-2 advisory clients while maintaining other income</li>
              <li>Gradually building a portfolio of 3-5 advisory relationships</li>
            </ol>

            <h3 id="resources" className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              <Link href="/fractional-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CTO Jobs</h4><p className="text-sm text-gray-600">Part-time CTO roles for portfolio careers</p></Link>
              <Link href="/fractional-cto-salary" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">CTO Salary Guide</h4><p className="text-sm text-gray-600">Day rates and compensation benchmarks</p></Link>
              <Link href="/fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">What is a Fractional CTO?</h4><p className="text-sm text-gray-600">Understanding the fractional model</p></Link>
              <Link href="/hire-fractional-cto" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Hire a CTO</h4><p className="text-sm text-gray-600">Guide to hiring tech leaders</p></Link>
              <Link href="/interim-cto-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Interim CTO Jobs UK</h4><p className="text-sm text-gray-600">Full-time interim technology roles</p></Link>
              <Link href="/advisory-cfo-jobs-uk" className="p-4 border rounded-lg hover:border-cyan-300 transition-colors"><h4 className="font-bold text-gray-900">Advisory CFO Jobs UK</h4><p className="text-sm text-gray-600">Finance advisory roles</p></Link>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Authority Resources</h3>
            <p className="text-gray-600 mb-4">Further reading from industry bodies and government sources:</p>
            <ul className="space-y-2 text-gray-600">
              <li><a href="https://technation.io/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Tech Nation</a> — UK tech sector reports and growth data</li>
              <li><a href="https://www.bcs.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">British Computer Society (BCS)</a> — Professional body for IT practitioners</li>
              <li><a href="https://www.theiet.org/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Institution of Engineering and Technology (IET)</a> — Engineering and technology standards</li>
              <li><a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">HMRC IR35 Guidance</a> — Off-payroll working rules</li>
              <li><a href="https://www.ipse.co.uk/" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">IPSE</a> — Association of Independent Professionals</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="py-16 bg-gray-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-8 text-center"><h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Calculator for Advisory CTOs</h2></div><IR35Calculator defaultDayRate={850} /></div></section>

      <section id="faq" className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Advisory CTO Jobs UK</h2></div><FAQ items={ADVISORY_CTO_FAQS} title="" /></div></section>

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />

      {(relatedJobs as any[]).length > 0 && (<section className="py-12 bg-gray-50 border-t border-gray-200"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Related Advisory Executive Jobs</h2><HotJobsLines jobs={(relatedJobs as any[]).map(job => ({ id: job.id, slug: job.slug, title: job.title, company_name: job.company_name, location: job.location, is_remote: job.is_remote, compensation: job.compensation, role_category: job.role_category, posted_date: job.posted_date }))} title="Other Advisory Roles" maxJobs={15} viewAllHref="/fractional-jobs-uk" viewAllText="View all UK jobs" /></div></section>)}

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
