import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { requireAuth } from '../router/requireAuth';

beforeEach(() => vi.stubEnv('VITE_API_BASE_URL', 'https://api.test'));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const args = {
  params: { locale: 'id' },
  request: new Request('http://localhost/id'),
} as unknown as LoaderFunctionArgs;

function mockFetch(status: number, body: unknown) {
  const fetch = vi.fn().mockImplementation(() => Promise.resolve(Response.json(body, { status })));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

test('redirects to the localized login when unauthorized', async () => {
  mockFetch(401, { error: 'Unauthorized: No token provided' });

  const res = (await requireAuth(args)) as Response;

  expect(res.status).toBe(302);
  expect(res.headers.get('Location')).toBe('/id/login');
});

test('returns the user when authorized', async () => {
  const fetch = mockFetch(200, { authenticated: true, user: { id: 'u1', name: 'Budi' } });

  await expect(requireAuth(args)).resolves.toEqual({ id: 'u1', name: 'Budi' });
  expect(fetch).toHaveBeenCalledWith(
    'https://api.test/users/me',
    expect.objectContaining({ credentials: 'include' }),
  );
});

test('checks the session again on every guarded navigation', async () => {
  const fetch = mockFetch(200, { authenticated: true, user: { id: 'u1' } });

  await requireAuth(args);
  await requireAuth(args);

  expect(fetch).toHaveBeenCalledTimes(2);
});
