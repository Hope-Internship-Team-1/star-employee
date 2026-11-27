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
      className="inline-flex items-center gap-grid-3 rounded-control text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary text-on-primary">
        <StarIcon size={18} />
      </span>
      <span
        className={`whitespace-nowrap font-title text-title-md text-on-surface ${compact ? 'hidden sm:inline' : ''}`}
      >
        {t.brand.name}
      </span>
    </Link>
  );
}
