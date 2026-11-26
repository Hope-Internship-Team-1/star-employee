import type { Locale } from '../i18n';
import type { Industry } from './dictionaries';

export interface LocalizedText {
  en: string;
  id: string;
}

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export interface Company {
  id: string;
  name: string;
  initials: string;
  city: string;
  provinceId: string;
  industry: Industry;
  scale: string;
  since: string;
  about: LocalizedText;
}
