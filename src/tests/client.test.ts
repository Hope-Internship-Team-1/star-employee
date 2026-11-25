import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { ApiError, apiFetch } from '../services/client';

beforeEach(() => vi.stubEnv('VITE_API_BASE_URL', 'https://api.test'));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function mockFetch(makeResponse: () => Response) {
  const fetch = vi.fn().mockImplementation(() => Promise.resolve(makeResponse()));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

test('prefixes the base url and sends credentials', async () => {
  const fetch = mockFetch(() => Response.json({ id: 1 }));

  await apiFetch('/users/me');

  expect(fetch).toHaveBeenCalledWith(
    'https://api.test/users/me',
    expect.objectContaining({ credentials: 'include' }),
  );
});

test('parses the error message from the backend', async () => {
  mockFetch(() => Response.json({ error: 'Unauthorized' }, { status: 401 }));

  await expect(apiFetch('/users/me')).rejects.toMatchObject({
    name: 'ApiError',
    status: 401,
    message: 'Unauthorized',
  });
});

test('returns undefined for an empty 204 response', async () => {
  mockFetch(() => new Response(null, { status: 204 }));

  await expect(apiFetch('/auth/logout', { method: 'POST' })).resolves.toBeUndefined();
});

test('sets the json content type only when a body is present', async () => {
  const fetch = mockFetch(() => Response.json({ ok: true }));

  await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email: 'a@b.c' }) });
  const withBody = new Headers((fetch.mock.calls[0][1] as RequestInit).headers);
  expect(withBody.get('Content-Type')).toBe('application/json');

  fetch.mockClear();
  await apiFetch('/users/me');
  const withoutBody = new Headers((fetch.mock.calls[0][1] as RequestInit).headers);
  expect(withoutBody.has('Content-Type')).toBe(false);
});

test('ApiError keeps the status and message', () => {
  const error = new ApiError(422, 'Invalid input');

  expect(error.name).toBe('ApiError');
  expect(error.status).toBe(422);
  expect(error.message).toBe('Invalid input');
});
