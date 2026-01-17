import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CHRO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('chro')
const imageAlt = getImage('chro').alt
const heroImage = getHeroImageUrl('chro', 1920, 800)
const imageCredit = getImage('chro')

export const metadata: Metadata = {
  title: 'What is a Fractional CHRO? | Guide',
  description: 'What is a fractional CHRO? A part-time HR leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional chro, fractional chro meaning, fractional chro definition, part time chro, fractional hr officer, fractional chief hr officer, what does a fractional chro do',
  alternates: { canonical: 'https://fractional.quest/fractional-chro' },
  openGraph: {
    title: 'What is a Fractional CHRO? | Complete Guide',
    description: 'Understand fractional CHRO meaning, responsibilities, and costs. Learn when to hire a part-time Chief HR Officer.',
    url: 'https://fractional.quest/fractional-chro',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CHRO? | Complete Guide',
    description: 'Understand fractional CHRO meaning, responsibilities, and costs. Learn when to hire a part-time Chief HR Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CHRO', href: '/fractional-chro' },
]

export default function FractionalChroPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional CHRO? | Part-Time Chief HR Officer Guide" description="Complete guide to fractional CHRO meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-chro" dateModified={new Date('2026-01-07')} />
      <FAQPageSchema faqs={CHRO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`What is a Fractional CHRO - ${imageAlt}`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-violet-500/80 to-fuchsia-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">What is a <strong>Fractional CHRO</strong>?</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional CHRO</strong> is a part-time Chief Human Resources Officer who provides strategic HR and people leadership to companies on a flexible basis. Learn about <strong>fractional CHRO meaning</strong>, responsibilities, and costs.</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-4 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-white/90 transition-colors">
            Photo by {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Fractional CHRO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional CHRO</strong> (Fractional Chief Human Resources Officer) is an experienced HR executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic people leadership without the cost of a full-time hire.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional CHRO? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CHRO meaning</strong> centres on flexible, senior-level HR leadership. Unlike traditional full-time CHROs earning £120,000-£200,000 annually, a <strong>fractional Chief HR Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.</p>
            <p>This model emerged from the need for companies to access senior HR expertise during critical phases - scaling teams, building culture, or navigating complex employment situations - without the overhead of a full-time executive.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional CHRO Do?</h2>
            <p>A <strong>fractional CHRO</strong> performs the same functions as a full-time Chief Human Resources Officer, but on a part-time basis:</p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'People Strategy', desc: 'Developing HR strategies aligned with business growth and culture goals', icon: '🎯' },
                { title: 'Talent Acquisition', desc: 'Building recruitment processes, employer branding, and hiring systems', icon: '👥' },
                { title: 'Culture Development', desc: 'Creating and maintaining company culture as the organisation scales', icon: '💎' },
                { title: 'Performance Management', desc: 'Implementing review cycles, feedback systems, and career frameworks', icon: '📈' },
                { title: 'Compensation & Benefits', desc: 'Designing competitive pay structures and benefits packages', icon: '💰' },
                { title: 'Compliance & Policy', desc: 'Ensuring employment law compliance and developing HR policies', icon: '📊' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CHRO vs Full-Time CHRO</h2>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CHRO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CHRO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td><td className="px-6 py-4 text-sm text-gray-600">£30,000-£80,000</td><td className="px-6 py-4 text-sm text-gray-600">£120,000-£200,000+</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td><td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td><td className="px-6 py-4 text-sm text-gray-600">5 days/week</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Experience Breadth</td><td className="px-6 py-4 text-sm text-gray-600">Multiple companies, diverse cultures</td><td className="px-6 py-4 text-sm text-gray-600">Single company focus</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td><td className="px-6 py-4 text-sm text-gray-600">Scale up/down easily</td><td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">50-300 employees, scaling companies</td><td className="px-6 py-4 text-sm text-gray-600">500+ employees, complex orgs</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional CHRO?</h2>
            <ul className="space-y-3">
              <li><strong>Rapid scaling:</strong> When team is growing 50%+ annually and needs HR infrastructure</li>
              <li><strong>Culture challenges:</strong> When company culture needs deliberate development or repair</li>
              <li><strong>Post-funding:</strong> After raising Series A/B and needing to professionalise HR</li>
              <li><strong>Leadership gap:</strong> After losing HR leader and needing interim expertise</li>
              <li><strong>Complex situations:</strong> Navigating redundancies, M&A, or reorganisations</li>
              <li><strong>Compliance needs:</strong> Ensuring employment law compliance as complexity grows</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CHRO Cost UK</h2>
            <p><strong>Fractional CHRO</strong> costs in the UK typically range from £600-£1,100 per day:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional CHRO Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £2,400-£4,400/month (£29,000-£53,000/year)</li>
                <li><strong>2 days/week:</strong> £4,800-£8,800/month (£58,000-£106,000/year)</li>
                <li><strong>3 days/week:</strong> £7,200-£13,200/month (£86,000-£158,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CHRO total cost: £150,000-£250,000+ (salary + benefits + equity)</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CHRO Cost Calculator</h2>
          </div>
          <RoleCalculator role="chro" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional CHROs</h2>
          </div>
          <FAQ items={CHRO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Explore More</span>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>

          {/* Primary Resources - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-chro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">How to Hire a Fractional CHRO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and evaluation</p>
            </Link>
            <Link href="/fractional-chro-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Fractional CHRO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CHRO roles</p>
            </Link>
            <Link href="/fractional-chro-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-700 mb-2">Fractional CHRO Salary Guide</h3>
              <p className="text-gray-600 text-sm">Day rates and salary benchmarks</p>
            </Link>
          </div>

          {/* Secondary Resources - 4 compact links */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-200">
            <Link href="/fractional-chro-services" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-purple-700 hover:border-purple-300 transition-colors">
              ⚙️ CHRO Services
            </Link>
            <Link href="/part-time-chro-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-purple-700 hover:border-purple-300 transition-colors">
              ⏰ Part-Time CHRO Jobs
            </Link>
            <Link href="/interim-chro-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-purple-700 hover:border-purple-300 transition-colors">
              📅 Interim CHRO Roles
            </Link>
            <Link href="/fractional-jobs-london" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-purple-700 hover:border-purple-300 transition-colors">
              📍 London HR Jobs
            </Link>
          </div>

          {/* External Resources */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">External Resources for HR Leaders</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="https://www.cipd.org/uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-lg">🏛️</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">CIPD</h4>
                <p className="text-gray-500 text-xs">Chartered Institute of Personnel and Development</p>
              </div>
            </a>
            <a href="https://www.acas.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-lg">⚖️</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">ACAS</h4>
                <p className="text-gray-500 text-xs">Advisory, Conciliation and Arbitration Service</p>
              </div>
            </a>
            <a href="https://www.gov.uk/browse/employing-people" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-lg">📜</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">GOV.UK Employment</h4>
                <p className="text-gray-500 text-xs">Official UK employment law guidance</p>
              </div>
            </a>
            <Link href="/fractional-jobs-uk?department=HR" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors group">
              <span className="text-lg">🔍</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 text-sm">All HR Leadership Jobs</h4>
                <p className="text-gray-500 text-xs">Search all fractional HR positions</p>
              </div>
            </Link>
          </div>

          {/* Cross-role linking */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Explore other fractional roles:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/fractional-cfo" className="text-sm text-gray-600 hover:text-purple-700">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-gray-600 hover:text-purple-700">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-gray-600 hover:text-purple-700">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-gray-600 hover:text-purple-700">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-gray-600 hover:text-purple-700">Fractional CISO</Link>
            </div>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional CHRO?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CHRO candidates or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-chro-jobs-uk" className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors">Browse Fractional CHROs</Link>
            <Link href="/fractional-jobs-uk?department=HR" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">All HR Jobs</Link>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="chro" />
    </div>
  )
}
