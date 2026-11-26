import { useMessages } from '../../i18n';
import { StarIcon } from '../Icons';

export default function Poster() {
  const t = useMessages();

  return (
    <div
      aria-hidden="true"
      className="relative hidden min-h-0 flex-col justify-between gap-grid-4 overflow-hidden bg-primary p-section-lg lg:col-span-7 lg:flex"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="auth-orange-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.1" fill="#964322" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#auth-orange-dots)" opacity="0.55" />
        <line x1="64" y1="0" x2="64" y2="100%" stroke="#964322" strokeWidth="1" />
        <line x1="0" y1="64" x2="100%" y2="64" stroke="#964322" strokeWidth="1" />
        <line x1="0" y1="92%" x2="100%" y2="92%" stroke="#964322" strokeWidth="1" />
      </svg>

      <div className="relative z-10 flex items-center justify-between gap-grid-4">
        <span className="inline-flex items-center gap-grid-2 font-mono text-mono-meta text-on-primary">
          <StarIcon size={14} />
          <span>{t.poster.edition}</span>
        </span>
        <span className="font-mono text-mono-meta text-on-deep-ink">{t.poster.index}</span>
      </div>

      <div className="relative z-10 my-auto flex max-w-3xl flex-col gap-section-sm">
        <div className="h-1 w-16 bg-dark-tan" />
        <div className="es-poster-title flex flex-col font-display text-on-primary">
          <span>{t.poster.line1}</span>
          <span className="inline-flex items-center gap-grid-4">
            <span>{t.poster.line2}</span>
            <span className="text-dark-tan">
              <StarIcon size={48} />
            </span>
          </span>
        </div>
        <div className="max-w-xl border-t border-primary-hover pt-card-pad-lg">
          <p className="text-pretty font-lead text-page-md text-on-deep-ink">{t.poster.slogan}</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between gap-grid-4">
        <span className="font-mono text-mono-meta text-on-deep-ink">{t.poster.colophon}</span>
      </div>
    </div>
  );
}
