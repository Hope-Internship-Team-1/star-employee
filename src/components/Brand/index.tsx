import { Link } from 'react-router-dom';
import { StarIcon } from '../Icon';
import { useLocalePath, useMessages } from '../../i18n';

export default function Brand({ compact = false }: { compact?: boolean }) {
  const t = useMessages();
  const path = useLocalePath();

  return (
    <Link to={path()} aria-label={t.brand.name} className="inline-flex items-center gap-3 text-ink">
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-primary text-on-primary"
      >
        <StarIcon size={18} />
      </span>
      <span
        className={`font-display text-title-sm whitespace-nowrap ${compact ? 'hidden sm:inline' : ''}`}
      >
        {t.brand.name}
      </span>
    </Link>
  );
}
