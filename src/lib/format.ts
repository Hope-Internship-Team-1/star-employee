import type { Locale } from '../i18n';

export function formatSalary(
  min: number | null | undefined,
  max: number | null | undefined,
  locale: Locale,
): string {
  if (min == null || max == null) {
    return locale === 'id' ? 'Gaji tidak ditampilkan' : 'Salary not disclosed';
  }

  const formatter = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
    maximumFractionDigits: 0,
  });

  const range = `${formatter.format(min)} - ${formatter.format(max)}`;
  return locale === 'id' ? `Rp${range} / bulan` : `IDR ${range} / month`;
}

export function formatCount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-GB').format(value);
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function daysSince(iso: string, now = Date.now()): number {
  return Math.max(0, Math.floor((now - Date.parse(iso)) / DAY_MS));
}

export function postedLabel(postedAt: string, locale: Locale, now = Date.now()): string {
  const days = daysSince(postedAt, now);
  if (days <= 0) return locale === 'id' ? 'Hari ini' : 'Today';
  if (days === 1) return locale === 'id' ? '1 hari lalu' : '1 day ago';
  if (days < 7) return locale === 'id' ? `${days} hari lalu` : `${days} days ago`;

  const weeks = Math.floor(days / 7);
  if (weeks === 1) return locale === 'id' ? '1 minggu lalu' : '1 week ago';
  return locale === 'id' ? `${weeks} minggu lalu` : `${weeks} weeks ago`;
}
