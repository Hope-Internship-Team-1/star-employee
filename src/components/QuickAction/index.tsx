import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface QuickActionProps {
  to: string;
  title: string;
  body: string;
  icon: ReactNode;
  tone: 'terracotta' | 'ink' | 'tan' | 'subtle';
}

const tones: Record<QuickActionProps['tone'], { card: string; tile: string }> = {
  terracotta: { card: 'bg-terracotta-soft', tile: 'bg-primary text-on-primary' },
  ink: { card: 'bg-tan-soft', tile: 'bg-deep-ink text-on-deep-ink' },
  tan: { card: 'bg-surface-raised', tile: 'bg-dark-tan text-ink' },
  subtle: { card: 'bg-surface-subtle', tile: 'bg-primary text-on-primary' },
};

export default function QuickAction({ to, title, body, icon, tone }: QuickActionProps) {
  const palette = tones[tone];

  return (
    <Link
      to={to}
      className={`flex h-full items-start gap-4 rounded-card border border-outline p-6 transition-colors duration-150 ease-paper hover:bg-surface-raised ${palette.card}`}
    >
      <span
        aria-hidden="true"
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-control ${palette.tile}`}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-display text-title-sm text-ink">{title}</h3>
        <p className="font-body text-body-sm text-text-secondary">{body}</p>
      </div>
    </Link>
  );
}
