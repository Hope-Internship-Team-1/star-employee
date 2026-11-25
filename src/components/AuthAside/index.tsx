import { format, useMessages } from '../../i18n';

export function AsideNote({ text }: { text: string }) {
  return <p className="max-w-[24ch] font-display text-[1.35rem] leading-snug text-ink">{text}</p>;
}

export function AsideSteps({ current }: { current: number }) {
  const t = useMessages();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={['h-1.5 w-6 rounded-full', step <= current ? 'bg-clay' : 'bg-ink/15'].join(
              ' ',
            )}
          />
        ))}
      </div>
      <p className="text-sm text-ink">{format(t.panel.step, { current, total: 3 })}</p>
    </div>
  );
}

export function AsideDone({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6 text-clay"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 12l5 5L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-sm text-ink">{text}</p>
    </div>
  );
}
