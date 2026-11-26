import { redirect } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { isLocale, readStoredLocale } from '../i18n/storage';

export function localeLoader({ params, request }: LoaderFunctionArgs) {
  if (isLocale(params.locale)) return null;

  const url = new URL(request.url);
  return redirect(`/${readStoredLocale()}${url.pathname}${url.search}`);
}
