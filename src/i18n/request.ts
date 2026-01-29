// next-intl server request configuration

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isValidLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request (set by middleware)
  let locale = await requestLocale;

  // Validate and fallback to default
  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
