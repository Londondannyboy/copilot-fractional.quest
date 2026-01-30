import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CFO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { getOGImageUrl, getImage } from '@/lib/images'

// Table of Contents items with section IDs
const tocItems = [
  { id: 'understanding', title: 'Understanding the Role' },
  { id: 'responsibilities', title: 'Key Responsibilities' },
  { id: 'comparison', title: 'Part-Time vs Full-Time' },
  { id: 'when-needed', title: 'When You Need One' },
  { id: 'cost-pricing', title: 'Cost & Pricing UK' },
  { id: 'types', title: 'Types of Engagement' },
  { id: 'qualifications', title: 'Qualifications & Bodies' },
  { id: 'uk-market', title: 'UK Market Overview' },
  { id: 'how-to-hire', title: 'How to Hire' },
  { id: 'ir35', title: 'IR35 & Tax' },
  { id: 'resources', title: 'External Resources' },
  { id: 'calculator', title: 'Day Rate Calculator' },
  { id: 'faq', title: 'FAQ' },
]

// Unsplash images for section backgrounds
const sectionImages = {
  understanding: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&q=80', // Finance charts
  responsibilities: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80', // Business dashboard
  comparison: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80', // Analytics
  whenNeeded: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=1920&q=80', // Team meeting
  cost: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=80', // Money/budget
  types: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80', // Business professionals
  ukMarket: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80', // London skyline
  hiring: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80', // Interview/hiring
  ir35: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80', // Legal/documents
}

const ogImage = getOGImageUrl('cfo')
const imageAlt = getImage('cfo').alt
const imageCredit = getImage('cfo')

// Author schema for E-E-A-T signals
const authorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fractional Quest Editorial Team",
  "jobTitle": "Finance Leadership Experts",
  "url": "https://fractional.quest/about",
  "worksFor": {
    "@type": "Organization",
    "name": "Fractional Quest",
    "url": "https://fractional.quest"
  }
}

// Organization schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fractional Quest",
  "url": "https://fractional.quest",
  "logo": "https://fractional.quest/logo.png",
  "description": "UK platform connecting companies with fractional executives - CFOs, CTOs, CMOs and more.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "United Kingdom"
  },
  "sameAs": [
    "https://www.linkedin.com/company/fractional-quest"
  ]
}


export const metadata: Metadata = {
  title: 'What is a Fractional CFO? | Guide',
  description: 'What is a fractional CFO? A part-time finance leader for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cfo, fractional cfo meaning, fractional cfo definition, part time cfo, fractional finance officer, fractional chief financial officer, what does a fractional cfo do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cfo',
  },
  openGraph: {
    title: 'What is a Fractional CFO? | Complete Guide',
    description: 'Understand fractional CFO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Financial Officer.',
    url: 'https://fractional.quest/fractional-cfo',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CFO? | Complete Guide',
    description: 'Understand fractional CFO meaning, responsibilities, and costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CFO', href: '/fractional-cfo' },
]

export default function FractionalCfoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CFO? | Part-Time Chief Financial Officer Guide"
        description="Complete guide to fractional CFO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Financial Officer does."
        url="https://fractional.quest/fractional-cfo"
        dateModified={new Date('2026-01-26')}
      />
      <FAQPageSchema faqs={CFO_FAQS} />

      {/* Author and Organization Schema for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-cfo-jobs-uk-desktop.webp"
          alt={`What is a Fractional CFO - ${imageAlt}`}
          title="Fractional CFO - Part-Time Finance Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-teal-500/80 to-green-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CFO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CFO</strong> is a part-time Chief Financial Officer who provides strategic financial leadership to companies on a flexible basis. Learn about <strong>fractional CFO meaning</strong>, responsibilities, and costs.
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

      {/* Definition Box */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-400 mb-4">Fractional CFO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CFO</strong> (Fractional Chief Financial Officer) is an experienced finance executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic financial leadership without the cost of a full-time hire.
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
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Column */}
            <article className="prose prose-lg prose-gray max-w-none">

              {/* Section: Understanding */}
              <div id="understanding" className="relative -mx-6 px-6 py-12 mb-12 rounded-2xl overflow-hidden scroll-mt-24">
                <Image
                  src={sectionImages.understanding}
                  alt="Financial analysis and strategy"
                  fill
                  className="object-cover opacity-10"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">Understanding the Fractional CFO Role</h2>

                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    The <strong>fractional CFO meaning</strong> centres on flexible, senior-level financial leadership. Unlike traditional full-time CFOs earning £130,000-£220,000 annually, a <strong>fractional Chief Financial Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
                  </p>

                  {/* Authority context box */}
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 my-6 not-prose">
                    <p className="text-sm text-gray-700">
                      <strong>UK Market Context:</strong> As the <a href="https://www.bbc.co.uk/news/articles/c5yv6n536vno" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-medium">BBC reports on the evolving UK job market (Jan 2026)</a>, companies are increasingly embracing flexible executive arrangements. Fractional CFOs represent a key part of this shift - offering businesses access to senior finance leadership without traditional full-time commitments.
                    </p>
                  </div>

                  <p>
                    This model emerged from the startup and scale-up ecosystem where companies need CFO-level expertise for fundraising, financial planning, and investor relations but cannot justify the cost of a full-time finance executive. The concept is part of the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">fractional work</a> trend transforming executive recruitment globally.
                  </p>
                </div>
              </div>

              {/* Primary Video */}
              <div className="my-10 not-prose">
                <h3 className="text-lg font-bold text-gray-900 mb-4">What Does a Fractional CFO Do?</h3>
                <LazyYouTube
                  videoId="-Nw8sgb5Dk8"
                  title="What is a Fractional CFO? Complete Guide"
                />
                <p className="text-gray-500 text-sm mt-3">Video: Understanding the fractional CFO role and responsibilities</p>
              </div>

              {/* Section: Responsibilities */}
              <div id="responsibilities" className="relative -mx-6 px-6 py-12 my-12 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 scroll-mt-24">
                <Image
                  src={sectionImages.responsibilities}
                  alt="Business dashboard and KPIs"
                  fill
                  className="object-cover opacity-5"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">Key Responsibilities and Deliverables</h2>

                  <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    {[
                      { title: 'Financial Strategy', desc: 'Developing financial plans aligned with business goals', icon: '📊' },
                      { title: 'Fundraising', desc: 'Leading Series A-C rounds and investor relations', icon: '💰' },
                      { title: 'Cash Management', desc: 'Optimising working capital and runway planning', icon: '🏦' },
                      { title: 'FP&A', desc: 'Budgeting, forecasting, and variance analysis', icon: '📈' },
                      { title: 'Board Reporting', desc: 'Investor-grade financial presentations', icon: '📋' },
                      { title: 'Compliance', desc: 'Regulatory compliance and audit readiness', icon: '✅' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/80 backdrop-blur p-6 rounded-lg shadow-sm">
                        <span className="text-2xl mb-2 block">{item.icon}</span>
                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section: Comparison */}
              <div id="comparison" className="relative -mx-6 px-6 py-12 my-12 rounded-2xl overflow-hidden scroll-mt-24">
                <Image
                  src={sectionImages.comparison}
                  alt="Business analytics comparison"
                  fill
                  className="object-cover opacity-10"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">Part-Time vs Full-Time: How They Compare</h2>

                  <div className="overflow-x-auto my-8 not-prose">
                    <table className="min-w-full bg-white/90 backdrop-blur border border-gray-200 rounded-lg shadow-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CFO</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Full-Time CFO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                          <td className="px-6 py-4 text-sm text-gray-600">£40,000-£100,000</td>
                          <td className="px-6 py-4 text-sm text-gray-600">£130,000-£250,000+</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Time Commitment</td>
                          <td className="px-6 py-4 text-sm text-gray-600">1-3 days/week</td>
                          <td className="px-6 py-4 text-sm text-gray-600">5 days/week</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Fundraising Experience</td>
                          <td className="px-6 py-4 text-sm text-gray-600">Multiple rounds across companies</td>
                          <td className="px-6 py-4 text-sm text-gray-600">Single company focus</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">Best For</td>
                          <td className="px-6 py-4 text-sm text-gray-600">Pre-Series B, specific projects</td>
                          <td className="px-6 py-4 text-sm text-gray-600">Series C+, complex financials</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Second Video */}
              <div className="my-10 not-prose">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Fractional CFO: Pricing & Value</h3>
                <LazyYouTube
                  videoId="YrTU9datl4A"
                  title="Fractional CFO Pricing and Value Explained"
                />
                <p className="text-gray-500 text-sm mt-3">Video: How fractional CFO pricing works and the value they deliver</p>
              </div>

              {/* Section: When Needed */}
              <div id="when-needed" className="relative -mx-6 px-6 py-12 my-12 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 scroll-mt-24">
                <Image
                  src={sectionImages.whenNeeded}
                  alt="Team strategy meeting"
                  fill
                  className="object-cover opacity-5"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">When Does Your Business Need One?</h2>

                  <ul className="space-y-3">
                    <li><strong>Fundraising:</strong> Preparing for and executing Series A-C rounds</li>
                    <li><strong>Investor readiness:</strong> Need professional financial reporting</li>
                    <li><strong>Cash crisis:</strong> Runway planning and cost optimisation needed</li>
                    <li><strong>Scale preparation:</strong> Financial systems for rapid growth</li>
                    <li><strong>Exit planning:</strong> Preparing for M&A or IPO</li>
                    <li><strong>Finance team gap:</strong> Interim senior leadership needed</li>
                  </ul>

                  <div className="bg-white/80 backdrop-blur p-6 border border-emerald-200 rounded-lg my-8 not-prose shadow-sm">
                    <p className="text-emerald-800 font-medium mb-3">Ready to hire a part-time finance leader?</p>
                    <Link href="/hire-fractional-cfo" className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-900">
                      Complete Guide: How to Hire a Fractional CFO →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Section: Cost */}
              <div id="cost-pricing" className="relative -mx-6 px-6 py-12 my-12 rounded-2xl overflow-hidden scroll-mt-24">
                <Image
                  src={sectionImages.cost}
                  alt="Financial planning and budgeting"
                  fill
                  className="object-cover opacity-10"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">Cost and Pricing UK</h2>

                  <div className="bg-white/80 backdrop-blur p-6 rounded-lg my-6 not-prose shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4">Typical Pricing Breakdown</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>1 day/week:</strong> £3,000-£5,600/month (£36,000-£67,000/year)</li>
                      <li><strong>2 days/week:</strong> £6,000-£11,200/month (£72,000-£134,000/year)</li>
                      <li><strong>3 days/week:</strong> £9,000-£16,800/month (£108,000-£202,000/year)</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-4">Compare to full-time CFO: £160,000-£280,000+ (salary + benefits + equity)</p>
                  </div>
                </div>
              </div>

              {/* Section: Types */}
              <div id="types" className="relative -mx-6 px-6 py-12 my-12 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 scroll-mt-24">
                <Image
                  src={sectionImages.types}
                  alt="Business professionals"
                  fill
                  className="object-cover opacity-5"
                />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-gray-900 mb-6">Types of Finance Leadership Engagement</h2>

                  <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
                    {[
                      { title: 'VC-Backed CFO', desc: 'Fundraising and investor relations', rate: '£1,100-£1,400/day' },
                      { title: 'PE Portfolio CFO', desc: 'Value creation and exit planning', rate: '£1,200-£1,500/day' },
                      { title: 'Scale-up CFO', desc: 'Growth finance and cash management', rate: '£900-£1,200/day' },
                      { title: 'Turnaround CFO', desc: 'Restructuring and crisis management', rate: '£1,000-£1,300/day' },
                    ].map((type, i) => (
                      <div key={i} className="bg-white/80 backdrop-blur p-6 border border-gray-200 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                        <span className="text-emerald-700 font-semibold text-sm">{type.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Qualifications & Professional Bodies</h2>

            <p>
              Most part-time finance directors hold professional accounting qualifications from recognized bodies. Key professional organizations include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.icaew.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ICAEW</h4>
                    <p className="text-sm text-gray-600">Institute of Chartered Accountants in England & Wales</p>
                  </div>
                </div>
              </a>
              <a href="https://www.accaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">ACCA</h4>
                    <p className="text-sm text-gray-600">Association of Chartered Certified Accountants</p>
                  </div>
                </div>
              </a>
              <a href="https://www.cimaglobal.com" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">CIMA</h4>
                    <p className="text-sm text-gray-600">Chartered Institute of Management Accountants</p>
                  </div>
                </div>
              </a>
              <a href="https://www.frc.org.uk" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">FRC</h4>
                    <p className="text-sm text-gray-600">Financial Reporting Council - UK regulator</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="uk-market" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">The UK Fractional CFO Market</h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The UK <strong>fractional CFO</strong> market has grown significantly since 2020, driven by the rise of remote work and the expansion of the venture capital ecosystem. London remains the largest hub, accounting for approximately 60% of fractional CFO engagements, followed by Manchester, Birmingham, and Edinburgh. As <a href="https://www.bbc.co.uk/news/articles/c0r4zd29n5no" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">recent BBC coverage</a> highlights, fractional work is reshaping executive employment patterns across the UK and US.
            </p>

            <p>
              Key sectors driving demand for fractional CFOs in the UK include:
            </p>

            <ul className="space-y-2 mb-8">
              <li><strong>VC-backed technology companies</strong> - Seed to Series B startups needing investor-ready financials</li>
              <li><strong>Private equity portfolio companies</strong> - Businesses requiring value creation and exit preparation</li>
              <li><strong>Professional services firms</strong> - Law firms, consultancies scaling beyond partner-managed finances</li>
              <li><strong>E-commerce and D2C brands</strong> - Fast-growth companies needing cash flow expertise</li>
              <li><strong>Healthcare and life sciences</strong> - Regulated sectors requiring compliance expertise</li>
            </ul>

            <p>
              According to the <a href="https://www.british-business-bank.co.uk" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">British Business Bank</a>, UK SMEs increasingly recognise that access to strategic finance leadership - not just accounting - is critical for scaling. The fractional model addresses this by providing CFO expertise at a fraction of the full-time cost.
            </p>

            <h2 id="how-to-hire" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">How to Hire a Fractional CFO</h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Finding the right <strong>fractional CFO</strong> requires understanding your specific needs and matching them to a finance leader with relevant experience. The hiring process typically takes 2-4 weeks, significantly faster than recruiting a full-time CFO.
            </p>

            <div className="bg-gray-50 p-6 rounded-xl my-8 not-prose">
              <h3 className="font-bold text-gray-900 mb-4">5-Step Hiring Process</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">1</span>
                  <div>
                    <strong className="text-gray-900">Define Your Requirements</strong>
                    <p className="text-gray-600 text-sm">What finance challenges need solving? Fundraising? Reporting? Systems?</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">2</span>
                  <div>
                    <strong className="text-gray-900">Determine Time Commitment</strong>
                    <p className="text-gray-600 text-sm">Most engagements are 1-3 days per week. Consider your finance complexity.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">3</span>
                  <div>
                    <strong className="text-gray-900">Shortlist Candidates</strong>
                    <p className="text-gray-600 text-sm">Look for sector experience, relevant qualifications (ACA/ACCA), and cultural fit.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">4</span>
                  <div>
                    <strong className="text-gray-900">Conduct Discovery Sessions</strong>
                    <p className="text-gray-600 text-sm">Meet candidates to assess chemistry and approach. Ask for case studies.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">5</span>
                  <div>
                    <strong className="text-gray-900">Agree Terms and Onboard</strong>
                    <p className="text-gray-600 text-sm">Typical arrangements: monthly retainer or fixed day rate. Start with 90-day goals.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-emerald-50 p-6 border border-emerald-200 rounded-lg my-8 not-prose">
              <p className="text-emerald-800 font-medium mb-3">Need help finding a fractional CFO?</p>
              <Link href="/fractional-cfo-jobs-uk" className="inline-flex items-center text-emerald-700 font-bold hover:text-emerald-900">
                Browse Fractional CFO Jobs UK →
              </Link>
            </div>

            <h2 id="ir35" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">IR35 and Tax Considerations</h2>

            <p>
              Fractional CFO arrangements in the UK typically fall outside <a href="https://www.gov.uk/guidance/understanding-off-payroll-working-ir35" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">IR35</a> regulations because:
            </p>

            <ul className="space-y-2 mb-8">
              <li>The CFO works with multiple clients simultaneously</li>
              <li>They control how, when, and where they deliver the work</li>
              <li>There is no mutuality of obligation (neither party must offer/accept future work)</li>
              <li>The CFO provides their own equipment and bears financial risk</li>
            </ul>

            <p>
              However, each engagement should be assessed individually. Many fractional CFOs operate through their own limited companies or as LLP members. It is advisable to seek guidance from <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">HMRC</a> or a qualified tax advisor.
            </p>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📚</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">Wikipedia: Fractional Work</p>
              </a>
              <a href="https://www.bbc.co.uk/news/articles/c0r4zd29n5no" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📰</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">BBC: Fractional Jobs</p>
              </a>
              <a href="https://www.gov.uk/government/organisations/companies-house" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">🏢</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">Companies House</p>
              </a>
              <a href="https://www.gov.uk/government/organisations/hm-revenue-customs" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">🏢</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">HMRC</p>
              </a>
              <a href="https://www.glassdoor.co.uk/Salaries/cfo-salary-SRCH_KO0,3.htm" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">Glassdoor Salaries</p>
              </a>
              <a href="https://www.bvca.co.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">BVCA</p>
              </a>
              <a href="https://www.british-business-bank.co.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">🏦</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">British Business Bank</p>
              </a>
              <a href="https://www.scaleupinstitute.org.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📈</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">ScaleUp Institute</p>
              </a>
              <a href="https://www.fca.org.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">⚖️</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">FCA</p>
              </a>
              <a href="https://www.ons.gov.uk" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-emerald-700">ONS</p>
              </a>
            </div>

            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              {/* Sticky container */}
              <div className="sticky top-24 space-y-6">
                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">UK Market Snapshot</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Average Day Rate</span>
                      <span className="font-bold text-emerald-700">£1,100-£1,400</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Typical Commitment</span>
                      <span className="font-bold text-gray-900">1-3 days/week</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-emerald-100">
                      <span className="text-gray-600 text-sm">Market Growth</span>
                      <span className="font-bold text-emerald-700">+23% YoY</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">London Share</span>
                      <span className="font-bold text-gray-900">60%</span>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gray-900 p-6 rounded-xl text-white">
                  <h3 className="font-bold mb-2">Need a Fractional CFO?</h3>
                  <p className="text-gray-300 text-sm mb-4">Browse pre-vetted finance leaders ready to start.</p>
                  <Link href="/fractional-cfo-jobs-uk" className="block w-full py-3 bg-emerald-500 text-black font-bold rounded-lg text-center hover:bg-emerald-400 transition-colors">
                    View CFO Jobs
                  </Link>
                </div>

                {/* Table of Contents */}
                <TableOfContents items={tocItems} />

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
                  <div className="space-y-3">
                    <Link href="/hire-fractional-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>📋</span> How to Hire a CFO
                    </Link>
                    <Link href="/fractional-cfo-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>💰</span> Salary & Day Rates
                    </Link>
                    <Link href="/fractional-cfo-services" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>⚙️</span> CFO Services
                    </Link>
                    <Link href="/virtual-cfo" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>🌐</span> Virtual CFO Services
                    </Link>
                    <Link href="/fractional-cto" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>💻</span> Fractional CTO Guide
                    </Link>
                    <Link href="/fractional-recruitment-agency" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>🎯</span> Fractional Recruitment Agency
                    </Link>
                    <Link href="/part-time-cfo-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 transition-colors">
                      <span>🕐</span> Part-Time CFO Jobs
                    </Link>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4 text-sm">Trusted By</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-sm text-gray-600">500+ UK Companies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-sm text-gray-600">£2B+ Funding Raised</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span className="text-sm text-gray-600">ICAEW/ACCA Qualified</span>
                    </div>
                  </div>
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
          <RoleCalculator role="cfo" />
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
          <FAQ items={CFO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Related Resources</span>
            <h2 className="text-2xl font-black text-gray-900">Explore More Resources</h2>
          </div>

          {/* Primary Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/hire-fractional-cfo" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">How to Hire a Fractional CFO</h3>
              <p className="text-gray-600 text-sm">Complete guide to the hiring process, interview questions, and contract templates</p>
            </Link>
            <Link href="/fractional-cfo-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Fractional CFO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse 200+ live fractional CFO and Finance Director roles across the UK</p>
            </Link>
            <Link href="/fractional-cfo-salary" className="bg-white p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 mb-2">Fractional CFO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK day rates, annual earnings, and IR35 considerations for finance leaders</p>
            </Link>
          </div>

          {/* Featured Role */}
          <div className="mb-6">
            <Link href="/fractional-job/fractional-cfo-uk" className="block p-5 bg-emerald-50 border-2 border-emerald-300 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-emerald-700">Featured: Fractional CFO / Part-Time Finance Director Role</h4>
                  <p className="text-gray-600 text-sm">Remote & hybrid, £1,000-£1,500/day — view full job description and requirements</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Links - More internal pages */}
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/fractional-cfo-services" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">⚙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">CFO Services</h4>
              <p className="text-gray-500 text-xs">What CFOs deliver</p>
            </Link>
            <Link href="/part-time-cfo-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">🕐</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">Part-Time CFO Jobs</h4>
              <p className="text-gray-500 text-xs">2-3 days per week</p>
            </Link>
            <Link href="/interim-cfo-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">⏳</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">Interim CFO Jobs</h4>
              <p className="text-gray-500 text-xs">Contract CFO roles</p>
            </Link>
            <Link href="/fractional-jobs-london" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors group">
              <span className="text-xl mb-2 block">🏙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm">London Jobs</h4>
              <p className="text-gray-500 text-xs">London-based roles</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cto" className="text-sm text-emerald-700 hover:underline">Fractional CTO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-emerald-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-emerald-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-emerald-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-emerald-700 hover:underline">Fractional CISO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cpo" className="text-sm text-emerald-700 hover:underline">Fractional CPO</Link>
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
            Browse pre-vetted finance leaders or post your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cfo-jobs-uk"
              className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors"
            >
              Browse Fractional CFOs
            </Link>
            <Link
              href="/hire-fractional-cfo"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Hiring Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Job Board Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse Jobs</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Finance Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time finance opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Finance"
            title="Latest Finance Jobs"
            accentColor="emerald"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cfo" />
    </div>
  )
}
