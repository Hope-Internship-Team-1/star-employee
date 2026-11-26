import { Link } from 'react-router-dom';
import { useLocale, useLocalePath, useMessages } from '../../i18n';
import type { JobSummary } from '../../services/types';
import { postedLabel } from '../../lib/format';
import { resourcePath } from '../../lib/slug';

export default function JobCard({ job }: { job: JobSummary }) {
  const t = useMessages();
  const { locale } = useLocale();
  const { company } = job;
  const path = useLocalePath();

  return (
    <Link
      to={path(`/jobs/${resourcePath(job.title[locale], job.id)}`)}
      className="flex flex-col justify-between gap-5 rounded-card border border-outline bg-surface-raised p-6 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-deep-ink font-display text-title-sm text-on-deep-ink"
          >
            {company.initials}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-display text-title-sm text-ink">{job.title[locale]}</h3>
            <p className="truncate font-body text-body-sm text-text-secondary">
              {company.name} &middot; {job.city}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-terracotta-soft px-2.5 py-1 font-mono text-meta-sm text-primary-hover">
          {t.enums.site[job.site]}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-outline pt-3">
        <span className="font-body text-meta-sm text-ink">{t.enums.employmentType[job.type]}</span>
        <span className="font-body text-meta-sm text-text-muted">
          {postedLabel(job.postedAt, locale)}
        </span>
      </div>
    </Link>
  );
}
