'use client'

interface CompanyInsightsProps {
  name: string
  industry?: string
  size?: string
  location?: string
  founded?: string
  description?: string
  highlights?: string[]
  fractionalRoles?: string[]
  linkedInUrl?: string
  websiteUrl?: string
}

/**
 * CompanyInsights - Displays company information
 *
 * Can be rendered by CopilotKit agent via compose_mdx_response tool:
 *
 * ```mdx
 * <CompanyInsights
 *   name="TechCo Ltd"
 *   industry="SaaS / FinTech"
 *   size="50-200 employees"
 *   location="London, UK"
 *   founded="2019"
 *   description="Fast-growing fintech company..."
 *   highlights={["Series B funded", "Remote-first", "4.5 Glassdoor rating"]}
 *   fractionalRoles={["CTO", "CFO"]}
 * />
 * ```
 */
export default function CompanyInsights({
  name,
  industry,
  size,
  location,
  founded,
  description,
  highlights = [],
  fractionalRoles = [],
  linkedInUrl,
  websiteUrl,
}: CompanyInsightsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-xl mb-1">{name}</h3>
            {industry && (
              <p className="text-slate-300 text-sm">{industry}</p>
            )}
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🏢</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200">
        {size && (
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Size</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{size}</p>
          </div>
        )}
        {location && (
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{location}</p>
          </div>
        )}
        {founded && (
          <div className="px-4 py-3 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Founded</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{founded}</p>
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="px-6 py-4 bg-emerald-50 border-t border-gray-200">
          <p className="text-xs font-medium text-emerald-800 uppercase tracking-wider mb-3">
            Company Highlights
          </p>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
              >
                <span>✓</span> {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Fractional Roles */}
      {fractionalRoles.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-3">
            Fractional Roles Hiring
          </p>
          <div className="flex flex-wrap gap-2">
            {fractionalRoles.map((role, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium"
              >
                Fractional {role}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm text-center transition-colors"
          >
            Visit Website
          </a>
        )}
        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
          >
            LinkedIn
          </a>
        )}
        <button className="px-4 py-2 border border-gray-300 hover:border-gray-400 rounded-lg text-sm font-medium text-gray-700 transition-colors">
          Follow
        </button>
      </div>
    </div>
  )
}
