import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'

const FD_FAQS = [
  { question: "What is a fractional Finance Director?", answer: "A fractional Finance Director (FD) is a part-time finance leader who works with companies on a flexible basis, typically 1-3 days per week. They provide strategic financial leadership, reporting, and commercial guidance without the commitment of a full-time hire. Also known as a fractional FD or part-time FD." },
  { question: "What's the difference between a fractional FD and fractional CFO?", answer: "The roles are often interchangeable, especially in the UK. Traditionally, 'Finance Director' is the UK term while 'CFO' is more American. In practice, both provide strategic financial leadership. The main difference is that CFO roles are typically at larger companies or carry board-level responsibility, while FD roles may report to a CFO or CEO." },
  { question: "How much does a fractional Finance Director cost?", answer: "Fractional Finance Directors typically charge £600-£1,000 per day in the UK. Working 2 days per week, this equates to £4,800-£8,000 per month, compared to £90,000-£140,000+ total cost for a full-time Finance Director with benefits." },
  { question: "When should I hire a fractional Finance Director?", answer: "Consider a fractional FD when: you've outgrown your bookkeeper but don't need a full-time FD, you need better financial reporting and forecasting, you're preparing for investment or exit, you need someone to improve cash flow management, or you want commercial finance insight without full-time overhead." },
  { question: "What qualifications should a fractional FD have?", answer: "Most fractional FDs are qualified accountants - ACA (ICAEW), ACCA, or CIMA qualified. Look for 10+ years post-qualification experience, ideally with prior FD/FC experience. Industry experience may be valuable but strong transferable commercial skills often matter more than specific sector knowledge." },
]

export const metadata: Metadata = {
  title: 'Fractional Finance Director UK | Part-Time FD Guide',
  description: 'What is a fractional Finance Director? A part-time FD providing strategic financial leadership. Day rates £600-£1,000. UK guide to fractional FD roles and costs.',
  keywords: 'fractional finance director, fractional fd, part time finance director, fractional fd uk, fractional finance director cost, hire fractional fd, interim finance director, what is a fractional fd',
  alternates: { canonical: 'https://fractional.quest/fractional-finance-director' },
  openGraph: {
    title: 'Fractional Finance Director UK | Part-Time FD Guide',
    description: 'Understand fractional Finance Director meaning, responsibilities, and costs. Learn when to hire a part-time FD.',
    url: 'https://fractional.quest/fractional-finance-director',
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional Finance Director', href: '/fractional-finance-director' },
]

export default function FractionalFinanceDirectorPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional Finance Director UK | Part-Time FD Guide" description="Complete guide to fractional Finance Director meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-finance-director" dateModified={new Date('2026-01-17')} />
      <FAQPageSchema faqs={FD_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" alt="Fractional Finance Director - Financial Leadership" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-green-500/80 to-teal-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">Fractional <strong>Finance Director</strong></h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional Finance Director</strong> (fractional FD) is a part-time finance leader who provides strategic financial guidance on a flexible basis. Day rates £600-£1,000. Also known as part-time FD or interim Finance Director.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">Fractional FD Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional Finance Director</strong> is an experienced finance professional who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic financial leadership, reporting, and commercial guidance without full-time overhead.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional Finance Director?</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">A <strong>fractional Finance Director</strong> provides the same strategic financial leadership as a full-time FD, but on a part-time basis. Unlike full-time Finance Directors earning £90,000-£140,000 annually, a <strong>fractional FD</strong> works with multiple companies simultaneously, bringing diverse experience and best practices to each engagement.</p>
            <p>This model is especially valuable for SMEs that have outgrown their bookkeeper, companies preparing for investment or exit, businesses needing better financial visibility, or organisations requiring commercial finance expertise without full-time costs.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional FD vs Fractional CFO</h2>
            <p>In the UK market, <strong>Finance Director</strong> and <strong>CFO</strong> are often used interchangeably. Key differences:</p>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Aspect</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Finance Director (FD)</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Chief Financial Officer (CFO)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Typical Usage</td><td className="px-6 py-4 text-sm text-gray-600">UK / Europe</td><td className="px-6 py-4 text-sm text-gray-600">US / Global corporations</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Company Size</td><td className="px-6 py-4 text-sm text-gray-600">SME to large</td><td className="px-6 py-4 text-sm text-gray-600">Typically larger / listed companies</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Board Status</td><td className="px-6 py-4 text-sm text-gray-600">May or may not be on board</td><td className="px-6 py-4 text-sm text-gray-600">Usually board member</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Day Rate</td><td className="px-6 py-4 text-sm text-gray-600">£600-£1,000</td><td className="px-6 py-4 text-sm text-gray-600">£800-£1,400</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">SMEs, growth businesses</td><td className="px-6 py-4 text-sm text-gray-600">PE-backed, pre-IPO, large enterprises</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional FD Do?</h2>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Financial Reporting', desc: 'Management accounts, board packs, KPI dashboards, and investor reporting', icon: '📊' },
                { title: 'Cash Flow Management', desc: 'Working capital optimisation, forecasting, and treasury management', icon: '💰' },
                { title: 'Commercial Finance', desc: 'Pricing strategy, margin analysis, business case development', icon: '📈' },
                { title: 'Budgeting & Forecasting', desc: 'Annual budgets, rolling forecasts, and scenario planning', icon: '📋' },
                { title: 'Systems & Processes', desc: 'Finance team development, system selection, process improvement', icon: '⚙️' },
                { title: 'Fundraising Support', desc: 'Due diligence preparation, financial modelling, investor relations', icon: '🎯' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional Finance Director Cost UK</h2>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional FD Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £2,400-£4,000/month (£29,000-£48,000/year)</li>
                <li><strong>2 days/week:</strong> £4,800-£8,000/month (£58,000-£96,000/year)</li>
                <li><strong>3 days/week:</strong> £7,200-£12,000/month (£86,000-£144,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time FD total cost: £110,000-£180,000+ (salary + benefits + NI)</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When to Hire a Fractional Finance Director</h2>
            <ul className="space-y-3">
              <li><strong>Revenue £1-10m:</strong> You've outgrown your bookkeeper and need strategic finance leadership</li>
              <li><strong>Preparing for investment:</strong> Need financial due diligence readiness and investor-grade reporting</li>
              <li><strong>Cash flow challenges:</strong> Working capital optimisation and improved forecasting needed</li>
              <li><strong>Management buyout:</strong> Financial modelling and deal structuring expertise required</li>
              <li><strong>Rapid growth:</strong> Finance function can't keep up with business expansion</li>
              <li><strong>Interim requirement:</strong> Bridging gap while recruiting full-time FD</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional Finance Director Cost Calculator</h2>
          </div>
          <RoleCalculator role="cfo" />
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Opportunities</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Current Fractional FD Jobs</h2>
          </div>
          <EmbeddedJobBoard defaultDepartment="Finance" title="" accentColor="emerald" jobsPerPage={6} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional FDs</h2>
          </div>
          <FAQ items={FD_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Link href="/fractional-cfo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Fractional CFO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live CFO/FD roles</p>
            </Link>
            <Link href="/fractional-cfo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">What is a Fractional CFO?</h3>
              <p className="text-gray-600 text-sm">Understanding the CFO role</p>
            </Link>
            <Link href="/hire-fractional-cfo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">How to Hire a Fractional CFO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.icaew.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-lg">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">ICAEW</h4>
                <p className="text-gray-500 text-xs">Institute of Chartered Accountants</p>
              </div>
            </a>
            <a href="https://www.accaglobal.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-lg">🎓</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">ACCA</h4>
                <p className="text-gray-500 text-xs">Association of Chartered Certified Accountants</p>
              </div>
            </a>
            <a href="https://www.cimaglobal.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-lg">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">CIMA</h4>
                <p className="text-gray-500 text-xs">Chartered Institute of Management Accountants</p>
              </div>
            </a>
            <Link href="/fractional-jobs-london" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors group">
              <span className="text-lg">🏙️</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">London Fractional Jobs</h4>
                <p className="text-gray-500 text-xs">Top UK market for fractional roles</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* E-E-A-T: Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />

      {/* E-E-A-T: Case Study */}
      <CaseStudy />
      <CaseStudySchema />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional Finance Director?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse qualified fractional FDs and CFOs or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cfo-jobs-uk" className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-400 transition-colors">Browse Fractional FDs</Link>
            <Link href="/fractional-jobs-london" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">London Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
