// Locale configuration for fractional.quest
// Supports UK (default), US, Australia, and New Zealand markets

export const locales = ['uk', 'us', 'au', 'nz'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'uk';

// Locale metadata
export const localeConfig: Record<Locale, {
  name: string;
  language: string;
  hreflang: string;
  currency: string;
  currencySymbol: string;
  country: string;
}> = {
  uk: {
    name: 'United Kingdom',
    language: 'en-GB',
    hreflang: 'en-GB',
    currency: 'GBP',
    currencySymbol: '£',
    country: 'UK',
  },
  us: {
    name: 'United States',
    language: 'en-US',
    hreflang: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
    country: 'US',
  },
  au: {
    name: 'Australia',
    language: 'en-AU',
    hreflang: 'en-AU',
    currency: 'AUD',
    currencySymbol: 'A$',
    country: 'AU',
  },
  nz: {
    name: 'New Zealand',
    language: 'en-NZ',
    hreflang: 'en-NZ',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    country: 'NZ',
  },
};

// Location options per market for job filtering
export const locationOptionsByLocale: Record<Locale, Array<{ value: string; label: string }>> = {
  uk: [
    { value: '', label: 'All UK Locations' },
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'Bristol', label: 'Bristol' },
    { value: 'Edinburgh', label: 'Edinburgh' },
    { value: 'Leeds', label: 'Leeds' },
    { value: 'Remote', label: 'Remote' },
  ],
  us: [
    { value: '', label: 'All US Locations' },
    { value: 'New York', label: 'New York' },
    { value: 'San Francisco', label: 'San Francisco' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Boston', label: 'Boston' },
    { value: 'Austin', label: 'Austin' },
    { value: 'Seattle', label: 'Seattle' },
    { value: 'Remote', label: 'Remote' },
  ],
  au: [
    { value: '', label: 'All Australian Locations' },
    { value: 'Sydney', label: 'Sydney' },
    { value: 'Melbourne', label: 'Melbourne' },
    { value: 'Brisbane', label: 'Brisbane' },
    { value: 'Perth', label: 'Perth' },
    { value: 'Adelaide', label: 'Adelaide' },
    { value: 'Remote', label: 'Remote' },
  ],
  nz: [
    { value: '', label: 'All NZ Locations' },
    { value: 'Auckland', label: 'Auckland' },
    { value: 'Wellington', label: 'Wellington' },
    { value: 'Christchurch', label: 'Christchurch' },
    { value: 'Hamilton', label: 'Hamilton' },
    { value: 'Remote', label: 'Remote' },
  ],
};

// Helper to check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Helper to get locale from path
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment) && firstSegment !== 'uk') {
    return firstSegment;
  }

  // Default to UK for root paths and paths without locale prefix
  return 'uk';
}
