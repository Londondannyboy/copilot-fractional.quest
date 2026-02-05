import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, COO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleContentHub } from '@/components/RoleContentHub'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { RoleCalculator } from '@/components/RoleCalculator'
import { getOGImageUrl, getImage } from '@/lib/images'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { HeyCompanies } from '@/components/HeyCompanies'

// Table of Contents items
const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'when-needed', title: 'When You Need One' },
  { id: 'cost-pricing', title: 'Cost & Pricing UK' },
  { id: 'engagement-types', title: 'Types of Engagement' },
  { id: 'benefits', title: 'Benefits' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'faq', title: 'FAQ' },
  { id: 'jobs', title: 'COO Jobs' },
]

const ogImage = getOGImageUrl('coo')
const imageAlt = getImage('coo').alt
const imageCredit = getImage('coo')

export const metadata: Metadata = {
  title: 'Fractional COO UK | Part-Time Operations Leadership Guide 2026',
  description: 'Fractional COO: Part-time Chief Operating Officer working 1-3 days/week for £700-£1,300/day. Scale operations, process optimisation, when to hire. Complete UK guide.',
  keywords: 'fractional coo, fractional coo uk, what is a fractional coo, fractional coo meaning, part time coo, fractional operations officer, fractional chief operating officer, hire fractional coo',
  alternates: {
    canonical: 'https://fractional.quest/fractional-coo',
  },
  openGraph: {
    title: 'Fractional COO UK | Part-Time Operations Leadership Guide',
    description: 'Fractional COO: Part-time operations executive working 1-3 days/week. Day rates £700-£1,300. Complete UK guide.',
    url: 'https://fractional.quest/fractional-coo',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional COO UK | Part-Time Operations Leadership Guide',
    description: 'Fractional COO: Part-time operations executive. Day rates £700-£1,300. Complete UK guide.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional COO', href: '/fractional-coo' },
]

export default function FractionalCooPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional COO? | Part-Time Chief Operating Officer Guide"
        description="Complete guide to fractional COO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Operating Officer does."
        url="https://fractional.quest/fractional-coo"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={COO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-coo-jobs-uk-desktop.webp"
          alt={`What is a Fractional COO - ${imageAlt}`}
          title="Fractional COO - Part-Time Operations Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700/90 via-gray-600/80 to-zinc-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                What is a <strong>Fractional COO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional COO</strong> is a part-time Chief Operating Officer who provides strategic operations leadership to companies on a flexible basis. Learn about <strong>fractional COO meaning</strong>, responsibilities, and costs.
              </p>
            </div>
          </div>
        </div>
        {/* Photo Credit */}
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors">
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-slate-500/10 border border-slate-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Fractional COO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional COO</strong> (Fractional Chief Operating Officer) is an experienced operations executive who works with companies on a part-time basis, typically 2-3 days per week. Day rates range from £600-£1,500 depending on sector and complexity. Monthly retainers typically range from £3,000-£10,000. Fractional COOs provide operational strategy, process optimization, and scaling support without the £130,000-£230,000 cost of a full-time hire.
            </p>
            <p className="text-sm text-slate-400 mt-4">Source: ScaleUpExec, Like Sunday, CMI Jan 2026</p>
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
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Column */}
            <article className="prose prose-lg prose-gray max-w-none">

            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional COO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional COO meaning</strong> centres on flexible, senior-level operations leadership. Unlike traditional full-time COOs earning £100,000-£180,000 annually, a <strong>fractional Chief Operating Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            {/* Authority context box */}
            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> According to the <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline font-medium">Chartered Management Institute (CMI)</a>, operations leadership is increasingly delivered through flexible arrangements. This reflects the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline">fractional work</a> trend transforming executive recruitment, with fractional COOs becoming a key part of the UK scale-up ecosystem.
              </p>
            </div>

            <p>
              This model is ideal for companies experiencing rapid growth who need operational expertise to scale processes, build teams, and optimise efficiency without the cost of a full-time executive. A fractional COO acts as a trusted partner to the CEO, translating vision into execution and holding leadership teams accountable.
            </p>

            {/* Video */}
            <div className="my-10 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Does a Fractional COO Do?</h3>
              <LazyYouTube
                videoId="cKxRvEZd3Mw"
                title="What is a Fractional COO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Video: Understanding the fractional COO role and responsibilities</p>
            </div>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional COO</strong> performs the same functions as a full-time Chief Operating Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Operational Strategy', desc: 'Developing operational plans aligned with business objectives', icon: '📊' },
                { title: 'Process Optimisation', desc: 'Streamlining workflows, creating SOPs, and eliminating waste', icon: '⚙️' },
                { title: 'Team Scaling', desc: 'Building, structuring, and managing teams for growth', icon: '👥' },
                { title: 'Vendor Management', desc: 'Negotiating contracts and managing supplier relationships', icon: '🤝' },
                { title: 'KPI Development', desc: 'Establishing metrics, dashboards, and reporting frameworks', icon: '📈' },
                { title: 'Change Management', desc: 'Leading organisational transformation and cultural change', icon: '🔄' },
                { title: 'EOS Implementation', desc: 'Implementing Entrepreneurial Operating System or similar frameworks', icon: '🎯' },
                { title: 'P&L Accountability', desc: 'Taking responsibility for operational budget and performance', icon: '💰' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 id="comparison" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Fractional vs Interim vs Full-Time COO: How They Compare</h2>

            <p>
              Understanding the difference between a <strong>fractional COO</strong>, <strong>interim COO</strong>, and <strong>full-time COO</strong> helps companies choose the right operations leadership model:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">Fractional COO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim COO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time COO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Commitment</td>
                    <td className="px-4 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Full-time (temp)</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Full-time (perm)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Duration</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Ongoing (6+ months)</td>
                    <td className="px-4 py-4 text-sm text-gray-600">3-9 months typical</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                    <td className="px-4 py-4 text-sm text-slate-700 font-semibold">£3,000-£10,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£8,000-£15,000/week</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£11,000-£19,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-4 py-4 text-sm text-slate-700 font-semibold">£36,000-£120,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£96,000-£180,000 (3mo)</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£130,000-£230,000+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Strategy, process, team building</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Gap fill, turnaround, integration</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Full operational ownership</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Experience Breadth</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Multiple scale-ups</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Deep hands-on focus</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Your company only</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Fixed contract term</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Limited flexibility</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-4 py-4 text-sm text-slate-800 font-medium">Scale-ups £1-20M revenue</td>
                    <td className="px-4 py-4 text-sm text-blue-800 font-medium">COO vacancy, crisis, M&A</td>
                    <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, complex ops</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Insight:</strong> According to ScaleUpExec and Like Sunday research (Jan 2026), fractional COOs in the UK charge £600-£1,500/day. Scale-up specialists with EOS implementation experience command premium rates of £1,000-£1,300/day.
              </p>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <p>Consider hiring a <strong>fractional COO</strong> when your company experiences these operational challenges:</p>

            <ul className="space-y-3">
              <li><strong>Rapid growth:</strong> Operations struggling to keep up with sales growth</li>
              <li><strong>Founder bandwidth:</strong> CEO needs to delegate operational leadership to focus on strategy</li>
              <li><strong>Process chaos:</strong> Workflows are ad-hoc, undocumented, and inefficient</li>
              <li><strong>Team scaling:</strong> Growing from 20 to 100+ employees and need organisational structure</li>
              <li><strong>New market expansion:</strong> Expanding to new locations, products, or customer segments</li>
              <li><strong>Post-acquisition integration:</strong> Integrating acquired companies or preparing for exit</li>
              <li><strong>Investor pressure:</strong> VCs or PE require operational rigour and professionalisation</li>
            </ul>

            <div className="bg-slate-50 p-6 border border-slate-200 rounded-lg my-8 not-prose">
              <p className="text-slate-800 font-medium mb-3">Ready to hire a fractional COO?</p>
              <Link href="/hire-fractional-coo" className="inline-flex items-center text-slate-700 font-bold hover:text-slate-900">
                Complete Guide: How to Hire a Fractional COO →
              </Link>
            </div>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <p>
              Fractional COO costs vary based on experience, sector complexity, and engagement intensity. Based on UK market research from ScaleUpExec, Like Sunday, and CMI (Jan 2026):
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £2,500-£6,000/month (£30,000-£72,000/year)</li>
                <li><strong>2 days/week:</strong> £5,000-£12,000/month (£60,000-£144,000/year)</li>
                <li><strong>3 days/week:</strong> £7,500-£18,000/month (£90,000-£216,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time COO: £130,000-£230,000+ (salary + benefits + equity)</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Day Rate by Experience Level</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>SME/Growth stage:</strong> £600-£900/day</li>
                <li><strong>Scale-up specialist:</strong> £900-£1,200/day</li>
                <li><strong>PE-backed/Turnaround:</strong> £1,100-£1,500/day</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">Source: ScaleUpExec, Exec Capital, Like Sunday Jan 2026</p>
            </div>

            <h2 id="engagement-types" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Types of Operations Leadership Engagement</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Scale-up COO', desc: 'Rapid growth, team scaling, and operational infrastructure', rate: '£900-£1,200/day' },
                { title: 'E-commerce COO', desc: 'Supply chain, fulfilment, and logistics optimisation', rate: '£800-£1,100/day' },
                { title: 'Process COO', desc: 'Lean operations, efficiency, and SOP development', rate: '£750-£1,050/day' },
                { title: 'Integration COO', desc: 'M&A integration and company consolidation', rate: '£900-£1,200/day' },
                { title: 'EOS Integrator', desc: 'Entrepreneurial Operating System implementation', rate: '£850-£1,100/day' },
                { title: 'Turnaround COO', desc: 'Restructuring, crisis management, and cost reduction', rate: '£1,000-£1,500/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-slate-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h2 id="benefits" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Benefits of a Fractional COO</h2>

            <ul className="space-y-3">
              <li><strong>Cost-effective:</strong> Access COO expertise at 40-60% of full-time cost (saving £60,000-£150,000/year)</li>
              <li><strong>Speed to hire:</strong> Onboard in 1-2 weeks, not months of executive search</li>
              <li><strong>Multi-company experience:</strong> Benefit from scaling multiple companies across sectors</li>
              <li><strong>Objectivity:</strong> Fresh perspective on operational challenges without company politics</li>
              <li><strong>Network access:</strong> Connections to operational talent, vendors, and best practices</li>
              <li><strong>Flexibility:</strong> Scale engagement up or down as company needs evolve</li>
              <li><strong>CEO leverage:</strong> Free the founder to focus on strategy, fundraising, and growth</li>
            </ul>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Qualifications and What to Look For</h2>

            <p>When hiring a <strong>fractional COO</strong>, look for these qualifications and experience markers:</p>

            <ul className="space-y-3">
              <li><strong>Experience:</strong> 15+ years in operations with prior COO, Operations Director, or GM roles</li>
              <li><strong>Scaling track record:</strong> Demonstrated experience scaling companies through growth phases (20→100+ people)</li>
              <li><strong>Framework expertise:</strong> Experience with EOS, Scaling Up, OKRs, or similar operating systems</li>
              <li><strong>Sector relevance:</strong> Industry-specific knowledge in your sector (SaaS, e-commerce, manufacturing, etc.)</li>
              <li><strong>Professional memberships:</strong> CMI, IoD, CIPS, or other relevant professional bodies</li>
              <li><strong>Transformation experience:</strong> Track record of operational transformation and efficiency gains</li>
            </ul>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/hire-fractional-coo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>📋</span> How to Hire a COO
                    </Link>
                    <Link href="/fractional-coo-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>💰</span> Salary & Day Rates
                    </Link>
                    <Link href="/fractional-coo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>💼</span> COO Jobs UK
                    </Link>
                    <Link href="/virtual-coo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>🌐</span> Virtual COO Services
                    </Link>
                    <Link href="/fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-slate-700 transition-colors">
                      <span>📊</span> Fractional CFO Guide
                    </Link>
                    <Link href="/fractional-recruitment-agency" className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors">
                      <span>🎯</span> Fractional Recruiter Guide
                    </Link>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <p className="font-bold text-gray-900 mb-2">Looking for a COO?</p>
                  <p className="text-sm text-gray-600 mb-4">Browse pre-vetted operations leaders</p>
                  <Link href="/fractional-coo-jobs-uk" className="block text-center bg-slate-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-500 transition-colors text-sm">
                    View COO Jobs
                  </Link>
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
              Day Rate Calculator
            </h2>
          </div>
          <RoleCalculator role="coo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ items={COO_FAQS} title="" />
        </div>
      </section>

      {/* Professional Bodies Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Professional Bodies & Industry Associations</h2>
            <p>
              Many <strong>part-time operations leaders</strong> are members of recognized operations and management bodies. Key organizations include:
            </p>
            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CMI</h4>
                    <p className="text-sm text-gray-600">Chartered Management Institute - UK&apos;s leading management body</p>
                  </div>
                </div>
              </a>
              <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">IoD</h4>
                    <p className="text-sm text-gray-600">Institute of Directors - board-level leadership</p>
                  </div>
                </div>
              </a>
              <a href="https://www.cips.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">CIPS</h4>
                    <p className="text-sm text-gray-600">Chartered Institute of Procurement & Supply</p>
                  </div>
                </div>
              </a>
              <a href="https://www.theoperationsacademy.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-slate-400 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-slate-700">Operations Academy</h4>
                    <p className="text-sm text-gray-600">Operations leadership training and development</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">External Resources</h2>
            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.mckinsey.com/capabilities/operations" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-400 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">McKinsey Operations</p>
              </a>
              <a href="https://www.glassdoor.co.uk/Salaries/coo-salary-SRCH_KO0,3.htm" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-400 transition-all group text-center">
                <span className="text-xl">💰</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">Glassdoor Salaries</p>
              </a>
              <a href="https://hbr.org/topic/operations-and-supply-chain" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-400 transition-all group text-center">
                <span className="text-xl">📰</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">HBR Operations</p>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-slate-400 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-slate-700">LinkedIn</p>
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Explore More</span>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>

          {/* Primary Resources - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-coo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">How to Hire a Fractional COO</h3>
              <p className="text-gray-600 text-sm">Complete guide to hiring process</p>
            </Link>
            <Link href="/fractional-coo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">Fractional COO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional COO roles</p>
            </Link>
            <Link href="/fractional-coo-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-slate-400 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-slate-700 mb-2">Fractional COO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK salary benchmarks and rates</p>
            </Link>
          </div>

          {/* Secondary Resources - 5 compact links */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-200">
            <Link href="/virtual-coo" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-300 rounded-full text-sm text-slate-700 hover:border-slate-500 transition-colors font-medium">
              🌐 Virtual COO Services
            </Link>
            <Link href="/fractional-coo-services" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-slate-700 hover:border-slate-400 transition-colors">
              ⚙️ COO Services
            </Link>
            <Link href="/part-time-coo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-slate-700 hover:border-slate-400 transition-colors">
              ⏰ Part-Time COO Jobs
            </Link>
            <Link href="/interim-coo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-slate-700 hover:border-slate-400 transition-colors">
              📅 Interim COO Roles
            </Link>
            <Link href="/fractional-jobs-london" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-slate-700 hover:border-slate-400 transition-colors">
              📍 London Operations Jobs
            </Link>
          </div>

          {/* Cross-role linking */}
          <div className="pt-6">
            <p className="text-sm text-gray-500 mb-3">Explore other fractional roles:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/fractional-cfo" className="text-sm text-gray-600 hover:text-slate-700">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-gray-600 hover:text-slate-700">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-gray-600 hover:text-slate-700">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-gray-600 hover:text-slate-700">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-recruitment-agency" className="text-sm text-slate-700 hover:text-slate-900 font-medium">Recruitment Agency</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-gray-600 hover:text-slate-700">Fractional CISO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hey Companies - Founder Profile & Trust Signals */}
      <HeyCompanies location="UK" />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Hire a Fractional COO?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse pre-vetted fractional COOs or post your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-coo-jobs-uk"
              className="px-8 py-4 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-400 transition-colors"
            >
              Browse Fractional COOs
            </Link>
            <Link
              href="/hire-fractional-coo"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Hiring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Operations Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time operations opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Operations"
            title="Latest Operations Jobs"
            accentColor="purple"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="coo" />
    </div>
  )
}
