// Case Study Data - Real client engagements
const CASE_STUDIES = {
  oneup: {
    id: 'oneup',
    logo: '1U',
    logoGradient: 'from-blue-600 to-purple-600',
    company: 'OneUp Productions',
    industry: 'Gaming & Esports Production',
    role: 'Fractional GTM Lead',
    challenge: 'OneUp Productions needed to expand into new international markets but lacked the in-house expertise for go-to-market strategy. They needed senior GTM leadership without the commitment of a full-time hire.',
    solution: 'Engaged as Fractional GTM Lead to develop and execute market expansion strategy, working 2-3 days per week alongside the existing leadership team.',
    metrics: [
      { value: '3', label: 'New Markets Entered', color: 'blue' },
      { value: 'GTM', label: 'Strategy Delivered', color: 'green' },
      { value: '2-3', label: 'Days Per Week', color: 'purple' },
    ],
    benefits: [
      { title: 'Cost Effective', description: 'Senior GTM expertise at a fraction of full-time hire cost' },
      { title: 'Immediate Impact', description: 'Hit the ground running with proven playbooks' },
      { title: 'Flexible Scale', description: 'Adjusted involvement as needs evolved' },
    ],
    tags: ['Fractional GTM', 'Market Expansion', 'Gaming Industry', 'International Growth'],
  },
  sony: {
    id: 'sony',
    logo: 'SONY',
    logoGradient: 'from-gray-800 to-gray-900',
    company: 'Sony PlayStation',
    industry: 'Gaming & Entertainment',
    role: 'Fractional CMO',
    challenge: 'Sony PlayStation\'s European marketing team needed senior strategic leadership during a product launch cycle. The internal team required guidance on digital transformation and go-to-market execution.',
    solution: 'Provided Fractional CMO services focused on digital marketing strategy, campaign optimization, and team mentorship over a 6-month engagement.',
    metrics: [
      { value: '40%', label: 'Campaign ROI Increase', color: 'blue' },
      { value: '6', label: 'Month Engagement', color: 'green' },
      { value: '12', label: 'Team Members Mentored', color: 'purple' },
    ],
    benefits: [
      { title: 'Enterprise Experience', description: 'Brought big-company best practices to the regional team' },
      { title: 'Knowledge Transfer', description: 'Upskilled internal marketing capabilities' },
      { title: 'Launch Success', description: 'Delivered results within tight timeline' },
    ],
    tags: ['Fractional CMO', 'Digital Marketing', 'Enterprise', 'Product Launch'],
  },
  ckdelta: {
    id: 'ckdelta',
    logo: 'CKD',
    logoGradient: 'from-emerald-500 to-teal-600',
    company: 'CK Delta',
    industry: 'Data & Analytics',
    role: 'Fractional CRO',
    challenge: 'CK Delta, a fast-growing data analytics company, needed to build out their revenue operations but couldn\'t justify a full-time CRO hire at their stage.',
    solution: 'Implemented Fractional CRO model to establish sales processes, CRM systems, and revenue forecasting working 2 days per week.',
    metrics: [
      { value: '3x', label: 'Pipeline Growth', color: 'emerald' },
      { value: '60%', label: 'Win Rate Improvement', color: 'green' },
      { value: '£2M', label: 'ARR Milestone', color: 'purple' },
    ],
    benefits: [
      { title: 'Scalable Foundation', description: 'Built processes that scale with growth' },
      { title: 'Right-sized Investment', description: 'Got CRO expertise at startup budget' },
      { title: 'Investor Ready', description: 'Metrics and processes for Series A' },
    ],
    tags: ['Fractional CRO', 'Revenue Operations', 'Startups', 'SaaS'],
  },
}

type CaseStudyId = keyof typeof CASE_STUDIES

interface CaseStudyProps {
  variant?: 'full' | 'card' | 'grid'
  caseStudyId?: CaseStudyId
  className?: string
}

/**
 * E-E-A-T Authority Component - Real Case Studies
 * Demonstrates actual fractional executive experience
 * Shows Google we have real-world expertise, not just content
 */
export function CaseStudy({ variant = 'full', caseStudyId = 'oneup', className = '' }: CaseStudyProps) {
  const study = CASE_STUDIES[caseStudyId]

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${study.logoGradient} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
            {study.logo}
          </div>
          <div>
            <div className="font-bold text-gray-900">{study.company}</div>
            <div className="text-sm text-gray-500">{study.role}</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {study.challenge.slice(0, 120)}...
        </p>
        <div className="flex flex-wrap gap-2">
          {study.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    )
  }

  // Grid variant - show all case studies as cards
  if (variant === 'grid') {
    return (
      <section className={`py-16 bg-gray-50 ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
              Real Client Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fractional Executive <span className="text-blue-600">Case Studies</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how fractional executive leadership delivers real results across industries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.values(CASE_STUDIES).map((cs) => (
              <div key={cs.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cs.logoGradient} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                    {cs.logo}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{cs.company}</div>
                    <div className="text-sm text-gray-500">{cs.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {cs.challenge}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className={`text-lg font-bold text-${m.color}-600`}>{m.value}</div>
                      <div className="text-xs text-gray-500">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cs.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full variant - detailed single case study
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Real Fractional Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Case Study: <span className="text-blue-600">{study.role} in Action</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how fractional executive work delivers real results for growing companies
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className={`bg-gradient-to-r ${study.logoGradient} p-6 text-white`}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
                {study.logo}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{study.company}</h3>
                <p className="text-white/80">{study.industry}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                  The Challenge
                </h4>
                <p className="text-gray-600">
                  {study.challenge}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">2</span>
                  The Solution
                </h4>
                <p className="text-gray-600">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h4 className="font-bold text-gray-900 mb-4">Key Deliverables</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className={`text-2xl font-bold text-${metric.color}-600 mb-1`}>{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Fractional Works */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-3">Why Fractional Worked Here</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                {study.benefits.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span><strong>{benefit.title}</strong> — {benefit.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, idx) => {
                const colors = ['blue', 'purple', 'green', 'orange']
                const color = colors[idx % colors.length]
                return (
                  <span key={tag} className={`px-3 py-1 bg-${color}-100 text-${color}-700 text-sm rounded-full`}>
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export case study IDs for use in pages
export const CASE_STUDY_IDS = Object.keys(CASE_STUDIES) as CaseStudyId[]

// Schema.org Case Study markup
export function CaseStudySchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Fractional GTM Case Study: OneUp Productions Market Expansion",
    "description": "How fractional executive leadership helped OneUp Productions expand into new international markets.",
    "author": {
      "@id": "https://fractional.quest/#dan-keegan"
    },
    "publisher": {
      "@id": "https://fractional.quest/#organization"
    },
    "about": {
      "@type": "Service",
      "name": "Fractional GTM Services",
      "description": "Part-time go-to-market executive leadership for growing companies"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
