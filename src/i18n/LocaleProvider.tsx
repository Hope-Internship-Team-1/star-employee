import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Locale } from './dictionary';
import { LocaleContext } from './localeContext';
import { isLocale, storeLocale } from './storage';

export function LocaleProvider() {
  const params = useParams();
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    document.documentElement.lang = locale;
    storeLocale(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => navigate(pathname.replace(/^\/[^/]+/, `/${next}`) + search),
    }),
    [locale, navigate, pathname, search],
  );

  return (
    <LocaleContext.Provider value={value}>
      <Outlet />
    </LocaleContext.Provider>
  );
}
