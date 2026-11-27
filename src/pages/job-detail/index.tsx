import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import CompletenessMeter, { COMPLETENESS_GATE } from '../../components/CompletenessMeter';
import { ArrowRightIcon, ChevronLeftIcon, MapPinIcon, StarIcon } from '../../components/Icon';
import { useLocale, useLocalePath, useMessages } from '../../i18n';
import { formatSalary, postedLabel } from '../../lib/format';
import { idFromResourcePath, resourcePath } from '../../lib/slug';
import { getJob, listJobsOfCompany, listSimilarJobs } from '../../services/jobs';
import type { Job, JobDetail, JobSummary } from '../../services/types';
import { getResumeStatus } from '../../services/resume';

export default function JobDetailPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();
  const { jobId } = useParams();

  const [record, setRecord] = useState<JobDetail | null | undefined>(undefined);
  const [similar, setSimilar] = useState<JobSummary[]>([]);
  const [siblings, setSiblings] = useState<Job[]>([]);

  const id = idFromResourcePath(jobId);

  useEffect(() => {
    let active = true;

    (async () => {
      const found = id ? await getJob(id).catch(() => undefined) : undefined;
      if (!active) return;
      setRecord(found ?? null);

      if (found) {
        const [near, all] = await Promise.all([
          listSimilarJobs(found.job.id).catch(() => []),
          listJobsOfCompany(found.job.companyId).catch(() => []),
        ]);
        if (active) {
          setSimilar(near);
          setSiblings(all);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (record === undefined) {
    return (
      <Container className="py-section-md">
        <p className="font-body text-body-md text-text-secondary">{t.state.loading}</p>
      </Container>
    );
  }

  if (record === null) {
    return (
      <Container className="py-section-md">
        <div className="flex max-w-xl flex-col items-start gap-grid-4 rounded-card border border-outline bg-surface-raised p-card-pad-lg">
          <h1 className="font-page text-title-md text-on-surface">{t.jobDetail.notFound}</h1>
          <Link
            to={path('/jobs')}
            className="inline-flex items-center gap-grid-2 rounded-control bg-primary px-card-pad py-grid-2 font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover"
          >
            {t.companies.browseJobs}
          </Link>
        </div>
      </Container>
    );
  }

  const { job, company } = record;
  const resume = getResumeStatus();
  const percent = resume.completeness;
  const closed = job.status === 'closed';
  const blocked = closed || percent < COMPLETENESS_GATE;
  const salary = formatSalary(job.salaryMin, job.salaryMax, locale);
  const hasSalary = job.salaryMin != null && job.salaryMax != null;

  const chips: Array<{ key: string; value: string; icon?: boolean }> = [
    { key: 'city', icon: true, value: job.city },
    { key: 'type', value: t.enums.employmentType[job.type] },
    { key: 'site', value: t.enums.site[job.site] },
    { key: 'language', value: t.enums.workingLanguage[job.language] },
    { key: 'posted', value: postedLabel(job.postedAt, locale) },
  ];

  const details = [
    { label: t.jobDetail.experience, value: job.experience?.[locale] },
    { label: t.jobDetail.education, value: job.education?.[locale] },
  ].filter((item) => item.value);

  return (
    <Container className="py-section-md">
      <div className="flex flex-wrap items-center justify-between gap-grid-4 pb-card-pad-lg">
        <Link
          to={path('/jobs')}
          className="inline-flex items-center gap-grid-2 font-body text-body-sm text-text-secondary transition-colors duration-hover-colour ease-hover-colour hover:text-on-surface"
        >
          <ChevronLeftIcon size={16} />
          {t.jobDetail.backToJobs}
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-section-md lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-section-sm">
          {closed && (
            <p className="flex items-center gap-grid-2 rounded-control border border-on-surface bg-surface-raised px-grid-4 py-grid-3 font-label text-label-md text-on-surface">
              <StarIcon size={16} className="shrink-0 text-primary" />
              {t.jobDetail.closed}
            </p>
          )}

          <header className="flex flex-col gap-card-pad border-b border-outline pb-section-sm">
            <h1 className="font-page text-page-lg-mobile text-balance text-on-surface lg:text-page-lg">
              {job.title[locale]}
            </h1>

            <ul className="flex flex-wrap items-center gap-grid-2">
              {chips.map((chip) => (
                <li
                  key={chip.key}
                  className="inline-flex items-center gap-grid-2 rounded-control border border-outline bg-surface-subtle px-grid-3 py-grid-1 font-body text-meta-sm text-text-secondary"
                >
                  {chip.icon && <MapPinIcon size={14} className="shrink-0 text-text-muted" />}
                  {chip.value}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-grid-2 rounded-card border border-outline bg-dark-tan p-card-pad-lg">
              <span className="font-label text-meta-sm text-on-surface">{t.jobs.salary}</span>
              <span
                className={
                  hasSalary
                    ? 'font-mono text-title-md tabular-nums text-on-surface lg:text-page-md'
                    : 'font-mono text-title-md text-on-surface'
                }
              >
                {hasSalary ? salary : t.jobDetail.negotiable}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-grid-3">
              <button
                type="button"
                disabled={blocked}
                className="inline-flex items-center justify-center rounded-control bg-primary px-card-pad-lg py-grid-3 font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t.jobDetail.apply}
              </button>
              {blocked && !closed && (
                <Link
                  to={path('/my-profile')}
                  className="inline-flex items-center gap-grid-2 rounded-control border border-outline bg-surface-raised px-card-pad py-grid-3 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-dark-tan"
                >
                  {t.jobDetail.completeResume}
                </Link>
              )}
            </div>

            {details.length > 0 && (
              <dl className="flex flex-wrap gap-x-card-pad-lg gap-y-grid-3 border-t border-outline pt-card-pad">
                {details.map((item) => (
                  <div key={item.label} className="flex flex-col gap-grid-1">
                    <dt className="font-meta text-meta-sm text-text-muted">{item.label}</dt>
                    <dd className="font-body text-body-sm text-on-surface">{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <section className="flex max-w-prose flex-col gap-grid-4">
              <h2 className="flex items-center gap-grid-2 font-title text-title-md text-on-surface">
                <StarIcon size={14} className="shrink-0 text-primary" />
                {t.jobDetail.responsibilities}
              </h2>
              <ul className="flex list-disc flex-col gap-grid-3 pl-grid-5 font-body text-body-sm text-text-secondary">
                {job.responsibilities.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </section>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <section className="flex max-w-prose flex-col gap-grid-4 pt-grid-2">
              <h2 className="flex items-center gap-grid-2 font-title text-title-md text-on-surface">
                <StarIcon size={14} className="shrink-0 text-primary" />
                {t.jobDetail.requirements}
              </h2>
              <ul className="flex list-disc flex-col gap-grid-3 pl-grid-5 font-body text-body-sm text-text-secondary">
                {job.requirements.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </section>
          )}

          <section
            aria-label={t.jobDetail.companyCard}
            className="flex flex-col justify-between gap-grid-4 rounded-card border border-dark-tan bg-surface-raised p-card-pad-lg sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 items-center gap-grid-4">
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-primary font-title text-title-sm text-on-primary"
              >
                {company.initials}
              </span>
              <div className="flex min-w-0 flex-col gap-grid-1">
                <h2 className="font-title text-title-sm text-on-surface">{company.name}</h2>
                <p className="font-body text-body-sm text-text-secondary">
                  {t.enums.industry[company.industry]} &middot;{' '}
                  {t.enums.scale[company.scale] ?? company.scale} &middot;{' '}
                  {t.companies.since.replace('{year}', company.since)}
                </p>
              </div>
            </div>
            <Link
              to={path(`/companies/${resourcePath(company.name, company.id)}`)}
              className="shrink-0 rounded-control bg-dark-tan px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-primary hover:text-on-primary"
            >
              {t.companies.companyProfile}
            </Link>
          </section>

          {company.about?.[locale] && (
            <section
              aria-label={t.jobDetail.about}
              className="flex max-w-prose flex-col gap-grid-3"
            >
              <h2 className="font-title text-title-sm text-on-surface">{t.jobDetail.about}</h2>
              <p className="font-body text-body-sm text-text-secondary">{company.about[locale]}</p>
            </section>
          )}
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-card-pad-lg lg:sticky lg:top-8 lg:w-[320px]">
          <section
            aria-label={t.jobDetail.completeness}
            className="flex flex-col gap-grid-3 rounded-card border border-outline border-t-4 border-t-primary bg-surface-raised p-card-pad"
          >
            <CompletenessMeter percent={percent} />
          </section>

          <section
            aria-label={t.jobDetail.address}
            className="flex flex-col gap-grid-1 rounded-card border border-outline bg-dark-tan p-card-pad"
          >
            <span className="font-label text-meta-sm text-on-surface">{t.jobDetail.address}</span>
            <span className="font-label text-label-md text-on-surface">{company.name}</span>
            <span className="font-body text-body-sm text-on-surface">{job.city}</span>
          </section>

          {similar.length > 0 && (
            <section aria-label={t.jobDetail.similar} className="flex flex-col gap-grid-3">
              <h2 className="font-title text-title-sm text-on-surface">{t.jobDetail.similar}</h2>
              <ul className="divide-y divide-outline border-y border-outline">
                {similar.map((near) => (
                  <li key={near.id}>
                    <Link
                      to={path(`/jobs/${resourcePath(near.title[locale], near.id)}`)}
                      className="flex flex-col gap-grid-1 px-grid-2 py-grid-3 transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
                    >
                      <span className="font-label text-label-md text-on-surface">
                        {near.title[locale]}
                      </span>
                      <span className="font-body text-meta-sm text-text-secondary">
                        {near.company.name} &middot; {near.city} &middot;{' '}
                        {formatSalary(near.salaryMin, near.salaryMax, locale)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {siblings.length > 0 && (
        <section aria-label={t.jobDetail.allJobs} className="pt-section-md">
          <h2 className="flex items-center gap-grid-2 pb-grid-4 font-title text-title-md text-on-surface">
            <StarIcon size={14} className="shrink-0 text-primary" />
            {t.jobDetail.allJobs}
          </h2>
          <ul className="grid grid-cols-1 gap-grid-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <li key={sibling.id}>
                <Link
                  to={path(`/jobs/${resourcePath(sibling.title[locale], sibling.id)}`)}
                  className="flex h-full flex-col gap-grid-2 rounded-card border border-outline bg-surface-raised p-card-pad transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
                >
                  <span className="font-label text-label-md text-on-surface">
                    {sibling.title[locale]}
                  </span>
                  <span className="font-body text-meta-sm text-text-secondary">
                    {sibling.city} &middot; {t.enums.employmentType[sibling.type]}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-grid-2 font-mono text-mono-meta tabular-nums text-on-surface">
                    {formatSalary(sibling.salaryMin, sibling.salaryMax, locale)}
                    <ArrowRightIcon size={14} className="text-text-muted" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
