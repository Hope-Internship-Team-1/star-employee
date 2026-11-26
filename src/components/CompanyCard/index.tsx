import { Link } from 'react-router-dom';
import { format, useLocalePath, useMessages } from '../../i18n';
import type { Company } from '../../data/types';
import { resourcePath } from '../../lib/slug';

export default function CompanyCard({
  company,
  openRoles,
}: {
  company: Company;
  openRoles: number;
}) {
  const t = useMessages();
  const path = useLocalePath();

  return (
    <Link
      to={path(`/companies/${resourcePath(company.name, company.id)}`)}
      className="flex flex-col gap-4 rounded-card border border-outline bg-surface-raised p-6 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
    >
      <span
        aria-hidden="true"
        className="inline-flex h-12 w-12 items-center justify-center rounded-control bg-primary font-display text-title-md text-on-primary"
      >
        {company.initials}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-title-sm text-ink">{company.name}</h3>
        <p className="font-body text-body-sm text-text-secondary">
          {t.enums.industry[company.industry]} &middot; {company.city} &middot;{' '}
          {t.enums.scale[company.scale] ?? company.scale}
        </p>
      </div>
      <span className="font-mono text-meta-sm tabular-nums text-primary-hover">
        {format(openRoles === 1 ? t.companies.openRolesOne : t.companies.openRolesMany, {
          n: openRoles,
        })}
      </span>
    </Link>
  );
}
