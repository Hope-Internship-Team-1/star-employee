import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-surface text-ink">
      <Header />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
