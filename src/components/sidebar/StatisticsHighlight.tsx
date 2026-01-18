'use client'

interface Statistic {
  value: string
  description: string
  source: string
}

interface StatisticsHighlightProps {
  statistics: Record<string, Statistic>
  title?: string
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'indigo'
}

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    value: 'text-emerald-700',
    accent: 'bg-emerald-600',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    value: 'text-blue-700',
    accent: 'bg-blue-600',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    value: 'text-amber-700',
    accent: 'bg-amber-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    value: 'text-purple-700',
    accent: 'bg-purple-600',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    value: 'text-red-700',
    accent: 'bg-red-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    value: 'text-indigo-700',
    accent: 'bg-indigo-600',
  },
}

export function StatisticsHighlight({
  statistics,
  title = "Market Insights",
  accentColor = 'emerald'
}: StatisticsHighlightProps) {
  if (!statistics || Object.keys(statistics).length === 0) return null

  const colors = colorClasses[accentColor]
  const stats = Object.values(statistics).slice(0, 3)

  return (
    <div className={`${colors.bg} rounded-xl border ${colors.border} p-5`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-1 h-5 ${colors.accent} rounded-full`}></div>
        <p className="font-bold text-gray-900">{title}</p>
      </div>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
            <p className={`text-2xl font-bold ${colors.value}`}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {stat.description}
            </p>
            <p className="text-xs text-gray-500 mt-1 italic">
              Source: {stat.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatisticsHighlight
