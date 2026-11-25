import { createContext, useContext } from 'react';
import type { Locale, Messages } from './dictionary';
import { en } from './en';
import { id } from './id';

export const dictionaries: Record<Locale, Messages> = { en, id };

export interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<LocaleState>({
  locale: 'en',
  setLocale: () => undefined,
});

export function useLocale(): LocaleState {
  return useContext(LocaleContext);
}

export function useMessages(): Messages {
  return dictionaries[useContext(LocaleContext).locale];
}
