import { describe, expect, test } from 'vitest';
import { getJob, listCompanies, listJobs, listSimilarJobs } from '../services/jobs';

const EN = 'en' as const;

describe('listJobs', () => {
  test('returns only open jobs by default query', async () => {
    const page = await listJobs({ query: { status: 'open' }, locale: EN });
    expect(page.items.every(({ job }) => job.status === 'open')).toBe(true);
  });

  test('excludes closed jobs when status filter is open', async () => {
    const page = await listJobs({ query: { status: 'open' }, pageSize: 100, locale: EN });
    expect(page.items.find(({ job }) => job.id === 'job_014')).toBeUndefined();
  });

  test('filters by keyword across title, company and city', async () => {
    const page = await listJobs({ query: { keyword: 'tokopedia' }, pageSize: 100, locale: EN });
    expect(page.total).toBeGreaterThan(0);
    expect(page.items.every(({ company }) => company?.name === 'PT Tokopedia')).toBe(true);
  });

  test('filters by province', async () => {
    const page = await listJobs({
      query: { province: 'jawa-barat' },
      pageSize: 100,
      locale: EN,
    });
    expect(page.total).toBeGreaterThan(0);
    expect(page.items.every(({ job }) => job.provinceId === 'jawa-barat')).toBe(true);
  });

  test('filters by working language', async () => {
    const page = await listJobs({ query: { language: 'en' }, pageSize: 100, locale: EN });
    expect(page.items.every(({ job }) => job.language === 'en')).toBe(true);
  });

  test('filters by minimum salary against the top of the band', async () => {
    const page = await listJobs({
      query: { minSalary: 20_000_000 },
      pageSize: 100,
      locale: EN,
    });
    expect(page.total).toBeGreaterThan(0);
    expect(page.items.every(({ job }) => job.salaryMax >= 20_000_000)).toBe(true);
  });

  test('sorts by salary descending', async () => {
    const page = await listJobs({
      query: {},
      sort: 'salary',
      pageSize: 100,
      locale: EN,
    });
    const salaries = page.items.map(({ job }) => job.salaryMax);
    expect(salaries).toEqual([...salaries].sort((a, b) => b - a));
  });

  test('paginates and clamps an out-of-range page', async () => {
    const page = await listJobs({ query: {}, page: 99, pageSize: 10, locale: EN });
    expect(page.page).toBe(page.totalPages);
    expect(page.items.length).toBeLessThanOrEqual(page.pageSize);
  });

  test('matches Indonesian keywords in the id locale', async () => {
    const page = await listJobs({
      query: { keyword: 'lowongan' },
      pageSize: 100,
      locale: EN,
    });
    expect(page.total).toBe(0);
  });
});

describe('getJob', () => {
  test('returns the job with its company joined', async () => {
    const record = await getJob('job_001');
    expect(record?.job.id).toBe('job_001');
    expect(record?.company?.id).toBe('cmp_001');
  });

  test('returns undefined for an unknown id', async () => {
    expect(await getJob('job_999')).toBeUndefined();
  });
});

describe('listSimilarJobs', () => {
  test('never includes the job itself', async () => {
    const record = await getJob('job_001');
    const similar = await listSimilarJobs(record!.job);
    expect(similar.find(({ job }) => job.id === 'job_001')).toBeUndefined();
  });

  test('keeps the same city and industry', async () => {
    const record = await getJob('job_003');
    const similar = await listSimilarJobs(record!.job);
    for (const row of similar) {
      expect(row.job.city).toBe(record!.job.city);
      expect(row.company?.industry).toBe(record!.company!.industry);
    }
  });
});

describe('listCompanies', () => {
  test('filters by industry key', async () => {
    const companies = await listCompanies({ industry: 'ecommerce' });
    expect(companies.length).toBeGreaterThan(0);
    expect(companies.every((company) => company.industry === 'ecommerce')).toBe(true);
  });

  test('returns everything with no filter', async () => {
    const companies = await listCompanies();
    expect(companies.length).toBe(8);
  });
});
