// Curated Unsplash images for hero sections and OG images
// Using direct Unsplash URLs with optimized parameters for fast loading
// Credit: All images from Unsplash (unsplash.com)

export type ImageCategory =
  | 'cfo' | 'cto' | 'cmo' | 'coo' | 'ceo' | 'chro' | 'cpo' | 'ciso' | 'cro'
  | 'london' | 'manchester' | 'birmingham' | 'edinburgh' | 'bristol' | 'uk'
  | 'remote' | 'tech' | 'finance' | 'marketing' | 'operations' | 'hr' | 'sales'
  | 'interim' | 'part-time' | 'services' | 'guide' | 'salary' | 'default'

interface ImageData {
  url: string
  alt: string
  credit: string
  creditUrl: string
}

// Curated professional images by category
const imageMap: Record<ImageCategory, ImageData> = {
  // Role-specific images
  cfo: {
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop&q=80',
    alt: 'Professional finance executive reviewing financial data',
    credit: 'Austin Distel',
    creditUrl: 'https://unsplash.com/@austindistel'
  },
  cto: {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop&q=80',
    alt: 'Technology team collaborating on software development',
    credit: 'Marvin Meyer',
    creditUrl: 'https://unsplash.com/@marvelous'
  },
  cmo: {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&q=80',
    alt: 'Marketing team in strategy meeting',
    credit: 'Jason Goodman',
    creditUrl: 'https://unsplash.com/@jasongoodman_youxventures'
  },
  coo: {
    url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop&q=80',
    alt: 'Operations team reviewing business processes',
    credit: 'Austin Distel',
    creditUrl: 'https://unsplash.com/@austindistel'
  },
  ceo: {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&q=80',
    alt: 'Executive leader in modern office',
    credit: 'LinkedIn Sales Solutions',
    creditUrl: 'https://unsplash.com/@linkedinsalesnavigator'
  },
  chro: {
    url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=600&fit=crop&q=80',
    alt: 'HR professionals in team discussion',
    credit: 'Annie Spratt',
    creditUrl: 'https://unsplash.com/@anniespratt'
  },
  cpo: {
    url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=600&fit=crop&q=80',
    alt: 'Product team working on UX design',
    credit: 'Alvaro Reyes',
    creditUrl: 'https://unsplash.com/@alvarordesign'
  },
  ciso: {
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop&q=80',
    alt: 'Cybersecurity professional monitoring systems',
    credit: 'Adi Goldstein',
    creditUrl: 'https://unsplash.com/@adigold1'
  },
  cro: {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop&q=80',
    alt: 'Revenue leader in sales strategy meeting',
    credit: 'LinkedIn Sales Solutions',
    creditUrl: 'https://unsplash.com/@linkedinsalesnavigator'
  },

  // Location-specific images
  london: {
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=600&fit=crop&q=80',
    alt: 'London city skyline with Tower Bridge',
    credit: 'Charles Postiaux',
    creditUrl: 'https://unsplash.com/@charlpost'
  },
  manchester: {
    url: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=1200&h=600&fit=crop&q=80',
    alt: 'Manchester city centre modern architecture',
    credit: 'Michael D Beckwith',
    creditUrl: 'https://unsplash.com/@michael_david_beckwith'
  },
  birmingham: {
    url: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=1200&h=600&fit=crop&q=80',
    alt: 'Birmingham business district',
    credit: 'David Sherpa',
    creditUrl: 'https://unsplash.com/@davidsherpa'
  },
  edinburgh: {
    url: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=1200&h=600&fit=crop&q=80',
    alt: 'Edinburgh historic cityscape',
    credit: 'Adam Wilson',
    creditUrl: 'https://unsplash.com/@fourcolourblack'
  },
  bristol: {
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop&q=80',
    alt: 'Bristol Clifton Suspension Bridge and cityscape',
    credit: 'Tom Sherlock',
    creditUrl: 'https://unsplash.com/@tomsherlock'
  },
  uk: {
    url: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1200&h=600&fit=crop&q=80',
    alt: 'United Kingdom business landscape',
    credit: 'Eva Dang',
    creditUrl: 'https://unsplash.com/@evantdang'
  },

  // Category images
  remote: {
    url: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&h=600&fit=crop&q=80',
    alt: 'Professional working remotely from home office',
    credit: 'Thought Catalog',
    creditUrl: 'https://unsplash.com/@thoughtcatalog'
  },
  tech: {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop&q=80',
    alt: 'Technology and software development',
    credit: 'Alexandre Debiève',
    creditUrl: 'https://unsplash.com/@alexkixa'
  },
  finance: {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80',
    alt: 'Financial analysis and data',
    credit: 'Carlos Muza',
    creditUrl: 'https://unsplash.com/@kmuza'
  },
  marketing: {
    url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&h=600&fit=crop&q=80',
    alt: 'Marketing strategy and creativity',
    credit: 'Campaign Creators',
    creditUrl: 'https://unsplash.com/@campaign_creators'
  },
  operations: {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop&q=80',
    alt: 'Business operations and planning',
    credit: 'Scott Graham',
    creditUrl: 'https://unsplash.com/@homajob'
  },
  hr: {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80',
    alt: 'Team collaboration and HR',
    credit: 'Annie Spratt',
    creditUrl: 'https://unsplash.com/@anniespratt'
  },
  sales: {
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=600&fit=crop&q=80',
    alt: 'Sales team in revenue strategy meeting',
    credit: 'LinkedIn Sales Solutions',
    creditUrl: 'https://unsplash.com/@linkedinsalesnavigator'
  },

  // Job type images
  interim: {
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&q=80',
    alt: 'Interim executive in leadership role',
    credit: 'LinkedIn Sales Solutions',
    creditUrl: 'https://unsplash.com/@linkedinsalesnavigator'
  },
  'part-time': {
    url: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=600&fit=crop&q=80',
    alt: 'Flexible work arrangement',
    credit: 'Bench Accounting',
    creditUrl: 'https://unsplash.com/@benchaccounting'
  },
  services: {
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop&q=80',
    alt: 'Professional consulting services',
    credit: 'Amy Hirschi',
    creditUrl: 'https://unsplash.com/@amyhirschi'
  },
  guide: {
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop&q=80',
    alt: 'Career guidance and resources',
    credit: 'Green Chameleon',
    creditUrl: 'https://unsplash.com/@craftedbygc'
  },
  salary: {
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop&q=80',
    alt: 'Salary and compensation analysis',
    credit: 'Alexander Mils',
    creditUrl: 'https://unsplash.com/@alexandermils'
  },
  default: {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop&q=80',
    alt: 'Modern office environment',
    credit: 'Nastuh Abootalebi',
    creditUrl: 'https://unsplash.com/@sunday_digital'
  }
}

/**
 * Get image data for a specific category
 */
export function getImage(category: ImageCategory): ImageData {
  return imageMap[category] || imageMap.default
}

/**
 * Get hero image URL with custom dimensions
 */
export function getHeroImageUrl(category: ImageCategory, width = 1200, height = 600): string {
  const image = getImage(category)
  // Replace dimensions in URL
  return image.url.replace(/w=\d+/, `w=${width}`).replace(/h=\d+/, `h=${height}`)
}

/**
 * Get OG image URL (optimized for social sharing - 1200x630)
 */
export function getOGImageUrl(category: ImageCategory): string {
  return getHeroImageUrl(category, 1200, 630)
}

/**
 * Map role to image category
 */
export function getRoleImageCategory(role: string): ImageCategory {
  const roleMap: Record<string, ImageCategory> = {
    'cfo': 'cfo',
    'cto': 'cto',
    'cmo': 'cmo',
    'coo': 'coo',
    'ceo': 'ceo',
    'chro': 'chro',
    'cpo': 'cpo',
    'ciso': 'ciso',
    'cro': 'cro',
    'finance': 'finance',
    'technology': 'tech',
    'marketing': 'marketing',
    'operations': 'operations',
    'hr': 'hr',
    'sales': 'sales',
  }
  return roleMap[role.toLowerCase()] || 'default'
}

/**
 * Map location to image category
 */
export function getLocationImageCategory(location: string): ImageCategory {
  const locationMap: Record<string, ImageCategory> = {
    'london': 'london',
    'manchester': 'manchester',
    'birmingham': 'birmingham',
    'edinburgh': 'edinburgh',
    'bristol': 'bristol',
    'uk': 'uk',
    'remote': 'remote',
  }
  return locationMap[location.toLowerCase()] || 'uk'
}

/**
 * Generate OpenGraph image metadata for a category
 * Returns the object to spread into metadata.openGraph.images
 */
export function getOGImageMetadata(category: ImageCategory): { url: string; width: number; height: number; alt: string }[] {
  const image = getImage(category)
  return [{
    url: getOGImageUrl(category),
    width: 1200,
    height: 630,
    alt: image.alt
  }]
}

/**
 * Generate Twitter card image metadata
 */
export function getTwitterImageMetadata(category: ImageCategory): { images: string[] } {
  return {
    images: [getOGImageUrl(category)]
  }
}
