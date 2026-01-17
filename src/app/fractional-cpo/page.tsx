import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CPO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('cpo')
const imageAlt = getImage('cpo').alt
const heroImage = getHeroImageUrl('cpo', 1920, 800)
const imageCredit = getImage('cpo')

export const metadata: Metadata = {
  title: 'What is a Fractional CPO? | Guide',
  description: 'What is a fractional CPO? A part-time product leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cpo, fractional cpo meaning, fractional cpo definition, part time cpo, fractional product officer, fractional chief product officer, what does a fractional cpo do',
  alternates: { canonical: 'https://fractional.quest/fractional-cpo' },
  openGraph: {
    title: 'What is a Fractional CPO? | Complete Guide',
    description: 'Understand fractional CPO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Product Officer.',
    url: 'https://fractional.quest/fractional-cpo',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CPO? | Complete Guide',
    description: 'Understand fractional CPO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Product Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CPO', href: '/fractional-cpo' },
]

export default function FractionalCpoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional CPO? | Part-Time Chief Product Officer Guide" description="Complete guide to fractional CPO meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-cpo" dateModified={new Date('2026-01-07')} />
      <FAQPageSchema faqs={CPO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`What is a Fractional CPO - ${imageAlt}`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-violet-500/80 to-purple-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">What is a <strong>Fractional CPO</strong>?</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional CPO</strong> is a part-time Chief Product Officer who provides strategic product leadership to companies on a flexible basis. Learn about <strong>fractional CPO meaning</strong>, responsibilities, and costs.</p>
            </div>
          </div>
        </div>
        {imageCredit.credit && (
          <div className="absolute bottom-2 right-3 z-10">
            <a
              href={imageCredit.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/60 hover:text-white/90 transition-colors"
            >
              Photo: {imageCredit.credit}
            </a>
          </div>
        )}
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4">Fractional CPO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional CPO</strong> (Fractional Chief Product Officer) is an experienced product executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic product leadership without the cost of a full-time hire.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional CPO? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CPO meaning</strong> centres on flexible, senior-level product leadership. Unlike traditional full-time CPOs earning £140,000-£220,000 annually, a <strong>fractional Chief Product Officer</strong> works with multiple companies simultaneously, bringing diverse product experience and methodologies to each engagement.</p>
            <p>This model is especially valuable for product-led companies building their first product teams, startups pivoting their product strategy, or scale-ups needing to professionalise their product function without full-time executive overhead.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional CPO Do?</h2>
            <p>A <strong>fractional CPO</strong> performs the same functions as a full-time Chief Product Officer, but on a part-time basis:</p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Product Strategy', desc: 'Defining product vision, roadmap, and go-to-market strategy', icon: '🎯' },
                { title: 'Team Building', desc: 'Hiring, structuring, and mentoring product management teams', icon: '👥' },
                { title: 'Product-Led Growth', desc: 'Implementing PLG strategies and user acquisition loops', icon: '📈' },
                { title: 'Prioritisation', desc: 'Managing product backlog and stakeholder alignment', icon: '📋' },
                { title: 'Discovery & Research', desc: 'Establishing user research and product discovery processes', icon: '🔍' },
                { title: 'Metrics & Analytics', desc: 'Defining product KPIs and building analytics frameworks', icon: '📊' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CPO vs VP of Product</h2>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CPO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time VP/CPO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td><td className="px-6 py-4 text-sm text-gray-600">£40,000-£100,000</td><td className="px-6 py-4 text-sm text-gray-600">£140,000-£220,000+</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td><td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td><td className="px-6 py-4 text-sm text-gray-600">5 days/week</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Product Diversity</td><td className="px-6 py-4 text-sm text-gray-600">Multiple products, diverse methodologies</td><td className="px-6 py-4 text-sm text-gray-600">Single product focus</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td><td className="px-6 py-4 text-sm text-gray-600">Scale up/down easily</td><td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">Startups, scale-ups, product pivots</td><td className="px-6 py-4 text-sm text-gray-600">Large product orgs, complex portfolios</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional CPO?</h2>
            <ul className="space-y-3">
              <li><strong>Product-market fit:</strong> When searching for or validating product-market fit</li>
              <li><strong>First product hire:</strong> Building the initial product team and establishing processes</li>
              <li><strong>Product pivot:</strong> Major strategic shifts requiring experienced guidance</li>
              <li><strong>Scale-up phase:</strong> Professionalising product function after initial traction</li>
              <li><strong>Founder transition:</strong> Moving product leadership from founder to dedicated function</li>
              <li><strong>PLG implementation:</strong> Implementing product-led growth strategies</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CPO Cost UK</h2>
            <p><strong>Fractional CPO</strong> costs in the UK typically range from £800-£1,400 per day:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional CPO Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,200-£5,600/month (£38,000-£67,000/year)</li>
                <li><strong>2 days/week:</strong> £6,400-£11,200/month (£77,000-£134,000/year)</li>
                <li><strong>3 days/week:</strong> £9,600-£16,800/month (£115,000-£202,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CPO total cost: £180,000-£280,000+ (salary + benefits + equity)</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CPO Cost Calculator</h2>
          </div>
          <RoleCalculator role="cpo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional CPOs</h2>
          </div>
          <FAQ items={CPO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Explore More</span>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>

          {/* Primary Resources - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-cpo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">How to Hire a Fractional CPO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and evaluation</p>
            </Link>
            <Link href="/fractional-cpo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">Fractional CPO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CPO roles</p>
            </Link>
            <Link href="/fractional-cpo-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 mb-2">Fractional CPO Salary Guide</h3>
              <p className="text-gray-600 text-sm">Day rates and salary benchmarks</p>
            </Link>
          </div>

          {/* Secondary Resources - 4 compact links */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-200">
            <Link href="/fractional-cpo-services" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-indigo-700 hover:border-indigo-300 transition-colors">
              ⚙️ CPO Services
            </Link>
            <Link href="/part-time-cpo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-indigo-700 hover:border-indigo-300 transition-colors">
              ⏰ Part-Time CPO Jobs
            </Link>
            <Link href="/interim-cpo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-indigo-700 hover:border-indigo-300 transition-colors">
              📅 Interim CPO Roles
            </Link>
            <Link href="/fractional-jobs-london" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-indigo-700 hover:border-indigo-300 transition-colors">
              📍 London Product Jobs
            </Link>
          </div>

          {/* External Resources */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">External Resources for Product Leaders</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="https://www.mindtheproduct.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-lg">🎯</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">Mind the Product</h4>
                <p className="text-gray-500 text-xs">Global product management community</p>
              </div>
            </a>
            <a href="https://www.productschool.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-lg">📚</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">Product School</h4>
                <p className="text-gray-500 text-xs">Product management courses and certifications</p>
              </div>
            </a>
            <a href="https://www.lennysnewsletter.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-lg">📰</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">Lenny&apos;s Newsletter</h4>
                <p className="text-gray-500 text-xs">Product leadership insights and interviews</p>
              </div>
            </a>
            <Link href="/fractional-jobs-uk?department=Product" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group">
              <span className="text-lg">🔍</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-700 text-sm">All Product Jobs</h4>
                <p className="text-gray-500 text-xs">Search all fractional product positions</p>
              </div>
            </Link>
          </div>

          {/* Cross-role linking */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Explore other fractional roles:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/fractional-cfo" className="text-sm text-gray-600 hover:text-indigo-700">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-gray-600 hover:text-indigo-700">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-gray-600 hover:text-indigo-700">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-gray-600 hover:text-indigo-700">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-gray-600 hover:text-indigo-700">Fractional CHRO</Link>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional CPO?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CPO candidates or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-cpo-jobs-uk" className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-400 transition-colors">Browse Fractional CPOs</Link>
            <Link href="/fractional-jobs-uk?department=Product" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">All Product Jobs</Link>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="cpo" />
    </div>
  )
}
