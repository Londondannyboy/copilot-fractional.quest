"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { ListicleFilters } from "./ListicleFilters";
import { ListicleComparison } from "./ListicleComparison";
import { ListicleAI } from "./ListicleAI";

// Types
export interface ListicleItem {
  rank: number;
  name: string;
  badge: string;
  description: string;
  speciality: string;
  fee: string;
  placement: string;
  url?: string;
  highlight?: boolean;
}

export interface InteractiveListicleProps {
  title: string;
  subtitle?: string;
  items: ListicleItem[];
  features?: {
    filtering?: boolean;
    sorting?: boolean;
    comparison?: boolean;
    aiAssistant?: boolean;
    animations?: boolean;
  };
}

type SortOption = "rank" | "fee-asc" | "fee-desc" | "time-asc" | "name";

// Helper to parse fee percentage for sorting
function parseFee(fee: string): number {
  const match = fee.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Helper to parse placement time for sorting
function parseTime(time: string): number {
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const, // easeOut cubic bezier
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const highlightVariants = {
  idle: { scale: 1 },
  highlighted: {
    scale: 1.02,
    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)",
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
};

export function InteractiveListicle({
  title,
  subtitle,
  items,
  features = {
    filtering: true,
    sorting: true,
    comparison: true,
    aiAssistant: true,
    animations: true,
  },
}: InteractiveListicleProps) {
  // State
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rank");
  const [feeFilter, setFeeFilter] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [aiHighlighted, setAiHighlighted] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  // Derived state - filtered and sorted items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.speciality.toLowerCase().includes(searchLower)
      );
    }

    // Fee filter
    if (feeFilter) {
      result = result.filter((item) => {
        const fee = parseFee(item.fee);
        if (feeFilter === "low") return fee <= 20;
        if (feeFilter === "mid") return fee > 20 && fee <= 30;
        if (feeFilter === "high") return fee > 30;
        return true;
      });
    }

    // Time filter
    if (timeFilter) {
      result = result.filter((item) => {
        const time = parseTime(item.placement);
        if (timeFilter === "fast") return time <= 6;
        if (timeFilter === "medium") return time > 6 && time <= 12;
        if (timeFilter === "slow") return time > 12;
        return true;
      });
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "fee-asc":
          return parseFee(a.fee) - parseFee(b.fee);
        case "fee-desc":
          return parseFee(b.fee) - parseFee(a.fee);
        case "time-asc":
          return parseTime(a.placement) - parseTime(b.placement);
        case "name":
          return a.name.localeCompare(b.name);
        case "rank":
        default:
          return a.rank - b.rank;
      }
    });

    return result;
  }, [items, search, sortBy, feeFilter, timeFilter]);

  // Toggle comparison selection
  const toggleComparison = (name: string) => {
    setSelectedForComparison((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      if (prev.length >= 4) return prev; // Max 4 items
      return [...prev, name];
    });
  };

  // Get items for comparison
  const comparisonItems = items.filter((item) =>
    selectedForComparison.includes(item.name)
  );

  // AI handler functions (exposed to CopilotKit)
  const aiActions = {
    filterByFee: (range: string) => setFeeFilter(range),
    filterByTime: (range: string) => setTimeFilter(range),
    clearFilters: () => {
      setFeeFilter(null);
      setTimeFilter(null);
      setSearch("");
    },
    highlightItem: (name: string) => setAiHighlighted(name),
    compareItems: (names: string[]) => {
      setSelectedForComparison(names.slice(0, 4));
      setShowComparison(true);
    },
    sortBy: (option: SortOption) => setSortBy(option),
  };

  // Get the #1 item for featured section
  const featuredItem = items.find(item => item.highlight) || items[0];

  return (
    <section className="py-8">
      {/* Innovative Data-Driven Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 mb-12">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Floating Data Points Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0
              }}
              animate={{
                y: [null, '-20%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full animate-pulse">
                LIVE DATA
              </span>
              <span className="px-4 py-2 bg-white/10 text-white/80 text-sm font-medium rounded-full backdrop-blur-sm">
                February 2026 Rankings
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              Analyzing {items.length} agencies...
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Title & Description */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-white/70 text-lg mb-6">{subtitle}</p>
              )}

              {/* Quick Winner Preview */}
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏆</span>
                  <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Top Pick for 2026</span>
                </div>
                <div className="text-white font-black text-2xl">{featuredItem?.name}</div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-emerald-300">✓ {featuredItem?.fee} fees</span>
                  <span className="text-emerald-300">✓ {featuredItem?.placement}</span>
                </div>
              </div>

              {/* AI CTA */}
              {features.aiAssistant && (
                <button
                  onClick={() => setShowAI(true)}
                  className="group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-500/25"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">✨</span>
                  <span>Get AI Recommendation</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              )}
            </div>

            {/* Right: Live Data Visualization */}
            <div className="space-y-4">
              {/* Fee Comparison Chart */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-sm">Fee Comparison</h3>
                  <span className="text-emerald-400 text-xs font-mono">LIVE</span>
                </div>
                <div className="space-y-3">
                  {items.slice(0, 5).map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="w-6 text-xs text-white/50 font-mono">#{item.rank}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/80 text-xs truncate max-w-[100px]">{item.name.split(' ')[0]}</span>
                          <span className={`text-xs font-bold ${item.highlight ? 'text-emerald-400' : 'text-white/60'}`}>
                            {item.fee}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, parseFee(item.fee) * 2.8)}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${
                              item.highlight
                                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                : 'bg-gradient-to-r from-slate-400 to-slate-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-[10px] text-white/40">
                  <span>Lower is better</span>
                  <span>Industry avg: 25-35%</span>
                </div>
              </div>

              {/* Speed vs Fee Scatter Plot */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-sm">Speed vs Cost Analysis</h3>
                  <span className="text-xs text-white/40">Best = Bottom Left</span>
                </div>
                <div className="relative h-32 border-l border-b border-white/20">
                  {/* Y-axis label */}
                  <span className="absolute -left-2 top-0 text-[10px] text-white/40 -rotate-90 origin-left">Time</span>
                  {/* X-axis label */}
                  <span className="absolute right-0 -bottom-4 text-[10px] text-white/40">Fee %</span>

                  {/* Grid lines */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border-r border-t border-white/5" />
                    ))}
                  </div>

                  {/* Data points */}
                  {items.map((item, idx) => {
                    const x = (parseFee(item.fee) / 40) * 100;
                    const y = 100 - (parseTime(item.placement) / 20) * 100;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className={`absolute w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                          item.highlight
                            ? 'bg-emerald-400 text-emerald-900 ring-4 ring-emerald-400/30'
                            : 'bg-slate-400 text-slate-900'
                        }`}
                        style={{
                          left: `${Math.min(95, Math.max(5, x))}%`,
                          bottom: `${Math.min(95, Math.max(5, y))}%`,
                          transform: 'translate(-50%, 50%)'
                        }}
                        title={`${item.name}: ${item.fee}, ${item.placement}`}
                      >
                        {item.rank}
                      </motion.div>
                    );
                  })}

                  {/* Sweet spot indicator */}
                  <div className="absolute bottom-0 left-0 w-1/3 h-1/3 border-2 border-dashed border-emerald-500/30 rounded-tr-xl" />
                  <span className="absolute bottom-1 left-1 text-[8px] text-emerald-400/60">Sweet Spot</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-emerald-500/20 rounded-xl p-3 text-center"
                >
                  <div className="text-xl font-black text-emerald-400">50%</div>
                  <div className="text-[10px] text-white/60">Avg Savings</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-blue-500/20 rounded-xl p-3 text-center"
                >
                  <div className="text-xl font-black text-blue-400">4x</div>
                  <div className="text-[10px] text-white/60">Faster</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-amber-500/20 rounded-xl p-3 text-center"
                >
                  <div className="text-xl font-black text-amber-400">300+</div>
                  <div className="text-[10px] text-white/60">CFOs</div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Winner Card */}
      {featuredItem && sortBy === "rank" && !search && !feeFilter && !timeFilter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🏆</span>
            <h3 className="text-2xl font-black text-gray-900">Our Top Recommendation</h3>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">EDITOR&apos;S CHOICE</span>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 shadow-2xl shadow-emerald-200/50">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=600&fit=crop&q=80"
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Info */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-24 h-24 bg-white rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                      <span className="text-4xl font-black text-emerald-600">#1</span>
                      <span className="text-xs text-gray-500 font-bold">RANKED</span>
                    </div>
                    <div>
                      <h4 className="text-3xl sm:text-4xl font-black text-white">{featuredItem.name}</h4>
                      <span className="inline-block mt-2 px-4 py-1 bg-white/20 text-white text-sm font-bold rounded-full">
                        {featuredItem.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/90 text-lg mb-6 leading-relaxed">{featuredItem.description}</p>

                  {/* Key Benefits */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                      <span className="text-sm font-medium">300+ Pre-vetted CFOs</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                      <span className="text-sm font-medium">96% Retention Rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                      <span className="text-sm font-medium">2-4 Week Placement</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">✓</span>
                      <span className="text-sm font-medium">50-60% Cost Savings</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {featuredItem.url && (
                      <Link
                        href={featuredItem.url.startsWith('http') ? '#' : featuredItem.url}
                        className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
                      >
                        Learn More About {featuredItem.name} →
                      </Link>
                    )}
                    <button
                      onClick={() => toggleComparison(featuredItem.name)}
                      className="px-6 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
                    >
                      + Add to Compare
                    </button>
                  </div>
                </div>

                {/* Right Side - Visual Stats */}
                <div className="space-y-4">
                  {/* Fee Comparison */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 font-semibold">Placement Fee</span>
                      <span className="text-2xl font-black text-white">{featuredItem.fee}</span>
                    </div>
                    <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute h-full bg-white rounded-full"
                      />
                      <div className="absolute h-full w-full flex items-center justify-end pr-2">
                        <span className="text-[10px] text-white/60">Industry avg: 25-35%</span>
                      </div>
                    </div>
                    <div className="mt-2 text-emerald-200 text-sm font-semibold">
                      Save £15,000-£30,000 per hire
                    </div>
                  </div>

                  {/* Time Comparison */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 font-semibold">Time to Hire</span>
                      <span className="text-2xl font-black text-white">{featuredItem.placement}</span>
                    </div>
                    <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "20%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="absolute h-full bg-white rounded-full"
                      />
                      <div className="absolute h-full w-full flex items-center justify-end pr-2">
                        <span className="text-[10px] text-white/60">Industry avg: 12-20 weeks</span>
                      </div>
                    </div>
                    <div className="mt-2 text-emerald-200 text-sm font-semibold">
                      4x faster than traditional headhunters
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-2 bg-white/10 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                      🏅 Best Value 2026
                    </span>
                    <span className="px-3 py-2 bg-white/10 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                      ⚡ Fastest Placement
                    </span>
                    <span className="px-3 py-2 bg-white/10 text-white text-xs font-bold rounded-lg backdrop-blur-sm">
                      💰 Lowest Fees
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Section Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <span className="text-gray-500 font-semibold text-sm uppercase tracking-wider">
          {featuredItem && sortBy === "rank" && !search && !feeFilter && !timeFilter
            ? `Compare ${items.length - 1} More Agencies`
            : `All ${items.length} Agencies Ranked`
          }
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search and Sort Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search agencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Sort Dropdown */}
          {features.sorting && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
            >
              <option value="rank">Sort by: Rank</option>
              <option value="fee-asc">Sort by: Fee (Low to High)</option>
              <option value="fee-desc">Sort by: Fee (High to Low)</option>
              <option value="time-asc">Sort by: Fastest Placement</option>
              <option value="name">Sort by: Name (A-Z)</option>
            </select>
          )}
        </div>

        {/* Filters */}
        {features.filtering && (
          <ListicleFilters
            feeFilter={feeFilter}
            setFeeFilter={setFeeFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
        )}

        {/* Comparison + AI Row */}
        <div className="flex flex-wrap gap-3 items-center justify-between">
          {/* Comparison Controls */}
          {features.comparison && selectedForComparison.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-gray-600">
                {selectedForComparison.length} selected
              </span>
              <button
                onClick={() => setShowComparison(true)}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Compare Selected
              </button>
              <button
                onClick={() => setSelectedForComparison([])}
                className="px-4 py-2 text-gray-600 text-sm hover:text-gray-800"
              >
                Clear
              </button>
            </motion.div>
          )}

          {/* AI Assistant Button */}
          {features.aiAssistant && (
            <button
              onClick={() => setShowAI(true)}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span className="text-lg">✨</span>
              Help me choose
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500">
          Showing {filteredItems.length} of {items.length} agencies
        </div>
      </div>

      {/* Listicle Items */}
      <LayoutGroup>
        <motion.div
          className="space-y-6"
          variants={features.animations ? containerVariants : undefined}
          initial={features.animations ? "hidden" : undefined}
          animate={features.animations ? "visible" : undefined}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems
              .filter(item => {
                // Hide featured item from list when featured section is showing
                const showingFeatured = featuredItem && sortBy === "rank" && !search && !feeFilter && !timeFilter;
                return !showingFeatured || item.name !== featuredItem.name;
              })
              .map((item) => (
              <motion.div
                key={item.name}
                layout
                variants={features.animations ? itemVariants : undefined}
                initial={features.animations ? "hidden" : undefined}
                animate={
                  features.animations
                    ? aiHighlighted === item.name
                      ? "highlighted"
                      : "visible"
                    : undefined
                }
                exit={features.animations ? "exit" : undefined}
                whileHover={features.animations ? { scale: 1.02, y: -8 } : undefined}
                className={`relative overflow-hidden rounded-3xl transition-all cursor-pointer group ${
                  item.highlight || aiHighlighted === item.name
                    ? "shadow-2xl shadow-emerald-200/50 ring-2 ring-emerald-400"
                    : "shadow-xl hover:shadow-2xl"
                } ${
                  selectedForComparison.includes(item.name)
                    ? "ring-2 ring-indigo-500 ring-offset-4"
                    : ""
                }`}
                onClick={() =>
                  features.comparison && toggleComparison(item.name)
                }
              >
                {/* Hero Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.highlight
                      ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&q=80"
                      : item.rank === 2 ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop&q=80"
                      : item.rank === 3 ? "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop&q=80"
                      : item.rank === 4 ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&q=80"
                      : item.rank === 5 ? "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop&q=80"
                      : item.rank === 6 ? "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=400&fit=crop&q=80"
                      : item.rank === 7 ? "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=400&fit=crop&q=80"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 ${
                    item.highlight
                      ? "bg-gradient-to-t from-emerald-900/90 via-emerald-800/50 to-transparent"
                      : "bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent"
                  }`} />

                  {/* Rank Badge - Floating */}
                  <div className={`absolute top-4 left-4 w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black shadow-2xl backdrop-blur-sm ${
                    item.highlight || aiHighlighted === item.name
                      ? "bg-emerald-500/90 text-white"
                      : item.rank === 1 ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                      : item.rank === 2 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800"
                      : item.rank === 3 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                      : "bg-white/90 text-gray-800"
                  }`}>
                    <span className="text-3xl leading-none">#{item.rank}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">Rank</span>
                  </div>

                  {/* Award Badge - Top Right */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 text-sm font-bold rounded-xl shadow-lg backdrop-blur-sm ${
                      item.highlight || aiHighlighted === item.name
                        ? "bg-white text-emerald-700"
                        : "bg-emerald-500/90 text-white"
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Company Name - Bottom of Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg mb-1">
                      {item.name}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">{item.speciality}</p>
                  </div>

                  {/* Comparison Checkbox */}
                  {features.comparison && (
                    <div className="absolute top-4 right-24">
                      <span
                        className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all backdrop-blur-sm ${
                          selectedForComparison.includes(item.name)
                            ? "bg-indigo-600 border-indigo-600 text-white scale-110"
                            : "bg-white/80 border-white/50 hover:border-white"
                        }`}
                      >
                        {selectedForComparison.includes(item.name) && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Winner Ribbon */}
                  {item.rank === 1 && !item.highlight && (
                    <div className="absolute top-8 -right-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-14 py-1.5 rotate-45 shadow-lg">
                      TOP PICK
                    </div>
                  )}
                  {item.highlight && (
                    <div className="absolute top-8 -right-12 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-14 py-1.5 rotate-45 shadow-lg">
                      BEST VALUE
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className={`p-6 sm:p-8 ${
                  item.highlight ? "bg-gradient-to-br from-emerald-50 via-white to-teal-50" : "bg-white"
                }`}>
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">{item.description}</p>

                  {/* Visual Stats Section */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Fee Gauge */}
                    <div className={`p-5 rounded-2xl ${
                      item.highlight ? "bg-emerald-100/60" : "bg-gray-50"
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.highlight ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-600"
                          }`}>
                            <span className="text-xl">💰</span>
                          </div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Placement Fee</span>
                        </div>
                      </div>
                      <div className={`text-2xl font-black ${
                        item.highlight ? "text-emerald-700" : "text-gray-900"
                      }`}>{item.fee}</div>
                      {/* Visual fee gauge */}
                      <div className="mt-3 relative">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                          <span>10%</span>
                          <span>20%</span>
                          <span>30%</span>
                          <span>40%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, parseFee(item.fee) * 2.5)}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${
                              item.highlight
                                ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                : parseFee(item.fee) <= 20
                                  ? "bg-gradient-to-r from-green-400 to-green-600"
                                  : parseFee(item.fee) <= 30
                                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                    : "bg-gradient-to-r from-red-400 to-red-600"
                            }`}
                          />
                        </div>
                        {item.highlight && (
                          <div className="mt-2 text-xs text-emerald-600 font-semibold">
                            50-60% cheaper than industry average
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time Gauge */}
                    <div className="p-5 rounded-2xl bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                            <span className="text-xl">⏱️</span>
                          </div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Time to Hire</span>
                        </div>
                      </div>
                      <div className="text-2xl font-black text-gray-900">{item.placement}</div>
                      {/* Visual time gauge */}
                      <div className="mt-3 relative">
                        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                          <span>2w</span>
                          <span>8w</span>
                          <span>14w</span>
                          <span>20w</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, parseTime(item.placement) * 5)}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full ${
                              parseTime(item.placement) <= 6
                                ? "bg-gradient-to-r from-green-400 to-green-600"
                                : parseTime(item.placement) <= 12
                                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                                  : "bg-gradient-to-r from-amber-400 to-amber-600"
                            }`}
                          />
                        </div>
                        {parseTime(item.placement) <= 4 && (
                          <div className="mt-2 text-xs text-green-600 font-semibold">
                            4x faster than traditional search
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                      🎯 {item.speciality}
                    </span>
                    {item.highlight && (
                      <>
                        <span className="px-3 py-1.5 bg-emerald-100 rounded-lg text-xs font-semibold text-emerald-700">
                          ✓ 300+ Pre-vetted CFOs
                        </span>
                        <span className="px-3 py-1.5 bg-emerald-100 rounded-lg text-xs font-semibold text-emerald-700">
                          ✓ 96% Retention Rate
                        </span>
                      </>
                    )}
                    {item.rank <= 3 && !item.highlight && (
                      <span className="px-3 py-1.5 bg-amber-100 rounded-lg text-xs font-semibold text-amber-700">
                        ⭐ Top 3 Ranked
                      </span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {item.url && (
                      item.url.startsWith('http') ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            item.highlight
                              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl"
                              : "bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl"
                          }`}
                        >
                          Visit Website <span className="text-sm">↗</span>
                        </a>
                      ) : (
                        <Link
                          href={item.url}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-200 hover:shadow-xl transition-all"
                        >
                          Learn More <span>→</span>
                        </Link>
                      )
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComparison(item.name);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                        selectedForComparison.includes(item.name)
                          ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
                      }`}
                    >
                      {selectedForComparison.includes(item.name) ? "✓ Added" : "+ Compare"}
                    </button>
                  </div>
                </div>

                {/* AI Highlight Glow */}
                {aiHighlighted === item.name && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      boxShadow: [
                        "0 0 40px rgba(16, 185, 129, 0.5)",
                        "0 0 80px rgba(16, 185, 129, 0.7)",
                        "0 0 40px rgba(16, 185, 129, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">No agencies match your filters.</p>
          <button
            onClick={() => {
              setFeeFilter(null);
              setTimeFilter(null);
              setSearch("");
            }}
            className="mt-4 text-emerald-600 font-medium hover:text-emerald-700"
          >
            Clear all filters
          </button>
        </motion.div>
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <ListicleComparison
          items={comparisonItems}
          onClose={() => setShowComparison(false)}
        />
      )}

      {/* AI Assistant Panel */}
      {showAI && (
        <ListicleAI
          items={items}
          filteredItems={filteredItems}
          actions={aiActions}
          onClose={() => setShowAI(false)}
        />
      )}
    </section>
  );
}
