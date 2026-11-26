import type { Locale } from '../i18n';

export function formatSalary(min: number, max: number, locale: Locale): string {
  const formatter = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
    maximumFractionDigits: 0,
  });

  const range = `${formatter.format(min)} - ${formatter.format(max)}`;
  return locale === 'id' ? `Rp${range} / bulan` : `IDR ${range} / month`;
}

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-GB').format(value);
}

export function postedLabel(days: number, locale: Locale): string {
  if (days <= 0) return locale === 'id' ? 'Hari ini' : 'Today';
  if (days === 1) return locale === 'id' ? '1 hari lalu' : '1 day ago';
  if (days < 7) return locale === 'id' ? `${days} hari lalu` : `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return locale === 'id' ? '1 minggu lalu' : '1 week ago';
  return locale === 'id' ? `${weeks} minggu lalu` : `${weeks} weeks ago`;
}
