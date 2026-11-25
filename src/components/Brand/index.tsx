import { useMessages } from '../../i18n';

export default function Brand() {
  const t = useMessages();

  return (
    <span className="inline-flex items-center gap-2 text-[15px] font-medium text-ink">
      <span aria-hidden="true" className="text-clay">
        +
      </span>
      {t.brand.name}
    </span>
  );
}
