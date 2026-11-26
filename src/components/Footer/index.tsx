import { Link } from 'react-router-dom';
import Container from '../Container';
import { useLocalePath, useMessages } from '../../i18n';

export default function Footer() {
  const t = useMessages();
  const path = useLocalePath();

  const columns = [
    {
      title: t.footer.platform,
      links: [
        { to: path('/jobs'), label: t.nav.jobs },
        { to: path('/companies'), label: t.nav.companies },
        { to: path('/career-classes'), label: t.nav.classes },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { to: path('/about'), label: t.footer.about },
        { to: path('/partners'), label: t.footer.partners },
        { to: path('/terms'), label: t.footer.terms },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { to: path('/faq'), label: t.footer.faq },
        { to: path('/help'), label: t.footer.help },
        { to: path('/privacy'), label: t.footer.privacy },
      ],
    },
  ];

  return (
    <footer className="mt-section-lg overflow-hidden bg-primary text-on-primary">
      <Container className="grid grid-cols-1 gap-section-md pb-section-md pt-section-lg lg:grid-cols-12">
        <div className="flex flex-col justify-end gap-card-pad-lg lg:col-span-6">
          <p className="max-w-md font-meta text-meta-md text-on-primary">{t.footer.tagline}</p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-card-pad-lg sm:grid-cols-3 lg:col-span-6"
        >
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-grid-3">
              <span className="font-label text-label-md text-on-primary">{column.title}</span>
              {column.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-body-md text-on-primary underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </Container>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <Container>
          <div className="translate-y-4 whitespace-nowrap font-display text-display-lg leading-none text-on-primary/20">
            {t.brand.name}
          </div>
        </Container>
      </div>
    </footer>
  );
}
