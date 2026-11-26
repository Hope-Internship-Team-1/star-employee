import { Link } from 'react-router-dom';
import Brand from '../../components/Brand';
import LocaleSwitch from '../../components/LocaleSwitch';
import { useLocalePath, useMessages } from '../../i18n';

export default function ErrorPage() {
  const t = useMessages();
  const path = useLocalePath();

  return (
    <div className="es-page-enter flex min-h-dvh flex-col bg-surface px-page-edge py-card-pad sm:py-section-md">
      <header className="flex h-16 items-center justify-between gap-grid-4">
        <Brand />
        <LocaleSwitch />
      </header>

      <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col gap-grid-4 pt-section-md">
        <p className="font-mono text-mono-meta text-text-secondary">{t.notFound.code}</p>
        <h1 className="font-page text-page-lg text-on-surface">{t.notFound.message}</h1>
        <Link
          to={path('/login')}
          className="inline-flex min-h-11 items-center self-start rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t.register.backToLogin}
        </Link>
      </main>
    </div>
  );
}
