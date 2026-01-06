"use client";

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface StatsBarProps {
  stats: Stat[];
  className?: string;
}

export function StatsBar({ stats, className = "" }: StatsBarProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-xl ${className}`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl md:text-3xl font-bold">
            {stat.icon && <span className="mr-1">{stat.icon}</span>}
            {stat.value}
          </div>
          <div className="text-sm opacity-80">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
