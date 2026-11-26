import { Link } from 'react-router-dom';
import { useLocale, useMessages } from '../../i18n';
import { StarIcon } from '../Icons';

export default function Brand() {
  const t = useMessages();
  const { locale } = useLocale();

  return (
    <Link
      to={`/${locale}`}
      className="inline-flex min-h-11 items-center gap-grid-3 rounded-control text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <StarIcon className="text-primary" />
      <span className="whitespace-nowrap font-title text-title-md text-on-surface">
        {t.brand.name}
      </span>
    </Link>
  );
}
