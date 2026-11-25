import { afterEach, expect, test, vi } from 'vitest';
import { requireAuth } from '../router/requireAuth';

afterEach(() => vi.unstubAllGlobals());

function mockFetch(status: number, body: unknown) {
  const fetch = vi.fn().mockResolvedValue(Response.json(body, { status }));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

test('redirects to /login when unauthorized', async () => {
  mockFetch(401, { error: 'Unauthorized: No token provided' });

  const res = (await requireAuth()) as Response;

  expect(res.status).toBe(302);
  expect(res.headers.get('Location')).toBe('/login');
});

test('returns the user when authorized', async () => {
  const fetch = mockFetch(200, { id: 1, name: 'Budi' });

  await expect(requireAuth()).resolves.toEqual({ id: 1, name: 'Budi' });
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/users\/me$/), {
    credentials: 'include',
  });
});
