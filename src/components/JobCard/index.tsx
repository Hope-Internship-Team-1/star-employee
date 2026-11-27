import { Link } from 'react-router-dom';
import { useLocale, useLocalePath, useMessages } from '../../i18n';
import type { JobSummary } from '../../services/types';
import { formatSalary, postedLabel } from '../../lib/format';
import { resourcePath } from '../../lib/slug';

export default function JobCard({ job }: { job: JobSummary }) {
  const t = useMessages();
  const { locale } = useLocale();
  const { company } = job;
  const path = useLocalePath();

  return (
    <Link
      to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
      className="flex h-full flex-col justify-between gap-card-pad rounded-card border border-outline bg-surface-raised p-card-pad-lg transition-colors duration-hover-colour ease-hover-colour hover:border-primary hover:bg-surface-subtle"
    >
      <div className="flex items-start justify-between gap-grid-3">
        <div className="flex min-w-0 items-center gap-grid-3">
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary font-title text-title-sm text-on-primary"
          >
            {company.initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-title text-title-sm text-on-surface">
              {job.title[locale]}
            </h3>
            <p className="truncate font-body text-body-sm text-text-secondary">
              {company.name} &middot; {job.city}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-control bg-dark-tan px-grid-2 py-grid-1 font-mono text-meta-sm text-on-surface">
          {t.enums.site[job.site]}
        </span>
      </div>

      <div className="flex flex-col gap-grid-2 border-t border-outline pt-grid-3">
        <span className="font-mono text-mono-meta tabular-nums text-on-surface">
          {t.enums.employmentType[job.type]}
          {job.salaryMax != null && (
            <> &middot; {formatSalary(job.salaryMin, job.salaryMax, locale)}</>
          )}
        </span>
        <div className="flex items-center justify-between gap-grid-3">
          <span className="font-mono text-meta-sm tabular-nums text-text-secondary">
            {postedLabel(job.postedAt, locale)}
          </span>
          <span className="rounded-control bg-primary px-grid-3 py-grid-1 font-label text-label-md text-on-primary">
            {t.jobs.applyNow}
          </span>
        </div>
      </div>
    </Link>
  );
}
