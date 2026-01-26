// Case Study Data - REAL fractional engagements only
// Note: Only include case studies from actual fractional services provided
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
    link: '/case-studies/oneup-productions',
  },
  // Additional case studies will be added as we complete more fractional engagements
}

type CaseStudyId = keyof typeof CASE_STUDIES

interface CaseStudyProps {
  variant?: 'full' | 'card' | 'grid'
  caseStudyId?: CaseStudyId
  className?: string
}

/**
 * E-E-A-T Authority Component - Real Case Studies
 * Demonstrates ACTUAL fractional executive engagements
 * Only includes verified case studies from real client work
 */
export function CaseStudy({ variant = 'full', caseStudyId = 'oneup', className = '' }: CaseStudyProps) {
  const study = CASE_STUDIES[caseStudyId]

  if (!study) return null

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
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        {study.link && (
          <a href={study.link} className="mt-4 inline-block text-sm text-emerald-700 hover:text-emerald-800 font-medium">
            Read full case study →
          </a>
        )}
      </div>
    )
  }

  if (variant === 'grid') {
    const studies = Object.values(CASE_STUDIES)

    // If only one case study, show as featured
    if (studies.length === 1) {
      return (
        <section className={`py-12 bg-white ${className}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
              Case Study
            </h2>
            <CaseStudy variant="full" caseStudyId={studies[0].id as CaseStudyId} />
          </div>
        </section>
      )
    }

    return (
      <section className={`py-12 bg-white ${className}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            Case Studies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((s) => (
              <CaseStudy key={s.id} variant="card" caseStudyId={s.id as CaseStudyId} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Full variant - detailed case study
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${study.logoGradient} rounded-xl flex items-center justify-center text-white font-bold text-2xl`}>
              {study.logo}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
              <p className="text-gray-500">{study.industry}</p>
              <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {study.role}
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="text-center p-4 bg-white rounded-xl border border-gray-100">
                <div className={`text-2xl font-bold text-${metric.color}-600`}>{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">The Challenge</h4>
              <p className="text-gray-600 text-sm">{study.challenge}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Our Approach</h4>
              <p className="text-gray-600 text-sm">{study.solution}</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {study.benefits.map((benefit) => (
              <div key={benefit.title} className="p-4 bg-emerald-50 rounded-xl">
                <h5 className="font-semibold text-emerald-900 text-sm mb-1">{benefit.title}</h5>
                <p className="text-emerald-700 text-xs">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {study.link && (
            <div className="mt-6 text-center">
              <a
                href={study.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition-colors font-medium"
              >
                Read Full Case Study
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/**
 * Schema.org markup for case study
 * Provides structured data for search engines
 */
export function CaseStudySchema() {
  const studies = Object.values(CASE_STUDIES)

  if (studies.length === 0) return null

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${studies[0].company} Case Study - ${studies[0].role}`,
    "description": studies[0].challenge,
    "author": {
      "@type": "Person",
      "name": "Dan Keegan"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fractional Quest"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
