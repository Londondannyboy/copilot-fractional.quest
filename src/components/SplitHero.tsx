"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PageData } from "@/lib/pages";
import { getHeroImageUrl, ImageCategory } from "@/lib/images";

// ===========================================
// Types
// ===========================================

interface SplitHeroProps {
  page: PageData;
}

type WidgetType = "job-matcher" | "calculator" | "agency-finder" | "ai-assistant";

// ===========================================
// Helper Functions
// ===========================================

function detectWidgetType(slug: string): WidgetType {
  // Job pages - job matcher
  if (
    slug.includes("-jobs-") ||
    slug.startsWith("fractional-") && slug.includes("-uk") ||
    slug.startsWith("interim-") ||
    slug.startsWith("part-time-") ||
    slug.startsWith("advisory-")
  ) {
    return "job-matcher";
  }

  // Salary/cost pages - calculator
  if (slug.includes("-salary") || slug.includes("-cost") || slug.includes("calculator")) {
    return "calculator";
  }

  // Recruitment pages - agency finder
  if (
    slug.includes("-recruitment") ||
    slug.includes("-headhunter") ||
    slug.includes("-search") ||
    slug.includes("-agency")
  ) {
    return "agency-finder";
  }

  // Default - AI assistant
  return "ai-assistant";
}

function extractRoleFromSlug(slug: string): string {
  const roles = ["cfo", "cto", "cmo", "coo", "ceo", "chro", "ciso", "cio", "cpo", "cro", "fd", "cdo", "caio", "gc", "md"];
  const slugLower = slug.toLowerCase();
  for (const role of roles) {
    if (slugLower.includes(role)) {
      return role.toUpperCase();
    }
  }
  return "Executive";
}

// ===========================================
// Job Matcher Widget
// ===========================================

function JobMatcherWidget({ role }: { role: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const questions = [
    {
      id: "engagement",
      question: `What type of ${role} do you need?`,
      options: [
        { value: "fractional", label: "📊 Fractional", desc: "1-3 days/week, ongoing" },
        { value: "interim", label: "🔄 Interim", desc: "Full-time, 3-12 months" },
        { value: "permanent", label: "👔 Permanent", desc: "Full-time hire" },
      ],
    },
    {
      id: "timeline",
      question: "How soon do you need someone?",
      options: [
        { value: "urgent", label: "⚡ ASAP", desc: "Within 2 weeks" },
        { value: "soon", label: "📅 1-2 months", desc: "Taking our time" },
        { value: "exploring", label: "🔍 Just exploring", desc: "No rush" },
      ],
    },
    {
      id: "budget",
      question: "What's your budget range?",
      options: [
        { value: "startup", label: "🚀 Startup", desc: "Cost-conscious" },
        { value: "growth", label: "📈 Growth", desc: "Market rate" },
        { value: "enterprise", label: "🏢 Enterprise", desc: "Premium talent" },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        const engagement = newAnswers.engagement === "fractional" ? "Fractional" :
                          newAnswers.engagement === "interim" ? "Interim" : "Permanent";
        setResult(`${engagement} ${role}`);
        setIsCalculating(false);
      }, 1200);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <span className="text-2xl">🎯</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Find Your Perfect Match</h3>
          <p className="text-white/50 text-xs">Answer 3 questions in 30 seconds</p>
        </div>
      </div>

      {!result && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-white/40 mb-2">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

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
                className="w-16 h-16 mx-auto mb-4 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full"
              />
              <p className="text-white font-semibold">Finding your match...</p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Your Best Match</span>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">✨</div>
                <h4 className="text-white font-bold text-xl mb-2">{result}</h4>
                <p className="text-white/70 text-sm mb-4">
                  We have {answers.engagement === "fractional" ? "50+" : "25+"} qualified candidates ready
                </p>
                <a
                  href={`/${answers.engagement}-${role.toLowerCase()}-jobs-uk`}
                  className="block w-full text-center py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all"
                >
                  View {result} Jobs →
                </a>
              </div>
              <button
                onClick={reset}
                className="w-full py-2 text-white/50 text-sm hover:text-white/70 transition-colors"
              >
                Start Over
              </button>
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
                    className="w-full text-left p-4 rounded-xl border-2 bg-white/5 border-white/10 hover:border-white/30 transition-all"
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
    </div>
  );
}

// ===========================================
// Calculator Widget
// ===========================================

function CalculatorWidget({ role }: { role: string }) {
  const [days, setDays] = useState(2);
  const baseRate = role === "CEO" ? 2000 : role === "CTO" ? 1500 : role === "CFO" ? 1200 : 1000;
  const monthlyCost = days * baseRate * 4;
  const fullTimeCost = baseRate * 22;
  const savings = fullTimeCost - monthlyCost;
  const savingsPercent = Math.round((savings / fullTimeCost) * 100);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="text-2xl">🧮</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Quick Cost Calculator</h3>
          <p className="text-white/50 text-xs">See your potential savings</p>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <label className="text-white/70 text-sm mb-2 block">Days per week</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  days === d
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Monthly Cost</span>
            <span className="text-2xl font-black text-white">£{monthlyCost.toLocaleString()}</span>
          </div>
          <div className="h-px bg-white/20" />
          <div className="flex justify-between items-center">
            <span className="text-white/70">vs Full-Time</span>
            <span className="text-white/50 line-through">£{fullTimeCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-emerald-400 font-semibold">You Save</span>
            <span className="text-emerald-400 font-bold text-xl">
              £{savings.toLocaleString()} ({savingsPercent}%)
            </span>
          </div>
        </div>

        <a
          href="/calculator"
          className="block w-full text-center py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all"
        >
          Full Calculator →
        </a>
      </div>
    </div>
  );
}

// ===========================================
// Agency Finder Widget
// ===========================================

function AgencyFinderWidget() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      id: "priority",
      question: "What's most important to you?",
      options: [
        { value: "cost", label: "💰 Lowest Cost", desc: "Budget is key" },
        { value: "speed", label: "⚡ Fastest Hire", desc: "Need someone ASAP" },
        { value: "quality", label: "🎯 Best Match", desc: "Quality over speed" },
      ],
    },
    {
      id: "size",
      question: "Your company size?",
      options: [
        { value: "startup", label: "🚀 Startup", desc: "< 50 employees" },
        { value: "scaleup", label: "📈 Scale-up", desc: "50-500 employees" },
        { value: "enterprise", label: "🏢 Enterprise", desc: "500+ employees" },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setResult("Fractional Quest");
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-2xl">🔍</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Find Your Agency</h3>
          <p className="text-white/50 text-xs">2 questions, instant match</p>
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="text-white font-bold text-xl mb-2">{result}</h4>
                <p className="text-white/70 text-sm mb-4">
                  Best match for {answers.priority === "cost" ? "cost-conscious" : answers.priority === "speed" ? "fast" : "quality-focused"} {answers.size}s
                </p>
                <a
                  href="/contact"
                  className="block w-full text-center py-3 bg-violet-500 text-white font-bold rounded-xl hover:bg-violet-600 transition-all"
                >
                  Get Started →
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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
                    className="w-full text-left p-4 rounded-xl border-2 bg-white/5 border-white/10 hover:border-white/30 transition-all"
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
    </div>
  );
}

// ===========================================
// AI Assistant Widget
// ===========================================

function AIAssistantWidget({ role }: { role: string }) {
  const [query, setQuery] = useState("");

  const suggestions = [
    `What does a ${role} do?`,
    `${role} day rates UK`,
    `Fractional vs interim ${role}`,
    `How to hire a ${role}`,
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-2xl">✨</span>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">AI Assistant</h3>
          <p className="text-white/50 text-xs">Ask anything about {role}s</p>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask about ${role}s...`}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-white/40 text-xs uppercase tracking-wider">Popular questions</p>
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setQuery(suggestion)}
              className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 text-sm transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <a
        href="#ai-assistant"
        className="block w-full text-center py-3 bg-violet-500 text-white font-bold rounded-xl hover:bg-violet-600 transition-all mt-4"
      >
        Open Full Assistant →
      </a>
    </div>
  );
}

// ===========================================
// Main SplitHero Component
// ===========================================

export function SplitHero({ page }: SplitHeroProps) {
  const role = extractRoleFromSlug(page.slug || "");
  const widgetType = detectWidgetType(page.slug || "");
  const imageCategory = (page.image_category || "business") as ImageCategory;
  const heroImage = getHeroImageUrl(imageCategory);

  // Quick stats based on page type
  const stats = [
    { value: "£800-2,000", label: "Day Rate" },
    { value: "2-6 weeks", label: "Time to Hire" },
    { value: "50-70%", label: "Cost Savings" },
  ];

  return (
    <div className="relative overflow-hidden lg:rounded-none rounded-2xl mx-4 lg:mx-0">
      <div className="grid lg:grid-cols-5 min-h-[500px] lg:min-h-[600px]">
        {/* Left: Hero Image (3 cols on desktop) */}
        <div className="lg:col-span-3 relative min-h-[350px] lg:min-h-full">
          <img
            src={heroImage}
            alt={page.hero_title || page.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent lg:to-slate-900/40" />

          {/* Content on Image */}
          <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-center">
            {/* Badge */}
            {page.hero_badge && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-full">
                  {page.hero_badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight max-w-xl">
              {page.hero_title || page.title}
            </h1>
            {page.hero_subtitle && (
              <p className="text-white/70 text-lg mb-8 max-w-lg">{page.hero_subtitle}</p>
            )}

            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-6 mb-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className={`text-2xl lg:text-3xl font-black ${
                    i === 0 ? "text-emerald-400" : i === 1 ? "text-white" : "text-amber-400"
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Scroll indicator - desktop only */}
            <div className="hidden lg:flex items-center gap-2 text-white/40 text-sm">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.div>
              Scroll to explore
            </div>
          </div>
        </div>

        {/* Right: Interactive Widget (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 p-6 lg:p-8">
          {widgetType === "job-matcher" && <JobMatcherWidget role={role} />}
          {widgetType === "calculator" && <CalculatorWidget role={role} />}
          {widgetType === "agency-finder" && <AgencyFinderWidget />}
          {widgetType === "ai-assistant" && <AIAssistantWidget role={role} />}
        </div>
      </div>
    </div>
  );
}
