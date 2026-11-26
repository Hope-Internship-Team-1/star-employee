import { useMessages } from '../../i18n';

export default function AuthStepper({ current }: { current: number }) {
  const t = useMessages();
  const steps = [t.register.step1, t.register.step2, t.register.step3];

  return (
    <ol className="flex items-center gap-grid-3 border-b border-outline sm:gap-card-pad-lg">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step === current;

        return (
          <li
            key={label}
            aria-current={active ? 'step' : undefined}
            className={[
              '-mb-px whitespace-nowrap border-b-2 pb-grid-2 font-label text-label-md',
              active ? 'border-primary text-on-surface' : 'border-transparent text-text-secondary',
            ].join(' ')}
          >
            {label}
          </li>
        );
      })}
    </ol>
  );
}
