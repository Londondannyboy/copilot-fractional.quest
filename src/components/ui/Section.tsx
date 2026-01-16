"use client";

import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg";
  background?: "default" | "muted" | "primary" | "hero";
  id?: string;
}

export function Section({
  children,
  className = "",
  size = "default",
  background = "default",
  id,
}: SectionProps) {
  const sizeClasses = {
    default: "py-10 sm:py-12 md:py-16 px-4 sm:px-6",
    sm: "py-6 sm:py-8 px-4 sm:px-6",
    lg: "py-16 sm:py-20 md:py-24 px-4 sm:px-6",
  };

  const bgClasses = {
    default: "bg-white",
    muted: "bg-gray-50",
    primary: "gradient-primary text-white",
    hero: "gradient-hero text-white",
  };

  return (
    <section
      id={id}
      className={`${sizeClasses[size]} ${bgClasses[background]} ${className}`}
    >
      <div className="container-content">{children}</div>
    </section>
  );
}
