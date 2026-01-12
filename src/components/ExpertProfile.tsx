import Image from 'next/image'

interface ExpertProfileProps {
  variant?: 'full' | 'compact'
  className?: string
}

/**
 * E-E-A-T Authority Component
 * Displays Dan Keegan's expert profile to establish credibility and trust
 * IMPORTANT: Only include truthful, verifiable information
 */
export function ExpertProfile({ variant = 'full', className = '' }: ExpertProfileProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 ${className}`}>
        <Image
          src="/dan-keegan.webp"
          alt="Dan Keegan - Fractional Executive Expert"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/30"
        />
        <div>
          <div className="font-bold text-gray-900">Dan Keegan</div>
          <div className="text-sm text-blue-600">Fractional GTM Expert</div>
          <div className="text-xs text-gray-500">15+ years executive experience</div>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full mb-4">
            Meet the Expert
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Written by a <span className="text-blue-400">Practicing Fractional Executive</span>
          </h2>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <Image
                src="/dan-keegan.webp"
                alt="Dan Keegan - Fractional Executive Expert with 15+ years experience in GTM, strategy, and executive leadership"
                title="Dan Keegan - Founder of Fractional Quest"
                width={200}
                height={200}
                className="w-48 h-48 rounded-xl object-cover border-2 border-blue-500/50"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Dan Keegan</h3>
              <p className="text-blue-400 font-medium mb-4">Founder & Fractional GTM Expert</p>
              <p className="text-gray-300 mb-4">
                With <strong>over 15 years of experience</strong> in executive leadership, go-to-market strategy, and business development, Dan brings real-world fractional expertise to help professionals navigate the executive job market.
              </p>
              <p className="text-gray-400 mb-4">
                Dan founded Fractional Quest after working as a fractional executive himself, understanding firsthand the challenges of finding quality opportunities and the value fractional leaders bring to growing businesses.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">15+ Years Executive Experience</span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full">Fractional GTM</span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full">Strategy & Growth</span>
              </div>

              {/* Connect */}
              <div className="pt-6 border-t border-white/10">
                <a
                  href="https://linkedin.com/in/dankeegan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Prior Experience Row - TRUTHFULLY labeled as employment history */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm mb-4">Prior executive experience includes</p>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">SONY</span>
                </div>
                <span className="text-gray-300 text-sm">Sony</span>
              </div>
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center">
                  <span className="text-orange-400 font-bold text-sm">O</span>
                </div>
                <span className="text-gray-300 text-sm">Orange</span>
              </div>
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center">
                  <span className="text-red-400 font-bold text-[10px]">H3G</span>
                </div>
                <span className="text-gray-300 text-sm">Hutchison</span>
              </div>
            </div>
          </div>

          {/* Fractional Client */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm mb-4">Current fractional client</p>
            <div className="flex justify-center">
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded flex items-center justify-center">
                  <span className="text-blue-300 font-bold text-[10px]">1U</span>
                </div>
                <span className="text-gray-300 text-sm">OneUp Productions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Schema.org markup for ExpertProfile
 * Establishes Dan as an authoritative expert in the fractional executive space
 */
export function ExpertProfileSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dan Keegan",
    "jobTitle": "Founder & Fractional GTM Expert",
    "description": "Fractional executive expert with 15+ years of experience in GTM strategy and executive leadership. Founder of Fractional Quest.",
    "url": "https://fractional.quest/about",
    "image": "https://fractional.quest/dan-keegan.webp",
    "sameAs": [
      "https://linkedin.com/in/dankeegan"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Fractional Quest"
    },
    "knowsAbout": [
      "Fractional Executive Work",
      "Go-to-Market Strategy",
      "Executive Leadership",
      "Business Development",
      "Portfolio Careers"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
