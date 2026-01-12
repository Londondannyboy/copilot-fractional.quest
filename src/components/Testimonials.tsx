'use client'

// Testimonial data - REAL client feedback only
// Note: Only include testimonials from actual fractional engagements
const TESTIMONIALS = [
  {
    id: 'oneup',
    quote: "As a growing gaming company, we needed GTM expertise but couldn't justify a full-time hire. The fractional model gave us exactly what we needed - senior leadership at a pace and budget that worked for us.",
    author: 'CEO',
    company: 'OneUp Productions',
    role: 'Gaming & Esports',
    avatar: '1U',
    avatarBg: 'from-blue-600 to-purple-600',
    result: '3 New Markets Entered',
  },
  // Additional testimonials will be added as we collect real feedback from clients
]

interface TestimonialsProps {
  variant?: 'grid' | 'carousel' | 'featured'
  limit?: number
  className?: string
}

/**
 * E-E-A-T Authority Component - Client Testimonials
 * Shows REAL feedback from fractional executive engagements
 * Only includes verified testimonials from actual clients
 */
export function Testimonials({ variant = 'grid', limit, className = '' }: TestimonialsProps) {
  const testimonials = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null
  }

  // Single testimonial - use featured style
  if (testimonials.length === 1 || variant === 'featured') {
    const testimonial = testimonials[0]
    return (
      <section className={`py-12 bg-gray-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            Client Feedback
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.avatarBg} rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                {testimonial.avatar}
              </div>
              <div>
                <blockquote className="text-lg text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.company} • {testimonial.role}</div>
                  </div>
                  {testimonial.result && (
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonial.result}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Grid layout for multiple testimonials
  if (variant === 'grid') {
    return (
      <section className={`py-12 bg-gray-50 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.avatarBg} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.company}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 text-sm mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">— {testimonial.author}</div>
                  {testimonial.result && (
                    <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                      {testimonial.result}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Carousel layout
  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-playfair">
          Client Testimonials
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-sm border border-gray-100 snap-start"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.avatarBg} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonial.company}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <blockquote className="text-gray-600 text-sm mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">— {testimonial.author}</div>
                {testimonial.result && (
                  <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-medium">
                    {testimonial.result}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Schema.org Review markup for testimonials
 * Only generates schema for real testimonials
 */
export function TestimonialsSchema() {
  if (TESTIMONIALS.length === 0) return null

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Fractional Quest",
    "review": TESTIMONIALS.map(t => ({
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
    />
  )
}
