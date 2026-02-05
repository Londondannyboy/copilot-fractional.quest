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
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { HeyCompanies } from '@/components/HeyCompanies'

const ogImage = getOGImageUrl('ciso')
const imageAlt = getImage('ciso').alt
const heroImage = getHeroImageUrl('ciso', 1920, 800)
const imageCredit = getImage('ciso')

export const metadata: Metadata = {
  title: 'Fractional CISO UK | Part-Time Security Leadership Guide 2026',
  description: 'Fractional CISO: Part-time Chief Information Security Officer working 1-3 days/week. Day rates £800-£1,500. When to hire, costs, responsibilities. Complete UK guide.',
  keywords: 'fractional ciso, fractional ciso uk, what is a fractional ciso, fractional ciso meaning, part time ciso, fractional security officer, fractional chief information security officer, vciso, virtual ciso',
  alternates: { canonical: 'https://fractional.quest/fractional-ciso' },
  openGraph: {
    title: 'Fractional CISO UK | Part-Time Security Leadership Guide',
    description: 'Fractional CISO: Part-time security executive working 1-3 days/week. Day rates £800-£1,500. Complete UK guide.',
    url: 'https://fractional.quest/fractional-ciso',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CISO UK | Part-Time Security Leadership Guide',
    description: 'Fractional CISO: Part-time security executive. Day rates £800-£1,500. Complete UK guide.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CISO', href: '/fractional-ciso' },
]

const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'when-needed', title: 'When to Hire' },
  { id: 'cost-pricing', title: 'UK Cost Guide' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'calculator', title: 'Cost Calculator' },
  { id: 'jobs', title: 'CISO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

export default function FractionalCisoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema title="What is a Fractional CISO? | Part-Time Chief Security Officer Guide" description="Complete guide to fractional CISO meaning, responsibilities, costs, and when to hire one." url="https://fractional.quest/fractional-ciso" dateModified={new Date('2026-01-31')} />
      <FAQPageSchema faqs={CISO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image src={heroImage} alt={`${imageAlt} - What is a Fractional CISO`} title="Fractional CISO - Part-Time Security Leadership" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-rose-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Role Guide</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair"><strong>Fractional CISO</strong>: Part-Time Security Leadership</h1>
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
            <h2 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-4">Role Definition</h2>
            <p className="text-2xl font-light leading-relaxed">A <strong className="font-semibold">Fractional CISO</strong> (Fractional Chief Information Security Officer) is an experienced cybersecurity executive who partners with organisations on a part-time or contract basis, typically 1-3 days per week. Day rates range from £1,000-£1,800 depending on experience and sector. Monthly retainers typically range from £4,000-£12,000. Fractional CISOs provide enterprise-grade security leadership without the £180,000-£300,000 cost of a full-time hire.</p>
            <p className="text-sm text-red-300 mt-4">Source: CyPro, GoFractional Jan 2026</p>
          </div>
        </div>
      </section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Article Column */}
            <article className="lg:col-span-8 prose prose-lg prose-gray max-w-none">
            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CISO? Understanding the Role</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">The <strong>fractional CISO meaning</strong> centres on flexible, senior-level cybersecurity leadership. Unlike traditional full-time CISOs earning £150,000-£250,000 annually, a <strong>part-time security executive</strong> works with multiple companies simultaneously, bringing diverse security experience across industries and compliance frameworks.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> As the <a href="https://www.bbc.co.uk/news/articles/c5yv6n536vno" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline font-medium">BBC reports on the evolving UK job market (Jan 2026)</a>, companies are increasingly embracing flexible executive arrangements. Fractional CISOs represent a key part of this shift, part of the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">fractional work</a> trend transforming cybersecurity leadership.
              </p>
            </div>

            <p>With increasing cyber threats, regulatory requirements (GDPR, SOC 2, ISO 27001), and customer security questionnaires, companies need senior security leadership but often cannot justify or afford a full-time CISO. The fractional model provides enterprise-grade security expertise at a fraction of the cost.</p>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities</h2>
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

            <h2 id="comparison" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Fractional vs Interim vs Full-Time CISO: How They Compare</h2>
            <p>Understanding the difference between a <strong>fractional CISO</strong>, <strong>interim CISO</strong>, and <strong>full-time CISO</strong> helps companies choose the right security leadership model:</p>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-red-700">Fractional CISO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim CISO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CISO</th>
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
                    <td className="px-4 py-4 text-sm text-red-700 font-semibold">£4,000-£12,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£18,000-£28,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£15,000-£25,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-4 py-4 text-sm text-red-700 font-semibold">£48,000-£144,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£54,000-£84,000 (3mo)</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£180,000-£300,000+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Strategy, compliance, governance</td>
                    <td className="px-4 py-4 text-sm text-gray-600">CISO gap, crisis, transformation</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Full security ownership</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Fixed contract term</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Limited flexibility</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-4 py-4 text-sm text-red-800 font-medium">SMEs, startups, Series A-C</td>
                    <td className="px-4 py-4 text-sm text-blue-800 font-medium">CISO vacancy, incident, M&A</td>
                    <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, regulated</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>Cost Comparison:</strong> A fractional CISO at 2 days/week costs £96,000-£144,000/year vs £180,000-£300,000+ for a full-time CISO (including salary, NI, pension, benefits, and recruitment fees). That&apos;s <strong>50-70% savings</strong> while maintaining enterprise-grade security leadership.
              </p>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When to Hire</h2>
            <ul className="space-y-3">
              <li><strong>SOC 2 certification:</strong> When pursuing SOC 2 Type I or Type II compliance</li>
              <li><strong>Enterprise sales:</strong> When large customers require security questionnaires and audits</li>
              <li><strong>Post-funding:</strong> After raising Series A/B when security expectations increase</li>
              <li><strong>Data protection:</strong> Handling sensitive customer data (PII, health, financial)</li>
              <li><strong>Board requirements:</strong> When board or investors require security oversight</li>
              <li><strong>Incident preparation:</strong> Building incident response capabilities before a breach occurs</li>
            </ul>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">UK Cost Guide</h2>
            <p><strong>Fractional CISO</strong> costs in the UK typically range from £1,000-£1,800 per day based on experience and sector:</p>

            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-red-600 font-bold text-sm mb-2">STARTER</div>
                <div className="text-3xl font-black text-gray-900 mb-1">£4,000-£6,000</div>
                <div className="text-gray-500 text-sm mb-4">per month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 1 day per week (4 days/month)</li>
                  <li>• Security policy development</li>
                  <li>• Compliance guidance</li>
                  <li>• Vendor security reviews</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Best for: Seed/Series A startups</span>
                </div>
              </div>
              <div className="bg-white p-6 border-2 border-red-500 rounded-lg relative">
                <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
                <div className="text-red-600 font-bold text-sm mb-2">GROWTH</div>
                <div className="text-3xl font-black text-gray-900 mb-1">£8,000-£12,000</div>
                <div className="text-gray-500 text-sm mb-4">per month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 2 days per week (8 days/month)</li>
                  <li>• SOC 2 / ISO 27001 prep</li>
                  <li>• Security architecture</li>
                  <li>• Incident response planning</li>
                  <li>• Security awareness training</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Best for: Series A-B scale-ups</span>
                </div>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-red-600 font-bold text-sm mb-2">ENTERPRISE</div>
                <div className="text-3xl font-black text-gray-900 mb-1">£14,000-£22,000</div>
                <div className="text-gray-500 text-sm mb-4">per month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 3+ days per week</li>
                  <li>• Full CISO responsibilities</li>
                  <li>• Board-level reporting</li>
                  <li>• Security team management</li>
                  <li>• M&A security due diligence</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Best for: PE-backed, regulated</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 border border-red-200 rounded-lg my-8 not-prose">
              <p className="text-red-800 font-medium mb-3">Why security leadership matters now</p>
              <p className="text-red-700 text-sm">The average cost of a data breach in the UK is over £3.4 million (IBM Cost of Data Breach Report 2025). A fractional CISO helps prevent breaches and ensures compliance at a fraction of the cost of both a full-time hire and a potential incident.</p>
            </div>

            <h2 id="hourly-rates" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Fractional CISO Hourly Rates UK</h2>
            <p>For ad-hoc consultations and project-based security work:</p>
            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-red-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Standard Fractional CISO</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£150-£200/hour</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Policy reviews, security assessments</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CISO (15+ years)</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£200-£275/hour</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Board reporting, M&A due diligence</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">FinTech / Regulated Specialist</td>
                    <td className="px-6 py-4 text-sm text-red-700 font-semibold">£225-£325/hour</td>
                    <td className="px-6 py-4 text-sm text-gray-600">FCA compliance, PCI-DSS</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Incident Response Expert</td>
                    <td className="px-6 py-4 text-sm text-red-700 font-semibold">£250-£400/hour</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Breach response, forensics</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Certifications</h2>
            <p>Key qualifications that validate fractional CISO expertise:</p>
            <div className="grid md:grid-cols-2 gap-4 my-8 not-prose">
              <a href="https://www.isc2.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-700">(ISC)² - CISSP</h4>
                    <p className="text-sm text-gray-600">Certified Information Systems Security Professional</p>
                    <p className="text-xs text-red-600 mt-1">Gold standard certification</p>
                  </div>
                </div>
              </a>
              <a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-700">ISACA - CISM</h4>
                    <p className="text-sm text-gray-600">Certified Information Security Manager</p>
                    <p className="text-xs text-red-600 mt-1">Management-focused certification</p>
                  </div>
                </div>
              </a>
              <a href="https://www.ncsc.gov.uk/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-700">NCSC</h4>
                    <p className="text-sm text-gray-600">UK National Cyber Security Centre</p>
                    <p className="text-xs text-gray-500 mt-1">Government security guidance</p>
                  </div>
                </div>
              </a>
              <a href="https://www.crest-approved.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-red-700">CREST</h4>
                    <p className="text-sm text-gray-600">Security testing accreditation</p>
                    <p className="text-xs text-gray-500 mt-1">Penetration testing standards</p>
                  </div>
                </div>
              </a>
            </div>
          </article>

            {/* Sidebar with Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/hire-fractional-ciso" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors">
                      <span>📋</span> How to Hire a CISO
                    </Link>
                    <Link href="/fractional-ciso-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors">
                      <span>💰</span> CISO Salary Guide
                    </Link>
                    <Link href="/fractional-ciso-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors">
                      <span>💼</span> CISO Jobs UK
                    </Link>
                    <Link href="/virtual-ciso" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors">
                      <span>🌐</span> Virtual CISO (vCISO)
                    </Link>
                    <Link href="/fractional-ciso-services" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors">
                      <span>⚙️</span> CISO Services
                    </Link>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <p className="font-bold mb-2">Looking for a CISO?</p>
                  <p className="text-sm text-gray-300 mb-4">Browse pre-vetted security leaders</p>
                  <Link href="/fractional-ciso-jobs-uk" className="block text-center bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-400 transition-colors text-sm">
                    View CISO Jobs
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
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Cost Calculator</h2>
          </div>
          <RoleCalculator role="ciso" />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest CISO Jobs</h2>
            <p className="text-xl text-gray-500">Find your next fractional CISO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Security"
            title="Latest Security Jobs"
            accentColor="red"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CISO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section id="resources" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Explore More</span>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>

          {/* Primary Resources - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-ciso" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-red-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-red-700 mb-2">How to Hire a Fractional CISO</h3>
              <p className="text-gray-600 text-sm">Complete hiring guide and evaluation</p>
            </Link>
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
          </div>

          {/* Secondary Resources - 5 compact links */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-200">
            <Link href="/virtual-ciso" className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-sm text-red-700 hover:border-red-400 transition-colors font-medium">
              🌐 Virtual CISO (vCISO)
            </Link>
            <Link href="/fractional-ciso-services" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-red-700 hover:border-red-300 transition-colors">
              ⚙️ CISO Services
            </Link>
            <Link href="/part-time-ciso-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-red-700 hover:border-red-300 transition-colors">
              ⏰ Part-Time CISO Jobs
            </Link>
            <Link href="/interim-ciso-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-red-700 hover:border-red-300 transition-colors">
              📅 Interim CISO Roles
            </Link>
            <Link href="/fractional-jobs-london" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-red-700 hover:border-red-300 transition-colors">
              📍 London Security Jobs
            </Link>
          </div>

          {/* External Resources */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 mt-8">External Resources for Security Leaders</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
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
                <p className="text-gray-500 text-xs">Information Commissioner&apos;s Office - GDPR guidance</p>
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

          {/* Cross-role linking */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Explore other fractional roles:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/fractional-cfo" className="text-sm text-gray-600 hover:text-red-700">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-gray-600 hover:text-red-700">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-gray-600 hover:text-red-700">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-gray-600 hover:text-red-700">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-recruitment-agency" className="text-sm text-red-700 hover:text-red-900 font-medium">Recruitment Agency</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-gray-600 hover:text-red-700">Fractional CHRO</Link>
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

      {/* Hey Companies - Founder Profile & Trust Signals */}
      <HeyCompanies location="UK" />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Browse pre-vetted security leadership candidates or post your requirements to find the perfect match.</p>
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
