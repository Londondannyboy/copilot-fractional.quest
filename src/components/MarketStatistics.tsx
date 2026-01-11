'use client'

interface Statistic {
  value: string
  description: string
  source: string
}

interface MarketStatisticsProps {
  statistics: Record<string, Statistic>
  title?: string
  location?: string
}

export function MarketStatistics({
  statistics,
  title = 'Market Statistics',
  location = 'London'
}: MarketStatisticsProps) {
  const statEntries = Object.entries(statistics)

  if (statEntries.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
            Data-Driven Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 font-playfair">
            {title}
          </h2>
          <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
            Key statistics shaping the {location} fractional executive landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statEntries.map(([key, stat]) => (
            <div
              key={key}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-emerald-500/50 transition-colors group"
            >
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <p className="text-white/90 font-medium mb-3">
                {stat.description}
              </p>
              <p className="text-slate-500 text-sm flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {stat.source}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Statistics updated quarterly. Sources include McKinsey, CIPD, ScaleUp Institute, and Fractional Quest internal data.
          </p>
        </div>
      </div>
    </section>
  )
}
