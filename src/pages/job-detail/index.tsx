import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import CompletenessMeter, { COMPLETENESS_GATE } from '../../components/CompletenessMeter';
import LanguageTag from '../../components/LanguageTag';
import { MapPinIcon } from '../../components/Icon';
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
      <Container className="py-20">
        <p className="font-body text-body-md text-text-secondary">{t.state.loading}</p>
      </Container>
    );
  }

  if (record === null) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-start gap-4 rounded-card border border-outline bg-surface-raised p-8">
          <h1 className="font-display text-title-md text-ink">{t.jobDetail.notFound}</h1>
          <Link
            to={path('/jobs')}
            className="rounded-control bg-surface-subtle px-4 py-2 font-display text-label-md text-ink hover:bg-tan-soft"
          >
            {t.jobs.title}
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

  const meta = [
    { label: t.jobs.employmentType, value: t.enums.employmentType[job.type] },
    { label: t.jobDetail.experience, value: job.experience[locale] },
    { label: t.jobDetail.education, value: job.education[locale] },
    { label: t.jobDetail.posted, value: postedLabel(job.postedAt, locale) },
  ];

  return (
    <Container className="py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <article className="flex flex-col gap-5 rounded-card border border-outline bg-surface-raised p-6 lg:p-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-page-lg-mobile text-ink lg:text-page-md">
                  {job.title[locale]}
                </h1>
                <LanguageTag language={job.language} />
              </div>
              <p className="flex items-center gap-2 font-body text-body-md text-text-secondary">
                <MapPinIcon size={16} />
                {job.city}
                {company && <> &middot; {company.name}</>}
              </p>
              <p className="font-mono text-title-sm tabular-nums text-ink">
                {formatSalary(job.salaryMin, job.salaryMax, locale)}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-4 border-y border-outline py-4 sm:grid-cols-4">
              {meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="font-body text-meta-sm text-text-muted">{item.label}</dt>
                  <dd className="font-body text-body-sm text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <section className="flex flex-col gap-3">
              <h2 className="font-display text-title-sm text-ink">
                {t.jobDetail.responsibilities}
              </h2>
              <ul className="flex list-disc flex-col gap-2 pl-5 font-body text-body-md text-text-secondary">
                {job.responsibilities.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="font-display text-title-sm text-ink">{t.jobDetail.requirements}</h2>
              <ul className="flex list-disc flex-col gap-2 pl-5 font-body text-body-md text-text-secondary">
                {job.requirements.map((item) => (
                  <li key={item.en}>{item[locale]}</li>
                ))}
              </ul>
            </section>
          </article>

          {company && (
            <section className="flex flex-col gap-4 rounded-card border border-outline bg-surface-raised p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-control bg-primary font-display text-title-md text-on-primary"
                  >
                    {company.initials}
                  </span>
                  <div>
                    <h2 className="font-display text-title-sm text-ink">{company.name}</h2>
                    <p className="font-body text-body-sm text-text-secondary">
                      {t.enums.industry[company.industry]} &middot; {company.city}
                    </p>
                  </div>
                </div>
                <Link
                  to={path(`/companies/${resourcePath(company.name, company.id)}`)}
                  className="inline-flex items-center whitespace-nowrap font-display text-label-md text-primary hover:underline"
                >
                  {t.companies.companyProfile}
                </Link>
              </div>

              <dl className="grid grid-cols-1 gap-3 border-t border-outline pt-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <dt className="font-body text-meta-sm text-text-muted">{t.jobDetail.industry}</dt>
                  <dd className="font-body text-body-sm text-ink">
                    {t.enums.industry[company.industry]}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-body text-meta-sm text-text-muted">{t.jobDetail.size}</dt>
                  <dd className="font-body text-body-sm text-ink">
                    {t.enums.scale[company.scale] ?? company.scale}
                  </dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="font-body text-meta-sm text-text-muted">{t.jobDetail.founded}</dt>
                  <dd className="font-body text-body-sm text-ink">{company.since}</dd>
                </div>
              </dl>

              <p className="font-body text-body-sm text-text-secondary">{company.about[locale]}</p>
            </section>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-card border border-outline bg-surface-raised p-6">
            {closed ? (
              <p className="font-body text-body-md text-text-secondary">{t.jobDetail.notFound}</p>
            ) : (
              <>
                <CompletenessMeter percent={percent} />
                <button
                  type="button"
                  disabled={blocked}
                  className={[
                    'w-full rounded-control px-5 py-3 font-display text-label-md transition-colors duration-150 ease-paper',
                    blocked
                      ? 'cursor-not-allowed bg-surface-subtle text-text-muted'
                      : 'bg-primary text-on-primary hover:bg-primary-hover',
                  ].join(' ')}
                >
                  {t.jobDetail.apply}
                </button>
                {blocked && (
                  <Link
                    to={path('/my-profile')}
                    className="text-center font-display text-label-md text-primary hover:underline"
                  >
                    {t.jobDetail.completeResume}
                  </Link>
                )}
              </>
            )}
          </section>

          {company && (
            <section className="flex flex-col gap-2 rounded-card border border-outline bg-surface-raised p-6">
              <h2 className="font-display text-label-md text-ink">{t.jobDetail.address}</h2>
              <p className="font-body text-body-sm text-text-secondary">
                {company.city} &middot; {company.name}
              </p>
            </section>
          )}

          {similar.length > 0 && (
            <section className="flex flex-col rounded-card border border-outline bg-surface-raised">
              <h2 className="px-6 pt-6 font-display text-label-md text-ink">
                {t.jobDetail.similar}
              </h2>
              <ul className="flex flex-col divide-y divide-outline pt-4">
                {similar.map((near) => (
                  <li key={near.id}>
                    <Link
                      to={path(`/jobs/${resourcePath(near.title[locale], near.id)}`)}
                      className="flex flex-col gap-1 px-6 py-3 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
                    >
                      <span className="font-display text-label-md text-ink">
                        {near.title[locale]}
                      </span>
                      <span className="font-body text-meta-sm text-text-secondary">
                        {near.company.name} &middot;{' '}
                        {near.salaryMax == null
                          ? near.city
                          : formatSalary(near.salaryMin, near.salaryMax, locale)}
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
        <section className="mt-10">
          <h2 className="pb-4 font-display text-title-md text-ink">{t.jobDetail.allJobs}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <Link
                key={sibling.id}
                to={path(`/jobs/${resourcePath(sibling.title[locale], sibling.id)}`)}
                className="flex flex-col gap-2 rounded-card border border-outline bg-surface-raised p-5 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
              >
                <span className="font-display text-label-md text-ink">{sibling.title[locale]}</span>
                <span className="font-body text-meta-sm text-text-secondary">{sibling.city}</span>
                <span className="font-mono text-meta-sm tabular-nums text-ink">
                  {formatSalary(sibling.salaryMin, sibling.salaryMax, locale)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
