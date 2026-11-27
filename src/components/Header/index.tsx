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
    { to: path('/my-profile'), label: t.nav.profile },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-outline bg-surface">
      <Container className="flex h-24 items-center justify-between gap-card-pad-lg">
        <Brand compact />

        <nav aria-label="Primary" className="hidden items-center gap-section-sm lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'whitespace-nowrap py-grid-1 transition-colors duration-hover-colour ease-hover-colour',
                  isActive
                    ? 'border-b-2 border-primary font-lead text-lead-title text-primary'
                    : 'font-body text-body-md text-text-secondary hover:text-on-surface',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-card-pad-lg">
          <LocaleSwitch />
          {session === null && (
            <Link
              to={path('/login')}
              className="whitespace-nowrap rounded-control bg-dark-tan px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-primary hover:text-on-primary"
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
                className="whitespace-nowrap rounded-control border border-outline bg-surface-raised px-grid-4 py-grid-2 font-label text-label-md text-on-surface transition-colors duration-hover-colour ease-hover-colour hover:bg-surface-subtle"
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
