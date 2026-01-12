'use client'

import Link from 'next/link'

// Client companies data
const CLIENTS = [
  { name: 'Sony', logo: 'SONY', bg: 'bg-gray-800', text: 'text-white' },
  { name: 'Orange', logo: 'O', bg: 'bg-orange-500', text: 'text-white' },
  { name: 'Hutchison', logo: 'H3G', bg: 'bg-red-600', text: 'text-white' },
  { name: 'OneUp', logo: '1U', bg: 'bg-gradient-to-br from-blue-500 to-purple-600', text: 'text-white' },
  { name: 'CK Delta', logo: 'CKD', bg: 'bg-emerald-600', text: 'text-white' },
]

// Success metrics
const METRICS = [
  { value: '500+', label: 'Executives Placed', color: 'emerald' },
  { value: '200+', label: 'Companies Helped', color: 'blue' },
  { value: '£150k+', label: 'Avg Annual Earnings', color: 'purple' },
  { value: '4.9/5', label: 'Client Rating', color: 'amber' },
]

interface TrustSignalsProps {
  variant?: 'full' | 'compact' | 'logos-only' | 'stats-only'
  className?: string
  showCTA?: boolean
}

/**
 * TrustSignals - Reusable credibility component
 * Shows client logos, success metrics, and optional CTA
 * Use on any page to boost E-E-A-T signals
 */
export function TrustSignals({ variant = 'full', className = '', showCTA = true }: TrustSignalsProps) {

  if (variant === 'logos-only') {
    return (
      <div className={`py-8 ${className}`}>
        <p className="text-center text-gray-500 text-sm font-medium mb-6 uppercase tracking-wider">
          Trusted by executives from leading companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {CLIENTS.map((client) => (
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

  if (variant === 'compact') {
    return (
      <div className={`bg-gray-50 rounded-xl p-6 border border-gray-200 ${className}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {CLIENTS.slice(0, 3).map((client) => (
              <div key={client.name} className={`w-8 h-8 ${client.bg} rounded flex items-center justify-center`}>
                <span className={`${client.text} font-bold text-[10px]`}>{client.logo}</span>
              </div>
            ))}
            <span className="text-sm text-gray-500">+{CLIENTS.length - 3} more</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-emerald-600">500+</div>
              <div className="text-xs text-gray-500">Executives</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">200+</div>
              <div className="text-xs text-gray-500">Companies</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full variant
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
            Trusted Platform
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
            The UK&apos;s Leading Fractional Executive Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connecting top-tier fractional executives with companies that need strategic leadership
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center p-6 bg-gray-50 rounded-xl">
              <div className={`text-3xl md:text-4xl font-bold text-${metric.color}-600 mb-2`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm font-medium mb-6 uppercase tracking-wider">
            Executives from these companies trust us
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {CLIENTS.map((client) => (
              <div key={client.name} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
                <div className={`w-12 h-12 ${client.bg} rounded-lg flex items-center justify-center`}>
                  <span className={`${client.text} font-bold text-sm`}>{client.logo}</span>
                </div>
                <span className="text-gray-700 font-semibold">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {showCTA && (
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Ready to join the leading fractional executive community?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/fractional-jobs-uk"
                className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/book-call"
                className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                Book a Call
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Inline trust badge for headers/nav
export function TrustBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm ${className}`}>
      <span className="font-medium">500+ executives placed</span>
      <span className="w-1 h-1 bg-emerald-500 rounded-full" />
      <span className="font-medium">4.9/5 rating</span>
    </div>
  )
}

// Schema markup for trust signals
export function TrustSignalsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://fractional.quest/#organization",
    "name": "Fractional Quest",
    "url": "https://fractional.quest",
    "logo": "https://fractional.quest/logo.png",
    "description": "The UK's leading platform for fractional executive jobs",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Dan Keegan",
      "@id": "https://fractional.quest/#dan-keegan"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "knowsAbout": [
      "Fractional CFO",
      "Fractional CTO",
      "Fractional CMO",
      "Fractional COO",
      "Fractional Executive Jobs",
      "Portfolio Career",
      "Part-time Executive Leadership"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
