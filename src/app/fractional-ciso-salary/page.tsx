import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleContentHub } from '@/components/RoleContentHub'

export const metadata: Metadata = {
  title: 'Fractional CISO Salary UK 2025 | Day Rates, Costs & Compensation Guide',
  description: 'Fractional CISO salary UK guide for 2025. Day rates £900-£1,500, annual equivalent £90,000-£180,000. Compare fractional CISO costs, understand pricing factors, and calculate your potential earnings.',
  keywords: 'fractional ciso salary, fractional ciso salary uk, fractional ciso day rate, fractional ciso cost, ciso salary uk, part time ciso salary, fractional security officer salary',
  alternates: { canonical: 'https://fractional.quest/fractional-ciso-salary' },
  openGraph: {
    title: 'Fractional CISO Salary UK 2025 | Complete Compensation Guide',
    description: 'Fractional CISO salary UK: Day rates £900-£1,500. Complete guide to fractional CISO costs and compensation.',
    url: 'https://fractional.quest/fractional-ciso-salary',
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CISO', href: '/fractional-ciso' },
  { label: 'Salary Guide', href: '/fractional-ciso-salary' },
]

export default function FractionalCisoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CISO Salary UK 2025 | Day Rates & Compensation Guide" description="Complete guide to fractional CISO salary UK. Day rates, annual equivalents, and factors affecting compensation." url="https://fractional.quest/fractional-ciso-salary" dateModified={new Date('2025-01-07')} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80" alt="Fractional CISO Salary UK - Compensation Guide" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-rose-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Salary Guide 2025</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"><strong>Fractional CISO Salary</strong> UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Complete guide to <strong>fractional CISO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-red-400">£900-£1,500</div><div className="text-sm text-gray-400">Day Rate Range</div></div>
            <div><div className="text-3xl font-bold text-red-400">£1,200</div><div className="text-sm text-gray-400">Average Day Rate</div></div>
            <div><div className="text-3xl font-bold text-red-400">£90k-£180k</div><div className="text-sm text-gray-400">Annual Equivalent</div></div>
            <div><div className="text-3xl font-bold text-red-400">2-3 days</div><div className="text-sm text-gray-400">Typical Engagement</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CISO Salary UK Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8"><strong>Fractional CISO salary</strong> in the UK typically ranges from £900-£1,500 per day, with the average sitting around £1,200/day. This translates to annual earnings of £90,000-£180,000 depending on days worked per week and portfolio size. Security leadership is increasingly in demand as cyber threats grow.</p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CISO Day Rates by Experience</h3>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Experience Level</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Annual (2 days/week)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Entry-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£800-£1,000</td><td className="px-6 py-4 text-sm text-gray-600">£83,000-£104,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,300</td><td className="px-6 py-4 text-sm text-gray-600">£104,000-£135,000</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£1,300-£1,500</td><td className="px-6 py-4 text-sm text-gray-600">£135,000-£156,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Enterprise/FS Specialist</td><td className="px-6 py-4 text-sm text-gray-600">£1,400-£1,800</td><td className="px-6 py-4 text-sm text-gray-600">£145,000-£187,000</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CISO Salary by Certification</h3>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Certification/Expertise</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate Premium</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">CISSP + SOC 2</td><td className="px-6 py-4 text-sm text-green-600">+10-15%</td><td className="px-6 py-4 text-sm text-gray-600">Most common combination</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">ISO 27001 Lead Auditor</td><td className="px-6 py-4 text-sm text-green-600">+15-20%</td><td className="px-6 py-4 text-sm text-gray-600">High demand for compliance</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">FCA/PRA Regulated</td><td className="px-6 py-4 text-sm text-green-600">+20-25%</td><td className="px-6 py-4 text-sm text-gray-600">Financial services expertise</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">CISM + Cloud Security</td><td className="px-6 py-4 text-sm text-green-600">+15-20%</td><td className="px-6 py-4 text-sm text-gray-600">Modern stack expertise</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Factors Affecting Fractional CISO Salary</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Compliance Expertise', desc: 'SOC 2, ISO 27001, GDPR expertise commands premiums', icon: '📋' },
                { title: 'Sector Experience', desc: 'FinTech, healthcare, and regulated industries pay more', icon: '🏭' },
                { title: 'Incident Response', desc: 'Real breach response experience highly valued', icon: '🚨' },
                { title: 'Cloud Security', desc: 'AWS, Azure, GCP security expertise adds 15-20%', icon: '☁️' },
                { title: 'Vendor Management', desc: 'MSSP/MDR evaluation and management experience valued', icon: '🤝' },
                { title: 'Board Presentation', desc: 'Experience presenting to boards increases rates', icon: '📊' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CISO vs Full-Time CISO Salary</h3>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Total Cost Comparison</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">Full-time CISO (salary only)</span><span className="font-semibold">£150,000-£250,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Employer NI, pension, benefits</span><span className="font-semibold">+£25,000-£45,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Equity (estimated value)</span><span className="font-semibold">+£30,000-£100,000</span></div>
                <div className="flex justify-between items-center pt-2 text-lg"><span className="font-bold text-gray-900">Full-time Total Cost</span><span className="font-bold text-red-600">£205,000-£395,000</span></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300"><span className="font-bold text-gray-900">Fractional CISO (2 days/week)</span><span className="font-bold text-green-600">£90,000-£145,000</span></div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Fractional CISOs typically cost 55-65% less than full-time equivalents</p>
            </div>

            <div className="bg-red-50 p-6 border border-red-200 rounded-lg my-8 not-prose">
              <p className="text-red-800 font-medium mb-3">ROI of a Fractional CISO</p>
              <p className="text-red-700 text-sm">Average UK data breach cost: £3.4 million. A fractional CISO at £90-145k/year provides enterprise-grade security leadership at a fraction of both the full-time cost and potential breach costs.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CISO Salary Calculator</h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CISO</p>
          </div>
          <RoleCalculator role="ciso" />
        </div>
      </section>

      {/* IR35 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Impact on Fractional CISO Salary</h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={1200} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/fractional-ciso" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">What is a Fractional CISO?</h3>
              <p className="text-gray-600 text-sm">Understand the role</p>
            </Link>
            <Link href="/fractional-ciso-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Fractional CISO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live roles</p>
            </Link>
            <Link href="/hire-fractional-ciso" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">How to Hire a Fractional CISO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide</p>
            </Link>
            <Link href="/fractional-jobs-uk?department=Security" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">🔍</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">All Security Jobs</h3>
              <p className="text-gray-600 text-sm">Search security positions</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Salary Resources</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.ncsc.gov.uk/collection/careers" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">NCSC Careers</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">HMRC Employer Rates</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.glassdoor.co.uk/Salaries/ciso-salary-SRCH_KO0,4.htm" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">Glassdoor CISO Salaries</a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Find Fractional CISO Opportunities</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse UK fractional CISO roles and compare compensation packages.</p>
          <Link href="/fractional-ciso-jobs-uk" className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-colors inline-block">Browse CISO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="ciso" />
    </div>
  )
}
