'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface TrendData {
  period: string
  value: number
  forecast?: boolean
}

interface MarketTrendsProps {
  title?: string
  role?: string
  location?: string
  metric?: 'demand' | 'rates' | 'jobs'
  data?: TrendData[]
  insights?: string[]
  trend?: 'up' | 'down' | 'stable'
  changePercent?: number
}

const DEFAULT_DEMAND_DATA: TrendData[] = [
  { period: 'Q1 2024', value: 100 },
  { period: 'Q2 2024', value: 115 },
  { period: 'Q3 2024', value: 128 },
  { period: 'Q4 2024', value: 142 },
  { period: 'Q1 2026', value: 158 },
  { period: 'Q2 2026', value: 175 },
  { period: 'Q3 2026', value: 190, forecast: true },
  { period: 'Q4 2026', value: 210, forecast: true },
]

/**
 * MarketTrends - Shows market trend data with chart
 *
 * Agent can render via compose_mdx_response:
 * ```mdx
 * <MarketTrends
 *   title="CTO Demand Trend"
 *   role="CTO"
 *   location="London"
 *   metric="demand"
 *   trend="up"
 *   changePercent={23}
 *   insights={["AI/ML skills driving premium rates", "Remote roles growing fastest"]}
 * />
 * ```
 */
export default function MarketTrends({
  title,
  role = 'Executive',
  location = 'UK',
  metric = 'demand',
  data = DEFAULT_DEMAND_DATA,
  insights = [],
  trend = 'up',
  changePercent = 0,
}: MarketTrendsProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return '📈'
    if (trend === 'down') return '📉'
    return '➡️'
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-700'
    if (trend === 'down') return 'text-red-500'
    return 'text-gray-600'
  }

  const getMetricLabel = () => {
    switch (metric) {
      case 'demand': return 'Demand Index'
      case 'rates': return 'Day Rate (£)'
      case 'jobs': return 'Job Postings'
      default: return 'Value'
    }
  }

  const getGradientColors = () => {
    if (trend === 'up') return { start: '#10b981', end: '#059669' }
    if (trend === 'down') return { start: '#ef4444', end: '#dc2626' }
    return { start: '#6b7280', end: '#4b5563' }
  }

  const colors = getGradientColors()

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">
              {title || `${role} ${getMetricLabel()} - ${location}`}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Last 8 quarters with forecast</p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getTrendColor()} flex items-center gap-2`}>
              {getTrendIcon()}
              {changePercent > 0 ? '+' : ''}{changePercent}%
            </div>
            <p className="text-xs text-gray-500">YoY Change</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-6 py-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.start} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={colors.end} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="period"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12px'
                }}
                formatter={(value) => [
                  `${value}`,
                  getMetricLabel()
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colors.start}
                strokeWidth={2}
                fill="url(#trendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
            Key Insights
          </p>
          <ul className="space-y-1">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-emerald-500">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Source: Fractional Quest Market Analysis
        </span>
        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
          View Full Report →
        </button>
      </div>
    </div>
  )
}
