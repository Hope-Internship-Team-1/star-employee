import { afterEach, expect, test, vi } from 'vitest';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { requireAuth } from '../router/requireAuth';

afterEach(() => vi.unstubAllGlobals());

const args = {
  params: { locale: 'id' },
  request: new Request('http://localhost/id'),
} as unknown as LoaderFunctionArgs;

function mockFetch(status: number, body: unknown) {
  const fetch = vi.fn().mockResolvedValue(Response.json(body, { status }));
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
  const fetch = mockFetch(200, { id: 1, name: 'Budi' });

  await expect(requireAuth(args)).resolves.toEqual({ id: 1, name: 'Budi' });
  expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/users\/me$/), {
    credentials: 'include',
  });
});

test('defers to the locale redirect when the locale segment is missing', async () => {
  const fetch = mockFetch(401, { error: 'Unauthorized: No token provided' });

  const res = await requireAuth({ params: { locale: 'login' } } as unknown as LoaderFunctionArgs);

  expect(res).toBeNull();
  expect(fetch).not.toHaveBeenCalled();
});
