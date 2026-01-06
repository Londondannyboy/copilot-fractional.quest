"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
  RadialBarChart, RadialBar, PieLabelRenderProps
} from "recharts";

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#f97316", "#eab308"];

type ChartData = { name: string; jobs: number }[];
type SalaryData = { role: string; min: number; max: number; avg: number }[];

export function JobsBarChart({ data, title, subtitle }: { data: ChartData; title: string; subtitle?: string }) {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl p-6 w-full max-w-lg border border-indigo-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: 'white' }}
            labelStyle={{ color: '#f3f4f6' }}
          />
          <Bar dataKey="jobs" radius={[0, 8, 8, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function JobsPieChart({ data, title, subtitle }: { data: ChartData; title: string; subtitle?: string }) {
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-6 w-full max-w-lg border border-purple-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="jobs"
            label={(props: PieLabelRenderProps) => `${props.name || ''} ${((props.percent || 0) * 100).toFixed(0)}%`}
            labelLine={{ stroke: '#9ca3af' }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: 'white' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SalaryAreaChart({ data, title, subtitle }: { data: SalaryData; title: string; subtitle?: string }) {
  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl p-6 w-full max-w-lg border border-emerald-100">
      <div className="mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ left: -10 }}>
          <defs>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="role" tick={{ fill: '#374151', fontSize: 11 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: 'white' }}
            formatter={(value) => [`£${value || 0}/day`, '']}
          />
          <Legend />
          <Area type="monotone" dataKey="max" stroke="#6366f1" fill="url(#colorMax)" strokeWidth={2} name="Max Rate" />
          <Area type="monotone" dataKey="avg" stroke="#8b5cf6" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Avg Rate" />
          <Area type="monotone" dataKey="min" stroke="#10b981" fill="url(#colorMin)" strokeWidth={2} name="Min Rate" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

type DashboardData = {
  metrics: { totalJobs: number; totalCompanies: number; remoteJobs: number; avgDayRate: string };
  topRoles: { name: string; count: number }[];
  title: string;
  lastUpdated: string;
};

export function MarketDashboard({ data }: { data: DashboardData }) {
  const radialData = data.topRoles.map((r, i) => ({
    name: r.name,
    value: r.count,
    fill: COLORS[i % COLORS.length]
  }));

  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{data.title}</h3>
        <p className="text-indigo-300 text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          {data.lastUpdated}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
          <p className="text-3xl font-bold text-indigo-300">{data.metrics.totalJobs}</p>
          <p className="text-sm text-gray-300">Active Jobs</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
          <p className="text-3xl font-bold text-purple-300">{data.metrics.totalCompanies}</p>
          <p className="text-sm text-gray-300">Companies</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
          <p className="text-3xl font-bold text-pink-300">{data.metrics.remoteJobs}</p>
          <p className="text-sm text-gray-300">Remote Roles</p>
        </div>
        <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
          <p className="text-3xl font-bold text-emerald-300">{data.metrics.avgDayRate}</p>
          <p className="text-sm text-gray-300">Avg Day Rate</p>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-4">
        <p className="text-sm text-gray-400 mb-3">Top Roles</p>
        <ResponsiveContainer width="100%" height={120}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={radialData}>
            <RadialBar dataKey="value" cornerRadius={4} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type Article = {
  title: string;
  description: string;
  image: string;
  url: string;
  source: string;
};

export function ArticlesGrid({ articles, title }: { articles: Article[]; title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-24 h-16 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2">{article.description}</p>
              <p className="text-xs text-indigo-500 mt-1">{article.source}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ChartLoading({ title }: { title: string }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-100">
      <h3 className="text-lg font-bold text-gray-400 mb-4">{title}</h3>
      <div className="h-[250px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Loading visualization...</p>
        </div>
      </div>
    </div>
  );
}
