import { useId } from 'react';
import { useMessages } from '../../i18n';

export const COMPLETENESS_GATE = 70;

const STAR_PATH = 'M12 1.5 14.85 9.15 22.5 12l-7.65 2.85L12 22.5 9.15 14.85 1.5 12l7.65-2.85Z';

export default function CompletenessMeter({ percent }: { percent: number }) {
  const t = useMessages();
  const clipId = useId().replace(/:/g, '');

  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  const belowGate = clamped < COMPLETENESS_GATE;
  const fillHeight = (clamped / 100) * 24;

  return (
    <div className="flex flex-col gap-grid-3">
      <div className="flex items-center justify-between gap-grid-2">
        <div className="flex items-center gap-grid-3">
          <div
            role="progressbar"
            aria-valuenow={clamped}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${clamped}%`}
            aria-label={t.jobDetail.completeness}
            className="shrink-0"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id={clipId}>
                  <rect x="0" y={24 - fillHeight} width="24" height={fillHeight} />
                </clipPath>
              </defs>
              <path d={STAR_PATH} className="fill-paper-shadow" />
              <path d={STAR_PATH} clipPath={`url(#${clipId})`} className="fill-primary" />
            </svg>
          </div>
          <span className="font-label text-label-md text-on-surface">
            {t.jobDetail.completeness}
          </span>
        </div>
        <span className="font-mono text-title-sm tabular-nums text-primary">{clamped}%</span>
      </div>

      {belowGate && (
        <p className="font-meta text-meta-sm text-text-secondary">
          {t.jobDetail.completenessBody.replace('{n}', String(clamped))}
        </p>
      )}
    </div>
  );
}
