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

  return (
    <section className="py-12 my-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 block">
          2026 Rankings
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        )}
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
            {filteredItems.map((item) => (
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
                whileHover={features.animations ? { scale: 1.01 } : undefined}
                className={`relative border-2 rounded-xl p-6 sm:p-8 transition-all cursor-pointer ${
                  item.highlight || aiHighlighted === item.name
                    ? "border-emerald-500 bg-emerald-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
                } ${
                  selectedForComparison.includes(item.name)
                    ? "ring-2 ring-indigo-500 ring-offset-2"
                    : ""
                }`}
                onClick={() =>
                  features.comparison && toggleComparison(item.name)
                }
              >
                {/* Rank Badge */}
                <div
                  className={`absolute -top-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${
                    item.highlight || aiHighlighted === item.name
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  #{item.rank}
                </div>

                {/* Award Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {features.comparison && (
                    <span
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        selectedForComparison.includes(item.name)
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedForComparison.includes(item.name) && (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                  )}
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      item.highlight || aiHighlighted === item.name
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="ml-8 mt-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        item.highlight || aiHighlighted === item.name
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="font-bold">Fee:</span> {item.fee}
                    </div>
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                      <span className="font-bold">Time:</span> {item.placement}
                    </div>
                    <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg">
                      {item.speciality}
                    </div>
                  </div>
                  {item.url && (
                    item.url.startsWith('http') ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 mt-4 text-emerald-700 font-bold hover:text-emerald-800"
                      >
                        Visit Website <span className="text-xs">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={item.url}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 mt-4 text-emerald-700 font-bold hover:text-emerald-800"
                      >
                        Learn More <span>→</span>
                      </Link>
                    )
                  )}
                </div>

                {/* AI Highlight Glow */}
                {aiHighlighted === item.name && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      boxShadow: [
                        "0 0 20px rgba(16, 185, 129, 0.3)",
                        "0 0 40px rgba(16, 185, 129, 0.5)",
                        "0 0 20px rgba(16, 185, 129, 0.3)",
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
