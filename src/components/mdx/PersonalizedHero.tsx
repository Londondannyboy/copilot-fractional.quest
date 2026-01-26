"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/client";

interface PersonalizedHeroProps {
  title?: string;
  subtitle?: string;
  location?: string;
  role?: string;
  jobCount?: number;
  backgroundImage?: string;
}

/**
 * PersonalizedHero - A hero section that personalizes based on user profile
 *
 * Usage in MDX:
 * ```mdx
 * <PersonalizedHero
 *   title="Find Your Next Role"
 *   location="London"
 *   role="CMO"
 * />
 * ```
 */
export default function PersonalizedHero({
  title,
  subtitle,
  location = "London",
  role = "Executive",
  jobCount = 0,
  backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
}: PersonalizedHeroProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0] || "there";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const greeting = isLoggedIn
    ? `Welcome back, ${firstName}!`
    : "Welcome to Fractional Quest";

  const heroTitle = title || (isLoggedIn
    ? `${jobCount} new ${role} roles in ${location}`
    : `Fractional ${role} Jobs in ${location}`);

  const heroSubtitle = subtitle || (isLoggedIn
    ? "Personalized opportunities based on your profile"
    : "Find your next fractional leadership opportunity");

  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Fractional executive jobs background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="max-w-2xl">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium">
              {greeting}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8">
            {heroSubtitle}
          </p>

          {/* Quick Stats (if logged in) */}
          {isLoggedIn && jobCount > 0 && (
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold text-white">{jobCount}</div>
                <div className="text-sm text-gray-400">New matches</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold text-emerald-400">{location}</div>
                <div className="text-sm text-gray-400">Your location</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <div className="text-2xl font-bold text-blue-400">{role}</div>
                <div className="text-sm text-gray-400">Target role</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
