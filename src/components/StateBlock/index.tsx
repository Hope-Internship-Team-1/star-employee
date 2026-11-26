import type { ReactNode } from 'react';
import { RotateIcon } from '../Icon';
import { useMessages } from '../../i18n';

export function ListSkeleton({
  count = 3,
  className = '',
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={`grid gap-5 ${className}`} aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-card border border-outline bg-surface-raised p-6"
        >
          <div className="h-5 w-56 rounded-control bg-surface-subtle" />
          <div className="h-4 w-36 rounded-control bg-surface-subtle" />
          <div className="h-4 w-24 rounded-control bg-surface-subtle" />
        </div>
      ))}
    </div>
  );
}

export function StatePanel({
  message,
  action,
  children,
}: {
  message: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-start gap-4 rounded-card border border-outline bg-surface-raised p-8"
    >
      <p className="font-body text-body-md text-text-secondary">
        {message}
        {children}
      </p>
      {action}
    </div>
  );
}

export function ErrorPanel({ onRetry }: { onRetry?: () => void }) {
  const t = useMessages();

  return (
    <StatePanel
      message={t.state.error}
      action={
        onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-control bg-surface-subtle px-4 py-2 font-display text-label-md text-ink transition-colors duration-150 ease-paper hover:bg-tan-soft"
          >
            <RotateIcon size={16} />
            {t.state.retry}
          </button>
        )
      }
    />
  );
}
