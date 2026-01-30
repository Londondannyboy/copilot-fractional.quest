import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CMO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { getOGImageUrl, getImage } from '@/lib/images'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'

// Table of Contents items
const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Part-Time vs Full-Time' },
  { id: 'when-needed', title: 'When You Need One' },
  { id: 'cost-pricing', title: 'Cost & Pricing UK' },
  { id: 'qualifications', title: 'Qualifications' },
  { id: 'uk-market', title: 'UK Market Overview' },
  { id: 'how-to-hire', title: 'How to Hire' },
  { id: 'resources', title: 'External Resources' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'jobs', title: 'CMO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const ogImage = getOGImageUrl('cmo')
const imageAlt = getImage('cmo').alt
const imageCredit = getImage('cmo')

export const metadata: Metadata = {
  title: 'What is a Fractional CMO? | Guide',
  description: 'What is a fractional CMO? A part-time marketing leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cmo, fractional cmo meaning, fractional cmo definition, part time cmo, fractional marketing officer, fractional chief marketing officer, what does a fractional cmo do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cmo',
  },
  openGraph: {
    title: 'What is a Fractional CMO? | Complete Guide',
    description: 'Understand fractional CMO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Marketing Officer.',
    url: 'https://fractional.quest/fractional-cmo',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CMO? | Complete Guide',
    description: 'Understand fractional CMO meaning, responsibilities, and costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CMO', href: '/fractional-cmo' },
]

export default function FractionalCmoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CMO? | Part-Time Chief Marketing Officer Guide"
        description="Complete guide to fractional CMO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Marketing Officer does."
        url="https://fractional.quest/fractional-cmo"
        dateModified={new Date('2026-01-07')}
      />
      <FAQPageSchema faqs={CMO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-cmo-jobs-uk-desktop.webp"
          alt={`What is a Fractional CMO - ${imageAlt}`}
          title="Fractional CMO - Part-Time Marketing Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-orange-500/80 to-pink-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                What is a <strong>Fractional CMO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CMO</strong> is a part-time Chief Marketing Officer who provides strategic marketing leadership to companies on a flexible basis. Learn about <strong>fractional CMO meaning</strong>, responsibilities, and costs.
              </p>
            </div>
          </div>
        </div>
        {/* Photo Credit */}
        <div className="absolute bottom-2 right-2 z-10">
          <a href={imageCredit.creditUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/50 hover:text-white/70 transition-colors">
            Photo: {imageCredit.credit}
          </a>
        </div>
      </section>

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-4">Fractional CMO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CMO</strong> (Fractional Chief Marketing Officer) is an experienced marketing executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic marketing leadership without the cost of a full-time hire.
            </p>
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

            {/* What is a Fractional CMO */}
            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CMO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CMO meaning</strong> centres on flexible, senior-level marketing leadership. Unlike traditional full-time CMOs earning £150,000-£250,000 annually, a <strong>fractional Chief Marketing Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            {/* Authority context box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> As the <a href="https://www.bbc.co.uk/news/articles/c5yv6n536vno" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-medium">BBC reports on the evolving UK job market (Jan 2026)</a>, companies are increasingly embracing flexible executive arrangements. Fractional CMOs represent a key part of this shift, part of the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">fractional work</a> trend transforming executive recruitment.
              </p>
            </div>

            <p>
              This model emerged from the startup and scale-up ecosystem where companies need CMO-level expertise but cannot justify or afford a full-time executive. The <strong>fractional CMO</strong> brings the same strategic thinking, leadership skills, and marketing expertise as a full-time CMO, but on a fractional basis.
            </p>

            {/* Video */}
            <div className="my-10 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Does a Fractional CMO Do?</h3>
              <LazyYouTube
                videoId="L8vLq6nqQdM"
                title="What is a Fractional CMO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Video: Understanding the fractional CMO role and responsibilities</p>
            </div>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional CMO</strong> performs the same functions as a full-time Chief Marketing Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Marketing Strategy', desc: 'Developing comprehensive marketing strategies aligned with business goals', icon: '🎯' },
                { title: 'Team Leadership', desc: 'Building, mentoring, and managing internal marketing teams and agencies', icon: '👥' },
                { title: 'Brand Development', desc: 'Defining brand positioning, messaging, and go-to-market strategies', icon: '💎' },
                { title: 'Demand Generation', desc: 'Creating and optimising lead generation and pipeline acceleration programs', icon: '📈' },
                { title: 'Budget Management', desc: 'Allocating marketing budgets and maximising ROI across channels', icon: '💰' },
                { title: 'Board Reporting', desc: 'Presenting marketing metrics and strategies to leadership and investors', icon: '📊' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 id="comparison" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Part-Time vs Full-Time: How They Compare</h2>

            <p>
              Understanding the difference between a <strong>fractional CMO</strong> and full-time CMO helps companies make the right hiring decision:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CMO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CMO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£40,000-£100,000</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£150,000-£250,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                    <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                    <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Experience Breadth</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Multiple companies, diverse insights</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Single company focus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Fixed commitment</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Hiring Speed</td>
                    <td className="px-6 py-4 text-sm text-gray-600">2-4 weeks</td>
                    <td className="px-6 py-4 text-sm text-gray-600">3-6 months</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Startups, SMEs, specific projects</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Large enterprises, complex orgs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <p>
              Companies typically hire a <strong>fractional CMO</strong> in these situations:
            </p>

            <ul className="space-y-3">
              <li><strong>Post-funding:</strong> After raising seed or Series A and needing to build marketing function</li>
              <li><strong>Growth plateau:</strong> When existing marketing efforts have stalled and need strategic direction</li>
              <li><strong>Team gap:</strong> After losing a marketing leader and needing interim expertise</li>
              <li><strong>Scale preparation:</strong> Before hiring a full-time CMO to establish processes and strategy</li>
              <li><strong>Budget constraints:</strong> When full-time CMO salary is beyond current financial means</li>
              <li><strong>Specialised projects:</strong> For specific initiatives like rebranding, market expansion, or GTM</li>
            </ul>

            <div className="bg-amber-50 p-6 border border-amber-200 rounded-lg my-8 not-prose">
              <p className="text-amber-800 font-medium mb-3">Ready to hire a fractional CMO?</p>
              <Link href="/hire-fractional-cmo" className="inline-flex items-center text-amber-700 font-bold hover:text-amber-900">
                Complete Guide: How to Hire a Fractional CMO →
              </Link>
            </div>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <p>
              <strong>Fractional CMO</strong> costs in the UK typically range from £700-£1,400 per day, depending on experience and specialisation. Most engagements are structured as:
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £3,000-£5,600/month (£36,000-£67,000/year)</li>
                <li><strong>2 days/week:</strong> £6,000-£11,200/month (£72,000-£134,000/year)</li>
                <li><strong>3 days/week:</strong> £9,000-£16,800/month (£108,000-£201,600/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CMO total cost: £180,000-£300,000+ (salary + benefits + equity)</p>
            </div>

            <h2 id="how-to-hire" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">How to Find a Fractional CMO</h2>

            <p>
              Finding the right <strong>fractional CMO</strong> requires knowing where to look:
            </p>

            <ul className="space-y-3">
              <li><strong>Fractional job boards:</strong> Platforms like <Link href="/fractional-cmo-jobs-uk" className="text-amber-700 hover:underline">Fractional.Quest</Link> with pre-vetted candidates</li>
              <li><strong>LinkedIn:</strong> Search "#FractionalCMO" or "#PortfolioCMO" for active practitioners</li>
              <li><strong>Referrals:</strong> Ask your investors, advisors, or founder network</li>
              <li><strong>Agencies:</strong> Fractional executive networks and marketplaces</li>
              <li><strong>Communities:</strong> Marketing Slack groups, Pavilion, and industry associations</li>
            </ul>

            <h2 id="uk-market" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Fractional CMO vs Marketing Consultant</h2>

            <p>
              While sometimes confused, there are key differences between a <strong>fractional CMO</strong> and a marketing consultant:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-3">Fractional CMO</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Embedded in the leadership team</li>
                  <li>• Ongoing strategic responsibility</li>
                  <li>• Manages team and agencies</li>
                  <li>• Accountable for results</li>
                  <li>• Part of company culture</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">Marketing Consultant</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• External advisory role</li>
                  <li>• Project-based scope</li>
                  <li>• Provides recommendations</li>
                  <li>• Limited execution involvement</li>
                  <li>• Less day-to-day presence</li>
                </ul>
              </div>
            </div>

            {/* Second Video */}
            <div className="my-10 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Fractional CMO vs Marketing Consultant</h3>
              <LazyYouTube
                videoId="R8xXiQA7F5o"
                title="Fractional CMO vs Marketing Consultant"
              />
              <p className="text-gray-500 text-sm mt-3">Video: Understanding the differences between fractional CMO and consultant roles</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Benefits of Hiring a Fractional CMO</h2>

            <ul className="space-y-3">
              <li><strong>Cost-effective:</strong> Access CMO expertise at 30-50% of full-time cost</li>
              <li><strong>Speed:</strong> Hire in weeks, not months</li>
              <li><strong>Flexibility:</strong> Scale engagement up or down as needs change</li>
              <li><strong>Experience:</strong> Benefit from exposure to multiple companies and industries</li>
              <li><strong>Objectivity:</strong> Fresh perspective without internal politics</li>
              <li><strong>Network:</strong> Access to the CMO&apos;s professional network of talent and vendors</li>
              <li><strong>Mentorship:</strong> Develop your internal team under senior leadership</li>
            </ul>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Industry Associations</h2>

            <p>
              Many <strong>part-time marketing leaders</strong> are members of recognized marketing and advertising bodies. Key organizations include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.cim.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700">CIM</h4>
                    <p className="text-sm text-gray-600">Chartered Institute of Marketing - UK&apos;s leading marketing body</p>
                  </div>
                </div>
              </a>
              <a href="https://dma.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700">DMA</h4>
                    <p className="text-sm text-gray-600">Data & Marketing Association - data-driven marketing</p>
                  </div>
                </div>
              </a>
              <a href="https://ipa.co.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700">IPA</h4>
                    <p className="text-sm text-gray-600">Institute of Practitioners in Advertising</p>
                  </div>
                </div>
              </a>
              <a href="https://www.marketingweek.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-amber-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📰</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-amber-700">Marketing Week</h4>
                    <p className="text-sm text-gray-600">UK&apos;s leading marketing publication</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.warc.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-amber-700">WARC</p>
              </a>
              <a href="https://www.glassdoor.co.uk/Salaries/cmo-salary-SRCH_KO0,3.htm" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 transition-all group text-center">
                <span className="text-xl">💰</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-amber-700">Glassdoor Salaries</p>
              </a>
              <a href="https://www.hubspot.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 transition-all group text-center">
                <span className="text-xl">🚀</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-amber-700">HubSpot</p>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-amber-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-amber-700">LinkedIn</p>
              </a>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />

              {/* Quick Links */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <Link href="/hire-fractional-cmo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors">
                    <span>📋</span> How to Hire a CMO
                  </Link>
                  <Link href="/fractional-cmo-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors">
                    <span>💰</span> Salary & Day Rates
                  </Link>
                  <Link href="/fractional-cmo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors">
                    <span>💼</span> CMO Jobs UK
                  </Link>
                  <Link href="/fractional-recruitment-agency" className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors">
                    <span>🎯</span> Fractional Recruitment Agencies
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <p className="font-bold text-gray-900 mb-2">Looking for a CMO?</p>
                <p className="text-sm text-gray-600 mb-4">Browse pre-vetted marketing leaders</p>
                <Link href="/fractional-cmo-jobs-uk" className="block text-center bg-amber-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors text-sm">
                  View CMO Jobs
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
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Day Rate Calculator
            </h2>
          </div>
          <RoleCalculator role="cmo" />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ items={CMO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 block mb-2">Explore More</span>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>

          {/* Primary Resources - 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-cmo" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-amber-700 mb-2">How to Hire a Fractional CMO</h3>
              <p className="text-gray-600 text-sm">Complete guide to hiring process</p>
            </Link>
            <Link href="/fractional-cmo-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-amber-700 mb-2">Fractional CMO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CMO roles</p>
            </Link>
            <Link href="/fractional-cmo-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-amber-700 mb-2">Fractional CMO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK salary benchmarks and rates</p>
            </Link>
          </div>

          {/* Secondary Resources - 4 compact links */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-gray-200">
            <Link href="/fractional-cmo-services" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-amber-700 hover:border-amber-300 transition-colors">
              ⚙️ CMO Services
            </Link>
            <Link href="/part-time-cmo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-amber-700 hover:border-amber-300 transition-colors">
              ⏰ Part-Time CMO Jobs
            </Link>
            <Link href="/interim-cmo-jobs-uk" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-amber-700 hover:border-amber-300 transition-colors">
              📅 Interim CMO Roles
            </Link>
            <Link href="/fractional-jobs-london" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-amber-700 hover:border-amber-300 transition-colors">
              📍 London Marketing Jobs
            </Link>
          </div>

          {/* Cross-role linking */}
          <div className="pt-6">
            <p className="text-sm text-gray-500 mb-3">Explore other fractional roles:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/fractional-cfo" className="text-sm text-gray-600 hover:text-amber-700">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cto" className="text-sm text-gray-600 hover:text-amber-700">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-gray-600 hover:text-amber-700">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-gray-600 hover:text-amber-700">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-gray-600 hover:text-amber-700">Fractional CISO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse pre-vetted marketing leaders or post your requirements to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cmo-jobs-uk"
              className="px-8 py-4 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Browse Fractional CMOs
            </Link>
            <Link
              href="/hire-fractional-cmo"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Hiring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section id="jobs" className="py-20 bg-gray-50 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Marketing Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time marketing opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Marketing"
            title="Latest Marketing Jobs"
            accentColor="amber"
            jobsPerPage={6}
          />
        </div>
      </section>

      {/* Content Hub */}
      <RoleContentHub currentRole="cmo" />
    </div>
  )
}
