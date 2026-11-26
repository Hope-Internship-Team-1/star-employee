import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import SectionHeading from '../../components/SectionHeading';
import SearchBar from '../../components/SearchBar';
import LanguageTag from '../../components/LanguageTag';
import { ChevronLeftIcon, ChevronRightIcon, SlidersIcon } from '../../components/Icon';
import { useJobsFilters } from '../../hooks/useJobsFilters';
import { format, useLocale, useLocalePath, useMessages } from '../../i18n';
import { EMPLOYMENT_TYPES, INDUSTRIES, PAGE_SIZE, SALARY_BANDS } from '../../data/dictionaries';
import type { EmploymentType, Industry, WorkingLanguage } from '../../data/dictionaries';
import { PROVINCES, citiesOf } from '../../data/geo';
import { formatSalary, postedLabel } from '../../lib/format';
import { resourcePath } from '../../lib/slug';
import { listJobs } from '../../services/jobs';
import type { JobSort, Page, JobWithCompany } from '../../services/jobs';

export default function JobsPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();
  const { filters, update, reset } = useJobsFilters();

  const [result, setResult] = useState<Page<JobWithCompany> | null>(null);

  useEffect(() => {
    let active = true;

    listJobs({
      query: {
        keyword: filters.kw,
        industry: filters.industry,
        province: filters.province,
        city: filters.city,
        type: filters.type,
        language: filters.language,
        minSalary: filters.minSalary,
        status: 'open',
      },
      sort: filters.sort,
      page: filters.page,
      pageSize: PAGE_SIZE,
      locale,
    }).then((page) => {
      if (active) setResult(page);
    });

    return () => {
      active = false;
    };
  }, [filters, locale]);

  const cityOptions = filters.city ? [filters.city] : citiesOf(filters.province || undefined);

  const selectClass =
    'w-full cursor-pointer rounded-control border border-outline bg-surface-raised px-3 py-2 font-body text-body-sm text-ink focus:outline-none';

  const controls: Array<{ label: string; node: React.ReactNode }> = [
    {
      label: t.jobs.filterIndustry,
      node: (
        <select
          value={filters.industry}
          onChange={(event) => update({ industry: event.target.value as Industry | '' })}
          className={selectClass}
        >
          <option value="">{t.jobs.all}</option>
          {INDUSTRIES.map((option) => (
            <option key={option} value={option}>
              {t.enums.industry[option]}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: t.jobs.filterProvince,
      node: (
        <select
          value={filters.province}
          onChange={(event) => update({ province: event.target.value, city: '' })}
          className={selectClass}
        >
          <option value="">{t.jobs.all}</option>
          {PROVINCES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: t.jobs.filterCity,
      node: (
        <select
          value={filters.city}
          onChange={(event) => update({ city: event.target.value })}
          className={selectClass}
          disabled={cityOptions.length === 0}
        >
          <option value="">{t.jobs.all}</option>
          {cityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: t.jobs.filterType,
      node: (
        <select
          value={filters.type}
          onChange={(event) => update({ type: event.target.value as EmploymentType | '' })}
          className={selectClass}
        >
          <option value="">{t.jobs.all}</option>
          {EMPLOYMENT_TYPES.map((option) => (
            <option key={option} value={option}>
              {t.enums.employmentType[option]}
            </option>
          ))}
        </select>
      ),
    },
    {
      label: t.jobs.filterLanguage,
      node: (
        <select
          value={filters.language}
          onChange={(event) => update({ language: event.target.value as WorkingLanguage | '' })}
          className={selectClass}
        >
          <option value="">{t.jobs.all}</option>
          <option value="en">{t.enums.workingLanguage.en}</option>
          <option value="id">{t.enums.workingLanguage.id}</option>
        </select>
      ),
    },
    {
      label: t.jobs.filterSalary,
      node: (
        <select
          value={filters.minSalary}
          onChange={(event) => update({ minSalary: Number(event.target.value) })}
          className={selectClass}
        >
          <option value={0}>{t.jobs.all}</option>
          {SALARY_BANDS.map((band) => (
            <option key={band} value={band}>
              {locale === 'id' ? `Rp${band / 1_000_000} jt+` : `IDR ${band / 1_000_000}M+`}
            </option>
          ))}
        </select>
      ),
    },
  ];

  const total = result?.total ?? 0;

  return (
    <Container className="py-12">
      <SectionHeading title={t.jobs.title} body={t.jobs.lead} />

      <SearchBar
        key={`${filters.kw}|${filters.city}`}
        initialKeyword={filters.kw}
        initialCity={filters.city}
        compact
      />

      <div className="mt-8 rounded-card border border-outline bg-surface-raised p-6">
        <div className="flex items-center gap-2 pb-4 font-display text-label-md text-ink">
          <SlidersIcon size={16} className="text-text-secondary" />
          {t.jobs.filters}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {controls.map((control) => (
            <label key={control.label} className="flex flex-col gap-1.5">
              <span className="font-body text-meta-sm text-text-secondary">{control.label}</span>
              {control.node}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 py-6">
        <span className="font-mono text-meta-sm tabular-nums text-text-secondary">
          {format(total === 1 ? t.jobs.foundOne : t.jobs.foundMany, { n: total })}
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 font-body text-meta-sm text-text-secondary">
            {t.jobs.sort}
            <select
              value={filters.sort}
              onChange={(event) => update({ sort: event.target.value as JobSort })}
              className="cursor-pointer rounded-control border border-outline bg-surface-raised px-3 py-1.5 font-body text-body-sm text-ink focus:outline-none"
            >
              <option value="default">{t.jobs.sortDefault}</option>
              <option value="newest">{t.jobs.sortNewest}</option>
              <option value="salary">{t.jobs.sortSalary}</option>
            </select>
          </label>
          <button
            type="button"
            onClick={reset}
            className="rounded-control bg-surface-subtle px-4 py-1.5 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-tan-soft"
          >
            {t.jobs.reset}
          </button>
        </div>
      </div>

      {result && result.items.length === 0 ? (
        <div className="flex flex-col items-start gap-4 rounded-card border border-outline bg-surface-raised p-8">
          <p className="font-body text-body-md text-text-secondary">
            {t.jobs.empty}
            {filters.kw && (
              <span className="ml-1 font-mono text-meta-sm text-ink">
                &ldquo;{filters.kw}&rdquo;
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-control bg-surface-subtle px-4 py-2 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-tan-soft"
          >
            {t.jobs.clearSearch}
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-outline bg-surface-raised">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.jobs.title}</caption>
            <thead>
              <tr className="border-b border-outline">
                {[t.jobs.title, t.jobs.city, t.jobs.salary, t.jobs.posted, t.jobs.language].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-5 py-3 font-body text-meta-sm font-normal text-text-secondary"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {(result?.items ?? []).map(({ job, company }) => (
                <tr
                  key={job.id}
                  className="border-b border-outline last:border-b-0 hover:bg-surface-subtle"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
                      className="font-display text-label-md text-ink hover:text-primary"
                    >
                      {job.title[locale]}
                    </Link>
                    <p className="font-body text-meta-sm text-text-muted">{company?.name}</p>
                  </td>
                  <td className="px-5 py-4 font-body text-body-sm text-text-secondary">
                    {job.city}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-mono text-meta-sm tabular-nums text-ink">
                    {formatSalary(job.salaryMin, job.salaryMax, locale)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-body text-meta-sm text-text-secondary">
                    {postedLabel(job.postedDaysAgo, locale)}
                  </td>
                  <td className="px-5 py-4">
                    <LanguageTag language={job.language} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result && result.totalPages > 1 && (
        <nav aria-label={t.jobs.pagination} className="flex items-center justify-between gap-4 pt-6">
          <button
            type="button"
            onClick={() => update({ page: result.page - 1 })}
            disabled={result.page === 1}
            className="inline-flex items-center gap-1 rounded-control border border-outline bg-surface-raised px-3 py-2 font-display text-label-md text-ink disabled:opacity-40"
          >
            <ChevronLeftIcon size={16} />
            {t.jobs.previous}
          </button>
          <span className="font-mono text-meta-sm tabular-nums text-text-secondary">
            {format(t.jobs.page, { current: result.page, total: result.totalPages })}
          </span>
          <button
            type="button"
            onClick={() => update({ page: result.page + 1 })}
            disabled={result.page === result.totalPages}
            className="inline-flex items-center gap-1 rounded-control border border-outline bg-surface-raised px-3 py-2 font-display text-label-md text-ink disabled:opacity-40"
          >
            {t.jobs.next}
            <ChevronRightIcon size={16} />
          </button>
        </nav>
      )}
    </Container>
  );
}
