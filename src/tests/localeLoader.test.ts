import { afterEach, expect, test, vi } from 'vitest';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { localeLoader } from '../router/localeLoader';

afterEach(() => vi.unstubAllGlobals());

function run(locale: string | undefined, path: string) {
  return localeLoader({
    params: { locale },
    request: new Request(`http://localhost${path}`),
  } as unknown as LoaderFunctionArgs);
}

function stubStoredLocale(value: string | null) {
  vi.stubGlobal('localStorage', { getItem: () => value, setItem: () => undefined });
}

test('passes through a valid locale', () => {
  expect(run('id', '/id/login')).toBeNull();
});

test('prefixes the stored locale when the path has none', () => {
  stubStoredLocale('id');

  const res = run('login', '/login?next=1') as Response;

  expect(res.headers.get('Location')).toBe('/id/login?next=1');
});

test('falls back to en from the root', () => {
  stubStoredLocale(null);

  const res = run(undefined, '/') as Response;

  expect(res.headers.get('Location')).toBe('/en/');
});
