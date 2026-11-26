import { redirect } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { isLocale } from '../i18n/storage';

export async function requireAuth({ params }: LoaderFunctionArgs) {
  // A missing or bogus locale means localeLoader is normalizing the URL, so this guard must not redirect.
  if (!isLocale(params.locale)) return null;

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    credentials: 'include',
  });

  if (res.status === 401) return redirect(`/${params.locale}/login`);
  if (!res.ok) throw new Error(`Session check failed with status ${res.status}`);

  return res.json();
}
