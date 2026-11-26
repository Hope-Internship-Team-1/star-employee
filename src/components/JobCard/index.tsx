import { Link } from 'react-router-dom';
import LanguageTag from '../LanguageTag';
import { useLocale, useLocalePath } from '../../i18n';
import type { Company } from '../../data/types';
import type { Job } from '../../data/jobs';
import { formatSalary, postedLabel } from '../../lib/format';
import { resourcePath } from '../../lib/slug';

export default function JobCard({ job, company }: { job: Job; company: Company }) {
  const { locale } = useLocale();
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
        <LanguageTag language={job.language} />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-outline pt-3">
        <span className="font-mono text-meta-sm tabular-nums text-ink">
          {formatSalary(job.salaryMin, job.salaryMax, locale)}
        </span>
        <span className="font-body text-meta-sm text-text-muted">
          {postedLabel(job.postedDaysAgo, locale)}
        </span>
      </div>
    </Link>
  );
}
