import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'resume-welcome-seen';

type ResumeModule = { label: string; done: boolean };

type Props = {
  /** Unique key of the logged-in user. The modal never shows when this is empty. */
  userKey?: string | null;
  percent?: number;
  required?: number;
  modules?: ResumeModule[];
  resumeHref?: string;
  jobsHref?: string;
};

function hasSeen(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false; // storage unavailable: just show it
  }
}

const DEFAULT_MODULES: ResumeModule[] = [
  { label: 'Full name', done: true },
  { label: 'Education', done: false },
  { label: 'Work history', done: false },
  { label: 'Professional skills', done: false },
];

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const size = 152;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#e5e2dd"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#b5522d"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - percent / 100)}
          style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-[#b5522d]">{percent}%</span>
        <span className="mt-1 text-xs font-medium text-neutral-600">Resume completeness</span>
      </div>
    </div>
  );
}

export default function ResumeWelcomeModal({
  userKey = null,
  percent = 23,
  required = 70,
  modules = DEFAULT_MODULES,
  resumeHref = '/resume',
  jobsHref = '/jobs',
}: Props) {
  const [closedKey, setClosedKey] = useState<string | null>(null);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  const storageKey = userKey ? `${STORAGE_KEY}:${userKey}` : null;

  // Open once per logged-in user: derived from props/storage, no setState in an effect
  const open = storageKey !== null && closedKey !== storageKey && !hasSeen(storageKey);

  // Animate the ring once opened
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setAnimatedPercent(percent), 100);
    return () => clearTimeout(t);
  }, [open, percent]);

  const close = useCallback(() => {
    if (!storageKey) return;
    try {
      localStorage.setItem(storageKey, '1');
    } catch {
      /* ignore */
    }
    setClosedKey(storageKey);
  }, [storageKey]);

  // Escape to close, lock body scroll, focus the dialog
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  if (!open) return null;

  const remaining = modules.filter((m) => !m.done).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-welcome-title"
        tabIndex={-1}
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white text-neutral-900 shadow-2xl outline-none"
      >
        <div className="grid md:grid-cols-2">
          {/* Left: progress */}
          <div className="bg-[#faf8f5] px-8 py-10 text-center md:border-r md:border-neutral-200">
            <CheckIcon className="mx-auto h-5 w-5 text-[#b5522d]" />
            <h2 id="resume-welcome-title" className="mt-4 text-3xl font-bold">
              You're in
            </h2>
            <p className="mx-auto mt-3 max-w-[16rem] text-sm text-neutral-600">
              Let's get your resume ready so you can start applying.
            </p>
            <div className="mt-8">
              <ProgressRing percent={animatedPercent} />
            </div>
          </div>

          {/* Right: checklist */}
          <div className="px-8 py-8">
            <p className="text-sm text-neutral-800">
              Complete {remaining} more {remaining === 1 ? 'module' : 'modules'} to reach the{' '}
              {required}% you need to apply.
            </p>
            <ul className="mt-6 border-t border-neutral-200">
              {modules.map((m) => (
                <li
                  key={m.label}
                  className="flex items-center justify-between border-b border-neutral-200 py-4 text-sm"
                >
                  <span>{m.label}</span>
                  {m.done ? (
                    <CheckIcon className="h-4 w-4 text-[#b5522d]" />
                  ) : (
                    <span className="text-xs text-neutral-500">Not filled in yet</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 border-t border-neutral-200 p-6">
          <Link
            to={resumeHref}
            onClick={close}
            className="block rounded-lg bg-[#b5522d] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#a04826] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b5522d]"
          >
            Complete my resume
          </Link>
          <Link
            to={jobsHref}
            onClick={close}
            className="block rounded-lg border border-neutral-200 bg-white py-3 text-center text-sm font-semibold transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
          >
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
