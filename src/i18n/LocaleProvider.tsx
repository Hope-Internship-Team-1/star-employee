import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { Locale } from './dictionary';
import { LocaleContext } from './localeContext';
import { isLocale, replaceLocale } from './paths';
import { readStoredLocale, storeLocale } from './storage';

export function LocaleProvider() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fallbackLocale, setFallbackLocale] = useState<Locale>(readStoredLocale);

  const urlLocale = location.pathname.split('/')[1];
  const locale = isLocale(urlLocale) ? urlLocale : fallbackLocale;

  useEffect(() => {
    document.documentElement.lang = locale;
    storeLocale(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        setFallbackLocale(next);
        if (isLocale(urlLocale)) {
          navigate(`${replaceLocale(location.pathname, next)}${location.search}${location.hash}`, {
            replace: true,
          });
        }
      },
    }),
    [locale, urlLocale, navigate, location.pathname, location.search, location.hash],
  );

  return (
    <LocaleContext.Provider value={value}>
      <Outlet />
    </LocaleContext.Provider>
  );
}
