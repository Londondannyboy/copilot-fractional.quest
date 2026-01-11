'use client'

import { useState, useEffect } from 'react'

interface MarketStat {
  label: string
  value: number
  suffix: string
  trend: 'up' | 'down' | 'neutral'
  trendValue: string
  icon: string
}

interface LiveMarketPulseProps {
  location?: string
}

export function LiveMarketPulse({ location = 'UK' }: LiveMarketPulseProps) {
  const [stats, setStats] = useState<MarketStat[]>([
    { label: 'Active Jobs', value: 0, suffix: '', trend: 'up', trendValue: '+12%', icon: '💼' },
    { label: 'Avg Day Rate', value: 0, suffix: '', trend: 'up', trendValue: '+8%', icon: '💰' },
    { label: 'New This Week', value: 0, suffix: '', trend: 'up', trendValue: '+23', icon: '🆕' },
    { label: 'Remote %', value: 0, suffix: '%', trend: 'up', trendValue: '+5%', icon: '🏠' },
  ])

  const targetStats: MarketStat[] = [
    { label: 'Active Jobs', value: 213, suffix: '', trend: 'up', trendValue: '+12%', icon: '💼' },
    { label: 'Avg Day Rate', value: 1150, suffix: '', trend: 'up', trendValue: '+8%', icon: '💰' },
    { label: 'New This Week', value: 47, suffix: '', trend: 'up', trendValue: '+23', icon: '🆕' },
    { label: 'Remote %', value: 42, suffix: '%', trend: 'up', trendValue: '+5%', icon: '🏠' },
  ]

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3) // Cubic ease-out

      setStats(targetStats.map((target, i) => ({
        ...target,
        value: Math.round(target.value * easeOut),
      })))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">Live {location} Market Pulse</h2>
          </div>
          <span className="text-slate-400 text-sm">Updated in real-time</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 group hover:bg-white/10 transition-all overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' :
                    stat.trend === 'down' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {stat.trendValue}
                  </span>
                </div>

                <div className="text-3xl md:text-4xl font-bold text-white mb-1 tabular-nums">
                  {stat.label === 'Avg Day Rate' ? '£' : ''}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>

                <div className="text-slate-400 text-sm">{stat.label}</div>

                {/* Mini sparkline */}
                <div className="mt-3 h-8 flex items-end gap-0.5">
                  {Array.from({ length: 12 }).map((_, j) => {
                    const height = 20 + Math.random() * 60 + (j / 12) * 20
                    return (
                      <div
                        key={j}
                        className="flex-1 bg-gradient-to-t from-emerald-500/50 to-emerald-400/50 rounded-t"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${j * 100}ms`,
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <div className="mt-8 overflow-hidden">
          <div className="flex animate-scroll gap-8">
            {[
              '🔥 CFO role in London - £1,400/day',
              '✨ New CTO position - Fintech startup',
              '📈 CMO demand up 34% this quarter',
              '🎯 Remote COO role - Series B company',
              '💰 CISO rates increased 15% YoY',
              '🚀 47 new roles added this week',
            ].map((item, i) => (
              <span key={i} className="text-slate-400 text-sm whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
