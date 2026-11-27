import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import { COMPLETENESS_GATE } from '../../components/CompletenessMeter';
import { ArrowRightIcon, FileTextIcon, StarIcon } from '../../components/Icon';
import { useJobsFilters } from '../../hooks/useJobsFilters';
import { useSession } from '../../hooks/useSession';
import { format, useLocale, useLocalePath, useMessages } from '../../i18n';
import type { Messages } from '../../i18n';
import { EMPLOYMENT_TYPES, INDUSTRIES, PAGE_SIZE, SALARY_BANDS } from '../../services/types';
import type { EmploymentType, Industry, JobSummary, WorkingLanguage } from '../../services/types';
import { PROVINCES, citiesOf } from '../../lib/geo';
import { formatSalary, postedLabel } from '../../lib/format';
import { resourcePath } from '../../lib/slug';
import { listJobs, listRandomJobs, listRecommendedJobs } from '../../services/jobs';
import type { JobSort, Page } from '../../services/jobs';
import { getResumeStatus } from '../../services/resume';
import type { ResumeStatus } from '../../services/resume';

const EMPTY_PAGE: Page<JobSummary> = { items: [], total: 0, page: 1, pageSize: 0, totalPages: 0 };

const RECOMMENDATION_LIMIT = 3;

const SORT_OPTIONS: Array<{ key: JobSort; label: (t: Messages) => string }> = [
  { key: 'default', label: (t) => t.jobs.sortDefault },
  { key: 'newest', label: (t) => t.jobs.sortNewest },
  { key: 'salary', label: (t) => t.jobs.sortSalary },
];

const selectClassName =
  'w-full cursor-pointer rounded-control border border-outline bg-surface-raised px-grid-3 py-grid-2 font-body text-body-sm text-on-surface focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';

function pageWindow(current: number, total: number, size = 5): number[] {
  const end = Math.min(total, Math.max(current + Math.floor(size / 2), size));
  const start = Math.max(1, end - size + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function jobPath(title: string, id: string): string {
  return `/jobs/${resourcePath(title, id)}`;
}

export default function JobsPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();
  const { filters, update, reset } = useJobsFilters();
  const session = useSession();

  const resume = getResumeStatus();
  const percent = resume.completeness;
  const profileComplete = percent >= COMPLETENESS_GATE;

  const [result, setResult] = useState<Page<JobSummary> | null>(null);
  const [recommended, setRecommended] = useState<JobSummary[] | null>(null);
  const [view, setView] = useState<'cards' | 'list'>('cards');

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
    })
      .catch(() => EMPTY_PAGE)
      .then((page) => {
        if (active) setResult(page);
      });

    return () => {
      active = false;
    };
  }, [filters]);

  useEffect(() => {
    if (!profileComplete || session === undefined) return;
    let active = true;

    const request = session
      ? listRecommendedJobs(RECOMMENDATION_LIMIT)
      : listRandomJobs(RECOMMENDATION_LIMIT);

    request
      .catch(() => [])
      .then((jobs) => {
        if (active) setRecommended(jobs.slice(0, RECOMMENDATION_LIMIT));
      });

    return () => {
      active = false;
    };
  }, [profileComplete, session]);

  const cityOptions = filters.city ? [filters.city] : citiesOf(filters.province || undefined);

  const controls: Array<{ id: string; label: string; node: ReactNode }> = [
    {
      id: 'jobs-filter-industry',
      label: t.jobs.filterIndustry,
      node: (
        <select
          id="jobs-filter-industry"
          value={filters.industry}
          onChange={(event) => update({ industry: event.target.value as Industry | '' })}
          className={selectClassName}
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
      id: 'jobs-filter-province',
      label: t.jobs.filterProvince,
      node: (
        <select
          id="jobs-filter-province"
          value={filters.province}
          onChange={(event) => update({ province: event.target.value, city: '' })}
          className={selectClassName}
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
      id: 'jobs-filter-city',
      label: t.jobs.filterCity,
      node: (
        <select
          id="jobs-filter-city"
          value={filters.city}
          onChange={(event) => update({ city: event.target.value })}
          className={selectClassName}
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
      id: 'jobs-filter-type',
      label: t.jobs.filterType,
      node: (
        <select
          id="jobs-filter-type"
          value={filters.type}
          onChange={(event) => update({ type: event.target.value as EmploymentType | '' })}
          className={selectClassName}
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
      id: 'jobs-filter-language',
      label: t.jobs.filterLanguage,
      node: (
        <select
          id="jobs-filter-language"
          value={filters.language}
          onChange={(event) => update({ language: event.target.value as WorkingLanguage | '' })}
          className={selectClassName}
        >
          <option value="">{t.jobs.all}</option>
          <option value="en">{t.enums.workingLanguage.en}</option>
          <option value="id">{t.enums.workingLanguage.id}</option>
        </select>
      ),
    },
    {
      id: 'jobs-filter-salary',
      label: t.jobs.filterSalary,
      node: (
        <select
          id="jobs-filter-salary"
          value={filters.minSalary}
          onChange={(event) => update({ minSalary: Number(event.target.value) })}
          className={selectClassName}
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
  const searching = Boolean(filters.kw);

  return (
    <Container className="flex flex-col gap-section-sm py-section-md">
      <div className="grid grid-cols-1 items-stretch gap-section-sm border-b border-outline pb-section-sm lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-card-pad lg:col-span-7">
          <div className="flex flex-col gap-grid-3">
            <div className="flex flex-wrap items-baseline gap-grid-4">
              <h1 className="font-page text-page-md text-on-surface">{t.jobs.title}</h1>
              {result && (
                <span className="rounded-control bg-dark-tan px-grid-2 py-grid-1 font-mono text-mono-meta tabular-nums text-on-surface">
                  {format(t.jobs.rolesCount, { n: total })}
                </span>
              )}
            </div>
            <p className="max-w-2xl text-pretty font-body text-body-md text-text-secondary">
              {t.jobs.lead}
            </p>
          </div>

          <SearchBar
            key={`${filters.kw}|${filters.province}|${filters.city}`}
            initialKeyword={filters.kw}
            initialProvince={filters.province}
            initialCity={filters.city}
            compact
          />
        </div>

        <div className="lg:col-span-5">
          {profileComplete ? (
            <RecommendationPanel jobs={recommended} percent={percent} />
          ) : (
            <IncompleteProfilePanel resume={resume} percent={percent} />
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-section-md lg:flex-row">
        <aside
          aria-label={t.jobs.filters}
          className="w-full shrink-0 bg-surface lg:sticky lg:top-28 lg:w-[280px]"
        >
          <div className="flex flex-col divide-y divide-outline border-b border-outline">
            {controls.map((control) => (
              <div key={control.id} className="flex flex-col gap-grid-2 py-grid-4">
                <div className="flex items-baseline justify-between gap-grid-2">
                  <label htmlFor={control.id} className="font-label text-label-md text-on-surface">
                    {control.label}
                  </label>
                  {control.id === 'jobs-filter-city' && cityOptions.length > 0 && (
                    <span className="rounded-control bg-dark-tan px-grid-2 py-grid-1 font-mono text-meta-sm tabular-nums text-on-surface">
                      {format(t.jobs.cityCount, { n: cityOptions.length })}
                    </span>
                  )}
                </div>
                {control.node}
              </div>
            ))}
          </div>

          <div className="pt-grid-4">
            <button
              type="button"
              onClick={reset}
              className="font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover"
            >
              {t.jobs.reset}
            </button>
          </div>
        </aside>

        <section
          aria-labelledby="jobs-results-heading"
          className="flex w-full min-w-0 flex-1 flex-col gap-card-pad"
        >
          <h2 id="jobs-results-heading" className="sr-only">
            {format(total === 1 ? t.jobs.foundOne : t.jobs.foundMany, { n: total })}
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-grid-4">
            <div className="flex items-center gap-grid-3">
              <span className="font-meta text-meta-sm text-text-secondary">{t.jobs.sort}</span>
              <div role="group" aria-label={t.jobs.sort} className="flex items-center gap-grid-4">
                {SORT_OPTIONS.map((option) => {
                  const active = filters.sort === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => update({ sort: option.key })}
                      aria-pressed={active}
                      className={[
                        'border-b-2 pb-grid-1 transition-colors duration-hover-colour ease-hover-colour',
                        active
                          ? 'border-primary font-label text-label-md text-on-surface'
                          : 'border-transparent font-body text-body-sm text-text-secondary hover:text-on-surface',
                      ].join(' ')}
                    >
                      {option.label(t)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-card-pad">
              <div
                role="group"
                aria-label={t.jobs.viewMode}
                className="inline-flex items-center gap-grid-1 rounded-control border border-outline bg-surface-raised p-grid-1"
              >
                {(
                  [
                    ['cards', t.jobs.viewCards],
                    ['list', t.jobs.viewList],
                  ] as const
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setView(mode)}
                    aria-pressed={view === mode}
                    className={[
                      'rounded-control px-grid-2 py-grid-1 font-mono text-meta-sm transition-colors duration-hover-colour ease-hover-colour',
                      view === mode
                        ? 'bg-dark-tan text-on-surface'
                        : 'text-text-secondary hover:text-on-surface',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {result && result.totalPages > 1 && (
                <span className="font-mono text-mono-meta tabular-nums text-text-secondary">
                  {format(t.jobs.page, { current: result.page, total: result.totalPages })}
                </span>
              )}
            </div>
          </div>

          {result === null ? (
            <div
              aria-busy="true"
              className="flex flex-col divide-y divide-outline border-y border-outline"
            >
              {[0, 1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between gap-grid-4 px-grid-4 py-card-pad"
                >
                  <div className="flex w-full flex-col gap-grid-1">
                    <div className="h-6 w-56 rounded-control bg-paper-shadow" />
                    <div className="h-5 w-80 rounded-control bg-surface-subtle" />
                  </div>
                  <div className="h-5 w-24 shrink-0 rounded-control bg-surface-subtle" />
                </div>
              ))}
            </div>
          ) : result.items.length === 0 ? (
            <div className="flex flex-col items-start gap-grid-3 rounded-card border border-outline p-card-pad-lg">
              <p className="font-body text-body-md text-text-secondary">
                {t.jobs.empty}
                {searching && (
                  <span className="ml-grid-1 font-mono text-mono-meta text-on-surface">
                    &ldquo;{filters.kw}&rdquo;
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center rounded-control border border-outline bg-surface-raised px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
              >
                {t.jobs.clearSearch}
              </button>
            </div>
          ) : view === 'cards' ? (
            <ul className="grid grid-cols-1 gap-grid-4 md:grid-cols-2">
              {result.items.map((job) => (
                <li key={job.id}>
                  <JobCard job={job} />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y divide-outline border-y border-outline">
              {result.items.map((job) => (
                <li key={job.id}>
                  <Link
                    to={path(jobPath(job.title[locale], job.id))}
                    className="flex flex-col justify-between gap-grid-4 px-grid-4 py-card-pad transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 flex-col gap-grid-1">
                      <span className="font-title text-title-sm text-on-surface">
                        {job.title[locale]}
                      </span>
                      <span className="font-body text-body-md text-text-secondary">
                        {job.company.name} &middot; {job.city} &middot;{' '}
                        {t.enums.employmentType[job.type]}
                        {job.salaryMax != null && (
                          <>
                            {' · '}
                            <span className="font-mono text-mono-meta tabular-nums text-on-surface">
                              {formatSalary(job.salaryMin, job.salaryMax, locale)}
                            </span>
                          </>
                        )}
                        {' · '}
                        <span className="font-mono text-mono-meta text-text-secondary">
                          {t.enums.site[job.site]}
                        </span>
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-card-pad-lg">
                      <span className="font-mono text-mono-meta tabular-nums text-text-secondary">
                        {postedLabel(job.postedAt, locale)}
                      </span>
                      <span className="font-label text-label-md text-primary">
                        {t.jobs.applyNow}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {result && result.totalPages > 1 && result.items.length > 0 && (
            <nav
              aria-label={t.jobs.pagination}
              className="flex flex-wrap items-center justify-between gap-grid-4 pt-grid-4"
            >
              <div className="flex items-center gap-grid-2 font-mono text-mono-meta">
                {pageWindow(result.page, result.totalPages).map((pageNumber) => {
                  const active = pageNumber === result.page;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => update({ page: pageNumber })}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'border-b-2 pb-grid-1 tabular-nums transition-colors duration-hover-colour ease-hover-colour',
                        active
                          ? 'border-primary text-on-surface'
                          : 'border-transparent text-text-secondary hover:text-on-surface',
                      ].join(' ')}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-mono-meta tabular-nums text-text-secondary">
                {format(t.jobs.showing, {
                  from: (result.page - 1) * result.pageSize + 1,
                  to: (result.page - 1) * result.pageSize + result.items.length,
                  total: result.total,
                })}
              </span>
            </nav>
          )}
        </section>
      </div>
    </Container>
  );
}

function RecommendationPanel({ jobs, percent }: { jobs: JobSummary[] | null; percent: number }) {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();

  return (
    <section
      aria-label={t.jobs.recommended}
      className="flex h-full flex-col justify-between gap-grid-3 rounded-panel border border-outline bg-dark-tan p-card-pad"
    >
      <div className="flex items-center justify-between gap-grid-3">
        <div className="flex items-center gap-grid-2">
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-control bg-primary text-on-primary"
          >
            <StarIcon size={14} />
          </span>
          <h2 className="font-title text-title-sm text-on-surface">{t.jobs.recommended}</h2>
        </div>
        <span className="shrink-0 rounded-control bg-primary px-grid-2 py-grid-1 font-mono text-meta-sm tabular-nums text-on-primary">
          {format(t.jobs.resumeBadge, { n: percent })}
        </span>
      </div>

      {jobs === null ? (
        <div aria-busy="true" className="flex flex-col gap-grid-2">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="flex flex-col gap-grid-1 rounded-control border border-outline bg-surface-raised px-grid-3 py-grid-2"
            >
              <div className="h-4 w-40 rounded-control bg-paper-shadow" />
              <div className="h-4 w-52 rounded-control bg-surface-subtle" />
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <p className="font-body text-body-sm text-on-surface">{t.state.empty}</p>
      ) : (
        <ul className="flex flex-col gap-grid-2">
          {jobs.map((job) => (
            <li key={job.id}>
              <Link
                to={path(jobPath(job.title[locale], job.id))}
                className="flex items-center justify-between gap-grid-3 rounded-control border border-outline bg-surface-raised px-grid-3 py-grid-2 transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
              >
                <span className="min-w-0">
                  <span className="block truncate font-label text-label-md text-on-surface">
                    {job.title[locale]}
                  </span>
                  <span className="block truncate font-body text-meta-sm text-text-secondary">
                    {job.company.name} &middot; {job.city}
                    {job.salaryMax != null && (
                      <> &middot; {formatSalary(job.salaryMin, job.salaryMax, locale)}</>
                    )}
                  </span>
                </span>
                <span className="shrink-0 font-label text-label-md text-primary">
                  {t.jobs.applyNow}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function IncompleteProfilePanel({ resume, percent }: { resume: ResumeStatus; percent: number }) {
  const t = useMessages();
  const path = useLocalePath();
  const totalModules = resume.modules.length;
  const missing = resume.modules.filter((module) => module.status === 'empty').length;

  return (
    <section
      role="dialog"
      aria-labelledby="incomplete-profile-title"
      className="flex h-full flex-col justify-between gap-grid-4 rounded-panel border-2 border-primary bg-dark-tan p-card-pad-lg"
    >
      <div className="flex flex-col gap-grid-3">
        <div className="flex items-start justify-between gap-grid-3">
          <div className="flex items-center gap-grid-3">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary text-on-primary"
            >
              <FileTextIcon size={16} />
            </span>
            <h2 id="incomplete-profile-title" className="font-title text-title-sm text-on-surface">
              {t.jobs.incompleteTitle}
            </h2>
          </div>
          <span className="shrink-0 rounded-control bg-primary px-grid-2 py-grid-1 font-mono text-mono-meta tabular-nums text-on-primary">
            {percent}%
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.jobs.incompleteMeter}
          className="h-2.5 w-full overflow-hidden rounded-full bg-surface-raised"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>

        <p className="text-pretty font-body text-body-sm text-on-surface">
          {format(t.jobs.incompleteDesc, {
            total: totalModules,
            n: percent,
            gate: COMPLETENESS_GATE,
          })}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-grid-3 border-t border-outline pt-grid-2">
        <span className="font-mono text-meta-sm tabular-nums text-on-surface">
          {format(t.jobs.incompleteModules, { missing, total: totalModules })}
        </span>
        <Link
          to={path('/my-profile')}
          className="inline-flex shrink-0 items-center gap-grid-2 rounded-control bg-primary px-card-pad py-grid-2 font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover"
        >
          {t.jobs.completeProfile}
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </section>
  );
}
