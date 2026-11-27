import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ResumeWelcomeModal from '../../components/ResumeWelcomeModal';
import { useSession } from '../../hooks/useSession';

export default function SiteLayout() {
  const session = useSession();

  // Session is the User itself: undefined while checking, null for guests.
  // CHANGE `email` to whichever User field uniquely identifies the user.
  const userKey = session ? String(session.email) : null;

  return (
    <div className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
      <ResumeWelcomeModal userKey={userKey} />
    </div>
  );
}