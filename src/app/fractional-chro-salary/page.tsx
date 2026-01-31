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
const heroImage = getHeroImageUrl('chro', 1920, 800)
const imageCredit = getImage('chro')

export const metadata: Metadata = {
  title: 'Fractional CHRO Salary UK 2026 | Day Rates, Annual Earnings & Compensation Guide',
  description: 'Fractional CHRO salary UK: day rates £700-£1,300. Compare costs by experience, specialisation, location. Calculate potential earnings with our salary calculator.',
  keywords: 'fractional chro salary, fractional chro salary uk, fractional chro day rate, fractional chro cost, chro salary uk, part time chro salary, fractional hr director salary, chief people officer salary',
  alternates: {
    canonical: 'https://fractional.quest/fractional-chro-salary',
  },
  openGraph: {
    title: 'Fractional CHRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CHRO salary UK: Day rates £700-£1,300. Complete guide to fractional CHRO costs, earnings by experience level and location.',
    url: 'https://fractional.quest/fractional-chro-salary',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Fractional CHRO Salary UK Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CHRO Salary UK 2026 | Complete Compensation Guide',
    description: 'Fractional CHRO salary UK: Day rates £700-£1,300. Complete guide to fractional CHRO costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Fractional CHRO', href: '/fractional-chro' },
  { label: 'Salary Guide', href: '/fractional-chro-salary' },
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
  { id: 'jobs', title: 'CHRO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const authorityLinks = [
  { name: 'CIPD', url: 'https://www.cipd.org', description: 'Chartered Institute of Personnel & Development' },
  { name: 'SHRM', url: 'https://www.shrm.org', description: 'Society for Human Resource Management' },
  { name: 'HR Magazine', url: 'https://www.hrmagazine.co.uk', description: 'UK HR News & Analysis' },
  { name: 'People Management', url: 'https://www.peoplemanagement.co.uk', description: 'CIPD Publication' },
  { name: 'ONS Earnings Data', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours', description: 'Official UK earnings statistics' },
]

const faqItems: FAQItem[] = [
  { question: 'What is the average fractional CHRO salary in the UK?', answer: 'The average fractional CHRO earns around £950 per day in the UK. Working 2-3 days per week, this translates to annual earnings of £99,000-£148,000. Entry-level fractional CHROs start at £700-£850/day, while M&A/TUPE specialists command £1,100-£1,400/day.' },
  { question: 'How does fractional CHRO salary compare to full-time?', answer: 'Fractional CHROs earn higher daily rates than full-time equivalents. A full-time CHRO earning £137,000 salary works out to roughly £527/day, while fractional CHROs charge £700-£1,300/day. However, fractional CHROs must cover their own benefits, pension, and manage multiple clients.' },
  { question: 'What factors affect fractional CHRO day rates?', answer: 'Key factors include: (1) M&A/TUPE experience - due diligence and integration work commands premium, (2) Industry expertise - Tech, FinTech, and regulated industries pay more, (3) Scale experience - growing from 50 to 500+ employees, (4) Employment law expertise - complex tribunal experience valued, (5) Location - London rates 15-20% higher.' },
  { question: 'Do fractional CHROs get equity compensation?', answer: 'Some fractional CHROs receive equity grants (typically 0.1-0.5%) as part of their compensation, especially for longer engagements with startups. This is less common than for full-time CHROs who typically receive 0.25-1% equity. Equity is usually offered in exchange for a reduced day rate.' },
  { question: 'How much can I earn as a fractional CHRO working 3 clients?', answer: 'A fractional CHRO working 3 clients at 1.5 days per week each (4.5 days total) at an average rate of £950/day could earn around £222,000 annually. However, this requires excellent time management. Most fractional CHROs work with 2-3 clients simultaneously.' },
  { question: 'What is the difference between inside and outside IR35 for fractional CHROs?', answer: 'IR35 status significantly impacts take-home pay. Outside IR35, a fractional CHRO on £950/day might take home approximately £665/day after corporation tax and dividends. Inside IR35, the same rate yields around £523/day after PAYE deductions.' },
  { question: 'Are fractional CHRO rates negotiable?', answer: 'Yes, rates are negotiable based on several factors: engagement length (longer contracts may offer 5-10% discount), days per week (volume discounts for 3+ days), payment terms (upfront payment may warrant discount), and equity trade-offs. Most fractional CHROs have a minimum day rate.' },
  { question: 'How do London fractional CHRO salaries compare to other UK cities?', answer: 'London fractional CHROs typically earn 15-20% more than the UK average. London rates range from £850-£1,300/day, while Manchester and Birmingham average £700-£1,000/day. Tech hubs like Cambridge also command premium rates.' },
  { question: 'What qualifications increase fractional CHRO earning potential?', answer: 'CIPD Level 7, employment law qualifications, and relevant certifications can add credibility. More impactful is demonstrable track record: successful M&A integrations, TUPE transfers, culture transformations, and experience with tribunal cases command the highest premiums.' },
  { question: 'What industries pay the highest fractional CHRO rates?', answer: 'Private equity portfolio companies pay premium rates (£1,000-£1,400/day) for fractional CHROs with M&A integration experience. FinTech and regulated industries also pay above-average rates (£900-£1,200/day) for CHROs with compliance expertise.' },
]

export default function FractionalChroSalaryPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="Fractional CHRO Salary UK 2026 | Day Rates & Compensation Guide"
        description="Complete guide to fractional CHRO salary UK. Day rates, annual equivalents, and factors affecting compensation."
        url="https://fractional.quest/fractional-chro-salary"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={faqItems} />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`${imageAlt} - Fractional CHRO Salary UK Compensation Guide`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-violet-500/80 to-fuchsia-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Salary Guide 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                <strong>Fractional CHRO Salary</strong> UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Complete guide to <strong>fractional CHRO salary UK</strong> rates. Understand day rates, annual equivalents, and factors affecting compensation.
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
              <div className="text-3xl font-bold text-purple-400">£700-£1,300</div>
              <div className="text-sm text-gray-400">Day Rate Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">£950</div>
              <div className="text-sm text-gray-400">Average Day Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">£73k-£170k</div>
              <div className="text-sm text-gray-400">Annual Equivalent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">2-3 days</div>
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

              <h2 id="overview" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">Fractional CHRO Salary UK Overview</h2>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <strong>Fractional CHRO salary</strong> in the UK typically ranges from £700-£1,300 per day, with the average sitting around £950/day. This translates to annual earnings of £73,000-£170,000 depending on days worked per week and number of clients.
              </p>

              {/* Authority context box */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6 not-prose">
                <p className="text-sm text-gray-700">
                  <strong>UK Market Context:</strong> According to{' '}
                  <a href="https://www.salaryexpert.com/salary/job/chief-human-resources-officer/united-kingdom" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline font-medium">Salary Expert</a>{' '}
                  (Jan 2026), the average full-time CHRO salary in the UK is £137,000, making fractional CHROs at £73,000-£170,000/year a cost-effective alternative for growing businesses needing senior HR leadership.
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Working 2-3 days per week across multiple clients, fractional CHROs can achieve annual earnings of £99,000-£222,000. The most successful fractional CHROs specialise in M&A/TUPE, high-growth tech scaling, or employment tribunal expertise, commanding day rates of £1,100-£1,400.
              </p>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={tocItems} accentColor="purple" />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/fractional-chro" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                      <span>📋</span> What is a Fractional CHRO?
                    </Link>
                    <Link href="/hire-fractional-chro" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                      <span>🎯</span> How to Hire a CHRO
                    </Link>
                    <Link href="/fractional-chro-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                      <span>💼</span> CHRO Jobs UK
                    </Link>
                    <Link href="/interim-hr-director" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                      <span>⏱️</span> Interim HR Director
                    </Link>
                  </div>
                </div>

                {/* Authority Links */}
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
                  <ul className="space-y-3">
                    {authorityLinks.slice(0, 4).map((link, idx) => (
                      <li key={idx}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-2">
                          <span className="text-purple-400">→</span> {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <p className="font-bold mb-2">Find a Fractional CHRO</p>
                  <p className="text-sm text-gray-300 mb-4">Browse pre-vetted HR leaders</p>
                  <Link href="/fractional-chro-jobs-uk" className="block text-center bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-400 transition-colors text-sm">
                    View CHRO Jobs
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
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CHRO Salary by Experience Level</h2>
            <p className="text-xl text-gray-600">How experience and track record impact day rates and annual earnings.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Experience Level</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Day Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Annual (2 days/week)</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Typical Background</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Entry-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£850</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£73,000-£88,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">10-15 years HR, first fractional role</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Mid-level Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£850-£1,050</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£88,000-£109,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">15+ years, multiple engagements</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior Fractional</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£1,050-£1,200</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£109,000-£125,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">20+ years, board-level experience</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-purple-700 font-semibold">Specialist (M&A/TUPE)</td>
                  <td className="px-6 py-4 text-sm text-purple-700 font-semibold">£1,100-£1,400</td>
                  <td className="px-6 py-4 text-sm text-purple-700 font-semibold">£114,000-£145,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">M&A integration, TUPE expert</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-gray-900 mb-2">M&A Premium</h4>
            <p className="text-gray-700">CHROs with proven M&A due diligence and TUPE integration experience typically command 15-25% higher rates than peers with similar years of experience but no transaction expertise.</p>
          </div>
        </div>
      </section>

      {/* Hourly Rates */}
      <section id="hourly-rates" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Hourly</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CHRO Hourly Rates UK</h2>
            <p className="text-xl text-gray-600">For ad-hoc consultations and project-based work.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Level / Specialisation</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Hourly Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">HR Consultation</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£100-£140/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Policy reviews, ad-hoc HR advice</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Senior CHRO (20+ years)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£140-£180/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Strategic HR planning, board presentations</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Employment Law Specialist</td>
                  <td className="px-6 py-4 text-sm text-purple-700 font-semibold">£150-£220/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Tribunal prep, complex disciplinaries</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">M&A/TUPE Expert</td>
                  <td className="px-6 py-4 text-sm text-purple-700 font-semibold">£175-£250/hour</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Due diligence, transfer consultations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">When to Use Hourly Rates</h4>
            <p className="text-gray-600 text-sm">Hourly billing suits employment tribunal support, TUPE consultations, or specific HR policy reviews. For ongoing people leadership, monthly retainers typically offer better value.</p>
          </div>
        </div>
      </section>

      {/* Monthly Retainers */}
      <section id="monthly-retainers" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Retainers</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CHRO Monthly Retainer Pricing</h2>
            <p className="text-xl text-gray-600">Ongoing people leadership on a predictable budget.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-purple-600 font-bold text-sm mb-2">STARTER</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£3,000-£4,500</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 1 day per week (4 days/month)</li>
                <li>• HR strategy oversight</li>
                <li>• Policy framework guidance</li>
                <li>• Team structure advice</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Seed stage, 20-50 employees</span>
              </div>
            </div>

            <div className="bg-white p-6 border-2 border-purple-500 rounded-lg relative shadow-md">
              <div className="absolute -top-3 right-4 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">POPULAR</div>
              <div className="text-purple-600 font-bold text-sm mb-2">GROWTH</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£6,000-£9,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 2 days per week (8 days/month)</li>
                <li>• Active people leadership</li>
                <li>• Hiring process ownership</li>
                <li>• Culture development</li>
                <li>• Board-level reporting</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: Series A-B, 50-200 employees</span>
              </div>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="text-purple-600 font-bold text-sm mb-2">ENTERPRISE</div>
              <div className="text-3xl font-black text-gray-900 mb-1">£11,000-£16,000</div>
              <div className="text-gray-500 text-sm mb-4">per month</div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 3+ days per week</li>
                <li>• Full CHRO responsibilities</li>
                <li>• M&A people integration</li>
                <li>• Restructuring leadership</li>
                <li>• PE portfolio work</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500">Best for: PE-backed, M&A situations</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Cost Comparison:</strong> A fractional CHRO at £7,500/month (£90,000/year) provides senior people leadership at <strong>50-65% less</strong> than a full-time CHRO total cost of £165,000-£250,000 (salary + benefits + equity + recruitment). Source:{' '}
              <a href="https://www.salaryexpert.com/salary/job/chief-human-resources-officer/united-kingdom" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">Salary Expert</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Salary by Location */}
      <section id="location" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Location</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CHRO Salary by Location</h2>
            <p className="text-xl text-gray-600">Regional variations in fractional CHRO day rates across the UK.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-purple-600 text-white">
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
                  <td className="px-6 py-4 text-sm text-gray-600">£850-£1,300</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-semibold">+15-20%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">PE-backed, tech scale-ups</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Manchester</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£1,000</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Growing tech scene, media</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Birmingham</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£700-£950</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Baseline</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Professional services, retail</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Cambridge</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£800-£1,100</td>
                  <td className="px-6 py-4 text-sm text-green-600">+10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Biotech, tech spinouts</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Edinburgh</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£750-£1,050</td>
                  <td className="px-6 py-4 text-sm text-green-600">+5%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">FinTech, professional services</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Remote UK</td>
                  <td className="px-6 py-4 text-sm text-gray-600">£650-£900</td>
                  <td className="px-6 py-4 text-sm text-red-600">-5-10%</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Competitive rates for hybrid</td>
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
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional CHRO Salary by Specialisation</h2>
            <p className="text-xl text-gray-600">How HR expertise and domain specialisation impact earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            {[
              { title: 'M&A/TUPE CHRO', desc: 'Due diligence, integration, transfers', rate: '£1,100-£1,400/day', demand: 'Very High' },
              { title: 'Tech Scale-up CHRO', desc: 'Rapid hiring, employer brand, culture', rate: '£950-£1,200/day', demand: 'High' },
              { title: 'Restructuring CHRO', desc: 'Redundancy, consultation, outplacement', rate: '£1,000-£1,300/day', demand: 'High' },
              { title: 'FinTech/Regulated CHRO', desc: 'Compliance, SMCR, fitness & propriety', rate: '£900-£1,150/day', demand: 'Growing' },
              { title: 'Culture & Transformation', desc: 'Change management, engagement', rate: '£850-£1,100/day', demand: 'Steady' },
              { title: 'International HR', desc: 'Multi-country payroll, global mobility', rate: '£900-£1,200/day', demand: 'Growing' },
            ].map((type, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{type.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700 font-semibold">{type.rate}</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{type.demand} Demand</span>
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
            <h2 className="text-3xl font-black text-gray-900 mb-4">Fractional vs Interim vs Full-Time CHRO</h2>
            <p className="text-xl text-gray-600">Understanding the salary and engagement differences.</p>
          </div>

          <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-purple-700">Fractional CHRO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-indigo-700">Interim CHRO</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CHRO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                  <td className="px-4 py-4 text-sm text-purple-700 font-semibold">£700-£1,300</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£900-£1,400</td>
                  <td className="px-4 py-4 text-sm text-gray-600">N/A (salaried)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Monthly Cost</td>
                  <td className="px-4 py-4 text-sm text-purple-700 font-semibold">£3,000-£16,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£16,000-£25,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£9,000-£15,000+</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                  <td className="px-4 py-4 text-sm text-purple-700 font-semibold">£36,000-£192,000</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£64,000-£100,000 (4-6mo)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">£165,000-£275,000+</td>
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
                  <td className="px-4 py-4 text-sm text-gray-600">0-0.5% (rare)</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0% typically</td>
                  <td className="px-4 py-4 text-sm text-gray-600">0.25-1% typical</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-4 text-sm text-purple-800 font-medium">SMEs, scale-ups, startups</td>
                  <td className="px-4 py-4 text-sm text-indigo-800 font-medium">Crisis, M&A, restructuring</td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium">£50M+ enterprises</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-6">
            <p className="text-sm text-gray-700">
              <strong>Savings Summary:</strong> A fractional CHRO at 2 days/week costs £73,000-£125,000/year vs £165,000-£275,000+ for a full-time CHRO (including salary, NI, pension, benefits, equity, and recruitment fees). That&apos;s <strong>50-65% savings</strong> while maintaining senior people leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Factors Affecting Salary */}
      <section id="factors" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-3 block">Factors</span>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Factors Affecting Fractional CHRO Salary</h2>
            <p className="text-xl text-gray-600">Key variables that determine your earning potential as a fractional CHRO.</p>
          </div>

          <div className="space-y-6">
            {[
              { factor: 'M&A/TUPE Experience', impact: '+15-25%', desc: 'Due diligence, integration, and transfer expertise significantly increases rates' },
              { factor: 'Industry Expertise', impact: '+10-15%', desc: 'Tech, FinTech, and regulated industries require specialised HR knowledge' },
              { factor: 'Scale Experience', impact: '+10-20%', desc: 'Proven track record scaling from 50 to 500+ employees commands premium' },
              { factor: 'Employment Law', impact: '+10-15%', desc: 'Complex tribunal experience and UK employment law expertise valued' },
              { factor: 'Culture Transformation', impact: '+5-10%', desc: 'Demonstrable culture change and engagement improvement experience' },
              { factor: 'Engagement Length', impact: '-5-10%', desc: 'Longer contracts (12+ months) may warrant volume discounts' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex-shrink-0 w-24 text-center">
                  <span className={`text-lg font-bold ${item.impact.startsWith('+') ? 'text-green-600' : 'text-purple-600'}`}>
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
            <p className="text-xl text-gray-600">Key qualifications that impact fractional CHRO earning potential.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 my-8">
            <a href="https://www.cipd.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700">CIPD Level 7</h4>
                  <p className="text-sm text-gray-600">Chartered Fellow CIPD</p>
                  <p className="text-xs text-purple-600 mt-1">+5-10% rate premium</p>
                </div>
              </div>
            </a>
            <a href="https://www.shrm.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700">SHRM-SCP</h4>
                  <p className="text-sm text-gray-600">Senior Certified Professional</p>
                  <p className="text-xs text-purple-600 mt-1">International credibility</p>
                </div>
              </div>
            </a>
            <a href="https://www.cilex.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚖️</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700">Employment Law Qual</h4>
                  <p className="text-sm text-gray-600">CILEX or equivalent</p>
                  <p className="text-xs text-purple-600 mt-1">+10-15% for tribunal work</p>
                </div>
              </div>
            </a>
            <a href="https://www.peoplemanagement.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-purple-700">People Management</h4>
                  <p className="text-sm text-gray-600">CIPD Publication Network</p>
                  <p className="text-xs text-gray-500 mt-1">Industry credibility</p>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">Track Record Matters More</h4>
            <p className="text-gray-600 text-sm">While certifications add credibility, demonstrable results matter more. CHROs with proven M&A integrations, successful TUPE transfers, or culture transformations command 15-25% premiums regardless of formal qualifications.</p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional CHRO Salary Calculator
            </h2>
            <p className="text-gray-600 mt-2">Calculate your potential earnings as a fractional CHRO</p>
          </div>
          <RoleCalculator role="chro" />
        </div>
      </section>

      {/* IR35 Section */}
      <section id="ir35" className="py-16 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              IR35 Impact on Fractional CHRO Salary
            </h2>
            <p className="text-gray-600 mt-2">Calculate your take-home pay based on IR35 status</p>
          </div>
          <IR35Calculator defaultDayRate={950} />
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest CHRO Jobs</h2>
            <p className="text-xl text-gray-500">Find your next fractional CHRO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="HR"
            title="Latest CHRO Jobs"
            accentColor="purple"
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
            <p className="text-xl text-gray-600">Common questions about fractional CHRO salary and compensation.</p>
          </div>
          <FAQ items={faqItems} title="" skipSchema={true} />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Related Resources</h2>
            <p className="text-gray-600">Explore more fractional CHRO guides and resources</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">CHRO Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-chro" className="text-gray-600 hover:text-purple-700 transition-colors">What is a Fractional CHRO?</Link></li>
                <li><Link href="/hire-fractional-chro" className="text-gray-600 hover:text-purple-700 transition-colors">How to Hire a Fractional CHRO</Link></li>
                <li><Link href="/fractional-chro-jobs-uk" className="text-gray-600 hover:text-purple-700 transition-colors">CHRO Jobs UK</Link></li>
                <li><Link href="/interim-hr-director" className="text-gray-600 hover:text-purple-700 transition-colors">Interim HR Director</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Other Salary Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/fractional-cfo-salary" className="text-gray-600 hover:text-purple-700 transition-colors">Fractional CFO Salary</Link></li>
                <li><Link href="/fractional-cmo-salary" className="text-gray-600 hover:text-purple-700 transition-colors">Fractional CMO Salary</Link></li>
                <li><Link href="/fractional-cto-salary" className="text-gray-600 hover:text-purple-700 transition-colors">Fractional CTO Salary</Link></li>
                <li><Link href="/fractional-ceo-salary" className="text-gray-600 hover:text-purple-700 transition-colors">Fractional CEO Salary</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Industry Resources</h3>
              <ul className="space-y-2">
                {authorityLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-700 transition-colors flex items-center gap-1">
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
            Find Fractional CHRO Opportunities
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse UK fractional CHRO roles and compare compensation packages.
          </p>
          <Link
            href="/fractional-chro-jobs-uk"
            className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-colors inline-block"
          >
            Browse CHRO Jobs
          </Link>
        </div>
      </section>

      <RoleContentHub currentRole="chro" />
    </div>
  )
}
