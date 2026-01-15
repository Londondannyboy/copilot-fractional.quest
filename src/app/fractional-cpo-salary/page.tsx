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
const heroImage = getHeroImageUrl('cpo', 1920, 800)
const imageCredit = getImage('cpo')

export const metadata: Metadata = {
  title: 'Fractional CPO Salary UK | Guide',
  description: 'Fractional CPO salary UK: day rates £800-£1,400. Compare costs, pricing factors, and calculate potential earnings.',
  keywords: 'fractional cpo salary, fractional cpo salary uk, fractional cpo day rate, fractional cpo cost, cpo salary uk, part time cpo salary, fractional product officer salary',
  alternates: { canonical: 'https://fractional.quest/fractional-cpo-salary' },
  openGraph: {
    title: 'Fractional CPO Salary UK 2025 | Complete Compensation Guide',
    description: 'Fractional CPO salary UK: Day rates £800-£1,400. Complete guide to fractional CPO costs and compensation.',
    url: 'https://fractional.quest/fractional-cpo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CPO Salary UK 2025 | Complete Compensation Guide',
    description: 'Fractional CPO salary UK: Day rates £800-£1,400. Complete guide to fractional CPO costs and compensation.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CPO', href: '/fractional-cpo' },
  { label: 'Salary Guide', href: '/fractional-cpo-salary' },
]

export default function FractionalCpoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="Fractional CPO Salary UK 2025 | Day Rates & Compensation Guide" description="Complete guide to fractional CPO salary UK. Day rates, annual equivalents, and factors affecting compensation." url="https://fractional.quest/fractional-cpo-salary" dateModified={new Date('2025-01-07')} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={imageCredit.alt} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-violet-500/80 to-purple-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Salary Guide 2025</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair text-white mb-6 leading-tight"><strong>Fractional CPO Salary</strong> UK</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">Complete guide to <strong>fractional CPO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 text-white/60 text-xs">
          Photo by <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">{imageCredit.credit}</a> on Unsplash
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><div className="text-3xl font-bold text-indigo-400">£800-£1,400</div><div className="text-sm text-gray-400">Day Rate Range</div></div>
            <div><div className="text-3xl font-bold text-indigo-400">£1,100</div><div className="text-sm text-gray-400">Average Day Rate</div></div>
            <div><div className="text-3xl font-bold text-indigo-400">£80k-£170k</div><div className="text-sm text-gray-400">Annual Equivalent</div></div>
            <div><div className="text-3xl font-bold text-indigo-400">2-3 days</div><div className="text-sm text-gray-400">Typical Engagement</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Fractional CPO Salary UK Overview</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8"><strong>Fractional CPO salary</strong> in the UK typically ranges from £800-£1,400 per day, with the average sitting around £1,100/day. This translates to annual earnings of £80,000-£170,000 depending on days worked per week and portfolio size. Product leadership is highly valued in the current market.</p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CPO Day Rates by Experience</h3>
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
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Entry-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£700-£900</td><td className="px-6 py-4 text-sm text-gray-600">£73,000-£94,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£900-£1,200</td><td className="px-6 py-4 text-sm text-gray-600">£94,000-£125,000</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td><td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,400</td><td className="px-6 py-4 text-sm text-gray-600">£125,000-£145,000</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">PLG Specialist</td><td className="px-6 py-4 text-sm text-gray-600">£1,300-£1,600</td><td className="px-6 py-4 text-sm text-gray-600">£135,000-£166,000</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CPO Salary by Specialisation</h3>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Specialisation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Day Rate Range</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Premium vs Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">B2B SaaS Product</td><td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,400</td><td className="px-6 py-4 text-sm text-green-600">+10-15%</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Product-Led Growth</td><td className="px-6 py-4 text-sm text-gray-600">£1,100-£1,500</td><td className="px-6 py-4 text-sm text-green-600">+15-20%</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">AI/ML Product</td><td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,600</td><td className="px-6 py-4 text-sm text-green-600">+20-25%</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Consumer Product</td><td className="px-6 py-4 text-sm text-gray-600">£900-£1,200</td><td className="px-6 py-4 text-sm text-gray-600">Baseline</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Factors Affecting Fractional CPO Salary</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'PLG Experience', desc: 'Product-led growth expertise commands 15-20% premium', icon: '📈' },
                { title: 'Technical Depth', desc: 'Strong technical background increases rates significantly', icon: '⚙️' },
                { title: 'Scale Experience', desc: '0-1 and scale-up product experience highly valued', icon: '🚀' },
                { title: 'Industry Focus', desc: 'FinTech and AI/ML specialists earn higher rates', icon: '🏭' },
                { title: 'Discovery Skills', desc: 'Strong product discovery and research background adds value', icon: '🔍' },
                { title: 'Team Building', desc: 'Experience building product orgs from scratch valued', icon: '👥' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CPO vs Full-Time CPO Salary</h3>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Total Cost Comparison</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">Full-time CPO (salary only)</span><span className="font-semibold">£140,000-£220,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Employer NI, pension, benefits</span><span className="font-semibold">+£25,000-£40,000</span></div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="text-gray-700">+ Equity (estimated value)</span><span className="font-semibold">+£40,000-£150,000</span></div>
                <div className="flex justify-between items-center pt-2 text-lg"><span className="font-bold text-gray-900">Full-time Total Cost</span><span className="font-bold text-red-600">£205,000-£410,000</span></div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-300"><span className="font-bold text-gray-900">Fractional CPO (2 days/week)</span><span className="font-bold text-green-600">£80,000-£130,000</span></div>
              </div>
              <p className="text-sm text-gray-600 mt-4">Fractional CPOs typically cost 50-70% less than full-time equivalents</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CPO Salary Calculator</h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CPO</p>
          </div>
          <RoleCalculator role="cpo" />
        </div>
      </section>

      {/* IR35 Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">IR35 Impact on Fractional CPO Salary</h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={1100} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/fractional-cpo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">📖</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">What is a Fractional CPO?</h3>
              <p className="text-gray-600 text-sm">Understand the role</p>
            </Link>
            <Link href="/fractional-cpo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">Fractional CPO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live roles</p>
            </Link>
            <Link href="/hire-fractional-cpo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">How to Hire a Fractional CPO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide</p>
            </Link>
            <Link href="/fractional-jobs-uk?department=Product" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">🔍</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">All Product Jobs</h3>
              <p className="text-gray-600 text-sm">Search product positions</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Salary Resources</h3>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.mindtheproduct.com/product-management-salary-survey/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">Mind the Product Salary Survey</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">HMRC Employer Rates</a>
            <span className="text-gray-300">•</span>
            <a href="https://www.glassdoor.co.uk/Salaries/chief-product-officer-salary-SRCH_KO0,21.htm" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">Glassdoor CPO Salaries</a>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Find Fractional CPO Opportunities</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse UK fractional CPO roles and compare compensation packages.</p>
          <Link href="/fractional-cpo-jobs-uk" className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-400 transition-colors inline-block">Browse CPO Jobs</Link>
        </div>
      </section>

      <RoleContentHub currentRole="cpo" />
    </div>
  )
}
