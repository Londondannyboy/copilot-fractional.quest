// next-intl routing configuration
// UK stays at root, other locales use prefix

import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // UK pages stay at root (no /uk prefix) to preserve SEO
  localePrefix: 'as-needed',
  // Enable locale detection from Accept-Language header
  localeDetection: true,
});
