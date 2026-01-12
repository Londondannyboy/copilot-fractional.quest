"use client";

import { useState, useEffect } from "react";

interface MarketStat {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: string;
}

interface MarketOverviewProps {
  location?: string;
  role?: string;
  stats?: MarketStat[];
}

const defaultStats: MarketStat[] = [
  {
    label: "Active Roles",
    value: "2,450",
    change: "+12%",
    trend: "up",
    icon: "💼",
  },
  {
    label: "Avg Day Rate",
    value: "£1,150",
    change: "+8%",
    trend: "up",
    icon: "💰",
  },
  {
    label: "Companies Hiring",
    value: "890",
    change: "+15%",
    trend: "up",
    icon: "🏢",
  },
  {
    label: "Time to Hire",
    value: "14 days",
    change: "-3 days",
    trend: "down",
    icon: "⏱️",
  },
];

/**
 * MarketOverview - Dashboard showing market statistics
 *
 * Usage in MDX:
 * ```mdx
 * <MarketOverview location="London" role="CMO" />
 * ```
 */
export default function MarketOverview({
  location = "UK",
  role,
  stats = defaultStats,
}: MarketOverviewProps) {
  const [animatedStats, setAnimatedStats] = useState<MarketStat[]>([]);

  useEffect(() => {
    // Animate stats appearing
    stats.forEach((stat, index) => {
      setTimeout(() => {
        setAnimatedStats((prev) => [...prev, stat]);
      }, index * 150);
    });
  }, [stats]);

  return (
    <div className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {role ? `${role} Market Overview` : "Fractional Executive Market"}
          </h3>
          <p className="text-gray-500">{location} - Live market data</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Updated live
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {animatedStats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-100 transform transition-all duration-500"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              {stat.change && (
                <span
                  className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : stat.trend === "down"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trend Indicators */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xl">📈</span>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {role ? `${role} demand` : "Market demand"} is strong in {location}
            </div>
            <div className="text-sm text-gray-600">
              Hiring activity up 15% compared to last quarter
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
