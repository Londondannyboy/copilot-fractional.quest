import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleContentHub } from '@/components/RoleContentHub'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('chro', 1920, 800)
const imageCredit = getImage('chro')

export const metadata: Metadata = {
  title: 'Fractional CHRO Salary UK | Guide',
  description: 'Fractional CHRO salary UK: day rates £600-£1,100. Compare costs, pricing factors, and calculate potential earnings.',
  keywords: 'fractional chro salary, fractional chro salary uk, fractional chro day rate, fractional chro cost, chro salary uk, part time chro salary, fractional hr director salary',
  alternates: { canonical: 'https://fractional.quest/fractional-chro-salary' },
  openGraph: {
    title: 'Fractional CHRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CHRO salary UK: Day rates £600-£1,100. Complete guide to fractional CHRO costs and compensation.',
    url: 'https://fractional.quest/fractional-chro-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CHRO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CHRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CHRO salary UK: Day rates £600-£1,100. Complete guide to fractional CHRO costs and compensation.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CHRO', href: '/fractional-chro' },
  { label: 'Salary Guide', href: '/fractional-chro-salary' },
]

export default function FractionalChroSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CHRO Salary UK 2026 | Day Rates & Compensation Guide" description="Complete guide to fractional CHRO salary UK. Day rates, annual equivalents, and factors affecting compensation." url="https://fractional.quest/fractional-chro-salary" dateModified={new Date('2026-01-07')} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`Fractional CHRO Salary UK - ${imageAlt}`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-violet-500/80 to-fuchsia-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Salary Guide 2026</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair"><strong>Fractional CHRO Salary</strong> UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Complete guide to <strong>fractional CHRO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.</p>
            </div>
          </div>
        </div>
        {/* Photo Credit */}
        <div className="absolute bottom-2 right-2 z-10">
          <a
            href={imageCredit.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 hover:text-white/70 transition-colors"
          >
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-purple-400">£600-£1,100</div><div className="text-sm text-gray-400">Day Rate Range</div></div>
            <div><div className="text-3xl font-bold text-purple-400">£850</div><div className="text-sm text-gray-400">Average Day Rate</div></div>
            <div><div className="text-3xl font-bold text-purple-400">£60k-£130k</div><div className="text-sm text-gray-400">Annual Equivalent</div></div>
            <div><div className="text-3xl font-bold text-purple-400">2-3 days</div><div className="text-sm text-gray-400">Typical Engagement</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CHRO Salary UK Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8"><strong>Fractional CHRO salary</strong> in the UK typically ranges from £600-£1,100 per day, with the average sitting around £850/day. This translates to annual earnings of £60,000-£130,000 depending on days worked per week and number of clients.</p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CHRO Day Rates by Experience</h3>
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
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Entry-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£500-£700</td><td className="px-6 py-4 text-sm text-gray-600">£52,000-£73,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£700-£900</td><td className="px-6 py-4 text-sm text-gray-600">£73,000-£94,000</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£900-£1,100</td><td className="px-6 py-4 text-sm text-gray-600">£94,000-£114,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Specialist (M&A/TUPE)</td><td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,300</td><td className="px-6 py-4 text-sm text-gray-600">£104,000-£135,000</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CHRO Salary by Location</h3>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate Range</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Premium vs UK Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">London</td><td className="px-6 py-4 text-sm text-gray-600">£800-£1,100</td><td className="px-6 py-4 text-sm text-green-600">+15-20%</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td><td className="px-6 py-4 text-sm text-gray-600">£600-£900</td><td className="px-6 py-4 text-sm text-gray-600">Baseline</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td><td className="px-6 py-4 text-sm text-gray-600">£600-£850</td><td className="px-6 py-4 text-sm text-gray-600">Baseline</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td><td className="px-6 py-4 text-sm text-gray-600">£550-£800</td><td className="px-6 py-4 text-sm text-red-600">-5-10%</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Factors Affecting Fractional CHRO Salary</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Industry Experience', desc: 'Tech, FinTech, and regulated industries pay 10-15% premiums', icon: '🏭' },
                { title: 'Scale Expertise', desc: 'Experience scaling from 50 to 500+ employees commands higher rates', icon: '📈' },
                { title: 'M&A/TUPE Experience', desc: 'Due diligence and integration expertise increases rates significantly', icon: '🤝' },
                { title: 'Employment Law', desc: 'Complex tribunal experience and UK employment law expertise valued', icon: '⚖️' },
                { title: 'Company Stage', desc: 'Series B+ companies typically pay more than seed stage', icon: '🚀' },
                { title: 'Culture Work', desc: 'Proven culture transformation experience adds premium', icon: '💎' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CHRO vs Full-Time CHRO Salary</h3>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Total Cost Comparison</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">Full-time CHRO (salary only)</span><span className="font-semibold">£100,000-£180,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Employer NI, pension, benefits</span><span className="font-semibold">+£18,000-£35,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Equity (estimated value)</span><span className="font-semibold">+£20,000-£60,000</span></div>
                <div className="flex justify-between items-center pt-2 text-lg"><span className="font-bold text-gray-900">Full-time Total Cost</span><span className="font-bold text-red-600">£138,000-£275,000</span></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300"><span className="font-bold text-gray-900">Fractional CHRO (2 days/week)</span><span className="font-bold text-green-600">£60,000-£95,000</span></div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Fractional CHROs typically cost 45-65% less than full-time equivalents</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CHRO Salary Calculator</h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CHRO</p>
          </div>
          <RoleCalculator role="chro" />
        </div>
      </section>

      {/* IR35 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Impact on Fractional CHRO Salary</h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={850} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/fractional-chro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">What is a Fractional CHRO?</h3>
              <p className="text-gray-600 text-sm">Understand the role</p>
            </Link>
            <Link href="/fractional-chro-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Fractional CHRO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live roles</p>
            </Link>
            <Link href="/hire-fractional-chro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">How to Hire a Fractional CHRO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide</p>
            </Link>
            <Link href="/fractional-jobs-uk?department=HR" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">🔍</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">All HR Jobs</h3>
              <p className="text-gray-600 text-sm">Search HR positions</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Salary Resources</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.cipd.org/uk/knowledge/reports/reward-management-survey/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">CIPD Reward Survey</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">HMRC Employer Rates</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.glassdoor.co.uk/Salaries/chro-salary-SRCH_KO0,4.htm" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">Glassdoor CHRO Salaries</a>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Find Fractional CHRO Opportunities</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse UK fractional CHRO roles and compare compensation packages.</p>
          <Link href="/fractional-chro-jobs-uk" className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors inline-block">Browse CHRO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="chro" />
    </div>
  )
}
