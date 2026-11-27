import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { clearSession, getSessionSnapshot, loadSession, setSession } from '../services/session';
import { listRandomJobs, listRecommendedJobs } from '../services/jobs';

beforeEach(() => {
  vi.stubEnv('VITE_API_BASE_URL', 'https://api.test');
  clearSession();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function mockFetch(status: number, body: unknown) {
  const fetch = vi.fn().mockImplementation(() => Promise.resolve(Response.json(body, { status })));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

test('unwraps the signed-in user from /users/me', async () => {
  mockFetch(200, { authenticated: true, user: { id: 'u1', name: 'Budi' } });

  expect(await loadSession()).toEqual({ id: 'u1', name: 'Budi' });
  expect(getSessionSnapshot()).toEqual({ id: 'u1', name: 'Budi' });
});

test('treats 401 as a guest', async () => {
  mockFetch(401, { error: 'Unauthorized: No token provided' });
  expect(await loadSession()).toBeNull();
});

test('treats authenticated: false as a guest', async () => {
  mockFetch(200, { authenticated: false, user: {} });
  expect(await loadSession()).toBeNull();
});

test('shares one request between callers', async () => {
  const fetch = mockFetch(200, { authenticated: true, user: { id: 'u1' } });

  await Promise.all([loadSession(), loadSession()]);

  expect(fetch).toHaveBeenCalledTimes(1);
});

test('does not cache a failed check', async () => {
  mockFetch(500, { error: 'boom' });
  await expect(loadSession()).rejects.toMatchObject({ status: 500 });

  mockFetch(200, { authenticated: true, user: { id: 'u1' } });
  expect(await loadSession()).toEqual({ id: 'u1' });
});

test('setSession skips the network', async () => {
  const fetch = mockFetch(200, {});
  setSession(null);

  expect(await loadSession()).toBeNull();
  expect(fetch).not.toHaveBeenCalled();
});

test('recommendation endpoints pass the limit', async () => {
  const fetch = mockFetch(200, []);

  await listRecommendedJobs(6);
  await listRandomJobs(6);

  expect(fetch.mock.calls[0][0]).toBe('https://api.test/jobs/recommendations?limit=6');
  expect(fetch.mock.calls[1][0]).toBe('https://api.test/jobs/recommendations/random?limit=6');
});
