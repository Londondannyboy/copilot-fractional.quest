import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('cro', 1920, 800)
const imageCredit = getImage('cro')

export const metadata: Metadata = {
  title: 'Fractional CRO Salary UK | Guide',
  description: 'Fractional CRO salary UK: day rates £1,000-£1,500. Compare costs, pricing factors, and calculate potential earnings for Chief Revenue Officers.',
  keywords: 'fractional cro salary, fractional cro salary uk, fractional cro day rate, fractional cro cost, cro salary uk, part time cro salary, fractional cro rates, chief revenue officer salary',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cro-salary',
  },
  openGraph: {
    title: 'Fractional CRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CRO salary UK: Day rates £1,000-£1,500. Complete guide to fractional Chief Revenue Officer costs.',
    url: 'https://fractional.quest/fractional-cro-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CRO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CRO salary UK: Day rates £1,000-£1,500. Complete guide to fractional CRO costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CRO', href: '/fractional-cro' },
  { label: 'Salary Guide', href: '/fractional-cro-salary' },
]

export default function FractionalCroSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CRO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional CRO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-cro-salary"
        dateModified={new Date('2026-01-17')}
      />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`Fractional CRO Salary UK - ${imageAlt}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-500/80 to-purple-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CRO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CRO salary UK</strong> rates. Day rates, annual equivalents, and factors affecting compensation.
              </p>
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
            <div>
              <div className="text-3xl font-bold text-blue-400">£1,000-£1,500</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">£1,250</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">£100k-£180k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">2-3 days</div>
              <div className="text-sm text-gray-400">Typical Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">

            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CRO Salary UK Overview</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              <strong>Fractional CRO salary</strong> in the UK typically ranges from £1,000-£1,500 per day, with the average around £1,250/day. CROs with SaaS scaling experience and PE/VC backgrounds command premium rates. Those with track records of growing ARR from £1M to £10M+ earn at the higher end.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CRO Day Rates by Experience</h3>

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
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">VP Sales transitioning</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£800-£1,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£83,000-£104,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional CRO</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,300</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£104,000-£135,000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional CRO</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,300-£1,600</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£135,000-£166,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">PE/Exit Specialist CRO</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,500-£1,900</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£156,000-£197,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CRO Rates by Sector</h3>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Sector</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Key Skills</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">SaaS</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,100-£1,500</td>
                    <td className="px-6 py-4 text-sm text-gray-600">ARR growth, PLG, SaaS metrics</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">PE-Backed</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,700</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Value creation, exit prep</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Enterprise Sales</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,600</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Complex sales, large deals</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">SMB/Mid-Market</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£900-£1,200</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Volume sales, process</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Factors Affecting CRO Salary</h3>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Revenue Track Record', desc: 'Proven ARR scaling history commands 20-30% premium', icon: '📈' },
                { title: 'Team Building', desc: 'Experience scaling sales teams from 2→20+ adds value', icon: '👥' },
                { title: 'Sector Expertise', desc: 'SaaS, fintech, and PE experience pay more', icon: '🎯' },
                { title: 'Geographic Scope', desc: 'International expansion experience commands premium', icon: '🌍' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg my-8 not-prose">
              <p className="text-blue-800 font-medium mb-3">Want to hire a fractional CRO?</p>
              <Link href="/hire-fractional-cro" className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900">
                Complete Guide: How to Hire a Fractional CRO →
              </Link>
            </div>

          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional CRO Earnings Calculator
            </h2>
          </div>
          <RoleCalculator role="cro" />
        </div>
      </section>

      {/* IR35 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Tax Planning</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              IR35 Impact Calculator
            </h2>
            <p className="text-gray-600 mt-2">Understand your take-home pay inside vs outside IR35</p>
          </div>
          <IR35Calculator defaultDayRate={1250} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/fractional-cro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">What is a Fractional CRO?</h3>
              <p className="text-gray-600 text-sm">Complete role guide</p>
            </Link>
            <Link href="/fractional-cro-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">CRO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live opportunities</p>
            </Link>
            <Link href="/hire-fractional-cro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">🤝</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Hire a Fractional CRO</h3>
              <p className="text-gray-600 text-sm">How to hire guide</p>
            </Link>
            <Link href="/fractional-cmo-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">CMO Salary Guide</h3>
              <p className="text-gray-600 text-sm">Compare with CMO rates</p>
            </Link>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">External Salary Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.glassdoor.co.uk/Salaries/chief-revenue-officer-salary-SRCH_KO0,21.htm" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-xl mr-3">📊</span>
              <div>
                <div className="font-semibold text-gray-900">Glassdoor CRO Salaries</div>
                <div className="text-sm text-gray-600">UK salary benchmarking data</div>
              </div>
            </a>
            <a href="https://www.gov.uk/guidance/ir35-find-out-if-it-applies" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-xl mr-3">🏛️</span>
              <div>
                <div className="font-semibold text-gray-900">HMRC IR35 Guidance</div>
                <div className="text-sm text-gray-600">Official contractor tax rules</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Find Your Next Fractional CRO Role
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse live fractional CRO opportunities with competitive day rates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cro-jobs-uk"
              className="px-8 py-4 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Browse CRO Jobs
            </Link>
            <Link
              href="/fractional-cro"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Learn About the Role
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
