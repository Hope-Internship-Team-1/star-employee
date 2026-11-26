export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type WorkingLanguage = 'en' | 'id';
export type JobStatus = 'open' | 'closed';
export type Industry =
  'telecom' | 'finance' | 'ecommerce' | 'manufacturing' | 'travel' | 'electronics';

export const INDUSTRIES: Industry[] = [
  'telecom',
  'finance',
  'ecommerce',
  'manufacturing',
  'travel',
  'electronics',
];

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  'full-time',
  'part-time',
  'contract',
  'internship',
];

export const SALARY_BANDS = [10_000_000, 15_000_000, 20_000_000] as const;

export const PAGE_SIZE = 10;
