import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import CompanyCard from '../../components/CompanyCard';
import { format, useMessages } from '../../i18n';
import { INDUSTRIES, PAGE_SIZE } from '../../services/types';
import type { Company, Industry } from '../../services/types';
import { listCompanies } from '../../services/jobs';

const SKELETON_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function pageWindow(current: number, total: number, size = 5): number[] {
  const end = Math.min(total, Math.max(current + Math.floor(size / 2), size));
  const start = Math.max(1, end - size + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default function CompaniesPage() {
  const t = useMessages();
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Company[] | null>(null);

  useEffect(() => {
    let active = true;

    listCompanies({ industry })
      .catch(() => [])
      .then((companies) => {
        if (active) setRows(companies);
      });

    return () => {
      active = false;
    };
  }, [industry]);

  const total = rows?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = (rows ?? []).slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const countLabel = format(total === 1 ? t.companies.countOne : t.companies.countMany, {
    n: total,
  });

  const resetIndustry = () => {
    setIndustry('');
    setPage(1);
  };

  return (
    <Container className="flex flex-col gap-section-sm py-section-md">
      <div className="flex flex-wrap items-baseline gap-grid-4">
        <h1 className="font-page text-page-md text-on-surface">{t.companies.title}</h1>
        {rows !== null && (
          <span className="rounded-control bg-dark-tan px-grid-2 py-grid-1 font-mono text-mono-meta tabular-nums text-on-surface">
            {countLabel}
          </span>
        )}
      </div>

      <div className="flex max-w-4xl flex-col items-stretch gap-grid-3 rounded-card border border-outline bg-dark-tan p-card-pad sm:flex-row sm:items-end">
        <div className="flex min-w-0 flex-1 flex-col gap-grid-1">
          <label htmlFor="companies-industry" className="font-meta text-meta-sm text-on-surface">
            {t.companies.filterIndustry}
          </label>
          <select
            id="companies-industry"
            value={industry}
            onChange={(event) => {
              setIndustry(event.target.value as Industry | '');
              setPage(1);
            }}
            className="w-full cursor-pointer rounded-control border border-outline bg-surface-raised px-grid-3 py-grid-2 font-body text-body-sm text-on-surface focus:border-primary focus:outline-none sm:w-56"
          >
            <option value="">{t.jobs.all}</option>
            {INDUSTRIES.map((option) => (
              <option key={option} value={option}>
                {t.enums.industry[option]}
              </option>
            ))}
          </select>
        </div>

        {industry !== '' && (
          <button
            type="button"
            onClick={resetIndustry}
            className="shrink-0 rounded-control border border-outline bg-surface-raised px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
          >
            {t.jobs.reset}
          </button>
        )}
      </div>

      {rows !== null && total === 0 ? (
        <div className="flex flex-col items-start gap-grid-3 rounded-card border border-outline p-card-pad-lg">
          <p className="font-body text-body-md text-text-secondary">{t.companies.empty}</p>
          {industry !== '' && (
            <button
              type="button"
              onClick={resetIndustry}
              className="rounded-control border border-outline bg-surface-raised px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
            >
              {t.jobs.reset}
            </button>
          )}
        </div>
      ) : (
        <>
          <ul
            aria-label={t.companies.title}
            aria-busy={rows === null}
            className="divide-y divide-outline border-y border-outline"
          >
            {rows === null
              ? SKELETON_ROWS.map((row) => (
                  <li key={row} className="flex items-center gap-grid-4 px-grid-4 py-card-pad">
                    <span className="h-10 w-10 shrink-0 rounded-control bg-paper-shadow" />
                    <span className="flex min-w-0 flex-col gap-grid-1">
                      <span className="h-6 w-48 rounded-control bg-paper-shadow" />
                      <span className="h-5 w-64 rounded-control bg-surface-subtle" />
                    </span>
                  </li>
                ))
              : pageRows.map((company) => (
                  <li key={company.id}>
                    <CompanyCard company={company} variant="row" />
                  </li>
                ))}
          </ul>

          {rows !== null && totalPages > 1 && (
            <nav
              aria-label={t.jobs.pagination}
              className="flex flex-wrap items-center justify-between gap-grid-4 pt-grid-4"
            >
              <div className="flex items-center gap-grid-2 font-mono text-mono-meta">
                {pageWindow(currentPage, totalPages).map((pageNumber) => {
                  const active = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
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
                  from: (currentPage - 1) * PAGE_SIZE + 1,
                  to: (currentPage - 1) * PAGE_SIZE + pageRows.length,
                  total,
                })}
              </span>
            </nav>
          )}
        </>
      )}
    </Container>
  );
}
