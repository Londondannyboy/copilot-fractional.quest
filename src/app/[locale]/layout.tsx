// Layout for locale-specific routes (US, AU, NZ)
// UK pages stay at root level without this wrapper

import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  // Generate paths for non-default locales (UK is at root)
  return locales
    .filter(locale => locale !== 'uk')
    .map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale - only allow us, au, nz (UK is at root)
  if (!isValidLocale(locale) || locale === 'uk') {
    notFound();
  }

  return <>{children}</>;
}
