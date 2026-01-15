import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CISO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'
import { CaseStudy, CaseStudySchema } from '@/components/CaseStudy'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('ciso')
const imageAlt = getImage('ciso').alt
const heroImage = getHeroImageUrl('ciso', 1920, 800)
const imageCredit = getImage('ciso')

export const metadata: Metadata = {
  title: 'What is a Fractional CISO? | Guide',
  description: 'What is a fractional CISO? A part-time security leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional ciso, fractional ciso meaning, fractional ciso definition, part time ciso, fractional security officer, fractional chief security officer, what does a fractional ciso do',
  alternates: { canonical: 'https://fractional.quest/fractional-ciso' },
  openGraph: {
    title: 'What is a Fractional CISO? | Complete Guide',
    description: 'Understand fractional CISO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Information Security Officer.',
    url: 'https://fractional.quest/fractional-ciso',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CISO? | Complete Guide',
    description: 'Understand fractional CISO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Information Security Officer.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CISO', href: '/fractional-ciso' },
]

export default function FractionalCisoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional CISO? | Part-Time Chief Security Officer Guide" description="Complete guide to fractional CISO meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-ciso" dateModified={new Date('2025-01-07')} />
      <FAQPageSchema faqs={CISO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`${imageAlt} - What is a Fractional CISO`} fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-rose-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">What is a <strong>Fractional CISO</strong>?</h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">A <strong>fractional CISO</strong> is a part-time Chief Information Security Officer who provides strategic cybersecurity leadership to companies on a flexible basis. Learn about <strong>fractional CISO meaning</strong>, responsibilities, and costs.</p>
            </div>
          </div>
        </div>
        {imageCredit.credit && (
          <div className="absolute bottom-2 right-3 z-20">
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
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-4">Fractional CISO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional CISO</strong> (Fractional Chief Information Security Officer) is an experienced cybersecurity executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic security leadership without the cost of a full-time hire.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional CISO? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CISO meaning</strong> centres on flexible, senior-level cybersecurity leadership. Unlike traditional full-time CISOs earning £150,000-£250,000 annually, a <strong>fractional Chief Security Officer</strong> works with multiple companies simultaneously, bringing diverse security experience across industries and compliance frameworks.</p>
            <p>With increasing cyber threats, regulatory requirements (GDPR, SOC 2, ISO 27001), and customer security questionnaires, companies need senior security leadership but often cannot justify or afford a full-time CISO. The fractional model provides enterprise-grade security expertise at a fraction of the cost.</p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional CISO Do?</h2>
            <p>A <strong>fractional CISO</strong> performs the same functions as a full-time Chief Information Security Officer, but on a part-time basis:</p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Security Strategy', desc: 'Developing comprehensive cybersecurity roadmaps and risk frameworks', icon: '🎯' },
                { title: 'Compliance', desc: 'Achieving and maintaining SOC 2, ISO 27001, GDPR, HIPAA compliance', icon: '📋' },
                { title: 'Risk Assessment', desc: 'Identifying vulnerabilities and managing security risks', icon: '🔍' },
                { title: 'Incident Response', desc: 'Building and testing security incident response procedures', icon: '🚨' },
                { title: 'Vendor Management', desc: 'Evaluating security tools, managing security vendors', icon: '🤝' },
                { title: 'Team Building', desc: 'Hiring and mentoring security teams, managing MSSPs', icon: '👥' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CISO vs Security Consultant</h2>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CISO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Security Consultant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Engagement</td><td className="px-6 py-4 text-sm text-gray-600">Ongoing, part of leadership team</td><td className="px-6 py-4 text-sm text-gray-600">Project-based, advisory</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Accountability</td><td className="px-6 py-4 text-sm text-gray-600">Owns security outcomes</td><td className="px-6 py-4 text-sm text-gray-600">Provides recommendations</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Presence</td><td className="px-6 py-4 text-sm text-gray-600">Regular (1-3 days/week)</td><td className="px-6 py-4 text-sm text-gray-600">As needed</td></tr>
                  <tr className="bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">Cost</td><td className="px-6 py-4 text-sm text-gray-600">£45,000-£110,000/year</td><td className="px-6 py-4 text-sm text-gray-600">£10,000-£50,000/project</td></tr>
                  <tr><td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td><td className="px-6 py-4 text-sm text-gray-600">Ongoing security leadership</td><td className="px-6 py-4 text-sm text-gray-600">Specific audits or assessments</td></tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional CISO?</h2>
            <ul className="space-y-3">
              <li><strong>SOC 2 certification:</strong> When pursuing SOC 2 Type I or Type II compliance</li>
              <li><strong>Enterprise sales:</strong> When large customers require security questionnaires and audits</li>
              <li><strong>Post-funding:</strong> After raising Series A/B when security expectations increase</li>
              <li><strong>Data protection:</strong> Handling sensitive customer data (PII, health, financial)</li>
              <li><strong>Board requirements:</strong> When board or investors require security oversight</li>
              <li><strong>Incident preparation:</strong> Building incident response capabilities before a breach occurs</li>
            </ul>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CISO Cost UK</h2>
            <p><strong>Fractional CISO</strong> costs in the UK typically range from £900-£1,500 per day:</p>
            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional CISO Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,600-£6,000/month (£43,000-£72,000/year)</li>
                <li><strong>2 days/week:</strong> £7,200-£12,000/month (£86,000-£144,000/year)</li>
                <li><strong>3 days/week:</strong> £10,800-£18,000/month (£130,000-£216,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CISO total cost: £180,000-£300,000+ (salary + benefits + equity)</p>
            </div>

            <div className="bg-red-50 p-6 border border-red-200 rounded-lg my-8 not-prose">
              <p className="text-red-800 font-medium mb-3">Why security leadership matters now</p>
              <p className="text-red-700 text-sm">The average cost of a data breach in the UK is over £3.4 million. A fractional CISO helps prevent breaches and ensures compliance at a fraction of the cost of both a full-time hire and a potential incident.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Fractional CISO Cost Calculator</h2>
          </div>
          <RoleCalculator role="ciso" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions About Fractional CISOs</h2>
          </div>
          <FAQ items={CISO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Link href="/fractional-ciso-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Fractional CISO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CISO roles</p>
            </Link>
            <Link href="/fractional-ciso-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">Fractional CISO Salary Guide</h3>
              <p className="text-gray-600 text-sm">Day rates and salary benchmarks</p>
            </Link>
            <Link href="/hire-fractional-ciso" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">How to Hire a Fractional CISO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and evaluation</p>
            </Link>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">External Resources for Security Leaders</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-lg">🛡️</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-red-700 text-sm">NCSC</h4>
                <p className="text-gray-500 text-xs">UK National Cyber Security Centre</p>
              </div>
            </a>
            <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-lg">📋</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-red-700 text-sm">ICO</h4>
                <p className="text-gray-500 text-xs">Information Commissioner's Office - GDPR guidance</p>
              </div>
            </a>
            <a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-lg">🏆</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-red-700 text-sm">ISACA</h4>
                <p className="text-gray-500 text-xs">CISM certifications and security governance</p>
              </div>
            </a>
            <Link href="/fractional-jobs-uk?department=Security" className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-lg">🔍</span>
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-red-700 text-sm">All Security Jobs</h4>
                <p className="text-gray-500 text-xs">Search all fractional security positions</p>
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
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Work with a Fractional CISO?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted fractional CISO candidates or post your requirements to find the perfect match.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-ciso-jobs-uk" className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-colors">Browse Fractional CISOs</Link>
            <Link href="/fractional-jobs-uk?department=Security" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors">All Security Jobs</Link>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="ciso" />
    </div>
  )
}
