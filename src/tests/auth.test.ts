import { afterEach, expect, test, vi } from 'vitest';
import { register, setPassword } from '../services/auth';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function mockFetch() {
  const fetch = vi
    .fn()
    .mockImplementation(() => Promise.resolve(Response.json({}, { status: 200 })));
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

function requestBody(fetch: ReturnType<typeof vi.fn>) {
  return JSON.parse((fetch.mock.calls[0][1] as RequestInit).body as string);
}

test('register drops empty optional fields', async () => {
  const fetch = mockFetch();

  await register({ email: 'a@b.c' });
  expect(requestBody(fetch)).toEqual({ email: 'a@b.c' });

  fetch.mockClear();
  await register({ email: 'a@b.c', name: '', phone: '', positions: [] });
  expect(requestBody(fetch)).toEqual({ email: 'a@b.c' });
});

test('register keeps positions when they are filled', async () => {
  const fetch = mockFetch();

  await register({ email: 'a@b.c', positions: ['Developer'] });

  expect(requestBody(fetch)).toEqual({ email: 'a@b.c', positions: ['Developer'] });
});

test('setPassword rejects passwords outside 8 to 72 characters', async () => {
  const fetch = mockFetch();

  await expect(setPassword('short')).rejects.toThrow();
  await expect(setPassword('a'.repeat(73))).rejects.toThrow();
  expect(fetch).not.toHaveBeenCalled();
});

test('setPassword accepts passwords inside the range', async () => {
  const fetch = mockFetch();

  await setPassword('a'.repeat(8));
  await setPassword('a'.repeat(72));

  expect(fetch).toHaveBeenCalledTimes(2);
});
