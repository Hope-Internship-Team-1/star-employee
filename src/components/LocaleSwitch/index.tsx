import { useLocale, useMessages } from '../../i18n';
import type { Locale } from '../../i18n';

const options: Locale[] = ['en', 'id'];

export default function LocaleSwitch() {
  const t = useMessages();
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.locale.label}
      className="inline-flex items-center rounded-control border border-outline bg-surface-raised p-grid-1"
    >
      {options.map((option) => {
        const active = locale === option;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => setLocale(option)}
            className={[
              'rounded-control px-grid-3 py-grid-1 font-mono text-mono-meta transition-colors duration-hover-colour ease-hover-colour focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              active ? 'bg-dark-tan text-on-surface' : 'text-text-secondary hover:text-on-surface',
            ].join(' ')}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
