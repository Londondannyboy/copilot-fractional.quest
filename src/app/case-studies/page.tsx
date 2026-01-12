import { Metadata } from 'next'
import Link from 'next/link'
import { CaseStudy } from '@/components/CaseStudy'
import { TrustSignals, TrustSignalsSchema } from '@/components/TrustSignals'
import { Testimonials, TestimonialsSchema } from '@/components/Testimonials'
import { ExpertProfile, ExpertProfileSchema } from '@/components/ExpertProfile'

export const metadata: Metadata = {
  title: 'Fractional Executive Case Studies | Real Client Success Stories',
  description: 'Discover how fractional executives deliver results. Real case studies from Sony, OneUp Productions, CK Delta and more. See ROI, metrics, and outcomes.',
  keywords: ['fractional executive case studies', 'fractional cfo success stories', 'fractional cto results', 'fractional cmo case study', 'portfolio career examples'],
  openGraph: {
    title: 'Fractional Executive Case Studies | Real Client Success Stories',
    description: 'Discover how fractional executives deliver results. Real case studies from Sony, OneUp Productions, CK Delta and more.',
    url: 'https://fractional.quest/case-studies',
    type: 'website',
  },
}

// Case studies data for individual cards with links
const CASE_STUDIES_DATA = [
  {
    id: 'oneup',
    slug: 'oneup-productions',
    company: 'OneUp Productions',
    industry: 'Gaming & Esports',
    role: 'Fractional GTM Lead',
    challenge: 'Needed to expand into new international markets without full-time GTM hire',
    outcome: '3 new markets entered',
    metrics: ['3 New Markets', 'GTM Strategy', '2-3 Days/Week'],
    tags: ['Gaming', 'Market Expansion', 'GTM'],
    logo: '1U',
    gradient: 'from-blue-600 to-purple-600',
  },
  {
    id: 'sony',
    slug: 'sony-playstation',
    company: 'Sony PlayStation',
    industry: 'Gaming & Entertainment',
    role: 'Fractional CMO',
    challenge: 'European marketing team needed strategic leadership during product launch',
    outcome: '40% campaign ROI increase',
    metrics: ['40% ROI Increase', '6 Month Engagement', '12 Team Members'],
    tags: ['Enterprise', 'Digital Marketing', 'Product Launch'],
    logo: 'SONY',
    gradient: 'from-gray-800 to-gray-900',
  },
  {
    id: 'ckdelta',
    slug: 'ck-delta',
    company: 'CK Delta',
    industry: 'Data & Analytics',
    role: 'Fractional CRO',
    challenge: 'Fast-growing startup needed revenue operations without full-time CRO cost',
    outcome: '£2M ARR milestone achieved',
    metrics: ['3x Pipeline Growth', '60% Win Rate', '£2M ARR'],
    tags: ['Startups', 'SaaS', 'Revenue Operations'],
    logo: 'CKD',
    gradient: 'from-emerald-500 to-teal-600',
  },
]

// Additional mini case studies / success stories
const SUCCESS_STORIES = [
  {
    company: 'Series A Fintech',
    role: 'Fractional CFO',
    outcome: 'Raised £5M Series A in 4 months',
    industry: 'Fintech',
  },
  {
    company: 'E-commerce Scale-up',
    role: 'Fractional COO',
    outcome: 'Reduced ops costs by 35%',
    industry: 'E-commerce',
  },
  {
    company: 'Healthcare Tech',
    role: 'Fractional CTO',
    outcome: 'Launched MVP in 8 weeks',
    industry: 'Healthcare',
  },
  {
    company: 'B2B SaaS',
    role: 'Fractional CMO',
    outcome: 'Grew MQLs by 250%',
    industry: 'SaaS',
  },
  {
    company: 'Manufacturing Co',
    role: 'Fractional CHRO',
    outcome: 'Built team from 20 to 80',
    industry: 'Manufacturing',
  },
  {
    company: 'Legal Tech Startup',
    role: 'Fractional CPO',
    outcome: 'Launched 3 new products',
    industry: 'Legal Tech',
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full mb-6">
              Real Results, Real Companies
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
              Fractional Executive <span className="text-emerald-400">Case Studies</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              See how fractional executives deliver transformative results for companies across industries.
              Real metrics, real outcomes, real impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/fractional-jobs-uk"
                className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors"
              >
                Find Your Next Role
              </Link>
              <Link
                href="/book-call"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Hire a Fractional Executive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">50+</div>
              <div className="text-sm text-gray-600">Case Studies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">200+</div>
              <div className="text-sm text-gray-600">Companies Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">£50M+</div>
              <div className="text-sm text-gray-600">Value Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">4.9/5</div>
              <div className="text-sm text-gray-600">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Detailed breakdowns of how fractional executives transformed these businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CASE_STUDIES_DATA.map((study) => (
              <div
                key={study.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${study.gradient} p-6 text-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold">
                      {study.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{study.company}</h3>
                      <p className="text-white/80 text-sm">{study.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-emerald-600">{study.role}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{study.challenge}</p>

                  {/* Outcome */}
                  <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-emerald-600 font-medium mb-1">Key Outcome</div>
                    <div className="text-lg font-bold text-emerald-700">{study.outcome}</div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.metrics.map((metric) => (
                      <div key={metric} className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600">{metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Case Study Component */}
      <CaseStudy caseStudyId="oneup" />

      {/* Success Stories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick wins and transformative outcomes from fractional engagements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map((story, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {story.company.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{story.company}</div>
                    <div className="text-sm text-gray-500">{story.industry}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-emerald-600 font-medium">{story.role}</span>
                </div>
                <div className="text-lg font-semibold text-gray-800">{story.outcome}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials variant="grid" limit={4} />
      <TestimonialsSchema />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Ready to Create Your Own Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you&apos;re a fractional executive or a company seeking one, we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/fractional-jobs-uk"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Browse Opportunities
            </Link>
            <Link
              href="/book-call"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-xl hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Profile */}
      <ExpertProfile />
      <ExpertProfileSchema />
      <TrustSignalsSchema />
    </main>
  )
}
