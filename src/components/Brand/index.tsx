import { Link } from 'react-router-dom';
import { useLocalePath, useMessages } from '../../i18n';
import { StarIcon } from '../Icons';

export default function Brand({ compact = false }: { compact?: boolean }) {
  const t = useMessages();
  const path = useLocalePath();

  return (
    <Link
      to={path()}
      aria-label={t.brand.name}
      className="inline-flex min-h-11 items-center gap-grid-3 rounded-control text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <StarIcon className="text-primary" />
      <span
        className={`whitespace-nowrap font-title text-title-md text-on-surface ${compact ? 'hidden sm:inline' : ''}`}
      >
        {t.brand.name}
      </span>
    </Link>
  );
}
