import type { ReactNode } from 'react';
import { AsteriskIcon } from '../Icon';

interface SectionHeadingProps {
  title: string;
  body?: string;
  action?: ReactNode;
  id?: string;
}

export default function SectionHeading({ title, body, action, id }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-grid-4 pb-section-sm">
      <div className="flex max-w-2xl flex-col gap-grid-2">
        <h2
          id={id}
          className="flex items-center gap-grid-3 font-display text-page-md text-on-surface"
        >
          <AsteriskIcon size={16} className="shrink-0 text-primary" />
          {title}
        </h2>
        {body && <p className="font-body text-body-md text-text-secondary">{body}</p>}
      </div>
      {action}
    </div>
  );
}
