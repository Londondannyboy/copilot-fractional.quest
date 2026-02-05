import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CTO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleContentHub } from '@/components/RoleContentHub'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage } from '@/lib/images'
import { TableOfContents, TableOfContentsMobile } from '@/components/TableOfContents'
import { HeyCompanies } from '@/components/HeyCompanies'

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
  { id: 'jobs', title: 'CTO Jobs' },
  { id: 'faq', title: 'FAQ' },
]

const ogImage = getOGImageUrl('cto')
const imageAlt = getImage('cto').alt
const imageCredit = getImage('cto')

export const metadata: Metadata = {
  title: 'Fractional CTO UK | Part-Time Technology Leadership Guide 2026',
  description: 'Fractional CTO: Part-time Chief Technology Officer working 1-3 days/week for £800-£1,500/day. Tech stack expertise, startup scaling, when to hire. Complete UK guide.',
  keywords: 'fractional cto, fractional cto uk, what is a fractional cto, fractional cto meaning, part time cto, fractional technology officer, fractional chief technology officer, hire fractional cto',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cto',
  },
  openGraph: {
    title: 'Fractional CTO UK | Part-Time Technology Leadership Guide',
    description: 'Fractional CTO: Part-time tech executive working 1-3 days/week. Day rates £800-£1,500. Complete UK guide.',
    url: 'https://fractional.quest/fractional-cto',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CTO UK | Part-Time Technology Leadership Guide',
    description: 'Fractional CTO: Part-time tech executive. Day rates £800-£1,500. Complete UK guide.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CTO', href: '/fractional-cto' },
]

export default function FractionalCtoPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CTO? | Part-Time Chief Technology Officer Guide"
        description="Complete guide to fractional CTO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Technology Officer does."
        url="https://fractional.quest/fractional-cto"
        dateModified={new Date('2026-01-31')}
      />
      <FAQPageSchema faqs={CTO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero/fractional-cto-jobs-uk-desktop.webp"
          alt={`What is a Fractional CTO - ${imageAlt}`}
          title="Fractional CTO - Part-Time Technology Leadership"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 via-blue-500/80 to-indigo-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CTO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CTO</strong> is a part-time Chief Technology Officer who provides strategic technology leadership to companies on a flexible basis. Learn about <strong>fractional CTO meaning</strong>, responsibilities, and costs.
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
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">Fractional CTO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CTO</strong> (Fractional Chief Technology Officer) is an experienced technology executive who works with companies on a part-time or contract basis, typically 1-3 days per week. Day rates range from £800-£1,250 depending on experience and sector. Monthly retainers typically range from £2,400-£8,000. Fractional CTOs provide strategic technology leadership without the £155,000-£250,000 cost of a full-time hire.
            </p>
            <p className="text-sm text-cyan-300 mt-4">Source: CodPal, Fractional CTO Experts Jan 2026</p>
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

            <h2 id="understanding" className="text-3xl font-black text-gray-900 mb-6 scroll-mt-24">What is a Fractional CTO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CTO meaning</strong> centres on flexible, senior-level technology leadership. Unlike traditional full-time CTOs earning £150,000-£250,000 annually, a <strong>fractional Chief Technology Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            {/* Authority context box */}
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Context:</strong> As the <a href="https://www.bbc.co.uk/news/articles/c5yv6n536vno" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-medium">BBC reports on the evolving UK job market (Jan 2026)</a>, companies are increasingly embracing flexible executive arrangements. Fractional CTOs represent a key part of this shift, part of the broader <a href="https://en.wikipedia.org/wiki/Fractional_work" target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline">fractional work</a> trend transforming executive recruitment.
              </p>
            </div>

            <p>
              This model emerged from the startup ecosystem where companies need CTO-level expertise but cannot justify or afford a full-time executive. The <strong>fractional CTO</strong> brings the same strategic thinking, technical leadership, and engineering expertise as a full-time CTO, but on a fractional basis.
            </p>

            {/* Video */}
            <div className="my-10 not-prose">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What Does a Fractional CTO Do?</h3>
              <LazyYouTube
                videoId="8xLjRN-JFiE"
                title="What is a Fractional CTO? Role Explained"
              />
              <p className="text-gray-500 text-sm mt-3">Video: Understanding the fractional CTO role and responsibilities</p>
            </div>

            <h2 id="responsibilities" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Key Responsibilities and Deliverables</h2>

            <p>
              A <strong>fractional CTO</strong> performs the same functions as a full-time Chief Technology Officer, but on a part-time basis. Their responsibilities typically include:
            </p>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Technical Strategy', desc: 'Developing technology roadmaps aligned with business objectives', icon: '🎯' },
                { title: 'Architecture Design', desc: 'Building scalable, secure, and maintainable system architectures', icon: '🏗️' },
                { title: 'Team Leadership', desc: 'Building, mentoring, and managing engineering teams', icon: '👥' },
                { title: 'Tech Stack Decisions', desc: 'Selecting technologies and frameworks for optimal performance', icon: '⚙️' },
                { title: 'Code Quality', desc: 'Establishing engineering best practices and standards', icon: '✅' },
                { title: 'Security & Compliance', desc: 'Implementing security protocols and regulatory compliance', icon: '🔒' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 id="comparison" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Fractional vs Interim vs Full-Time CTO: How They Compare</h2>

            <p>
              Understanding the difference between a <strong>fractional CTO</strong>, <strong>interim CTO</strong>, and <strong>full-time CTO</strong> helps companies choose the right technology leadership model:
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-cyan-700">Fractional CTO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-blue-700">Interim CTO</th>
                    <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Full-Time CTO</th>
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
                    <td className="px-4 py-4 text-sm text-cyan-700 font-semibold">£3,400-£6,400</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£8,000-£12,000/week</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£12,000-£22,000+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Annual Cost</td>
                    <td className="px-4 py-4 text-sm text-cyan-700 font-semibold">£41,000-£77,000</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£96,000-£144,000 (3mo)</td>
                    <td className="px-4 py-4 text-sm text-gray-600">£150,000-£300,000+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Primary Focus</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Strategy, architecture, team building</td>
                    <td className="px-4 py-4 text-sm text-gray-600">CTO gap, platform migration, rescue</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Full tech ownership</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Tech Breadth</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Multiple stacks, diverse experience</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Deep hands-on focus</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Your stack only</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Flexibility</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Scale up/down easily</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Fixed contract term</td>
                    <td className="px-4 py-4 text-sm text-gray-600">Limited flexibility</td>
                  </tr>
                  <tr className="bg-cyan-50">
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">Best For</td>
                    <td className="px-4 py-4 text-sm text-cyan-800 font-medium">Startups, scale-ups £1-20M revenue</td>
                    <td className="px-4 py-4 text-sm text-blue-800 font-medium">CTO vacancy, crisis, migration</td>
                    <td className="px-4 py-4 text-sm text-gray-700 font-medium">Large enterprises, complex systems</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>UK Market Insight:</strong> Fractional Quest ranks #1-2 for &quot;fractional CTO jobs&quot; in the UK. Day rates typically range from £850-£1,300 depending on experience, with tech-heavy sectors like fintech and AI commanding premium rates of £1,300-£1,600/day.
              </p>
            </div>

            <h2 id="when-needed" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">When Does Your Business Need One?</h2>

            <ul className="space-y-3">
              <li><strong>Building MVP:</strong> Need technical leadership to build your first product</li>
              <li><strong>Non-technical founders:</strong> Founders without tech background need technical strategy</li>
              <li><strong>Scale preparation:</strong> Architecture review before major growth phase</li>
              <li><strong>Tech debt:</strong> Legacy systems need modernisation strategy</li>
              <li><strong>Team gap:</strong> After losing a tech leader and needing interim expertise</li>
              <li><strong>Due diligence:</strong> Investors require technical leadership credibility</li>
            </ul>

            <div className="bg-cyan-50 p-6 border border-cyan-200 rounded-lg my-8 not-prose">
              <p className="text-cyan-800 font-medium mb-3">Ready to hire a fractional CTO?</p>
              <Link href="/hire-fractional-cto" className="inline-flex items-center text-cyan-700 font-bold hover:text-cyan-900">
                Complete Guide: How to Hire a Fractional CTO →
              </Link>
            </div>

            <h2 id="cost-pricing" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Cost and Pricing UK</h2>

            <p>
              Fractional CTO costs vary based on experience level, sector specialisation, and engagement intensity. Based on UK market research from Fractional CTO Experts, WhizzBridge, and CodPal (Jan 2026):
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Monthly Retainer Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £4,000-£6,400/month (£48,000-£77,000/year)</li>
                <li><strong>2 days/week:</strong> £8,000-£12,800/month (£96,000-£154,000/year)</li>
                <li><strong>3 days/week:</strong> £12,000-£19,200/month (£144,000-£230,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CTO total cost: £200,000-£400,000+ (salary + benefits + equity)</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Hourly Rate Breakdown</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Senior Level (8-15 years):</strong> £150-£250/hour</li>
                <li><strong>Executive Level (15+ years):</strong> £200-£350/hour</li>
                <li><strong>AI/ML Specialist:</strong> £180-£300/hour</li>
                <li><strong>Cloud/DevOps Expert:</strong> £170-£280/hour</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">Source: Fractional CTO Experts, Arc.dev, WhizzBridge Jan 2026</p>
            </div>

            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-6 not-prose">
              <p className="text-sm text-gray-700">
                <strong>Cost Comparison:</strong> At £200/hour for 20 hours monthly, a fractional CTO costs £4,000/month vs £12,500-£20,000/month for a full-time CTO. This represents <strong>60-80% savings</strong> while accessing equivalent strategic expertise.
              </p>
            </div>

            <h2 id="uk-market" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Types of Technology Leadership Engagement</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Startup CTO', desc: 'Building technical foundations 0-to-1', rate: '£1,000-£1,400/day' },
                { title: 'Scale-up CTO', desc: 'Architecture for growth, team building', rate: '£1,200-£1,600/day' },
                { title: 'AI/ML CTO', desc: 'Machine learning and data infrastructure', rate: '£1,300-£1,800/day' },
                { title: 'Security-focused CTO', desc: 'FinTech, HealthTech compliance', rate: '£1,200-£1,600/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-cyan-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h2 id="how-to-hire" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Benefits of a Fractional CTO</h2>

            <ul className="space-y-3">
              <li><strong>Cost-effective:</strong> Access CTO expertise at 30-50% of full-time cost</li>
              <li><strong>Speed:</strong> Hire in weeks, not months</li>
              <li><strong>Experience:</strong> Benefit from building multiple products</li>
              <li><strong>Objectivity:</strong> Fresh perspective on technical decisions</li>
              <li><strong>Network:</strong> Access to engineering talent and technical vendors</li>
              <li><strong>Flexibility:</strong> Scale engagement as product evolves</li>
            </ul>

            <h2 id="qualifications" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">Professional Bodies & Certifications</h2>

            <p>
              Many <strong>part-time technology directors</strong> hold certifications from recognized technology and engineering bodies. Key organizations include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 not-prose my-8">
              <a href="https://www.bcs.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-cyan-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-cyan-700">BCS</h4>
                    <p className="text-sm text-gray-600">British Computer Society - Chartered Institute for IT</p>
                  </div>
                </div>
              </a>
              <a href="https://www.theiet.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-cyan-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-cyan-700">IET</h4>
                    <p className="text-sm text-gray-600">Institution of Engineering and Technology</p>
                  </div>
                </div>
              </a>
              <a href="https://technation.io" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-cyan-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-cyan-700">Tech Nation</h4>
                    <p className="text-sm text-gray-600">UK tech sector growth network</p>
                  </div>
                </div>
              </a>
              <a href="https://www.gov.uk/government/organisations/government-digital-service" target="_blank" rel="noopener noreferrer" className="block p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-cyan-300 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-cyan-700">GDS</h4>
                    <p className="text-sm text-gray-600">Government Digital Service - UK digital standards</p>
                  </div>
                </div>
              </a>
            </div>

            <h2 id="resources" className="text-3xl font-black text-gray-900 mt-16 mb-6 scroll-mt-24">External Resources</h2>

            <div className="grid md:grid-cols-4 gap-4 not-prose my-8">
              <a href="https://www.gartner.com/en/information-technology" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-all group text-center">
                <span className="text-xl">📊</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-cyan-700">Gartner IT</p>
              </a>
              <a href="https://stackoverflow.com/jobs" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-all group text-center">
                <span className="text-xl">💻</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-cyan-700">Stack Overflow</p>
              </a>
              <a href="https://www.linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-all group text-center">
                <span className="text-xl">💼</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-cyan-700">LinkedIn</p>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-all group text-center">
                <span className="text-xl">🐙</span>
                <p className="text-xs font-medium text-gray-900 mt-1 group-hover:text-cyan-700">GitHub</p>
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
                  <Link href="/hire-fractional-cto" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-700 transition-colors">
                    <span>📋</span> How to Hire a CTO
                  </Link>
                  <Link href="/fractional-cto-salary" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-700 transition-colors">
                    <span>💰</span> Salary & Day Rates
                  </Link>
                  <Link href="/fractional-cto-jobs-uk" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-700 transition-colors">
                    <span>💼</span> CTO Jobs UK
                  </Link>
                  <Link href="/virtual-cto" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-700 transition-colors">
                    <span>🌐</span> Virtual CTO Services
                  </Link>
                  <Link href="/fractional-ciso" className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-700 transition-colors">
                    <span>🔒</span> Fractional CISO Guide
                  </Link>
                  <Link href="/fractional-recruitment-agency" className="flex items-center gap-2 text-sm text-cyan-700 hover:text-cyan-900 font-medium transition-colors">
                    <span>🎯</span> Fractional Recruiter Guide
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                <p className="font-bold text-gray-900 mb-2">Looking for a CTO?</p>
                <p className="text-sm text-gray-600 mb-4">Browse pre-vetted tech leaders</p>
                <Link href="/fractional-cto-jobs-uk" className="block text-center bg-cyan-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-400 transition-colors text-sm">
                  View CTO Jobs
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
          <RoleCalculator role="cto" />
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
          <FAQ items={CTO_FAQS} title="" />
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
            <Link href="/hire-fractional-cto" className="bg-white p-6 rounded-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 mb-2">How to Hire a Fractional CTO</h3>
              <p className="text-gray-600 text-sm">Complete guide to the hiring process, technical assessment, and contract terms</p>
            </Link>
            <Link href="/fractional-cto-jobs-uk" className="bg-white p-6 rounded-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 mb-2">Fractional CTO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CTO and technical leadership roles</p>
            </Link>
            <Link href="/fractional-cto-salary" className="bg-white p-6 rounded-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-cyan-700 mb-2">Fractional CTO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK day rates, annual earnings, and IR35 considerations for fractional CTOs</p>
            </Link>
          </div>

          {/* Featured Role */}
          <div className="mb-6">
            <Link href="/fractional-job/fractional-cto-london" className="block p-5 bg-cyan-50 border-2 border-cyan-300 rounded-lg hover:border-cyan-500 hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-cyan-700">Featured: Fractional CTO / Part-Time Technology Director — London</h4>
                  <p className="text-gray-600 text-sm">Remote & hybrid, £1,000-£1,600/day — view full job description and requirements</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/fractional-cto-services" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors group">
              <span className="text-xl mb-2 block">⚙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700 text-sm">CTO Services</h4>
              <p className="text-gray-500 text-xs">What CTOs deliver</p>
            </Link>
            <Link href="/part-time-cto-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors group">
              <span className="text-xl mb-2 block">🕐</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700 text-sm">Part-Time CTO Jobs</h4>
              <p className="text-gray-500 text-xs">2-3 days per week</p>
            </Link>
            <Link href="/interim-cto-jobs-uk" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors group">
              <span className="text-xl mb-2 block">⏳</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700 text-sm">Interim CTO Jobs</h4>
              <p className="text-gray-500 text-xs">Contract tech roles</p>
            </Link>
            <Link href="/fractional-jobs-london" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 transition-colors group">
              <span className="text-xl mb-2 block">🏙️</span>
              <h4 className="font-semibold text-gray-900 group-hover:text-cyan-700 text-sm">London Tech Jobs</h4>
              <p className="text-gray-500 text-xs">London-based roles</p>
            </Link>
          </div>

          {/* Cross-role links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Other Fractional Executive Roles:</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/fractional-cfo" className="text-sm text-cyan-700 hover:underline">Fractional CFO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cmo" className="text-sm text-cyan-700 hover:underline">Fractional CMO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-coo" className="text-sm text-cyan-700 hover:underline">Fractional COO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-chro" className="text-sm text-cyan-700 hover:underline">Fractional CHRO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-ciso" className="text-sm text-cyan-700 hover:underline">Fractional CISO</Link>
              <span className="text-gray-300">•</span>
              <Link href="/fractional-cpo" className="text-sm text-cyan-700 hover:underline">Fractional CPO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hey Companies - Founder Profile & Trust Signals */}
      <HeyCompanies location="UK" />

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Hire a Fractional CTO?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse pre-vetted fractional CTOs or post your requirements to find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cto-jobs-uk"
              className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Browse Fractional CTOs
            </Link>
            <Link
              href="/hire-fractional-cto"
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Latest Technology Leadership Jobs</h2>
            <p className="text-xl text-gray-500">Find your next part-time tech opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Engineering"
            title="Latest Tech Jobs"
            accentColor="blue"
            jobsPerPage={6}
          />
        </div>
      </section>

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
