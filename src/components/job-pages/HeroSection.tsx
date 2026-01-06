"use client";

import { VoiceInput } from "@/components/voice-input";
import { StatsBar } from "@/components/ui";
import { JobStats } from "@/lib/jobs";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  stats: JobStats;
  location: string;
  firstName?: string | null;
  userId?: string | null;
  onVoiceMessage: (text: string, role?: "user" | "assistant") => void;
}

export function HeroSection({
  headline,
  subtitle,
  stats,
  location,
  firstName,
  userId,
  onVoiceMessage,
}: HeroSectionProps) {
  const displayStats = [
    { label: "Active Jobs", value: stats.total, icon: "💼" },
    { label: "Avg Day Rate", value: `£${stats.avgDayRate}k`, icon: "💰" },
    { label: "Hybrid", value: `${stats.hybridPercentage}%`, icon: "🏠" },
    { label: "UK Hub", value: "#1", icon: "📍" },
  ];

  return (
    <section className="gradient-hero text-white py-16 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-content relative z-10">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6 opacity-80">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-2">→</span>
          <a href="/fractional-jobs" className="hover:underline">UK Jobs</a>
          <span className="mx-2">→</span>
          <span>{location}</span>
        </nav>

        {/* Main content */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {headline}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            {subtitle}
          </p>

          {/* Voice button */}
          <div className="flex items-center gap-4 mb-8">
            <VoiceInput
              onMessage={onVoiceMessage}
              firstName={firstName}
              userId={userId}
              pageContext={{
                location,
                totalJobs: stats.total,
                topRoles: stats.topRoles.slice(0, 3).map(r => r.role),
              }}
            />
            <span className="text-sm opacity-70">
              Ask about {location} jobs
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <StatsBar stats={displayStats} className="mt-8" />
      </div>
    </section>
  );
}
