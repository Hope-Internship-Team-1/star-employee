import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import JobCard from '../../components/JobCard';
import CompanyCard from '../../components/CompanyCard';
import QuickAction from '../../components/QuickAction';
import SectionHeading from '../../components/SectionHeading';
import SearchBar from '../../components/SearchBar';
import { ListSkeleton } from '../../components/StateBlock';
import {
  BookOpenIcon,
  CheckSquareIcon,
  FileTextIcon,
  MessageSquareIcon,
  StarIcon,
} from '../../components/Icon';
import { useLocale, useLocalePath, useMessages } from '../../i18n';
import { listCompanies, listJobs, openRolesCount } from '../../services/jobs';
import type { JobWithCompany } from '../../services/jobs';
import { getResumeStatus } from '../../services/resume';
import type { Company } from '../../data/types';

const POPULAR = ['Frontend', 'Go', 'QA Automation', 'Data Analyst', 'Flutter'];

export default function HomePage() {
  const t = useMessages();
  const { locale } = useLocale();
  const path = useLocalePath();

  const [hotJobs, setHotJobs] = useState<JobWithCompany[] | null>(null);
  const [featured, setFeatured] = useState<Array<{ company: Company; openRoles: number }> | null>(
    null,
  );

  const resume = getResumeStatus();
  const percent = resume.completeness;

  useEffect(() => {
    let active = true;

    Promise.all([
      listJobs({ query: { status: 'open' }, pageSize: 6, locale }),
      listCompanies(),
    ]).then(async ([jobs, companies]) => {
      if (!active) return;
      setHotJobs(jobs.items);

      const top = await Promise.all(
        companies.slice(0, 4).map(async (company) => ({
          company,
          openRoles: await openRolesCount(company.id),
        })),
      );
      if (active) setFeatured(top);
    });

    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <>
      <section className="border-b border-outline">
        <Container className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 self-start rounded-full bg-terracotta-soft px-3 py-1.5 font-body text-meta-sm text-primary-hover">
                <StarIcon size={12} />
                {t.home.badge}
              </span>
              <h1 className="text-balance font-display text-display-lg-mobile text-ink lg:text-display-lg">
                {t.home.title}
              </h1>
              <p className="max-w-2xl text-pretty font-body text-lead-md text-text-secondary">
                {t.home.lead}
              </p>
            </div>

            <SearchBar />

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-body text-body-sm text-text-secondary">
                {t.home.popular}
              </span>
              {POPULAR.map((term) => (
                <Link
                  key={term}
                  to={`${path('/jobs')}?kw=${encodeURIComponent(term)}`}
                  className="rounded-full bg-surface-subtle px-3 py-1 font-body text-meta-sm text-ink transition-colors duration-150 ease-paper hover:bg-dark-tan"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 rounded-panel border border-outline bg-surface-raised p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-control bg-terracotta-soft text-primary-hover"
                  >
                    <FileTextIcon size={14} />
                  </span>
                  <span className="font-display text-label-md text-ink">{t.home.meterTitle}</span>
                </div>
                <span className="font-mono text-label-md tabular-nums text-primary-hover">
                  {percent}%
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.home.meterTitle}
                className="h-2 w-full overflow-hidden rounded-full bg-surface-subtle"
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
              </div>

              <p className="font-body text-meta-sm text-text-secondary">{t.home.meterValue}</p>

              <dl className="grid grid-cols-2 gap-2 border-t border-outline pt-4">
                {(
                  [
                    ['delivered', 'bg-surface-subtle text-ink'],
                    ['pending', 'bg-tan-soft text-ink'],
                    ['interview', 'bg-terracotta-soft text-primary-hover'],
                    ['notSuitable', 'bg-surface-raised text-text-secondary border border-outline'],
                  ] as const
                ).map(([key, className]) => (
                  <div
                    key={key}
                    className={`rounded-control px-2.5 py-1.5 font-body text-meta-sm ${className}`}
                  >
                    {t.status[key]}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="pb-12 pt-16">
          <h2 className="sr-only">{t.home.quickActionTitle}</h2>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction
              to={path('/my-profile')}
              title={t.home.quickActions.resume.title}
              body={t.home.quickActions.resume.body}
              icon={<FileTextIcon size={20} />}
              tone="terracotta"
            />
            <QuickAction
              to={path('/messages')}
              title={t.home.quickActions.status.title}
              body={t.home.quickActions.status.body}
              icon={<CheckSquareIcon size={20} />}
              tone="ink"
            />
            <QuickAction
              to={path('/career-classes')}
              title={t.home.quickActions.classes.title}
              body={t.home.quickActions.classes.body}
              icon={<BookOpenIcon size={20} />}
              tone="tan"
            />
            <QuickAction
              to={path('/share-experience')}
              title={t.home.quickActions.experience.title}
              body={t.home.quickActions.experience.body}
              icon={<MessageSquareIcon size={20} />}
              tone="subtle"
            />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <SectionHeading
            title={t.home.hotJobs}
            body={t.home.hotJobsBody}
            action={
              <Link
                to={path('/jobs')}
                className="font-display text-label-md text-primary hover:underline"
              >
                {t.home.viewAll}
              </Link>
            }
          />
          {hotJobs === null ? (
            <ListSkeleton count={6} className="md:grid-cols-2 lg:grid-cols-3" />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hotJobs.map(({ job, company }) => (
                <JobCard key={job.id} job={job} company={company!} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section>
        <Container className="pb-20">
          <SectionHeading
            title={t.home.featured}
            body={t.home.featuredBody}
            action={
              <Link
                to={path('/companies')}
                className="font-display text-label-md text-primary hover:underline"
              >
                {t.home.viewAll}
              </Link>
            }
          />
          {featured === null ? (
            <ListSkeleton count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((row) => (
                <CompanyCard key={row.company.id} company={row.company} openRoles={row.openRoles} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
