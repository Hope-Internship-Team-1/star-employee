import { Link } from 'react-router-dom';

export default function QuickAction({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={to}
      className="flex h-full items-center rounded-card border border-outline bg-surface-raised p-6 transition-colors duration-150 ease-paper hover:bg-surface-subtle"
    >
      <h3 className="font-display text-title-sm text-ink">{title}</h3>
    </Link>
  );
}
