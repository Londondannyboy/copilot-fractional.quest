/**
 * EmploymentAgencySchema - Structured data for recruitment agency pages
 *
 * This schema tells Google that Fractional Quest is an employment agency
 * that specializes in fractional/part-time executive recruitment.
 */
export interface EmploymentAgencySchemaProps {
  name?: string
  description?: string
  url?: string
  logo?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  areaServed?: string[]
  serviceTypes?: string[]
  foundingDate?: string
  priceRange?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function EmploymentAgencySchema({
  name = 'Fractional Quest',
  description = 'UK fractional recruitment agency specializing in part-time and fractional executive placements. Connecting businesses with CFOs, CTOs, CMOs, COOs, and C-suite talent.',
  url = 'https://fractional.quest',
  logo = 'https://fractional.quest/logo.png',
  telephone = '+44 20 1234 5678',
  email = 'hello@fractional.quest',
  address = {
    addressLocality: 'London',
    addressRegion: 'Greater London',
    addressCountry: 'GB',
  },
  areaServed = ['United Kingdom', 'United States', 'Australia'],
  serviceTypes = [
    'Fractional Executive Recruitment',
    'Fractional CFO Recruitment',
    'Fractional CTO Recruitment',
    'Fractional CMO Recruitment',
    'Fractional COO Recruitment',
    'Interim Executive Search',
    'Part-Time Executive Placement',
    'C-Suite Recruitment',
  ],
  foundingDate = '2024',
  priceRange = '££',
  aggregateRating,
}: EmploymentAgencySchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name,
    description,
    url,
    logo,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    areaServed: areaServed.map(area => ({
      '@type': 'Country',
      name: area,
    })),
    makesOffer: serviceTypes.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service,
        description: `Professional ${service.toLowerCase()} services`,
      },
    })),
    foundingDate,
    priceRange,
    sameAs: [
      'https://www.linkedin.com/company/fractionalquest',
      'https://twitter.com/fractionalquest',
    ],
    // Add aggregate rating if available
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

/**
 * OrganizationSchema - Alternative for pages where we're not the primary service
 */
export function OrganizationSchema() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fractional Quest',
    legalName: 'Fractional Quest Ltd',
    url: 'https://fractional.quest',
    logo: 'https://fractional.quest/logo.png',
    description: 'AI-powered platform connecting businesses with fractional executives. The UK\'s leading job board for fractional CFOs, CTOs, CMOs, and C-suite talent.',
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@fractional.quest',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/fractionalquest',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
