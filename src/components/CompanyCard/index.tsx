import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, useLocalePath, useMessages } from '../../i18n';
import type { Company } from '../../services/types';
import { resourcePath } from '../../lib/slug';

function CompanyLogo({ company, variant }: { company: Company; variant: 'card' | 'row' }) {
  const [failed, setFailed] = useState(false);
  const size = variant === 'row' ? 'h-10 w-10' : 'h-12 w-12';

  if (company.logoUrl && !failed) {
    return (
      <img
        src={company.logoUrl}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${size} shrink-0 rounded-control object-contain`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={
        variant === 'row'
          ? 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary font-label text-label-md text-on-primary'
          : 'inline-flex h-12 w-12 items-center justify-center rounded-control bg-primary font-display text-title-md text-on-primary'
      }
    >
      {company.initials}
    </span>
  );
}

export default function CompanyCard({
  company,
  variant = 'card',
}: {
  company: Company;
  variant?: 'card' | 'row';
}) {
  const { openRoles } = company;
  const t = useMessages();
  const path = useLocalePath();

  const facts = [
    t.enums.industry[company.industry],
    company.city,
    t.enums.scale[company.scale] ?? company.scale,
  ].filter(Boolean);

  const roles = format(openRoles === 1 ? t.companies.openRolesOne : t.companies.openRolesMany, {
    n: openRoles,
  });

  const tile = <CompanyLogo company={company} variant={variant} />;

  if (variant === 'row') {
    return (
      <Link
        to={path(`/companies/${resourcePath(company.name, company.id)}`)}
        className="flex items-center justify-between gap-grid-4 px-grid-4 py-card-pad transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
      >
        <div className="flex min-w-0 items-center gap-grid-4">
          {tile}
          <div className="flex min-w-0 flex-col gap-grid-1">
            <span className="truncate font-title text-lead-title text-on-surface">
              {company.name}
            </span>
            <span className="truncate font-body text-body-sm text-text-secondary">
              {facts.join(' · ')}
            </span>
          </div>
        </div>
        <span className="shrink-0 font-mono text-mono-meta tabular-nums text-primary">{roles}</span>
      </Link>
    );
  }

  return (
    <Link
      to={path(`/companies/${resourcePath(company.name, company.id)}`)}
      className="flex flex-col gap-4 rounded-card border border-outline bg-surface-raised p-6 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
    >
      {tile}
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-title-sm text-ink">{company.name}</h3>
        <p className="font-body text-body-sm text-text-secondary">{facts.join(' · ')}</p>
      </div>
      <span className="font-mono text-meta-sm tabular-nums text-primary-hover">{roles}</span>
    </Link>
  );
}
