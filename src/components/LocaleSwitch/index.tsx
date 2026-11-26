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
      className="inline-flex items-center rounded-control border border-outline bg-surface-raised p-1"
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
              'rounded-control px-3 py-1 font-mono text-meta-sm transition-colors duration-150 ease-paper',
              active ? 'bg-deep-ink text-on-deep-ink' : 'text-text-secondary hover:text-ink',
            ].join(' ')}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
