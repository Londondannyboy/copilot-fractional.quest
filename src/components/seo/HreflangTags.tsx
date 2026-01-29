// HreflangTags component for international SEO
// Generates alternate language/region links for Google

import { locales, localeConfig, type Locale } from '@/i18n/config';

interface HreflangTagsProps {
  // The path without locale prefix (e.g., '/fractional-cfo-jobs' or '/fractional-cfo-jobs-uk')
  path: string;
  // Current locale
  currentLocale?: Locale;
}

/**
 * Generates the correct path for each locale
 * UK pages stay at root with -uk suffix, other locales use prefix without suffix
 */
function getLocalePath(locale: Locale, basePath: string): string {
  // Remove any existing -uk suffix from the path
  const cleanPath = basePath.replace(/-uk$/, '');

  if (locale === 'uk') {
    // UK pages: keep at root, add -uk suffix if it's a jobs page
    if (cleanPath.includes('-jobs') || cleanPath.includes('fractional-')) {
      return `${cleanPath}-uk`;
    }
    return cleanPath;
  }

  // International pages: add locale prefix, no -uk suffix
  return `/${locale}${cleanPath}`;
}

/**
 * HreflangTags - Renders hreflang link tags for all supported locales
 *
 * Usage:
 * ```tsx
 * <HreflangTags path="/fractional-cfo-jobs" />
 * // or for UK pages:
 * <HreflangTags path="/fractional-cfo-jobs-uk" currentLocale="uk" />
 * ```
 */
export function HreflangTags({ path, currentLocale = 'uk' }: HreflangTagsProps) {
  const baseUrl = 'https://fractional.quest';

  // Generate hreflang tags for all locales
  const hreflangLinks = locales.map((locale) => ({
    hreflang: localeConfig[locale].hreflang,
    href: `${baseUrl}${getLocalePath(locale, path)}`,
    locale,
  }));

  // UK is the default (x-default)
  const xDefaultHref = `${baseUrl}${getLocalePath('uk', path)}`;

  return (
    <>
      {hreflangLinks.map(({ hreflang, href, locale }) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={hreflang}
          href={href}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefaultHref} />
    </>
  );
}

/**
 * Utility function to generate hreflang data for use in metadata
 * Returns an object compatible with Next.js metadata alternates
 */
export function generateHreflangAlternates(basePath: string): Record<string, string> {
  const alternates: Record<string, string> = {};

  locales.forEach((locale) => {
    const hreflang = localeConfig[locale].hreflang;
    alternates[hreflang] = getLocalePath(locale, basePath);
  });

  return alternates;
}

/**
 * Returns array of hreflang entries for manual rendering
 */
export function getHreflangEntries(basePath: string): Array<{ lang: string; href: string }> {
  const baseUrl = 'https://fractional.quest';

  const entries = locales.map((locale) => ({
    lang: localeConfig[locale].hreflang,
    href: `${baseUrl}${getLocalePath(locale, basePath)}`,
  }));

  // Add x-default pointing to UK
  entries.push({
    lang: 'x-default',
    href: `${baseUrl}${getLocalePath('uk', basePath)}`,
  });

  return entries;
}
