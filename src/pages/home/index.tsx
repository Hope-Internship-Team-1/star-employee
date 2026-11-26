import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import JobCard from '../../components/JobCard';
import CompanyCard from '../../components/CompanyCard';
import QuickAction from '../../components/QuickAction';
import SectionHeading from '../../components/SectionHeading';
import SearchBar from '../../components/SearchBar';
import { ListSkeleton } from '../../components/StateBlock';
import { useLocalePath, useMessages } from '../../i18n';
import { listCompanies, listRandomJobs, listRecommendedJobs } from '../../services/jobs';
import { useSession } from '../../hooks/useSession';
import { getResumeStatus } from '../../services/resume';
import type { Company, JobSummary } from '../../services/types';

const POPULAR = ['Frontend', 'Go', 'QA Automation', 'Data Analyst', 'Flutter'];

export default function HomePage() {
  const t = useMessages();
  const path = useLocalePath();

  const [hotJobs, setHotJobs] = useState<JobSummary[] | null>(null);
  const [featured, setFeatured] = useState<Company[] | null>(null);

  const session = useSession();
  const resume = getResumeStatus();
  const percent = resume.completeness;

  useEffect(() => {
    if (session === undefined) return;
    let active = true;

    const request = session ? listRecommendedJobs(6) : listRandomJobs(6);
    request
      .catch(() => [])
      .then((jobs) => {
        if (active) setHotJobs(jobs);
      });

    return () => {
      active = false;
    };
  }, [session]);

  useEffect(() => {
    let active = true;

    listCompanies()
      .catch(() => [])
      .then((companies) => {
        if (active) setFeatured(companies.slice(0, 4));
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="border-b border-outline">
        <Container className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="flex flex-col gap-5">
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
                <span className="font-display text-label-md text-ink">{t.home.meterTitle}</span>
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
            <QuickAction to={path('/my-profile')} title={t.home.quickActions.resume} />
            <QuickAction to={path('/messages')} title={t.home.quickActions.status} />
            <QuickAction to={path('/career-classes')} title={t.home.quickActions.classes} />
            <QuickAction to={path('/share-experience')} title={t.home.quickActions.experience} />
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <SectionHeading
            title={t.home.hotJobs}
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
              {hotJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section>
        <Container className="pb-20">
          <SectionHeading
            title={t.home.featured}
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
              {featured.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
