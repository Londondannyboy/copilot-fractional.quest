import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema, FAQPageSchema, FAQ, FAQItem } from '@/components/seo'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleContentHub } from '@/components/RoleContentHub'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('salary')
const imageAlt = getImage('salary').alt
const heroImage = getHeroImageUrl('ceo', 1920, 800)
const imageCredit = getImage('ceo')

export const metadata: Metadata = {
  title: 'Fractional CEO Salary UK 2026 | Day Rates, Annual Earnings & Compensation Guide',
  description: 'Fractional CEO salary UK: day rates £1,000-£2,000. Compare costs by experience, specialisation, location. Calculate potential earnings with our salary calculator.',
  keywords: 'fractional ceo salary, fractional ceo salary uk, fractional ceo day rate, fractional ceo cost, ceo salary uk, part time ceo salary, interim ceo salary uk, fractional chief executive salary',
  alternates: {
    canonical: 'https://fractional.quest/fractional-ceo-salary',
  },
  openGraph: {
    title: 'Fractional CEO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CEO salary UK: Day rates £1,000-£2,000. Complete guide to fractional CEO costs, earnings by experience level and location.',
    url: 'https://fractional.quest/fractional-ceo-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CEO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CEO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CEO salary UK: Day rates £1,000-£2,000. Complete guide to fractional CEO costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CEO', href: '/fractional-ceo' },
  { label: 'Salary Guide', href: '/fractional-ceo-salary' },
]

const tocItems = [
  { id: 'overview', title: 'Salary Overview' },
  { id: 'experience-level', title: 'Salary by Experience Level' },
  { id: 'hourly-rates', title: 'Hourly Rates' },
  { id: 'monthly-retainers', title: 'Monthly Retainers' },
  { id: 'location', title: 'Salary by Location' },
  { id: 'specialisation', title: 'Salary by Specialisation' },
  { id: 'comparison', title: 'Fractional vs Interim vs Full-Time' },
  { id: 'factors', title: 'Factors Affecting Salary' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'calculator', title: 'Salary Calculator' },
  { id: 'ir35', title: 'IR35 Impact' },
  { id: 'jobs', title: 'CEO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const authorityLinks = [
  { name: 'IoD', url: 'https://www.iod.com', description: 'Institute of Directors' },
  { name: 'CMI', url: 'https://www.managers.org.uk', description: 'Chartered Management Institute' },
  { name: 'ICSA', url: 'https://www.icsa.org.uk', description: 'The Governance Institute' },
  { name: 'BVCA', url: 'https://www.bvca.co.uk', description: 'British Venture Capital Association' },
  { name: 'ONS Earnings Data', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', description: 'Official UK earnings statistics' },
]

const faqItems: FAQItem[] = [
  { question: 'What is the average fractional CEO salary in the UK?', answer: 'The average fractional CEO earns around £1,500 per day in the UK. Working 2-3 days per week, this translates to annual earnings of £156,000-£234,000. Entry-level fractional CEOs start at £1,000-£1,300/day, while PE operating partners command £1,800-£2,500/day.' },
  { question: 'How does fractional CEO salary compare to full-time?', answer: 'Fractional CEOs earn higher daily rates than full-time equivalents. A full-time CEO earning £250,000 salary works out to roughly £962/day, while fractional CEOs charge £1,000-£2,000/day. However, full-time CEOs typically receive 2-5% equity worth £100,000-£500,000+, making total compensation significantly higher.' },
  { question: 'What factors affect fractional CEO day rates?', answer: 'Key factors include: (1) Exit experience - successful exits add 20-30% to rates, (2) PE/VC background - operating partner experience commands premium, (3) Company stage - Series C+ and pre-IPO pay more, (4) Sector expertise - FinTech, HealthTech specialists earn more, (5) Board experience - public company directorships add value, (6) Turnaround track record - crisis CEOs command premium.' },
  { question: 'Do fractional CEOs get equity compensation?', answer: 'Some fractional CEOs receive equity grants (typically 0.5-1.5%) as part of their compensation, especially for longer engagements or turnaround situations. This is less than full-time CEOs who typically receive 2-5% equity. Equity is usually offered in exchange for a reduced day rate or as a success bonus.' },
  { question: 'How much can I earn as a fractional CEO working 3 clients?', answer: 'A fractional CEO working 3 clients at 1.5 days per week each (4.5 days total) at an average rate of £1,500/day could earn around £351,000 annually. However, CEO roles are demanding, and most fractional CEOs work with just 2 companies simultaneously to maintain effectiveness.' },
  { question: 'What is the difference between inside and outside IR35 for fractional CEOs?', answer: 'IR35 status significantly impacts take-home pay. Outside IR35, a fractional CEO on £1,500/day might take home approximately £1,050/day after corporation tax and dividends. Inside IR35, the same rate yields around £825/day after PAYE deductions. Many fractional CEOs factor IR35 status into their rate negotiations.' },
  { question: 'Are fractional CEO rates negotiable?', answer: 'Yes, rates are negotiable based on several factors: engagement length (longer contracts may offer discount), equity component (reduced cash for equity), company stage (earlier stage may pay less but offer more equity), and strategic importance (turnaround or exit situations command premium).' },
  { question: 'How do London fractional CEO salaries compare to other UK cities?', answer: 'London fractional CEOs typically earn 15-25% more than the UK average. London rates range from £1,200-£2,200/day, while Manchester and Birmingham average £1,000-£1,600/day. PE-backed portfolio companies often pay London rates regardless of location.' },
  { question: 'What qualifications increase fractional CEO earning potential?', answer: 'IoD Certificate in Company Direction, CMI Chartered Manager status, and relevant industry certifications can add credibility. More impactful is demonstrable track record: successful exits, scale-up experience (£1M→£50M revenue), and PE/VC operating partner background command the highest premiums.' },
  { question: 'What industries pay the highest fractional CEO rates?', answer: 'Private equity portfolio companies pay the highest rates (£1,800-£2,500/day) for fractional CEOs with operational improvement experience. FinTech and HealthTech also pay premium rates (£1,500-£2,000/day) for CEOs with regulatory and scale-up expertise.' },
]

export default function FractionalCeoSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CEO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional CEO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-ceo-salary"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${imageAlt} - Fractional CEO Salary UK Compensation Guide`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 via-amber-500/80 to-orange-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CEO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CEO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.
              </p>
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
            <div>
              <div className="text-3xl font-bold text-yellow-400">£1,000-£2,000</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">£1,500</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">£100k-£250k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">2-3 days</div>
              <div className="text-sm text-gray-400">Typical Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsMobile items={tocItems} />
      </div>

      {/* Main Content with Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Column */}
            <article className="prose prose-lg prose-gray max-w-none">

              <h2 id="overview" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">Fractional CEO Salary UK Overview</h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <strong>Fractional CEO salary</strong> in the UK typically ranges from £1,000-£2,000 per day, with the average sitting around £1,500/day. This translates to annual earnings of £100,000-£250,000 depending on days worked per week and portfolio size. Fractional CEOs command the highest rates in the fractional executive market.
              </p>

              {/* Authority context box */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 not-prose">
                <p className="text-sm text-gray-700">
                  <strong>UK Market Context:</strong> According to{' '}
                  <a href="https://www.florido.co.uk/the-pulse/leadership-cost-comparison-2026" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline font-medium">Florido</a>{' '}
                  (Jan 2026), with NIC increases and fiscal drag, the true cost of a permanent £100k+ executive is 30-40% higher than base salary. Using fractional leaders allows access to senior expertise at a fraction of the cost.
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Working 2-3 days per week across 2 portfolio companies, fractional CEOs can achieve annual earnings of £156,000-£350,000. The most successful fractional CEOs have PE/VC operating partner backgrounds or successful exit experience, commanding day rates of £1,800-£2,500.
              </p>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} accentColor="yellow" />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/fractional-ceo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors">
                      <span>📋</span> What is a Fractional CEO?
                    </Link>
                    <Link href="/hire-fractional-ceo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors">
                      <span>🎯</span> How to Hire a CEO
                    </Link>
                    <Link href="/fractional-ceo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors">
                      <span>💼</span> CEO Jobs UK
                    </Link>
                    <Link href="/interim-ceo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-700 transition-colors">
                      <span>⏱️</span> Interim CEO Jobs
                    </Link>
                  </div>
                </div>

                {/* Authority Links */}
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
                          <span className="text-yellow-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <p className="font-bold mb-2">Find a Fractional CEO</p>
                  <p className="text-sm text-gray-300 mb-4">Browse pre-vetted executive leaders</p>
                  <Link href="/fractional-ceo-jobs-uk" className="block text-center bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors text-sm">
                    View CEO Jobs
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Salary by Experience Level */}
      <section id="experience-level" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Experience</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CEO Salary by Experience Level</h2>
            <p className="text-xl text-gray-600">How experience and track record impact day rates and annual earnings.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Experience Level</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Annual (2 days/week)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Typical Background</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">First-time Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,300</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£104,000-£135,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Former MD/CEO, first fractional role</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Experienced Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,300-£1,600</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£135,000-£166,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2-3 fractional engagements completed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,600-£2,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£166,000-£208,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Multiple exits, board experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-yellow-700 font-semibold">PE Operating Partner</td>
                  <td className="px-6 py-4 text-sm text-yellow-700 font-semibold">£1,800-£2,500</td>
                  <td className="px-6 py-4 text-sm text-yellow-700 font-semibold">£187,000-£260,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE/VC background, portfolio CEO</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-gray-900 mb-2">Exit Premium</h4>
            <p className="text-gray-700">CEOs with successful exit experience (trade sale, IPO, PE buyout) typically command 20-30% higher rates than peers with similar years of experience but no exit track record.</p>
          </div>
        </div>
      </section>

      {/* Hourly Rates */}
      <section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CEO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For strategic consultations and advisory work.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Strategic Consultation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£175-£250/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Board presentations, strategic decisions</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CEO (Exits)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£250-£350/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">M&A prep, investor relations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Turnaround Specialist</td>
                  <td className="px-6 py-4 text-sm text-yellow-700 font-semibold">£275-£400/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Crisis management, restructuring</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">PE Operating Partner</td>
                  <td className="px-6 py-4 text-sm text-yellow-700 font-semibold">£300-£450/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Value creation, portfolio oversight</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When to Use Hourly Rates</h4>
            <p className="text-gray-600 text-sm">Hourly billing suits board advisory, investor introductions, or strategic planning sessions. For ongoing executive leadership, monthly retainers offer better value and commitment.</p>
          </div>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section id="monthly-retainers" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CEO Monthly Retainer Pricing</h2>
            <p className="text-xl text-gray-600">Ongoing executive leadership on a predictable budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-yellow-600 font-bold text-sm mb-2">ADVISORY</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£5,000-£8,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1 day per week (4 days/month)</li>
                <li>• Strategic guidance</li>
                <li>• Board meeting attendance</li>
                <li>• Key stakeholder relationships</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Founder-led with experienced team</span>
              </div>
            </div>

            <div className="bg-white p-6 border-2 border-yellow-500 rounded-lg relative shadow-md">
              <div className="absolute -top-3 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <div className="text-yellow-600 font-bold text-sm mb-2">LEADERSHIP</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£10,000-£16,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2 days per week (8 days/month)</li>
                <li>• Active executive leadership</li>
                <li>• Investor/board relations</li>
                <li>• Executive team management</li>
                <li>• Strategic initiatives</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Scale-ups, transition periods</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-yellow-600 font-bold text-sm mb-2">EXECUTIVE</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£18,000-£28,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3+ days per week</li>
                <li>• Full CEO responsibilities</li>
                <li>• Exit preparation</li>
                <li>• Turnaround leadership</li>
                <li>• PE portfolio oversight</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: PE-backed, M&A situations</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Cost Comparison:</strong> A fractional CEO at £12,000/month (£144,000/year) provides executive leadership at <strong>60-75% less</strong> than a full-time CEO total cost of £350,000-£600,000+ (salary + benefits + equity + recruitment). Source:{' '}
              <a href="https://www.florido.co.uk/the-pulse/leadership-cost-comparison-2026" target="_blank" rel="noopener noreferrer" className="text-yellow-700 hover:underline">Florido</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Salary by Location */}
      <section id="location" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Location</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CEO Salary by Location</h2>
            <p className="text-xl text-gray-600">Regional variations in fractional CEO day rates across the UK.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Premium vs UK Avg</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">London</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,200-£2,200</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">+15-25%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE/VC backed, public company experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,600</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Growing tech scene, media</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,500</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Manufacturing, professional services</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Cambridge</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,200-£1,800</td>
                  <td className="px-6 py-4 text-sm text-green-600">+10-15%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Biotech, deeptech, spinouts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Edinburgh</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,100-£1,700</td>
                  <td className="px-6 py-4 text-sm text-green-600">+5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">FinTech, asset management</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,400</td>
                  <td className="px-6 py-4 text-sm text-red-600">-5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE portfolios often pay London rates</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Salary by Specialisation */}
      <section id="specialisation" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Specialisation</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CEO Salary by Specialisation</h2>
            <p className="text-xl text-gray-600">How sector expertise and leadership style impact earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              { title: 'PE Portfolio CEO', desc: 'Value creation, operational improvement', rate: '£1,800-£2,500/day', demand: 'Very High' },
              { title: 'Turnaround CEO', desc: 'Crisis management, restructuring', rate: '£1,600-£2,200/day', demand: 'High' },
              { title: 'Scale-up CEO', desc: 'Series A-C growth, team building', rate: '£1,300-£1,800/day', demand: 'High' },
              { title: 'Exit CEO', desc: 'M&A preparation, sale processes', rate: '£1,500-£2,000/day', demand: 'High' },
              { title: 'FinTech CEO', desc: 'Regulatory, scale-up, fundraising', rate: '£1,400-£1,900/day', demand: 'Growing' },
              { title: 'HealthTech CEO', desc: 'Clinical, regulatory, NHS partnerships', rate: '£1,300-£1,800/day', demand: 'Growing' },
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-700 font-semibold">{type.rate}</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">{type.demand} Demand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Way Comparison Table */}
      <section id="comparison" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Comparison</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time CEO</h2>
            <p className="text-xl text-gray-600">Understanding the salary and engagement differences.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-yellow-700">Fractional CEO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-indigo-700">Interim CEO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                  <td className="px-4 py-4 text-sm text-yellow-700 font-semibold">£1,000-£2,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£1,500-£2,500</td>
                  <td className="px-4 py-4 text-sm text-gray-600">N/A (salaried)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-yellow-700 font-semibold">£5,000-£28,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£27,000-£45,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£18,000-£35,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-yellow-700 font-semibold">£60,000-£336,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£108,000-£180,000 (4-6mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£350,000-£800,000+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Commitment</td>
                  <td className="px-4 py-4 text-sm text-gray-600">1-3 days/week</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (temp)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Full-time (perm)</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Duration</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Ongoing (6+ months)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">3-12 months typical</td>
                  <td className="px-4 py-4 text-sm text-gray-600">Permanent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Equity</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0-1.5% (rare)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0% typically</td>
                  <td className="px-4 py-4 text-sm text-gray-600">2-5% typical</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-yellow-800 font-medium">Scale-ups, founder support</td>
                  <td className="px-4 py-4 text-sm text-indigo-800 font-medium">Crisis, turnaround, vacancy</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">£50M+ enterprises</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Savings Summary:</strong> A fractional CEO at 2 days/week costs £104,000-£208,000/year vs £350,000-£800,000+ for a full-time CEO (including salary, NI, pension, benefits, equity, and recruitment fees). That&apos;s <strong>60-75% savings</strong> while maintaining senior executive leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Factors Affecting Salary */}
      <section id="factors" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Factors</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Factors Affecting Fractional CEO Salary</h2>
            <p className="text-xl text-gray-600">Key variables that determine your earning potential as a fractional CEO.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'Exit Experience', impact: '+20-30%', desc: 'Successful trade sales, IPOs, or PE exits significantly increase rates' },
              { factor: 'PE/VC Background', impact: '+15-25%', desc: 'Operating partner or portfolio CEO experience commands premium' },
              { factor: 'Sector Expertise', impact: '+10-20%', desc: 'Deep FinTech, HealthTech, or SaaS experience adds value' },
              { factor: 'Turnaround Track Record', impact: '+15-20%', desc: 'Proven crisis management and restructuring experience' },
              { factor: 'Public Board Experience', impact: '+10-15%', desc: 'Listed company directorship adds governance credibility' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className={`text-lg font-bold ${item.impact.startsWith('+') ? 'text-green-600' : 'text-yellow-600'}`}>
                    {item.impact}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.factor}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section id="qualifications" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Qualifications</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Professional Bodies & Certifications</h2>
            <p className="text-xl text-gray-600">Key qualifications that impact fractional CEO earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-yellow-700">IoD Chartered Director</h4>
                  <p className="text-sm text-gray-600">Institute of Directors</p>
                  <p className="text-xs text-yellow-600 mt-1">+5-10% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.managers.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-yellow-700">CMI Chartered Manager</h4>
                  <p className="text-sm text-gray-600">Chartered Management Institute</p>
                  <p className="text-xs text-yellow-600 mt-1">Credibility enhancement</p>
                </div>
              </div>
            </a>
            <a href="https://www.icsa.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-yellow-700">ICSA Governance</h4>
                  <p className="text-sm text-gray-600">The Governance Institute</p>
                  <p className="text-xs text-yellow-600 mt-1">Board-level credibility</p>
                </div>
              </div>
            </a>
            <a href="https://www.bvca.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-yellow-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-yellow-700">BVCA Network</h4>
                  <p className="text-sm text-gray-600">British VC/PE Association</p>
                  <p className="text-xs text-gray-500 mt-1">PE deal flow & credibility</p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Track Record Matters Most</h4>
            <p className="text-gray-600 text-sm">While certifications add credibility, demonstrable results matter more for CEOs. Those with proven exits, successful scale-ups, or PE operating experience command 20-30% premiums regardless of formal qualifications.</p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional CEO Salary Calculator
            </h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CEO</p>
          </div>
          <RoleCalculator role="ceo" />
        </div>
      </section>

      {/* IR35 Section */}
      <section id="ir35" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              IR35 Impact on Fractional CEO Salary
            </h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={1500} />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest CEO Jobs</h2>
            <p className="text-xl text-gray-500">Find your next fractional CEO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Executive"
            title="Latest CEO Jobs"
            accentColor="yellow"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">FAQ</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about fractional CEO salary and compensation.</p>
          </div>
          <FAQ items={faqItems} title="" skipSchema={true} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
            <p className="text-gray-600">Explore more fractional CEO guides and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CEO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-ceo" className="text-gray-600 hover:text-yellow-700 transition-colors">What is a Fractional CEO?</Link></li>
                <li><Link href="/hire-fractional-ceo" className="text-gray-600 hover:text-yellow-700 transition-colors">How to Hire a Fractional CEO</Link></li>
                <li><Link href="/fractional-ceo-jobs-uk" className="text-gray-600 hover:text-yellow-700 transition-colors">CEO Jobs UK</Link></li>
                <li><Link href="/interim-ceo-jobs-uk" className="text-gray-600 hover:text-yellow-700 transition-colors">Interim CEO Jobs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Salary Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-yellow-700 transition-colors">Fractional CFO Salary</Link></li>
                <li><Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-yellow-700 transition-colors">Fractional CMO Salary</Link></li>
                <li><Link href="/fractional-cto-salary" className="text-gray-600 hover:text-yellow-700 transition-colors">Fractional CTO Salary</Link></li>
                <li><Link href="/fractional-coo-salary" className="text-gray-600 hover:text-yellow-700 transition-colors">Fractional COO Salary</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-2">
                {authorityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-yellow-700 transition-colors flex items-center gap-1">
                      {link.name} <span className="text-gray-400 text-xs">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Find Fractional CEO Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional CEO roles and compare compensation packages.
          </p>
          <Link
            href="/fractional-ceo-jobs-uk"
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors inline-block"
          >
            Browse CEO Jobs
          </Link>
        </div>
      </section>

      <RoleContentHub currentRole="ceo" />
    </div>
  )
}
