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
    <div className="flex flex-wrap items-end justify-between gap-4 pb-8">
      <div className="flex max-w-2xl flex-col gap-2">
        <h2
          id={id}
          className="flex items-center gap-3 font-display text-page-lg-mobile text-ink lg:text-page-lg"
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
