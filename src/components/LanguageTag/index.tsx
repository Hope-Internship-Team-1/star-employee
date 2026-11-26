import { useMessages } from '../../i18n';
import type { WorkingLanguage } from '../../data/dictionaries';

export default function LanguageTag({ language }: { language: WorkingLanguage }) {
  const t = useMessages();

  return (
    <span
      title={t.enums.workingLanguage[language]}
      className="shrink-0 rounded-full bg-terracotta-soft px-2.5 py-1 font-mono text-meta-sm text-primary-hover"
    >
      {language.toUpperCase()}
    </span>
  );
}
