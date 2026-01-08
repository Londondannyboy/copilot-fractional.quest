'use client'

import Image from 'next/image'
import { getImage, getHeroImageUrl, ImageCategory } from '@/lib/images'

interface HeroWithImageProps {
  title: string
  subtitle?: string
  category: ImageCategory
  children?: React.ReactNode
  overlay?: 'dark' | 'light' | 'gradient'
  height?: 'sm' | 'md' | 'lg'
}

export function HeroWithImage({
  title,
  subtitle,
  category,
  children,
  overlay = 'gradient',
  height = 'md'
}: HeroWithImageProps) {
  const image = getImage(category)
  const imageUrl = getHeroImageUrl(category, 1920, 600)

  const heightClasses = {
    sm: 'min-h-[300px]',
    md: 'min-h-[400px]',
    lg: 'min-h-[500px]'
  }

  const overlayClasses = {
    dark: 'bg-black/60',
    light: 'bg-white/40',
    gradient: 'bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent'
  }

  return (
    <section className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={image.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-200 mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Photo Credit */}
      <div className="absolute bottom-2 right-2 z-10">
        <a
          href={image.creditUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/60 hover:text-white/80 transition-colors"
        >
          Photo by {image.credit}
        </a>
      </div>
    </section>
  )
}

// Compact hero for article pages
export function ArticleHero({
  title,
  category,
  publishedDate,
  readTime
}: {
  title: string
  category: ImageCategory
  publishedDate?: string
  readTime?: string
}) {
  const image = getImage(category)
  const imageUrl = getHeroImageUrl(category, 1200, 400)

  return (
    <section className="relative min-h-[280px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={image.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-white mb-3">
          {title}
        </h1>
        {(publishedDate || readTime) && (
          <div className="flex items-center gap-4 text-sm text-gray-300">
            {publishedDate && <span>{publishedDate}</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </section>
  )
}

// Simple image card for thumbnails
export function ImageCard({
  category,
  className = ''
}: {
  category: ImageCategory
  className?: string
}) {
  const image = getImage(category)
  const imageUrl = getHeroImageUrl(category, 600, 400)

  return (
    <div className={`relative aspect-[3/2] overflow-hidden rounded-lg ${className}`}>
      <Image
        src={imageUrl}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}
