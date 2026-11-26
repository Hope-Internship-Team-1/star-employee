import { Link, useRouteError } from 'react-router-dom';
import Brand from '../../components/Brand';
import LocaleSwitch from '../../components/LocaleSwitch';
import { useLocalePath, useMessages } from '../../i18n';
import { ERROR_CODES, errorKind } from '../../lib/routeError';

export default function ErrorPage() {
  const t = useMessages();
  const path = useLocalePath();
  const kind = errorKind(useRouteError());
  const copy = t.errorPage[kind];

  return (
    <div className="es-page-enter flex min-h-dvh flex-col bg-surface px-page-edge py-card-pad sm:py-section-md">
      <header className="flex h-16 items-center justify-between gap-grid-4">
        <Brand />
        <LocaleSwitch />
      </header>

      <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col gap-grid-4 pt-section-md">
        <p className="font-mono text-mono-meta text-text-secondary">{ERROR_CODES[kind]}</p>
        <h1 className="font-page text-page-lg text-on-surface">{copy.title}</h1>
        <p className="text-text-secondary">{copy.body}</p>
        <div className="flex flex-wrap gap-grid-4">
          <Link
            to={path()}
            className="inline-flex min-h-11 items-center self-start rounded-control bg-primary px-5 font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t.errorPage.home}
          </Link>
          <Link
            to={path('/jobs')}
            className="inline-flex min-h-11 items-center self-start rounded-control border border-outline px-5 font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t.errorPage.jobs}
          </Link>
        </div>
      </main>
    </div>
  );
}
