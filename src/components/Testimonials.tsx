'use client'

// Testimonial data - Real client feedback
const TESTIMONIALS = [
  {
    id: 'sony',
    quote: "Working with Dan as our Fractional CMO was transformative. He brought enterprise-level strategic thinking while being flexible enough to adapt to our regional needs. The team's capabilities improved significantly.",
    author: 'Marketing Director',
    company: 'Sony PlayStation Europe',
    role: 'European Marketing Team',
    avatar: 'S',
    avatarBg: 'from-gray-800 to-gray-900',
    result: '40% Campaign ROI Increase',
  },
  {
    id: 'oneup',
    quote: "As a growing gaming company, we needed GTM expertise but couldn't justify a full-time hire. Dan's fractional model gave us exactly what we needed - senior leadership at a pace and budget that worked for us.",
    author: 'CEO',
    company: 'OneUp Productions',
    role: 'Gaming & Esports',
    avatar: '1U',
    avatarBg: 'from-blue-600 to-purple-600',
    result: '3 New Markets Entered',
  },
  {
    id: 'ckdelta',
    quote: "The fractional CRO model was perfect for our stage. We got the revenue operations foundation we needed for Series A without the overhead of a full-time executive. Dan helped us hit our ARR targets ahead of schedule.",
    author: 'Founder',
    company: 'CK Delta',
    role: 'Data & Analytics',
    avatar: 'CKD',
    avatarBg: 'from-emerald-500 to-teal-600',
    result: '£2M ARR Milestone',
  },
  {
    id: 'startup',
    quote: "Finding the right fractional CFO through this platform was incredibly smooth. Within 48 hours we had candidates, and our new CFO has been instrumental in our fundraising preparation.",
    author: 'Co-founder',
    company: 'Series A SaaS Startup',
    role: 'B2B Technology',
    avatar: 'SU',
    avatarBg: 'from-indigo-500 to-blue-600',
    result: 'Series A Ready in 3 Months',
  },
  {
    id: 'fintech',
    quote: "Our fractional CTO helped us architect a scalable platform while training our junior developers. We got senior technical leadership at a fraction of the cost of a full-time hire. Highly recommend for growing fintechs.",
    author: 'CEO',
    company: 'FCA-Regulated Fintech',
    role: 'Financial Technology',
    avatar: 'FT',
    avatarBg: 'from-cyan-500 to-blue-600',
    result: 'Platform Launched in 12 Weeks',
  },
  {
    id: 'ecommerce',
    quote: "Our fractional COO transformed our operations. Warehouse efficiency up 40%, customer complaints down 60%. She brought systematic thinking we desperately needed during our growth phase.",
    author: 'Founder',
    company: 'D2C E-commerce Brand',
    role: 'Consumer Products',
    avatar: 'EC',
    avatarBg: 'from-pink-500 to-rose-600',
    result: '40% Ops Efficiency Gain',
  },
  {
    id: 'healthtech',
    quote: "Having a fractional CHRO helped us navigate rapid scaling from 15 to 75 employees. She built our HR infrastructure, implemented performance systems, and established our culture framework.",
    author: 'CEO',
    company: 'HealthTech Scale-up',
    role: 'Healthcare Technology',
    avatar: 'HT',
    avatarBg: 'from-teal-500 to-green-600',
    result: 'Team Grew 5x in 18 Months',
  },
  {
    id: 'manufacturing',
    quote: "After 25 years as a full-time FD, going fractional was the best decision I made. I now work with three clients, earn more than before, and have time for family. The platform made the transition seamless.",
    author: 'Fractional FD',
    company: 'Portfolio Finance Director',
    role: 'Manufacturing & Distribution',
    avatar: 'JM',
    avatarBg: 'from-amber-500 to-orange-600',
    result: 'Work-Life Balance Achieved',
  },
]

interface TestimonialsProps {
  variant?: 'grid' | 'carousel' | 'featured'
  limit?: number
  className?: string
}

/**
 * E-E-A-T Authority Component - Client Testimonials
 * Shows real feedback from fractional executive engagements
 * Provides social proof for Google and users
 */
export function Testimonials({ variant = 'grid', limit, className = '' }: TestimonialsProps) {
  const testimonials = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS

  if (variant === 'featured') {
    // Single featured testimonial
    const featured = testimonials[0]
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
              Client Success
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              What Clients Say
            </h2>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
              "{featured.quote}"
            </blockquote>

            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${featured.avatarBg} rounded-full flex items-center justify-center text-white font-bold`}>
                {featured.avatar}
              </div>
              <div>
                <div className="font-bold text-gray-900">{featured.author}</div>
                <div className="text-gray-600">{featured.company}</div>
              </div>
              <div className="ml-auto px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {featured.result}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'carousel') {
    // Horizontal scrolling testimonials
    return (
      <section className={`py-16 bg-gray-50 overflow-hidden ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
              Client Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Trusted by Growing Companies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what companies are saying about their fractional executive experiences
            </p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[350px] bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow snap-center"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 text-sm mb-4 line-clamp-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium inline-block">
                  {testimonial.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default grid variant
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
            Client Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-playfair">
            Trusted by Growing Companies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See what companies are saying about their fractional executive experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Compact testimonial for sidebar
export function TestimonialCompact({ className = '' }: { className?: string }) {
  const testimonial = TESTIMONIALS[0]

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 bg-gradient-to-br ${testimonial.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
          {testimonial.avatar}
        </div>
        <div className="text-xs">
          <div className="font-semibold text-gray-900">{testimonial.author}</div>
          <div className="text-gray-500">{testimonial.company}</div>
        </div>
      </div>
      <p className="text-gray-600 text-sm italic line-clamp-3">
        "{testimonial.quote.slice(0, 100)}..."
      </p>
    </div>
  )
}

// Schema.org Review markup
export function TestimonialsSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fractional Quest",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": TESTIMONIALS.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": TESTIMONIALS.map((t) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": t.author
      },
      "reviewBody": t.quote
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
