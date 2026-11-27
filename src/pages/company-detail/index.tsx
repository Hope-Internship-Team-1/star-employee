import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import { ChevronLeftIcon, StarIcon } from '../../components/Icon';
import { format, useLocale, useLocalePath, useMessages } from '../../i18n';
import { formatSalary } from '../../lib/format';
import { idFromResourcePath, resourcePath } from '../../lib/slug';
import { getCompany, listJobsOfCompany } from '../../services/jobs';
import type { Company, Job } from '../../services/types';

const FEATURED_ROLES = 3;

export default function CompanyPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();
  const { companyId } = useParams();

  const [company, setCompany] = useState<Company | null | undefined>(undefined);
  const [jobs, setJobs] = useState<Job[]>([]);

  const id = idFromResourcePath(companyId);

  useEffect(() => {
    let active = true;

    (async () => {
      const found = id ? await getCompany(id).catch(() => undefined) : undefined;
      if (!active) return;
      setCompany(found ?? null);

      if (found) {
        const open = await listJobsOfCompany(found.id).catch(() => []);
        if (active) setJobs(open);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (company === undefined) {
    return (
      <Container className="py-section-md">
        <div className="flex flex-col gap-section-md" aria-busy="true">
          <span role="status" className="sr-only">
            {t.state.loading}
          </span>
          <div className="flex items-center gap-card-pad rounded-panel border border-outline bg-surface-raised p-card-pad-lg">
            <div className="h-16 w-16 shrink-0 rounded-control bg-paper-shadow" />
            <div className="flex flex-col gap-grid-2">
              <div className="h-8 w-56 rounded-control bg-paper-shadow" />
              <div className="h-5 w-72 rounded-control bg-surface-subtle" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-section-md lg:grid-cols-12">
            <div className="h-40 rounded-card bg-surface-subtle lg:col-span-7" />
            <div className="h-40 rounded-card bg-surface-subtle lg:col-span-5" />
          </div>
        </div>
      </Container>
    );
  }

  if (company === null) {
    return (
      <Container className="py-section-md">
        <div className="flex flex-col items-start gap-grid-3 rounded-card border border-outline bg-surface-raised p-card-pad-lg">
          <h1 className="font-title text-title-md text-on-surface">{t.companies.empty}</h1>
          <Link
            to={path('/companies')}
            className="rounded-control bg-surface-subtle px-card-pad py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-tan-soft"
          >
            {t.companies.title}
          </Link>
        </div>
      </Container>
    );
  }

  const rolesLabel = (count: number) =>
    format(count === 1 ? t.companies.openRolesOne : t.companies.openRolesMany, { n: count });

  const summary = [
    t.enums.industry[company.industry],
    company.city,
    t.enums.scale[company.scale] ?? company.scale,
    company.since ? format(t.companies.since, { year: company.since }) : '',
  ]
    .filter(Boolean)
    .join(' · ');

  const about = company.about?.[locale];

  const featured = jobs.slice(0, FEATURED_ROLES);

  return (
    <Container className="py-section-md">
      <div className="flex flex-col gap-section-md">
        <nav aria-label={t.companies.title}>
          <Link
            to={path('/companies')}
            className="inline-flex items-center gap-grid-2 font-body text-body-sm text-text-secondary transition-colors duration-hover-colour ease-hover-colour hover:text-on-surface"
          >
            <ChevronLeftIcon size={16} className="shrink-0" />
            <span>{t.companies.title}</span>
          </Link>
        </nav>

        <header className="flex flex-col justify-between gap-card-pad-lg rounded-panel border border-outline bg-dark-tan p-card-pad-lg sm:flex-row sm:items-center">
          <div className="flex items-center gap-card-pad">
            <span
              aria-hidden="true"
              className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-control bg-primary font-title text-title-md text-on-primary"
            >
              {company.initials}
            </span>
            <div className="flex min-w-0 flex-col gap-grid-1">
              <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
                {company.name}
              </h1>
              <p className="font-body text-body-md text-on-surface">{summary}</p>
            </div>
          </div>
          <Link
            to={path('/jobs')}
            className="shrink-0 rounded-control bg-primary px-card-pad py-grid-2 text-center font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover"
          >
            {t.companies.browseJobs}
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-section-md lg:grid-cols-12">
          <section className="flex max-w-prose flex-col gap-grid-3 lg:col-span-7">
            <div className="flex items-center gap-grid-2">
              <StarIcon size={14} className="shrink-0 text-primary" />
              <h2 className="font-title text-title-md text-on-surface">{t.jobDetail.about}</h2>
            </div>
            <p className="text-pretty font-body text-body-md text-text-secondary">
              {about || t.state.empty}
            </p>
          </section>

          <aside className="flex flex-col gap-card-pad lg:col-span-5">
            <section
              aria-label={t.jobDetail.address}
              className="flex flex-col gap-grid-1 rounded-card border border-outline border-l-4 border-l-primary bg-surface-raised p-card-pad"
            >
              <span className="font-label text-meta-sm text-primary">{t.jobDetail.address}</span>
              <span className="font-label text-label-md text-on-surface">{company.city}</span>
              <span className="font-body text-body-sm text-text-secondary">{company.name}</span>
            </section>

            {featured.length > 0 && (
              <div className="flex flex-col gap-grid-2">
                <span className="font-mono text-mono-meta tabular-nums text-primary">
                  {rolesLabel(featured.length)}
                </span>
                <ul
                  aria-label={rolesLabel(featured.length)}
                  className="flex flex-col divide-y divide-outline border-y border-outline"
                >
                  {featured.map((job) => (
                    <li key={job.id}>
                      <Link
                        to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
                        className="flex items-center justify-between gap-grid-3 px-grid-2 py-grid-3 transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
                      >
                        <span className="flex min-w-0 flex-col gap-grid-1">
                          <span className="truncate font-label text-label-md text-on-surface">
                            {job.title[locale]}
                          </span>
                          <span className="truncate font-body text-meta-sm text-text-secondary">
                            {t.enums.employmentType[job.type]} ·{' '}
                            {formatSalary(job.salaryMin, job.salaryMax, locale)} ·{' '}
                            <span className="font-mono">
                              <span aria-hidden="true">{job.language.toUpperCase()}</span>
                              <span className="sr-only">
                                {t.enums.workingLanguage[job.language]}
                              </span>
                            </span>
                          </span>
                        </span>
                        <span className="shrink-0 font-label text-label-md text-primary">
                          {t.jobDetail.apply}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <section
          aria-labelledby="company-open-roles"
          className="flex flex-col gap-card-pad border-t border-outline pt-section-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-grid-4">
            <h2 id="company-open-roles" className="font-title text-title-md text-on-surface">
              {t.companies.allJobsOf}
            </h2>
            {jobs.length > 0 && (
              <span className="rounded-control bg-dark-tan px-grid-2 py-grid-1 font-mono text-mono-meta tabular-nums text-on-surface">
                {rolesLabel(jobs.length)}
              </span>
            )}
          </div>

          {jobs.length === 0 ? (
            <div className="flex flex-col items-start gap-grid-2 rounded-card border border-outline bg-surface-raised p-card-pad-lg">
              <p className="font-body text-body-md text-text-secondary">{t.companies.noJobs}</p>
              <Link
                to={path('/jobs')}
                className="font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover"
              >
                {t.companies.browseJobs}
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-outline border-y border-outline">
              {jobs.map((job) => (
                <li key={job.id}>
                  <Link
                    to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
                    className="flex flex-col justify-between gap-grid-3 px-grid-4 py-card-pad transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle sm:flex-row sm:items-center"
                  >
                    <span className="flex min-w-0 flex-col gap-grid-1">
                      <span className="font-title text-lead-title text-on-surface">
                        {job.title[locale]}
                      </span>
                      <span className="font-body text-body-md text-text-secondary">
                        {job.city} · {t.enums.employmentType[job.type]} ·{' '}
                        <span className="font-mono text-mono-meta tabular-nums">
                          {formatSalary(job.salaryMin, job.salaryMax, locale)}
                        </span>{' '}
                        ·{' '}
                        <span className="font-mono text-mono-meta">
                          <span aria-hidden="true">{job.language.toUpperCase()}</span>
                          <span className="sr-only">{t.enums.workingLanguage[job.language]}</span>
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 font-label text-label-md text-primary">
                      {t.jobDetail.apply}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Container>
  );
}
