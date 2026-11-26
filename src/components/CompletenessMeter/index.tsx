import { useMessages } from '../../i18n';

export const COMPLETENESS_GATE = 70;

export default function CompletenessMeter({ percent }: { percent: number }) {
  const t = useMessages();
  const belowGate = percent < COMPLETENESS_GATE;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-label-md text-ink">{t.jobDetail.completeness}</span>
        <span className="font-mono text-label-md tabular-nums text-primary-hover">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t.jobDetail.completeness}
        className="h-2 w-full overflow-hidden rounded-full bg-surface-subtle"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      {belowGate && (
        <p className="font-body text-meta-sm text-text-secondary">
          {t.jobDetail.completenessBody.replace('{n}', String(percent))}
        </p>
      )}
    </div>
  );
}
