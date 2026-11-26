import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Industry, EmploymentType, WorkingLanguage } from '../data/dictionaries';
import type { JobSort } from '../services/jobs';

export interface JobsFilterState {
  kw: string;
  industry: Industry | '';
  province: string;
  city: string;
  type: EmploymentType | '';
  language: WorkingLanguage | '';
  minSalary: number;
  sort: JobSort;
  page: number;
}

const DEFAULTS: JobsFilterState = {
  kw: '',
  industry: '',
  province: '',
  city: '',
  type: '',
  language: '',
  minSalary: 0,
  sort: 'default',
  page: 1,
};

export function useJobsFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo<JobsFilterState>(
    () => ({
      kw: params.get('kw') ?? DEFAULTS.kw,
      industry: (params.get('industry') as Industry | null) ?? DEFAULTS.industry,
      province: params.get('province') ?? DEFAULTS.province,
      city: params.get('city') ?? DEFAULTS.city,
      type: (params.get('type') as EmploymentType | null) ?? DEFAULTS.type,
      language: (params.get('language') as WorkingLanguage | null) ?? DEFAULTS.language,
      minSalary: Number(params.get('minSalary') ?? 0) || DEFAULTS.minSalary,
      sort: (params.get('sort') as JobSort | null) ?? DEFAULTS.sort,
      page: Number(params.get('page') ?? 1) || DEFAULTS.page,
    }),
    [params],
  );

  // Only non-default values are written, so URLs stay clean and shareable.
  const update = useCallback(
    (patch: Partial<JobsFilterState>) => {
      const next = { ...filters, ...patch };

      if (patch.industry !== undefined) next.city = '';
      if (
        patch.kw !== undefined ||
        patch.industry !== undefined ||
        patch.province !== undefined ||
        patch.city !== undefined ||
        patch.type !== undefined ||
        patch.language !== undefined ||
        patch.minSalary !== undefined ||
        patch.sort !== undefined
      ) {
        next.page = patch.page ?? 1;
      }

      const search = new URLSearchParams();
      if (next.kw) search.set('kw', next.kw);
      if (next.industry) search.set('industry', next.industry);
      if (next.province) search.set('province', next.province);
      if (next.city) search.set('city', next.city);
      if (next.type) search.set('type', next.type);
      if (next.language) search.set('language', next.language);
      if (next.minSalary) search.set('minSalary', String(next.minSalary));
      if (next.sort !== DEFAULTS.sort) search.set('sort', next.sort);
      if (next.page > 1) search.set('page', String(next.page));

      setParams(search, { replace: next.page !== filters.page });
    },
    [filters, setParams],
  );

  const reset = useCallback(() => setParams(new URLSearchParams()), [setParams]);

  return { filters, update, reset };
}
