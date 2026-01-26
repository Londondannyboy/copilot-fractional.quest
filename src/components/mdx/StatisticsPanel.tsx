'use client'

interface Statistic {
  key?: string
  value: string
  description: string
  source: string
  trend?: 'up' | 'down' | 'stable'
}

interface StatisticsPanelProps {
  title?: string
  statistics: Statistic[] | Record<string, { value: string; description: string; source: string }>
  variant?: 'cards' | 'horizontal' | 'featured'
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
}

const accentColors = {
  emerald: { value: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  blue: { value: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  amber: { value: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  purple: { value: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  red: { value: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  indigo: { value: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
}

const trendIcons = {
  up: '📈',
  down: '📉',
  stable: '➡️',
}

/**
 * StatisticsPanel - Display market statistics with citations
 *
 * Shows key statistics with source citations for credibility.
 *
 * Usage in MDX:
 * ```mdx
 * <StatisticsPanel
 *   title="Market Statistics"
 *   statistics={[
 *     { value: "250%", description: "Growth in demand since 2020", source: "ICAEW Research", trend: "up" }
 *   ]}
 *   variant="cards"
 *   accentColor="emerald"
 * />
 * ```
 */
export default function StatisticsPanel({
  title = 'Market Statistics',
  statistics,
  variant = 'cards',
  accentColor = 'emerald',
}: StatisticsPanelProps) {
  const colors = accentColors[accentColor]

  // Convert object to array if needed
  const statsArray: Statistic[] = Array.isArray(statistics)
    ? statistics
    : Object.entries(statistics).map(([key, stat]) => ({ key, ...stat }))

  if (statsArray.length === 0) return null

  if (variant === 'horizontal') {
    return (
      <div className={`${colors.bg} border ${colors.border} rounded-lg p-6 my-8`}>
        <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(statsArray.length, 4)} gap-6`}>
          {statsArray.slice(0, 4).map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-3xl md:text-4xl font-black ${colors.value} mb-1`}>
                {stat.trend && <span className="text-xl mr-1">{trendIcons[stat.trend]}</span>}
                {stat.value}
              </div>
              <p className="text-sm text-gray-700 mb-1">{stat.description}</p>
              <p className="text-xs text-gray-500">Source: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    const featured = statsArray[0]
    const rest = statsArray.slice(1, 4)

    return (
      <div className="my-8">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Key Statistics</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Featured stat */}
          <div className={`md:col-span-1 ${colors.bg} border-2 ${colors.border} rounded-xl p-8 text-center`}>
            <div className={`text-5xl md:text-6xl font-black ${colors.value} mb-3`}>
              {featured.trend && <span className="text-3xl">{trendIcons[featured.trend]}</span>}
              {featured.value}
            </div>
            <p className="text-lg text-gray-800 font-medium mb-2">{featured.description}</p>
            <p className="text-sm text-gray-500">Source: {featured.source}</p>
          </div>

          {/* Secondary stats */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rest.map((stat, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
                <div className={`text-2xl font-black ${colors.value} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-sm text-gray-700 mb-1">{stat.description}</p>
                <p className="text-xs text-gray-500">{stat.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Default: cards
  return (
    <div className="py-8">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-2">Market Data</span>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsArray.map((stat, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className={`text-3xl font-black ${colors.value} mb-2`}>
              {stat.trend && <span className="text-xl mr-1">{trendIcons[stat.trend]}</span>}
              {stat.value}
            </div>
            <p className="text-gray-800 mb-2">{stat.description}</p>
            <p className="text-xs text-gray-500 border-t border-gray-100 pt-2 mt-2">
              📊 {stat.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
