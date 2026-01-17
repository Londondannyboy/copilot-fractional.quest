import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ, CRO_FAQS } from '@/components/seo/FAQ'
import { BreadcrumbsLight } from '@/components/Breadcrumbs'
import { WebPageSchema } from '@/components/seo/WebPageSchema'
import { FAQPageSchema } from '@/components/seo/FAQPageSchema'
import { LazyYouTube } from '@/components/LazyYouTube'
import { RoleCalculator } from '@/components/RoleCalculator'
import { EmbeddedJobBoard } from '@/components/EmbeddedJobBoard'
import { getOGImageUrl, getImage, getHeroImageUrl } from '@/lib/images'

const ogImage = getOGImageUrl('cro')
const imageAlt = getImage('cro').alt
const heroImage = getHeroImageUrl('cro', 1920, 800)
const imageCredit = getImage('cro')

export const metadata: Metadata = {
  title: 'What is a Fractional CRO? | Guide',
  description: 'What is a fractional CRO? A part-time Chief Revenue Officer for multiple companies. Learn about roles, costs, and when to hire. UK guide.',
  keywords: 'what is a fractional cro, fractional cro meaning, fractional cro definition, part time cro, fractional revenue officer, fractional chief revenue officer, what does a fractional cro do',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cro',
  },
  openGraph: {
    title: 'What is a Fractional CRO? | Complete Guide',
    description: 'Understand fractional CRO meaning, responsibilities, and costs. Learn when to hire a part-time Chief Revenue Officer.',
    url: 'https://fractional.quest/fractional-cro',
    images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What is a Fractional CRO? | Complete Guide',
    description: 'Understand fractional CRO meaning, responsibilities, and costs.',
    images: [ogImage],
  },
}

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'What is a Fractional CRO', href: '/fractional-cro' },
]

export default function FractionalCroPage() {
  return (
    <div className="min-h-screen bg-white">
      <WebPageSchema
        title="What is a Fractional CRO? | Part-Time Chief Revenue Officer Guide"
        description="Complete guide to fractional CRO meaning, responsibilities, costs, and when to hire one. Learn what a part-time Chief Revenue Officer does."
        url="https://fractional.quest/fractional-cro"
        dateModified={new Date('2026-01-17')}
      />
      <FAQPageSchema faqs={CRO_FAQS} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`What is a Fractional CRO - ${imageAlt}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-500/80 to-purple-500/60" />
        <div className="relative z-10 w-full py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <BreadcrumbsLight items={breadcrumbs} className="mb-8" />
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Role Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                What is a <strong>Fractional CRO</strong>?
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                A <strong>fractional CRO</strong> is a part-time Chief Revenue Officer who provides strategic revenue leadership to companies on a flexible basis. Learn about <strong>fractional CRO meaning</strong>, responsibilities, and costs.
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
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">Fractional CRO Definition</h2>
            <p className="text-2xl font-light leading-relaxed">
              A <strong className="font-semibold">Fractional CRO</strong> (Fractional Chief Revenue Officer) is an experienced revenue executive who works with companies on a part-time or contract basis, typically 1-3 days per week, providing strategic revenue leadership and sales team management without the cost of a full-time hire.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <article className="prose prose-lg prose-gray max-w-none">

            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Fractional CRO? Understanding the Role</h2>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              The <strong>fractional CRO meaning</strong> centres on flexible, senior-level revenue leadership. Unlike traditional full-time CROs earning £180,000-£300,000 annually, a <strong>fractional Chief Revenue Officer</strong> works with multiple companies simultaneously, dedicating typically 1-3 days per week to each client.
            </p>

            <p>
              This model emerged from the SaaS and tech ecosystem where companies need CRO-level expertise for scaling revenue, building sales teams, and developing go-to-market strategies but cannot justify the cost of a full-time revenue executive.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">What Does a Fractional CRO Do?</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Revenue Strategy', desc: 'Developing revenue plans aligned with business goals', icon: '📊' },
                { title: 'Sales Team Building', desc: 'Hiring, training, and managing sales teams', icon: '👥' },
                { title: 'Go-to-Market', desc: 'Developing and executing GTM strategies', icon: '🚀' },
                { title: 'Pipeline Management', desc: 'Building and optimising sales pipeline', icon: '📈' },
                { title: 'Revenue Operations', desc: 'Systems, processes, and analytics', icon: '⚙️' },
                { title: 'Customer Success', desc: 'Aligning sales with retention and expansion', icon: '🤝' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CRO vs VP Sales</h2>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Factor</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fractional CRO</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">VP Sales</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Scope</td>
                    <td className="px-6 py-4 text-sm text-gray-600">All revenue functions</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Sales only</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Reporting</td>
                    <td className="px-6 py-4 text-sm text-gray-600">CEO/Board level</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Reports to CRO/CEO</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Focus</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Strategy + execution</td>
                    <td className="px-6 py-4 text-sm text-gray-600">Execution focused</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Day Rate</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£1,000-£1,500</td>
                    <td className="px-6 py-4 text-sm text-gray-600">£700-£1,100</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">When Do You Need a Fractional CRO?</h2>

            <ul className="space-y-3">
              <li><strong>Scaling Revenue:</strong> Need to grow from £1M to £10M+ ARR</li>
              <li><strong>Building Sales Team:</strong> First or second sales hires needed</li>
              <li><strong>Market Expansion:</strong> Entering new markets or segments</li>
              <li><strong>Fundraising Prep:</strong> Need to demonstrate revenue predictability</li>
              <li><strong>Sales Transformation:</strong> Moving from founder-led to team-led sales</li>
              <li><strong>Revenue Operations:</strong> Building systems and processes</li>
            </ul>

            <div className="bg-blue-50 p-6 border border-blue-200 rounded-lg my-8 not-prose">
              <p className="text-blue-800 font-medium mb-3">Ready to hire a fractional CRO?</p>
              <Link href="/hire-fractional-cro" className="inline-flex items-center text-blue-700 font-bold hover:text-blue-900">
                Complete Guide: How to Hire a Fractional CRO →
              </Link>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Fractional CRO Cost UK</h2>

            <div className="bg-gray-50 p-6 rounded-lg my-6 not-prose">
              <h4 className="font-bold text-gray-900 mb-4">Typical Fractional CRO Pricing</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1 day/week:</strong> £4,000-£6,000/month (£48,000-£72,000/year)</li>
                <li><strong>2 days/week:</strong> £8,000-£12,000/month (£96,000-£144,000/year)</li>
                <li><strong>3 days/week:</strong> £12,000-£18,000/month (£144,000-£216,000/year)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">Compare to full-time CRO: £200,000-£350,000+ (salary + benefits + equity)</p>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Types of Fractional CRO</h2>

            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'SaaS CRO', desc: 'ARR growth and SaaS metrics expertise', rate: '£1,100-£1,500/day' },
                { title: 'PE Portfolio CRO', desc: 'Value creation and exit preparation', rate: '£1,200-£1,600/day' },
                { title: 'PLG CRO', desc: 'Product-led growth and self-serve revenue', rate: '£1,000-£1,400/day' },
                { title: 'International CRO', desc: 'Market expansion and global teams', rate: '£1,200-£1,700/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-blue-700 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16 mb-6">Key Skills</h2>

            <p>
              Most <strong>fractional CROs</strong> have expertise in:
            </p>

            <ul className="space-y-2">
              <li><strong>Revenue Operations</strong> - Salesforce, HubSpot, Clari, revenue analytics</li>
              <li><strong>Sales Methodology</strong> - MEDDIC, Challenger, Solution Selling</li>
              <li><strong>Team Building</strong> - Hiring, training, performance management</li>
              <li><strong>Market Strategy</strong> - GTM planning, competitive positioning</li>
            </ul>

          </article>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculate</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Fractional CRO Cost Calculator
            </h2>
          </div>
          <RoleCalculator role="cro" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Frequently Asked Questions About Fractional CROs
            </h2>
          </div>
          <FAQ items={CRO_FAQS} title="" />
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/hire-fractional-cro" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">📋</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">How to Hire a Fractional CRO</h3>
              <p className="text-gray-600 text-sm">Complete guide to hiring process</p>
            </Link>
            <Link href="/fractional-cro-jobs-uk" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">💼</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Fractional CRO Jobs UK</h3>
              <p className="text-gray-600 text-sm">Browse live fractional CRO roles</p>
            </Link>
            <Link href="/fractional-cro-salary" className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors group">
              <span className="text-2xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-700 mb-2">Fractional CRO Salary Guide</h3>
              <p className="text-gray-600 text-sm">UK salary benchmarks and rates</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Work with a Fractional CRO?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Browse pre-vetted fractional CRO candidates or post your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/fractional-cro-jobs-uk"
              className="px-8 py-4 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-400 transition-colors"
            >
              Browse Fractional CROs
            </Link>
            <Link
              href="/hire-fractional-cro"
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Fractional CRO Jobs UK</h2>
            <p className="text-xl text-gray-500">Find your next fractional CRO opportunity</p>
          </div>
          <EmbeddedJobBoard
            defaultDepartment="Sales"
            title="Latest Sales & Revenue Jobs"
            accentColor="blue"
            jobsPerPage={6}
          />
        </div>
      </section>
    </div>
  )
}
