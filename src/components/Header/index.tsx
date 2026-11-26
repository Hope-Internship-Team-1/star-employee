import { Link, NavLink, useNavigate } from 'react-router-dom';
import Brand from '../Brand';
import Container from '../Container';
import LocaleSwitch from '../LocaleSwitch';
import { useLocalePath, useMessages } from '../../i18n';
import { useSession } from '../../hooks/useSession';
import { logout } from '../../services/auth';

export default function Header() {
  const t = useMessages();
  const path = useLocalePath();
  const navigate = useNavigate();
  const session = useSession();

  async function onLogout() {
    await logout();
    navigate(path(), { replace: true });
  }

  const links = [
    { to: path(), label: t.nav.home, end: true },
    { to: path('/jobs'), label: t.nav.jobs },
    { to: path('/companies'), label: t.nav.companies },
    { to: path('/career-classes'), label: t.nav.classes },
    { to: path('/messages'), label: t.nav.messages },
    ...(session ? [{ to: path('/my-profile'), label: t.nav.profile }] : []),
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-outline bg-surface">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Brand compact />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'whitespace-nowrap py-1 transition-colors duration-150 ease-paper',
                  isActive
                    ? 'border-b-2 border-primary font-display text-label-md text-primary'
                    : 'font-body text-body-md text-text-secondary hover:text-ink',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitch />
          {session === null && (
            <Link
              to={path('/login')}
              className="whitespace-nowrap rounded-control border border-outline bg-surface-raised px-4 py-2 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-surface-subtle"
            >
              {t.nav.login}
            </Link>
          )}
          {session && (
            <>
              <span className="hidden max-w-40 truncate font-body text-body-sm text-text-secondary sm:inline">
                {session.name || session.email}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="whitespace-nowrap rounded-control border border-outline bg-surface-raised px-4 py-2 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-surface-subtle"
              >
                {t.nav.logout}
              </button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
