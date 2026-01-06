"use client";

import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  level?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  children,
  subtitle,
  level = "h2",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center" : "text-left";

  const headingClasses = {
    h1: "text-4xl md:text-5xl font-bold tracking-tight",
    h2: "text-2xl md:text-3xl font-semibold",
    h3: "text-xl md:text-2xl font-medium",
  };

  const Tag = level;

  return (
    <div className={`mb-8 ${alignClasses} ${className}`}>
      <Tag className={headingClasses[level]}>{children}</Tag>
      {subtitle && (
        <p className="mt-3 text-lg text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
