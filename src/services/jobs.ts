import { ApiError, apiFetch } from './client';
import type {
  Company,
  EmploymentType,
  Industry,
  Job,
  JobDetail,
  JobStatus,
  JobSummary,
  RecommendedJob,
  WorkingLanguage,
} from './types';

export interface JobQuery {
  keyword?: string;
  industry?: Industry | '';
  province?: string;
  city?: string;
  type?: EmploymentType | '';
  language?: WorkingLanguage | '';
  minSalary?: number;
  status?: JobStatus;
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type JobSort = 'default' | 'newest' | 'salary';

export function toQueryString(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

async function orUndefinedIfMissing<T>(request: Promise<T>): Promise<T | undefined> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export function listJobs(params: {
  query: JobQuery;
  sort?: JobSort;
  page?: number;
  pageSize?: number;
}): Promise<Page<JobSummary>> {
  const { query, sort = 'default', page, pageSize } = params;
  const search = toQueryString({
    ...query,
    sort: sort === 'default' ? undefined : sort,
    page,
    pageSize,
  });
  return apiFetch(`/jobs${search}`);
}

export function listRecommendedJobs(limit = 5): Promise<RecommendedJob[]> {
  return apiFetch(`/jobs/recommendations${toQueryString({ limit })}`);
}

export function listRandomJobs(limit = 5): Promise<JobSummary[]> {
  return apiFetch(`/jobs/recommendations/random${toQueryString({ limit })}`);
}

export function getJob(id: string): Promise<JobDetail | undefined> {
  return orUndefinedIfMissing(apiFetch<JobDetail>(`/jobs/${encodeURIComponent(id)}`));
}

export function listSimilarJobs(id: string, limit = 5): Promise<JobSummary[]> {
  return apiFetch(`/jobs/${encodeURIComponent(id)}/similar${toQueryString({ limit })}`);
}

export function listJobsOfCompany(companyId: string): Promise<Job[]> {
  return apiFetch(`/companies/${encodeURIComponent(companyId)}/jobs?status=open`);
}

export function listCompanies(params: { industry?: Industry | '' } = {}): Promise<Company[]> {
  return apiFetch(`/companies${toQueryString(params)}`);
}

export function getCompany(id: string): Promise<Company | undefined> {
  return orUndefinedIfMissing(apiFetch<Company>(`/companies/${encodeURIComponent(id)}`));
}
