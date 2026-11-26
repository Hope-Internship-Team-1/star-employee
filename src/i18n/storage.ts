import type { Locale } from './dictionary';

const STORAGE_KEY = 'star.locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'id';
}

export function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en';
  } catch {
    return 'en';
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable in private mode; the URL still carries the locale.
  }
}
