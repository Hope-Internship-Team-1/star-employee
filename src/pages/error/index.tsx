import { Link, useRouteError } from 'react-router-dom';
import Container from '../../components/Container';
import { useLocalePath, useMessages } from '../../i18n';
import { ERROR_CODES, errorKind } from '../../lib/routeError';

export default function ErrorPage() {
  const t = useMessages();
  const path = useLocalePath();
  const kind = errorKind(useRouteError());
  const copy = t.errorPage[kind];

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-[6rem] leading-none text-primary">{ERROR_CODES[kind]}</p>
      <h1 className="mt-8 font-display text-page-lg-mobile text-ink lg:text-page-md">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-md font-body text-body-md text-text-secondary">{copy.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to={path()}
          className="rounded-control bg-primary px-5 py-2.5 font-display text-label-md text-on-primary transition-colors duration-150 ease-paper hover:bg-primary-hover"
        >
          {t.errorPage.home}
        </Link>
        <Link
          to={path('/jobs')}
          className="rounded-control border border-outline bg-surface-raised px-5 py-2.5 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-surface-subtle"
        >
          {t.errorPage.jobs}
        </Link>
      </div>
    </Container>
  );
}
