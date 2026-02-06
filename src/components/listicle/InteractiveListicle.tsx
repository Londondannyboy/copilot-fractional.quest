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
  feeSource?: string; // URL citation for fee data
  placementSource?: string; // URL citation for placement time
  sourceNote?: string; // e.g. "Based on industry research, Jan 2026"
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

// Interactive Quiz Component for Hero
function InteractiveQuiz({
  items,
  onRecommendation,
  onOpenFullAI,
}: {
  items: ListicleItem[];
  onRecommendation: (name: string) => void;
  onOpenFullAI: () => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<ListicleItem | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const questions = [
    {
      id: "priority",
      question: "What's your top priority?",
      options: [
        { value: "cost", label: "💰 Lowest Cost", desc: "Budget is key" },
        { value: "speed", label: "⚡ Fastest Hire", desc: "Need someone ASAP" },
        { value: "quality", label: "🎯 Best Match", desc: "Quality over speed" },
      ],
    },
    {
      id: "type",
      question: "What type of CFO?",
      options: [
        { value: "fractional", label: "📊 Fractional", desc: "Part-time, ongoing" },
        { value: "interim", label: "🔄 Interim", desc: "Full-time, temporary" },
        { value: "permanent", label: "👔 Permanent", desc: "Long-term hire" },
      ],
    },
    {
      id: "budget",
      question: "Your fee budget?",
      options: [
        { value: "low", label: "Under 20%", desc: "Cost-conscious" },
        { value: "mid", label: "20-30%", desc: "Market rate" },
        { value: "high", label: "30%+", desc: "Premium service" },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate recommendation
      setIsCalculating(true);
      setTimeout(() => {
        const rec = calculateRecommendation(newAnswers, items);
        setRecommendation(rec);
        setIsCalculating(false);
        if (rec) onRecommendation(rec.name);
      }, 1500);
    }
  };

  const calculateRecommendation = (
    ans: Record<string, string>,
    allItems: ListicleItem[]
  ): ListicleItem | null => {
    // Simple scoring algorithm
    let bestMatch = allItems[0];
    let bestScore = 0;

    allItems.forEach((item) => {
      let score = 0;
      const fee = parseFee(item.fee);
      const time = parseTime(item.placement);

      // Priority scoring
      if (ans.priority === "cost" && fee <= 20) score += 30;
      if (ans.priority === "speed" && time <= 6) score += 30;
      if (ans.priority === "quality" && item.rank <= 3) score += 30;

      // Type scoring
      if (ans.type === "fractional" && item.speciality.toLowerCase().includes("fractional")) score += 20;
      if (ans.type === "interim" && item.speciality.toLowerCase().includes("interim")) score += 20;

      // Budget scoring
      if (ans.budget === "low" && fee <= 20) score += 20;
      if (ans.budget === "mid" && fee > 20 && fee <= 30) score += 20;
      if (ans.budget === "high" && fee > 30) score += 20;

      // Bonus for highlighted item
      if (item.highlight) score += 10;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });

    return bestMatch;
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">AI Quick Match</h3>
          <p className="text-white/50 text-xs">Find your ideal headhunter in 30 seconds</p>
        </div>
      </div>

      {/* Progress Bar */}
      {!recommendation && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Question or Result */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {isCalculating ? (
            <motion.div
              key="calculating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 border-4 border-violet-500/30 border-t-violet-500 rounded-full"
              />
              <p className="text-white font-semibold">Analyzing your preferences...</p>
              <p className="text-white/50 text-sm mt-1">Matching with {items.length} agencies</p>
            </motion.div>
          ) : recommendation ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Your Best Match</span>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                    #{recommendation.rank}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{recommendation.name}</h4>
                    <span className="text-emerald-400 text-xs font-medium">{recommendation.badge}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-emerald-400 font-bold">{recommendation.fee}</div>
                    <div className="text-white/50 text-xs">Fee</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-white font-bold">{recommendation.placement}</div>
                    <div className="text-white/50 text-xs">Time</div>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4">{recommendation.description.slice(0, 100)}...</p>

                {recommendation.url && (
                  <a
                    href={recommendation.url}
                    className="block w-full text-center py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all"
                  >
                    View {recommendation.name} →
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={resetQuiz}
                  className="flex-1 py-2 bg-white/10 text-white/70 text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                >
                  Try Again
                </button>
                <button
                  onClick={onOpenFullAI}
                  className="flex-1 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-all"
                >
                  Ask AI More
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-white font-bold text-xl mb-6">
                {questions[step].question}
              </h4>

              <div className="space-y-3">
                {questions[step].options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(questions[step].id, option.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers[questions[step].id] === option.value
                        ? "bg-violet-500/20 border-violet-500"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.label.split(" ")[0]}</span>
                      <div>
                        <div className="text-white font-semibold">{option.label.split(" ").slice(1).join(" ")}</div>
                        <div className="text-white/50 text-xs">{option.desc}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!recommendation && !isCalculating && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={onOpenFullAI}
            className="w-full flex items-center justify-center gap-2 py-3 text-white/50 text-sm hover:text-white/70 transition-colors"
          >
            <span>Or ask our AI anything</span>
            <span>→</span>
          </button>
        </div>
      )}
    </div>
  );
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
    <section>
      {/* Split Hero: Image + Interactive AI Quiz - Full width on desktop */}
      <div className="relative overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0 mb-8 lg:mb-12">
        <div className="grid lg:grid-cols-5 min-h-[500px] lg:min-h-[600px]">
          {/* Left: Hero Image (3 cols on desktop) */}
          <div className="lg:col-span-3 relative min-h-[350px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80"
              alt="CFO Headhunter Analysis"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent lg:to-slate-900/40" />

            {/* Content on Image */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full">
                  2026 Rankings
                </span>
                <span className="px-3 py-1.5 bg-white/10 text-white/80 text-xs font-medium rounded-full backdrop-blur-sm">
                  {items.length} Agencies Analyzed
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight max-w-xl">
                {title}
              </h2>
              {subtitle && (
                <p className="text-white/70 text-lg mb-8 max-w-lg">{subtitle}</p>
              )}

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <div className="text-3xl font-black text-emerald-400">10-35%</div>
                  <div className="text-white/50 text-sm">Fee Range</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white">2-20</div>
                  <div className="text-white/50 text-sm">Weeks</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-amber-400">£50k+</div>
                  <div className="text-white/50 text-sm">Savings</div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="hidden lg:flex items-center gap-2 text-white/40 text-sm">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↓
                </motion.div>
                Scroll to explore all agencies
              </div>
            </div>
          </div>

          {/* Right: Interactive AI Quiz (2 cols on desktop) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 p-6 lg:p-8">
            <InteractiveQuiz
              items={items}
              onRecommendation={(name) => {
                setAiHighlighted(name);
                // Scroll to the item
                setTimeout(() => {
                  document.getElementById(`agency-${name.replace(/\s+/g, '-').toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 500);
              }}
              onOpenFullAI={() => setShowAI(true)}
            />
          </div>
        </div>
      </div>

      {/* Content below hero - contained width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured CTA Banner - Fractional Quest */}
        {featuredItem && featuredItem.highlight && sortBy === "rank" && !search && !feeFilter && !timeFilter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
            </div>

            {/* Accent gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400" />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* Left Side - Main CTA (3 cols) */}
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-amber-500 text-slate-900 text-xs font-black rounded-full uppercase tracking-wider">
                      #1 Ranked
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-full">
                      Editor&apos;s Choice 2026
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                    Ready to Find Your Perfect CFO?
                  </h3>

                  <p className="text-white/70 text-lg mb-6 leading-relaxed max-w-xl">
                    Skip the 12-week search. Our pre-vetted network of 300+ fractional and interim CFOs means you can have shortlisted candidates within days, not months.
                  </p>

                  {/* Key stats row */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div>
                      <div className="text-2xl font-black text-amber-400">10-15%</div>
                      <div className="text-white/50 text-sm">Placement Fee</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">2-4 Weeks</div>
                      <div className="text-white/50 text-sm">Time to Hire</div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-emerald-400">50-60%</div>
                      <div className="text-white/50 text-sm">Cost Savings</div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://calendly.com/fractionalquest/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a Free Consultation
                    </a>
                    <Link
                      href="/fractional-recruitment-agency"
                      className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right Side - Trust signals (2 cols) */}
                <div className="md:col-span-2 space-y-4">
                  {/* Testimonial/Social proof */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/80 text-sm italic mb-3">
                      &ldquo;Found our fractional CFO in 10 days. The quality of candidates was exceptional.&rdquo;
                    </p>
                    <p className="text-white/50 text-xs">
                      — Series B Fintech, London
                    </p>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl font-black text-white">300+</div>
                      <div className="text-white/50 text-xs">Vetted CFOs</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl font-black text-white">96%</div>
                      <div className="text-white/50 text-xs">Retention</div>
                    </div>
                  </div>

                  {/* No obligation note */}
                  <p className="text-white/40 text-xs text-center">
                    Free 30-min consultation · No obligation · Cancel anytime
                  </p>
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
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-black ${
                          item.highlight ? "text-emerald-700" : "text-gray-900"
                        }`}>{item.fee}</span>
                        {item.sourceNote && (
                          <span className="text-[10px] text-gray-400 italic">
                            ({item.sourceNote})
                          </span>
                        )}
                      </div>
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

        {/* Methodology & Disclaimer */}
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About These Rankings
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            <strong>Fee percentages are industry estimates.</strong> Executive search firms do not publicly disclose their fee structures.
            Industry-standard retained search fees typically range from 25-35% of first-year compensation for C-level roles.
            See{" "}
            <a href="https://merje.com/blog/2024/01/how-much-does-executive-search-cost/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              MERJE&apos;s guide
            </a>
            {" "}and{" "}
            <a href="https://tgsus.com/executive-search-blog/executive-search-fees-search-firm-pricing/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
              TGS&apos;s pricing guide
            </a>
            {" "}for industry context.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            <strong>Placement times are estimates</strong> based on industry norms and publicly stated timelines where available.
            Actual timelines vary significantly based on role complexity, market conditions, and candidate availability.
            We recommend confirming current rates and timelines directly with each provider.
          </p>
          <p className="text-xs text-gray-400">
            Rankings are based on our editorial assessment considering value, speed, specialisation, and market reputation.
            Fractional Quest is operated by the same team that produces this content — we&apos;ve ranked ourselves #1 based on our pricing model, not independent verification.
          </p>
        </div>

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
      </div>
    </section>
  );
}
