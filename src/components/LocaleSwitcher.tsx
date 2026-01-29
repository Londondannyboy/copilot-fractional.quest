'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { locales, localeConfig, type Locale } from '@/i18n/config';

// Flag emojis for each locale
const FLAGS: Record<Locale, string> = {
  uk: '🇬🇧',
  us: '🇺🇸',
  au: '🇦🇺',
  nz: '🇳🇿',
};

interface LocaleSwitcherProps {
  currentLocale?: Locale;
}

/**
 * Convert current path to equivalent path in target locale
 */
function getLocalePath(pathname: string, targetLocale: Locale): string {
  // Remove any existing locale prefix
  let cleanPath = pathname.replace(/^\/(us|au|nz)/, '');

  // Remove -uk suffix if present
  if (cleanPath.endsWith('-uk')) {
    cleanPath = cleanPath.replace(/-uk$/, '');
  }

  if (targetLocale === 'uk') {
    // UK pages: add -uk suffix for job pages, keep at root
    if (cleanPath.includes('-jobs') || cleanPath.includes('fractional-')) {
      return `${cleanPath}-uk`;
    }
    return cleanPath || '/';
  }

  // International pages: add locale prefix
  return `/${targetLocale}${cleanPath || ''}`;
}

/**
 * Detect current locale from pathname
 */
function detectCurrentLocale(pathname: string): Locale {
  const match = pathname.match(/^\/(us|au|nz)/);
  if (match) {
    return match[1] as Locale;
  }
  return 'uk';
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect locale from path if not provided
  const locale = currentLocale || detectCurrentLocale(pathname);
  const config = localeConfig[locale];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set cookie when locale is selected
  const handleLocaleChange = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Select country"
      >
        <span className="text-lg">{FLAGS[locale]}</span>
        <span className="hidden sm:inline">{config.country}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {locales.map((loc) => {
            const locConfig = localeConfig[loc];
            const isActive = loc === locale;
            const targetPath = getLocalePath(pathname, loc);

            return (
              <Link
                key={loc}
                href={targetPath}
                onClick={() => handleLocaleChange(loc)}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{FLAGS[loc]}</span>
                <span>{locConfig.name}</span>
                {isActive && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
