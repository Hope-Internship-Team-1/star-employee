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
      className="inline-flex items-center gap-0.5 rounded-full border border-line bg-cream p-0.5"
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
              'min-h-11 rounded-full px-3 text-xs font-medium tracking-wide sm:min-h-8',
              active
                ? 'bg-white text-ink shadow-[inset_0_0_0_1px_#E8E0D3]'
                : 'text-ink-soft hover:text-ink',
            ].join(' ')}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
