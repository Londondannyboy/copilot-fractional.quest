// Currency utilities for fractional.quest
// Static exchange rates - update periodically as needed

import { type Locale, localeConfig } from './config';

// Exchange rates relative to GBP (base currency)
// Last updated: January 2026
export const exchangeRates: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  AUD: 1.93,
  NZD: 2.08,
  EUR: 1.18,
};

// Convert amount from one currency to another
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  const inGBP = amount / exchangeRates[fromCurrency];
  return Math.round(inGBP * exchangeRates[toCurrency]);
}

// Convert GBP amount to locale currency
export function convertFromGBP(amount: number, locale: Locale): number {
  const targetCurrency = localeConfig[locale].currency;
  return convertCurrency(amount, 'GBP', targetCurrency);
}

// Format currency for display
export function formatCurrency(
  amount: number,
  locale: Locale,
  options?: { maximumFractionDigits?: number; compact?: boolean }
): string {
  const config = localeConfig[locale];

  if (options?.compact && amount >= 1000) {
    const formatted = new Intl.NumberFormat(config.language, {
      style: 'currency',
      currency: config.currency,
      notation: 'compact',
      maximumFractionDigits: options.maximumFractionDigits ?? 0,
    }).format(amount);
    return formatted;
  }

  return new Intl.NumberFormat(config.language, {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(amount);
}

// Format a day rate range (e.g., "£900-£1,500/day" or "$1,140-$1,900/day")
export function formatDayRateRange(
  minRate: number,
  maxRate: number,
  locale: Locale,
  options?: { fromGBP?: boolean }
): string {
  const min = options?.fromGBP ? convertFromGBP(minRate, locale) : minRate;
  const max = options?.fromGBP ? convertFromGBP(maxRate, locale) : maxRate;
  const symbol = localeConfig[locale].currencySymbol;

  return `${symbol}${min.toLocaleString()}-${symbol}${max.toLocaleString()}/day`;
}

// Format annual salary
export function formatSalary(
  amount: number,
  locale: Locale,
  options?: { fromGBP?: boolean }
): string {
  const value = options?.fromGBP ? convertFromGBP(amount, locale) : amount;
  return formatCurrency(value, locale);
}

// Role-specific day rates by locale (actual market rates, not just converted)
// These are researched rates for each market, not simple currency conversions
// Updated January 2026 based on Tavily competitive research
export const roleDefaultsByLocale: Record<Locale, Record<string, {
  label: string;
  avgDayRate: number;
  avgSalary: number;
  minDayRate: number;
  maxDayRate: number;
}>> = {
  uk: {
    // UK rates updated Jan 2026 - aligned with realistic market: Entry £600-900, Senior £900-1,200, Premium £1,200+
    cmo: { label: 'CMO', avgDayRate: 900, avgSalary: 130000, minDayRate: 600, maxDayRate: 1500 },
    cfo: { label: 'CFO', avgDayRate: 1000, avgSalary: 145000, minDayRate: 750, maxDayRate: 1500 },
    cto: { label: 'CTO', avgDayRate: 1050, avgSalary: 155000, minDayRate: 850, maxDayRate: 1600 },
    coo: { label: 'COO', avgDayRate: 950, avgSalary: 140000, minDayRate: 750, maxDayRate: 1400 },
    ciso: { label: 'CISO', avgDayRate: 1350, avgSalary: 165000, minDayRate: 1000, maxDayRate: 2000 },
    chro: { label: 'CHRO', avgDayRate: 900, avgSalary: 130000, minDayRate: 650, maxDayRate: 1400 },
    cpo: { label: 'CPO', avgDayRate: 950, avgSalary: 145000, minDayRate: 800, maxDayRate: 1400 },
    ceo: { label: 'CEO', avgDayRate: 1200, avgSalary: 180000, minDayRate: 900, maxDayRate: 1800 },
    cco: { label: 'CCO', avgDayRate: 900, avgSalary: 140000, minDayRate: 700, maxDayRate: 1300 },
  },
  us: {
    // US rates (USD) - typically higher than UK due to market differences
    cmo: { label: 'CMO', avgDayRate: 1400, avgSalary: 200000, minDayRate: 1000, maxDayRate: 2000 },
    cfo: { label: 'CFO', avgDayRate: 1500, avgSalary: 220000, minDayRate: 1100, maxDayRate: 2200 },
    cto: { label: 'CTO', avgDayRate: 1600, avgSalary: 240000, minDayRate: 1200, maxDayRate: 2400 },
    coo: { label: 'COO', avgDayRate: 1400, avgSalary: 210000, minDayRate: 1000, maxDayRate: 2000 },
    ciso: { label: 'CISO', avgDayRate: 1650, avgSalary: 230000, minDayRate: 1250, maxDayRate: 2300 },
    chro: { label: 'CHRO', avgDayRate: 1200, avgSalary: 185000, minDayRate: 900, maxDayRate: 1700 },
    cpo: { label: 'CPO', avgDayRate: 1450, avgSalary: 215000, minDayRate: 1100, maxDayRate: 2000 },
    ceo: { label: 'CEO', avgDayRate: 1800, avgSalary: 280000, minDayRate: 1300, maxDayRate: 2800 },
    cco: { label: 'CCO', avgDayRate: 1400, avgSalary: 200000, minDayRate: 1100, maxDayRate: 1800 },
  },
  au: {
    // Australian rates (AUD) - similar to UK rates when adjusted
    cmo: { label: 'CMO', avgDayRate: 1600, avgSalary: 220000, minDayRate: 1200, maxDayRate: 2400 },
    cfo: { label: 'CFO', avgDayRate: 1800, avgSalary: 250000, minDayRate: 1400, maxDayRate: 2600 },
    cto: { label: 'CTO', avgDayRate: 1900, avgSalary: 270000, minDayRate: 1500, maxDayRate: 2800 },
    coo: { label: 'COO', avgDayRate: 1600, avgSalary: 240000, minDayRate: 1300, maxDayRate: 2400 },
    ciso: { label: 'CISO', avgDayRate: 2000, avgSalary: 260000, minDayRate: 1600, maxDayRate: 2800 },
    chro: { label: 'CHRO', avgDayRate: 1400, avgSalary: 210000, minDayRate: 1100, maxDayRate: 2000 },
    cpo: { label: 'CPO', avgDayRate: 1700, avgSalary: 250000, minDayRate: 1400, maxDayRate: 2400 },
    ceo: { label: 'CEO', avgDayRate: 2100, avgSalary: 310000, minDayRate: 1600, maxDayRate: 3200 },
    cco: { label: 'CCO', avgDayRate: 1700, avgSalary: 240000, minDayRate: 1400, maxDayRate: 2100 },
  },
  nz: {
    // New Zealand rates (NZD) - slightly lower than AU
    cmo: { label: 'CMO', avgDayRate: 1500, avgSalary: 200000, minDayRate: 1100, maxDayRate: 2200 },
    cfo: { label: 'CFO', avgDayRate: 1700, avgSalary: 230000, minDayRate: 1300, maxDayRate: 2400 },
    cto: { label: 'CTO', avgDayRate: 1800, avgSalary: 250000, minDayRate: 1400, maxDayRate: 2600 },
    coo: { label: 'COO', avgDayRate: 1500, avgSalary: 220000, minDayRate: 1200, maxDayRate: 2200 },
    ciso: { label: 'CISO', avgDayRate: 1850, avgSalary: 240000, minDayRate: 1500, maxDayRate: 2600 },
    chro: { label: 'CHRO', avgDayRate: 1300, avgSalary: 190000, minDayRate: 1000, maxDayRate: 1800 },
    cpo: { label: 'CPO', avgDayRate: 1600, avgSalary: 230000, minDayRate: 1300, maxDayRate: 2200 },
    ceo: { label: 'CEO', avgDayRate: 1950, avgSalary: 290000, minDayRate: 1500, maxDayRate: 3000 },
    cco: { label: 'CCO', avgDayRate: 1600, avgSalary: 220000, minDayRate: 1300, maxDayRate: 1950 },
  },
};

// Get role defaults for a specific locale
export function getRoleDefaults(locale: Locale, role: string) {
  return roleDefaultsByLocale[locale][role.toLowerCase()] || roleDefaultsByLocale[locale].cfo;
}
