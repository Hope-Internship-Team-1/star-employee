import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { getCompany, getJob, listJobs, toJobSummary, toQueryString } from '../services/jobs';
import { daysSince, formatSalary, postedLabel } from '../lib/format';

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

describe('toQueryString', () => {
  test('drops empty values', () => {
    expect(toQueryString({ keyword: '', city: 'Bandung', minSalary: 0, page: 2 })).toBe(
      '?city=Bandung&page=2',
    );
  });

  test('returns an empty string when nothing is set', () => {
    expect(toQueryString({ keyword: undefined })).toBe('');
  });
});

describe('listJobs', () => {
  test('sends filters and omits the default sort', async () => {
    const fetch = mockFetch(() => Response.json({ items: [], total: 0 }));

    await listJobs({ query: { keyword: 'go', industry: '', status: 'open' }, page: 1 });

    expect(fetch.mock.calls[0][0]).toBe('https://api.test/jobs?keyword=go&status=open&page=1');
  });

  test('sends a non-default sort', async () => {
    const fetch = mockFetch(() => Response.json({ items: [], total: 0 }));

    await listJobs({ query: {}, sort: 'salary' });

    expect(fetch.mock.calls[0][0]).toBe('https://api.test/jobs?sort=salary');
  });
});

describe('toJobSummary', () => {
  test('flattens a { job, company } item into the summary shape', () => {
    const job = { id: 'job_001', title: { en: 'Dev', id: 'Dev' }, city: 'Bandung' };
    const company = { id: 'cmp_001', name: 'Acme', initials: 'AC', logoUrl: null, city: 'X' };

    const summary = toJobSummary({ job, company } as never);

    expect(summary).toMatchObject({ id: 'job_001', title: { en: 'Dev' }, city: 'Bandung' });
    expect(summary.company).toEqual({ id: 'cmp_001', name: 'Acme', initials: 'AC', logoUrl: null });
  });

  test('passes a summary item through untouched', () => {
    const item = { id: 'job_002', company: { id: 'cmp_002' } };
    expect(toJobSummary(item as never)).toBe(item);
  });
});

describe('detail lookups', () => {
  test('getJob returns undefined on 404', async () => {
    mockFetch(() => Response.json({ error: 'Not Found' }, { status: 404 }));
    expect(await getJob('job_999')).toBeUndefined();
  });

  test('getCompany rethrows other errors', async () => {
    mockFetch(() => Response.json({ error: 'Unauthorized' }, { status: 401 }));
    await expect(getCompany('cmp_001')).rejects.toMatchObject({ status: 401 });
  });
});

describe('format', () => {
  const now = Date.parse('2026-11-26T12:00:00Z');

  test('counts whole days since a timestamp, never negative', () => {
    expect(daysSince('2026-11-19T13:00:00Z', now)).toBe(6);
    expect(daysSince('2026-11-27T00:00:00Z', now)).toBe(0);
  });

  test('labels a posting by its age', () => {
    expect(postedLabel('2026-11-26T08:00:00Z', 'en', now)).toBe('Today');
    expect(postedLabel('2026-11-12T12:00:00Z', 'en', now)).toBe('2 weeks ago');
  });

  test('marks a missing salary as not disclosed', () => {
    expect(formatSalary(null, 10_000_000, 'en')).toBe('Salary not disclosed');
  });
});
