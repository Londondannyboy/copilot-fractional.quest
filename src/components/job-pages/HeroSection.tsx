"use client";

import Image from "next/image";
import { StatsBar } from "@/components/ui";
import { JobStats } from "@/lib/jobs";
import { getImage, getHeroImageUrl, ImageCategory } from "@/lib/images";

interface HeroSectionProps {
  headline: string;
  subtitle: string;
  stats: JobStats;
  location: string;
  imageCategory?: ImageCategory;
  firstName?: string | null;
  userId?: string | null;
  onVoiceMessage: (text: string, role?: "user" | "assistant") => void;
}

export function HeroSection({
  headline,
  subtitle,
  stats,
  location,
  imageCategory = "uk",
  firstName,
  userId,
  onVoiceMessage,
}: HeroSectionProps) {
  const image = getImage(imageCategory);
  const imageUrl = getHeroImageUrl(imageCategory, 1920, 800);

  const displayStats = [
    { label: "Active Jobs", value: stats.total, icon: "💼" },
    { label: "Avg Day Rate", value: `£${stats.avgDayRate}k`, icon: "💰" },
    { label: "Hybrid", value: `${stats.hybridPercentage}%`, icon: "🏠" },
    { label: "UK Hub", value: "#1", icon: "📍" },
  ];

  return (
    <section className="relative text-white py-12 sm:py-16 px-4 sm:px-6 min-h-[400px] sm:min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image - Optimized for LCP */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={`${headline} - ${image.alt}`}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover"
          sizes="100vw"
          quality={60}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/50" />
      </div>

      <div className="container-content relative z-10 w-full">
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm mb-4 sm:mb-6 opacity-80">
          <a href="/" className="hover:underline">Home</a>
          <span className="mx-1 sm:mx-2">→</span>
          <a href="/fractional-jobs-uk" className="hover:underline">UK Jobs</a>
          <span className="mx-1 sm:mx-2">→</span>
          <span>{location}</span>
        </nav>

        {/* Main content */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance font-playfair">
            {headline}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-8">
            {subtitle}
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-8">
            <span className="text-sm opacity-70 text-center sm:text-left">
              Browse {stats.total} available positions
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <StatsBar stats={displayStats} className="mt-8" />
      </div>

      {/* Photo Credit */}
      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/50 hover:text-white/70 transition-colors"
        >
          Photo: {image.credit}
        </a>
      </div>
    </section>
  );
}
