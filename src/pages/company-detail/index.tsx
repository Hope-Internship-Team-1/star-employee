import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import LanguageTag from '../../components/LanguageTag';
import { MapPinIcon } from '../../components/Icon';
import { useLocale, useLocalePath, useMessages } from '../../i18n';
import { formatSalary, postedLabel } from '../../lib/format';
import { idFromResourcePath, resourcePath } from '../../lib/slug';
import { getCompany, listJobsOfCompany } from '../../services/jobs';
import type { Company } from '../../data/types';
import type { Job } from '../../data/jobs';

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
      const found = id ? await getCompany(id) : undefined;
      if (!active) return;
      setCompany(found ?? null);

      if (found) {
        const open = await listJobsOfCompany(found.id);
        if (active) setJobs(open);
      }
    })();

    return () => {
      active = false;
    };
  }, [id]);

  if (company === undefined) {
    return (
      <Container className="py-20">
        <p className="font-body text-body-md text-text-secondary">{t.state.loading}</p>
      </Container>
    );
  }

  if (company === null) {
    return (
      <Container className="py-20">
        <div className="flex flex-col items-start gap-4 rounded-card border border-outline bg-surface-raised p-8">
          <h1 className="font-display text-title-md text-ink">{t.companies.empty}</h1>
          <Link
            to={path('/companies')}
            className="rounded-control bg-surface-subtle px-4 py-2 font-display text-label-md text-ink hover:bg-tan-soft"
          >
            {t.companies.title}
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <section className="flex flex-wrap items-center gap-5 rounded-card border border-outline bg-surface-raised p-6 lg:p-8">
        <span
          aria-hidden="true"
          className="inline-flex h-16 w-16 items-center justify-center rounded-control bg-primary font-display text-page-md text-on-primary"
        >
          {company.initials}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-display text-page-lg-mobile text-ink lg:text-page-md">
            {company.name}
          </h1>
          <p className="font-body text-body-sm text-text-secondary">
            {t.enums.industry[company.industry]} &middot; {company.city} &middot;{' '}
            {t.enums.scale[company.scale] ?? company.scale} &middot;{' '}
            {t.companies.since.replace('{year}', company.since)}
          </p>
        </div>
        <Link
          to={path('/jobs')}
          className="ml-auto inline-flex items-center whitespace-nowrap rounded-control border border-outline bg-surface-raised px-4 py-2 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-surface-subtle"
        >
          {t.companies.browseJobs}
        </Link>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-3 rounded-card border border-outline bg-surface-raised p-6">
          <h2 className="font-display text-title-sm text-ink">{t.jobDetail.about}</h2>
          <p className="font-body text-body-md text-text-secondary">{company.about[locale]}</p>
        </section>

        <section className="flex flex-col gap-3 rounded-card border border-outline bg-surface-raised p-6">
          <h2 className="font-display text-title-sm text-ink">{t.jobDetail.address}</h2>
          <p className="flex items-center gap-2 font-body text-body-md text-text-secondary">
            <MapPinIcon size={16} />
            {company.city} &middot; {company.name}
          </p>
        </section>
      </div>

      <section className="mt-8 flex flex-col rounded-card border border-outline bg-surface-raised">
        <h2 className="px-6 pt-6 font-display text-title-sm text-ink">{t.companies.allJobsOf}</h2>

        {jobs.length === 0 ? (
          <p className="px-6 py-8 font-body text-body-md text-text-secondary">
            {t.companies.noJobs}
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-outline pt-4">
            {jobs.map((job) => (
              <li key={job.id}>
                <Link
                  to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="font-display text-label-md text-ink">{job.title[locale]}</span>
                    <span className="font-body text-meta-sm text-text-secondary">
                      {job.city} &middot; {postedLabel(job.postedDaysAgo, locale)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-meta-sm tabular-nums text-ink">
                      {formatSalary(job.salaryMin, job.salaryMax, locale)}
                    </span>
                    <LanguageTag language={job.language} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}
