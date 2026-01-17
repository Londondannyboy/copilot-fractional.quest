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
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { HotJobsLines } from '@/components/HotJobsLines'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Remote Fractional HR Jobs UK 2026 | Work From Home HR Director Roles',
  description: 'Remote fractional HR jobs UK: CHRO, HR Director roles. Work from anywhere with day rates £600-£1,000.',
  keywords: 'remote fractional hr jobs, remote hr director jobs, fractional chro remote, work from home hr jobs, remote people director',
  alternates: { canonical: 'https://fractional.quest/fractional-hr-jobs-remote' },
  openGraph: {
    title: 'Remote Fractional HR Jobs UK | Work From Home',
    description: 'Find fully remote fractional HR and People Director jobs. Work from anywhere.',
    url: 'https://fractional.quest/fractional-hr-jobs-remote',
  },
}

const REMOTE_HR_FAQS = [
  { question: "Can fractional HR roles be fully remote?", answer: "Yes, many fractional HR/CHRO roles are now fully remote or hybrid. Remote fractional HR works well for companies with distributed teams, strong HR systems, and mature communication practices. Some activities (culture building, conflict resolution) may benefit from occasional on-site presence." },
  { question: "What are typical remote fractional HR day rates?", answer: "Remote fractional HR day rates in the UK typically range from £600-£1,000 per day, depending on seniority (HR Manager vs CHRO level), sector expertise, and scope. Remote roles sometimes command slightly lower rates due to reduced travel/commute expectations." },
  { question: "What tools do remote fractional HR professionals use?", answer: "Remote fractional HR professionals typically use: HRIS systems (BambooHR, HiBob, Personio), ATS (Greenhouse, Lever), communication (Slack, Teams, Zoom), performance tools (Lattice, 15Five), and document management (Notion, Confluence). They also rely on digital contract signing and benefits administration platforms." },
  { question: "What's the difference between remote and hybrid fractional HR?", answer: "Fully remote fractional HR works entirely from home/co-working spaces, joining meetings via video. Hybrid fractional HR splits time between remote work and on-site visits (e.g., remote 80% / on-site 20%). Most 'remote' roles allow for occasional site visits for key activities like team building or investigations." },
  { question: "How do companies manage remote fractional HR relationships?", answer: "Successful remote fractional HR engagements typically include: regular video check-ins (weekly or bi-weekly), clear communication channels, defined response time expectations, access to all relevant HR systems, and periodic on-site visits for key activities. Strong documentation and asynchronous communication skills are essential." },
]

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Remote Jobs', href: '/remote-fractional-jobs' }, { label: 'Remote Fractional HR Jobs', href: '/fractional-hr-jobs-remote' }]

async function getRemoteHRStats() {
  try {
    const sql = createDbQuery()
    const [countResult] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%hr%' OR title ILIKE '%fractional%chro%' OR title ILIKE '%fractional%people%' OR title ILIKE '%part%time%hr director%' OR role_category = 'HR')`
    const [remoteCount] = await sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND is_remote = true AND role_category = 'HR'`
    return { total: Number(countResult?.count || 10), avgRate: 800, remoteCount: Number(remoteCount?.count || 10) }
  } catch { return { total: 10, avgRate: 800, remoteCount: 10 } }
}

async function getRemoteHRJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND (is_remote = true OR location ILIKE '%remote%') AND (title ILIKE '%fractional%hr%' OR title ILIKE '%fractional%chro%' OR title ILIKE '%fractional%people%' OR title ILIKE '%hr director%' OR title ILIKE '%people director%' OR role_category = 'HR') ORDER BY posted_date DESC NULLS LAST LIMIT 20`
    return jobs as any[]
  } catch { return [] }
}

async function getRelatedJobs() {
  try {
    const sql = createDbQuery()
    return await sql`SELECT id, slug, title, company_name, location, is_remote, compensation, role_category, posted_date FROM jobs WHERE is_active = true AND is_remote = true AND (title ILIKE '%fractional%cfo%' OR title ILIKE '%fractional%coo%' OR title ILIKE '%remote%director%') ORDER BY posted_date DESC NULLS LAST LIMIT 15`
  } catch { return [] }
}

export default async function RemoteFractionalHRJobsPage() {
  const [stats, jobs, relatedJobs] = await Promise.all([getRemoteHRStats(), getRemoteHRJobs(), getRelatedJobs()])
  const lastUpdatedDate = jobs[0]?.posted_date ? new Date(jobs[0].posted_date) : new Date()

  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Remote Fractional HR Jobs UK | Work From Home HR Director Roles" description="Find fully remote fractional HR jobs." url="https://fractional.quest/fractional-hr-jobs-remote" dateModified={lastUpdatedDate} />
      <FAQPageSchema faqs={REMOTE_HR_FAQS} />
      <JobListingSchema jobs={jobs.slice(0, 5)} pageUrl="https://fractional.quest/fractional-hr-jobs-remote" />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80" alt="Remote Fractional HR Jobs" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-800/90 to-violet-700/80" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Remote Work</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">Remote Fractional HR Jobs</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Find <strong>remote fractional HR</strong> and People Director jobs. Work from home as a fractional CHRO, HR Director, or People Leader. Fully remote and hybrid positions available.</p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/fractional-chro-jobs-uk" className="px-6 py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition-colors">All CHRO Jobs</Link>
                <Link href="/remote-fractional-jobs" className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">All Remote Jobs</Link>
              </div>
              <LastUpdatedBadge date={lastUpdatedDate} className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-purple-900 py-6"><div className="max-w-6xl mx-auto px-6 lg:px-8"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div className="text-3xl font-black text-purple-200">{stats.total}+</div><div className="text-purple-300/70 text-sm">Remote Roles</div></div><div><div className="text-3xl font-black text-purple-200">£{stats.avgRate}</div><div className="text-purple-300/70 text-sm">Avg Day Rate</div></div><div><div className="text-3xl font-black text-purple-200">100%</div><div className="text-purple-300/70 text-sm">Remote/Hybrid</div></div><div><div className="text-3xl font-black text-purple-200">UK</div><div className="text-purple-300/70 text-sm">Based Companies</div></div></div></div></section>

      {jobs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8"><h2 className="text-2xl md:text-3xl font-black text-gray-900">Remote HR & People Director Jobs</h2><span className="text-sm text-gray-500">{jobs.length} roles</span></div>
            <ServerJobGrid jobs={jobs} />
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Day Rate Calculator</h2>
              <RoleCalculator role="chro" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">IR35 Status Check</h2>
              <IR35Calculator />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white"><div className="max-w-4xl mx-auto px-6 lg:px-8"><article className="prose prose-lg prose-gray max-w-none"><h2 className="text-3xl font-black text-gray-900 mb-6">Remote Fractional HR: The Complete Guide</h2><p className="text-xl text-gray-600 leading-relaxed mb-8"><strong>Remote fractional HR</strong> has grown significantly since 2020, with many companies now comfortable with fully distributed People/HR leadership. This page lists remote and hybrid fractional HR positions across the UK.</p><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">What Remote Fractional HR Covers</h3><ul className="space-y-2 text-gray-600"><li><strong>People Strategy</strong> - Workforce planning, org design, succession planning</li><li><strong>Talent Acquisition</strong> - Recruiting strategy, employer brand, candidate experience</li><li><strong>Employee Relations</strong> - Policy development, investigations, conflict resolution</li><li><strong>Compensation & Benefits</strong> - Pay structures, benchmarking, benefits administration</li><li><strong>Performance Management</strong> - Goal setting, reviews, development programmes</li><li><strong>HR Operations</strong> - HRIS, compliance, employee lifecycle</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Best Practices for Remote HR Leadership</h3><ul className="space-y-2 text-gray-600"><li><strong>Over-communicate</strong> - Regular updates, async documentation, video check-ins</li><li><strong>Build relationships</strong> - Virtual coffee chats, 1:1s with key stakeholders</li><li><strong>Use the right tools</strong> - Invest in HRIS, ATS, performance platforms</li><li><strong>Set boundaries</strong> - Clear working hours, response time expectations</li><li><strong>Plan site visits</strong> - Occasional on-site for culture, investigations, team building</li></ul><h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Related Job Categories</h3><div className="grid md:grid-cols-2 gap-4 not-prose"><Link href="/fractional-chro-jobs-uk" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CHRO Jobs UK</h4><p className="text-sm text-gray-600">All CHRO positions (remote + on-site)</p></Link><Link href="/fractional-chro-services" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">Fractional CHRO Services</h4><p className="text-sm text-gray-600">Hire a fractional CHRO</p></Link><Link href="/remote-fractional-jobs" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">All Remote Fractional Jobs</h4><p className="text-sm text-gray-600">All remote executive roles</p></Link><Link href="/hire-fractional-chro" className="p-4 border rounded-lg hover:border-purple-300 transition-colors"><h4 className="font-bold text-gray-900">How to Hire a CHRO</h4><p className="text-sm text-gray-600">Complete hiring guide</p></Link></div></article></div></section>

      <section className="py-20 bg-purple-50"><div className="max-w-4xl mx-auto px-6 lg:px-8"><div className="mb-12"><span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span><h2 className="text-3xl md:text-4xl font-black text-gray-900">Remote Fractional HR Questions</h2></div><FAQ items={REMOTE_HR_FAQS} title="" /></div></section>

      {relatedJobs && relatedJobs.length > 0 && <HotJobsLines jobs={relatedJobs as any[]} title="Other Remote Executive Roles" />}

      <ExpertProfile /><ExpertProfileSchema /><CaseStudy /><CaseStudySchema />
    </div>
  )
}
