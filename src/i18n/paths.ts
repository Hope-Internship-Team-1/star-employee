import type { Locale } from './dictionary';

export const LOCALES: Locale[] = ['en', 'id'];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'id';
}

export function localePath(locale: Locale, path = ''): string {
  if (!path || path === '/') return `/${locale}`;
  return `/${locale}${path.startsWith('/') ? path : `/${path}`}`;
}

export function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/');
  segments[1] = locale;
  return segments.join('/');
}
