import type { Locale } from '../i18n';
import { COMPANIES } from '../data/companies';
import { JOBS } from '../data/jobs';
import { citiesOf } from '../data/geo';
import type { Industry, JobStatus } from '../data/dictionaries';
import type { Company } from '../data/types';
import type { Job } from '../data/jobs';

export interface JobQuery {
  keyword?: string;
  industry?: Industry | '';
  province?: string;
  city?: string;
  type?: Job['type'] | '';
  language?: Job['language'] | '';
  minSalary?: number;
  status?: JobStatus;
}

export interface JobWithCompany {
  job: Job;
  company: Company | undefined;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type JobSort = 'default' | 'newest' | 'salary';

function matches(job: Job, company: Company | undefined, query: JobQuery, locale: Locale): boolean {
  if (query.status && job.status !== query.status) return false;

  const needle = query.keyword?.trim().toLowerCase();
  if (needle) {
    const haystack = `${job.title[locale]} ${company?.name ?? ''} ${job.city}`.toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  if (query.industry && company?.industry !== query.industry) return false;
  if (query.province && job.provinceId !== query.province) return false;
  if (query.city && job.city !== query.city) return false;
  if (query.type && job.type !== query.type) return false;
  if (query.language && job.language !== query.language) return false;
  if (query.minSalary && job.salaryMax < query.minSalary) return false;

  return true;
}

export async function listJobs(params: {
  query: JobQuery;
  sort?: JobSort;
  page?: number;
  pageSize?: number;
  locale: Locale;
}): Promise<Page<JobWithCompany>> {
  const { query, sort = 'default', page = 1, pageSize = 10, locale } = params;

  const rows: JobWithCompany[] = JOBS.map((job) => ({
    job,
    company: COMPANIES.find((company) => company.id === job.companyId),
  })).filter(({ job, company }) => matches(job, company, query, locale));

  if (sort === 'newest') rows.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
  else if (sort === 'salary') rows.sort((a, b) => b.job.salaryMax - a.job.salaryMax);

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);

  return {
    items: rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

export async function getJob(id: string): Promise<JobWithCompany | undefined> {
  const job = JOBS.find((row) => row.id === id);
  if (!job) return undefined;
  return { job, company: COMPANIES.find((company) => company.id === job.companyId) };
}

export async function listSimilarJobs(job: Job, limit = 5): Promise<JobWithCompany[]> {
  return JOBS.filter(
    (candidate) =>
      candidate.id !== job.id &&
      candidate.status === 'open' &&
      candidate.city === job.city &&
      COMPANIES.find((company) => company.id === candidate.companyId)?.industry ===
        COMPANIES.find((company) => company.id === job.companyId)?.industry,
  )
    .slice(0, limit)
    .map((candidate) => ({
      job: candidate,
      company: COMPANIES.find((company) => company.id === candidate.companyId),
    }));
}

export async function listJobsOfCompany(companyId: string): Promise<Job[]> {
  return JOBS.filter((job) => job.companyId === companyId && job.status === 'open');
}

export async function listCompanies(params: { industry?: Industry | '' } = {}): Promise<Company[]> {
  return COMPANIES.filter((company) => !params.industry || company.industry === params.industry);
}

export async function getCompany(id: string): Promise<Company | undefined> {
  return COMPANIES.find((company) => company.id === id);
}

export async function openRolesCount(companyId: string): Promise<number> {
  return JOBS.filter((job) => job.companyId === companyId && job.status === 'open').length;
}

export function availableCities(province?: string): string[] {
  return citiesOf(province);
}
