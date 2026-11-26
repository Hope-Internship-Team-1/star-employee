import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import CompanyCard from '../../components/CompanyCard';
import SectionHeading from '../../components/SectionHeading';
import { useMessages } from '../../i18n';
import { INDUSTRIES } from '../../data/dictionaries';
import type { Industry } from '../../data/dictionaries';
import type { Company } from '../../data/types';
import { listCompanies, openRolesCount } from '../../services/jobs';

type Row = { company: Company; openRoles: number };

export default function CompaniesPage() {
  const t = useMessages();
  const [industry, setIndustry] = useState<Industry | ''>('');
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    let active = true;

    listCompanies({ industry }).then(async (companies) => {
      const withCounts = await Promise.all(
        companies.map(async (company) => ({
          company,
          openRoles: await openRolesCount(company.id),
        })),
      );
      if (active) setRows(withCounts);
    });

    return () => {
      active = false;
    };
  }, [industry]);

  return (
    <Container className="py-12">
      <SectionHeading title={t.companies.title} body={t.companies.lead} />

      <label className="flex max-w-xs flex-col gap-1.5 pb-8">
        <span className="font-body text-meta-sm text-text-secondary">
          {t.companies.filterIndustry}
        </span>
        <select
          value={industry}
          onChange={(event) => setIndustry(event.target.value as Industry | '')}
          className="cursor-pointer rounded-control border border-outline bg-surface-raised px-3 py-2 font-body text-body-sm text-ink focus:outline-none"
        >
          <option value="">{t.jobs.all}</option>
          {INDUSTRIES.map((option) => (
            <option key={option} value={option}>
              {t.enums.industry[option]}
            </option>
          ))}
        </select>
      </label>

      {rows !== null && rows.length === 0 ? (
        <div className="rounded-card border border-outline bg-surface-raised p-8">
          <p className="font-body text-body-md text-text-secondary">{t.companies.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(rows ?? []).map((row) => (
            <CompanyCard key={row.company.id} company={row.company} openRoles={row.openRoles} />
          ))}
        </div>
      )}
    </Container>
  );
}
