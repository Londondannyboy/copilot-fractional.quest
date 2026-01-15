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
const heroImage = getHeroImageUrl('ceo', 1920, 800)
const imageCredit = getImage('ceo')

export const metadata: Metadata = {
  title: 'Fractional CEO Salary UK | Guide',
  description: 'Fractional CEO salary UK: day rates £1,000-£2,000. Compare costs, pricing factors, and calculate earnings.',
  keywords: 'fractional ceo salary, fractional ceo salary uk, fractional ceo day rate, fractional ceo cost, ceo salary uk, part time ceo salary, interim ceo salary uk',
  alternates: { canonical: 'https://fractional.quest/fractional-ceo-salary' },
  openGraph: {
    title: 'Fractional CEO Salary UK 2025 | Complete Compensation Guide',
    description: 'Fractional CEO salary UK: Day rates £1,000-£2,000. Complete guide to fractional CEO costs and compensation.',
    url: 'https://fractional.quest/fractional-ceo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CEO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CEO Salary UK 2025 | Complete Compensation Guide',
    description: 'Fractional CEO salary UK: Day rates £1,000-£2,000. Complete guide to fractional CEO costs and compensation.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CEO', href: '/fractional-ceo' },
  { label: 'Salary Guide', href: '/fractional-ceo-salary' },
]

export default function FractionalCeoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CEO Salary UK 2025 | Day Rates & Compensation Guide" description="Complete guide to fractional CEO salary UK. Day rates, annual equivalents, and factors affecting compensation." url="https://fractional.quest/fractional-ceo-salary" dateModified={new Date('2025-01-07')} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`Fractional CEO Salary UK - ${imageAlt}`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 via-amber-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Salary Guide 2025</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair"><strong>Fractional CEO Salary</strong> UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Complete guide to <strong>fractional CEO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.</p>
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
            <div><div className="text-3xl font-bold text-yellow-400">£1,000-£2,000</div><div className="text-sm text-gray-400">Day Rate Range</div></div>
            <div><div className="text-3xl font-bold text-yellow-400">£1,500</div><div className="text-sm text-gray-400">Average Day Rate</div></div>
            <div><div className="text-3xl font-bold text-yellow-400">£100k-£250k</div><div className="text-sm text-gray-400">Annual Equivalent</div></div>
            <div><div className="text-3xl font-bold text-yellow-400">2-3 days</div><div className="text-sm text-gray-400">Typical Engagement</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CEO Salary UK Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8"><strong>Fractional CEO salary</strong> in the UK typically ranges from £1,000-£2,000 per day, with the average sitting around £1,500/day. This translates to annual earnings of £100,000-£250,000 depending on days worked per week and portfolio size. Fractional CEOs command the highest rates in the fractional executive market.</p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CEO Day Rates by Experience</h3>
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
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">First-time Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£900-£1,200</td><td className="px-6 py-4 text-sm text-gray-600">£94,000-£125,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Experienced Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,600</td><td className="px-6 py-4 text-sm text-gray-600">£125,000-£166,000</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£1,600-£2,000</td><td className="px-6 py-4 text-sm text-gray-600">£166,000-£208,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">PE/VC Operating Partner</td><td className="px-6 py-4 text-sm text-gray-600">£1,800-£2,500</td><td className="px-6 py-4 text-sm text-gray-600">£187,000-£260,000</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CEO vs Interim CEO Salary</h3>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Annual Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Fractional CEO (2 days/week)</td><td className="px-6 py-4 text-sm text-gray-600">£1,000-£2,000</td><td className="px-6 py-4 text-sm text-gray-600">£100,000-£200,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Interim CEO (full-time)</td><td className="px-6 py-4 text-sm text-gray-600">£1,500-£2,500</td><td className="px-6 py-4 text-sm text-gray-600">£360,000-£600,000</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Full-time CEO (employed)</td><td className="px-6 py-4 text-sm text-gray-600">N/A</td><td className="px-6 py-4 text-sm text-gray-600">£250,000-£500,000+</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Factors Affecting Fractional CEO Salary</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Exit Experience', desc: 'Successful exits (trade sale, IPO) can add 20-30% to rates', icon: '🏆' },
                { title: 'PE/VC Background', desc: 'Operating partner experience commands significant premiums', icon: '💼' },
                { title: 'Sector Expertise', desc: 'Deep sector experience (SaaS, FinTech) adds 15-20%', icon: '🏭' },
                { title: 'Turnaround Experience', desc: 'Proven turnaround track record increases rates', icon: '🔄' },
                { title: 'Company Stage', desc: 'Series C+ and pre-IPO companies pay top rates', icon: '🚀' },
                { title: 'Board Experience', desc: 'Public company board experience valued highly', icon: '📋' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CEO vs Full-Time CEO Salary</h3>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Total Cost Comparison</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">Full-time CEO (salary only)</span><span className="font-semibold">£200,000-£400,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Employer NI, pension, benefits</span><span className="font-semibold">+£30,000-£60,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Equity (typical 2-5%)</span><span className="font-semibold">+£100,000-£500,000+</span></div>
                <div className="flex justify-between items-center pt-2 text-lg"><span className="font-bold text-gray-900">Full-time Total Cost</span><span className="font-bold text-red-600">£330,000-£960,000+</span></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300"><span className="font-bold text-gray-900">Fractional CEO (2 days/week)</span><span className="font-bold text-green-600">£100,000-£200,000</span></div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Fractional CEOs provide 70-80% cost savings compared to full-time hires with equity</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CEO Salary Calculator</h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CEO</p>
          </div>
          <RoleCalculator role="ceo" />
        </div>
      </section>

      {/* IR35 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Impact on Fractional CEO Salary</h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={1500} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/fractional-ceo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">What is a Fractional CEO?</h3>
              <p className="text-gray-600 text-sm">Understand the role</p>
            </Link>
            <Link href="/fractional-ceo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">Fractional CEO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live roles</p>
            </Link>
            <Link href="/hire-fractional-ceo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">How to Hire a Fractional CEO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide</p>
            </Link>
            <Link href="/fractional-jobs-uk?department=Executive" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-300 transition-colors group">
              <span className="text-2xl mb-3 block">🔍</span>
              <h3 className="font-bold text-gray-900 group-hover:text-yellow-700 mb-2">All Executive Jobs</h3>
              <p className="text-gray-600 text-sm">Search executive positions</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Salary Resources</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.iod.com/resources/briefings/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline text-sm">IOD Director Briefings</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline text-sm">HMRC Employer Rates</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.glassdoor.co.uk/Salaries/ceo-salary-SRCH_KO0,3.htm" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline text-sm">Glassdoor CEO Salaries</a>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Find Fractional CEO Opportunities</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse UK fractional CEO roles and compare compensation packages.</p>
          <Link href="/fractional-ceo-jobs-uk" className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors inline-block">Browse CEO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
