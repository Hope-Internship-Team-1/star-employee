export type Gender = 'male' | 'female';
export type Education = 'SMA' | 'SMK' | 'D3' | 'D4' | 'S1' | 'S2';

export interface User {
  id?: number | string;
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  gender?: Gender;
  highest_education?: Education;
  positions?: string[];
  role?: string;
  verified?: boolean;
}

export interface RegisterInput {
  email: string;
  name?: string;
  phone?: string;
  positions?: string[];
}

export interface UpdateUserInput {
  name?: string;
  phone?: string;
  address?: string;
  birth_date?: string;
  gender?: Gender;
  highest_education?: Education;
  positions?: string[];
}

export const INDUSTRIES = [
  'telecom',
  'finance',
  'manufacturing',
  'travel',
  'electronics',
  'healthcare',
  'energy',
  'media',
  'logistics',
  'property',
  'retail',
  'conglomerate',
  'technology',
  'education',
  'services',
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const EMPLOYMENT_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type WorkingLanguage = 'en' | 'id';
export type WorkSite = 'onsite' | 'hybrid' | 'remote';
export type JobStatus = 'open' | 'closed';

export const SALARY_BANDS = [10_000_000, 15_000_000, 20_000_000] as const;
export const PAGE_SIZE = 10;

export interface LocalizedText {
  en: string;
  id: string;
}

export interface CompanySummary {
  id: string;
  name: string;
  initials: string;
  logoUrl: string | null;
}

export interface Company extends CompanySummary {
  city: string;
  provinceId: string;
  industry: Industry;
  scale: string;
  since: string;
  about: LocalizedText;
  openRoles: number;
}

export interface JobSummary {
  id: string;
  title: LocalizedText;
  type: EmploymentType;
  site: WorkSite;
  city: string;
  postedAt: string;
  company: CompanySummary;
  salaryMin?: number | null;
  salaryMax?: number | null;
}

export interface Job {
  id: string;
  companyId: string;
  title: LocalizedText;
  city: string;
  provinceId: string;
  type: EmploymentType;
  site: WorkSite;
  language: WorkingLanguage;
  salaryMin: number | null;
  salaryMax: number | null;
  experience: LocalizedText;
  education: LocalizedText;
  postedAt: string;
  status: JobStatus;
  highlights: string[];
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
}

export interface JobDetail {
  job: Job;
  company: Company;
}
