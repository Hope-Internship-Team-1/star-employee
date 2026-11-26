import { useMessages } from '../../i18n';
import { AlertCircleIcon } from '../Icons';

export default function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const t = useMessages();

  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-grid-3 rounded-control border border-on-surface bg-surface-raised p-grid-4"
    >
      <div className="flex items-start gap-grid-2">
        <span className="mt-grid-1 inline-flex h-4 w-4 items-center justify-center text-on-surface">
          <AlertCircleIcon />
        </span>
        <p className="font-body text-body-md text-on-surface">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {t.login.retry}
      </button>
    </div>
  );
}
