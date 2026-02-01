'use client'

import Link from 'next/link'

// Founder's employment history - NOT fractional clients
const EMPLOYMENT_HISTORY = [
  { name: 'Sony', logo: 'SONY', bg: 'bg-gray-800', text: 'text-white' },
  { name: 'Orange', logo: 'O', bg: 'bg-orange-500', text: 'text-white' },
  { name: 'Hutchison', logo: 'H3G', bg: 'bg-red-600', text: 'text-white' },
]

// Actual fractional clients
const FRACTIONAL_CLIENTS = [
  { name: 'OneUp Productions', logo: '1U', bg: 'bg-gradient-to-br from-blue-500 to-purple-600', text: 'text-white' },
]

// REAL metrics only - be truthful!
const METRICS = [
  { value: '213+', label: 'Jobs Listed', color: 'emerald' },
  { value: '1', label: 'Fractional Client', color: 'blue' },
  { value: '£1,000+', label: 'Avg Day Rate', color: 'purple' },
  { value: '15+', label: 'Years Experience', color: 'amber' },
]

interface TrustSignalsProps {
  variant?: 'full' | 'compact' | 'logos-only' | 'stats-only' | 'sidebar'
  className?: string
  showCTA?: boolean
}

/**
 * TrustSignals - Reusable credibility component
 * IMPORTANT: Only show truthful, verifiable information
 */
export function TrustSignals({ variant = 'full', className = '', showCTA = true }: TrustSignalsProps) {

  if (variant === 'logos-only') {
    return (
      <div className={`py-8 ${className}`}>
        <p className="text-center text-gray-500 text-sm font-medium mb-6 uppercase tracking-wider">
          Founder&apos;s prior experience includes
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {EMPLOYMENT_HISTORY.map((client) => (
            <div key={client.name} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className={`w-10 h-10 ${client.bg} rounded-lg flex items-center justify-center`}>
                <span className={`${client.text} font-bold text-xs`}>{client.logo}</span>
              </div>
              <span className="text-gray-600 font-medium text-sm hidden sm:block">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'stats-only') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold text-${metric.color}-600 mb-1`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Sidebar variant - vertical stack for narrow containers
  if (variant === 'sidebar') {
    return (
      <div className={`bg-white border border-gray-200 rounded-xl p-4 ${className}`}>
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Platform Stats</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {METRICS.slice(0, 4).map((metric) => (
            <div key={metric.label} className="text-center p-2 bg-gray-50 rounded-lg">
              <div className={`text-lg font-bold text-${metric.color}-600`}>
                {metric.value}
              </div>
              <div className="text-xs text-gray-500">{metric.label}</div>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Founder&apos;s background</p>
          <div className="flex gap-2">
            {EMPLOYMENT_HISTORY.map((client) => (
              <div
                key={client.name}
                className={`w-8 h-8 ${client.bg} rounded flex items-center justify-center`}
                title={client.name}
              >
                <span className={`${client.text} font-bold text-[8px]`}>{client.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`py-6 bg-gray-50 border-y border-gray-200 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-700">213+</div>
              <div className="text-xs text-gray-500">Jobs Listed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">£1,000+</div>
              <div className="text-xs text-gray-500">Avg Day Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700">15+</div>
              <div className="text-xs text-gray-500">Years Experience</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Founder&apos;s background:</span>
              {EMPLOYMENT_HISTORY.slice(0, 3).map((client) => (
                <div
                  key={client.name}
                  className={`w-6 h-6 ${client.bg} rounded flex items-center justify-center`}
                  title={client.name}
                >
                  <span className={`${client.text} font-bold text-[8px]`}>{client.logo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <section className={`py-12 bg-gradient-to-br from-gray-50 to-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className={`text-3xl md:text-4xl font-bold text-${metric.color}-600 mb-1`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
            Founder&apos;s prior experience includes
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {EMPLOYMENT_HISTORY.map((client) => (
              <div key={client.name} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className={`w-10 h-10 ${client.bg} rounded-lg flex items-center justify-center`}>
                  <span className={`${client.text} font-bold text-xs`}>{client.logo}</span>
                </div>
                <span className="text-gray-600 font-medium text-sm hidden sm:block">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fractional Client */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
            Current Fractional Client
          </p>
          <div className="flex justify-center">
            {FRACTIONAL_CLIENTS.map((client) => (
              <div key={client.name} className="flex items-center gap-2">
                <div className={`w-10 h-10 ${client.bg} rounded-lg flex items-center justify-center`}>
                  <span className={`${client.text} font-bold text-xs`}>{client.logo}</span>
                </div>
                <span className="text-gray-600 font-medium text-sm">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {showCTA && (
          <div className="text-center pt-6 border-t border-gray-200">
            <Link
              href="/book-call"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Book a Discovery Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * Inline trust badge for use in content
 */
export function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Verified Fractional Expert
    </div>
  )
}

/**
 * Schema.org Organization markup
 */
export function TrustSignalsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fractional Quest",
    "url": "https://fractional.quest",
    "description": "UK platform for fractional executive jobs. Connecting businesses with senior leaders on a part-time basis.",
    "founder": {
      "@type": "Person",
      "name": "Dan Keegan"
    },
    "foundingDate": "2024",
    "sameAs": [
      "https://linkedin.com/company/fractional-quest"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
