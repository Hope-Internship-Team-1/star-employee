import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, SearchIcon } from '../Icon';
import { useLocalePath, useMessages } from '../../i18n';
import { PROVINCES } from '../../data/geo';

interface SearchBarProps {
  initialKeyword?: string;
  initialCity?: string;
  compact?: boolean;
}

export default function SearchBar({ initialKeyword = '', initialCity = '', compact }: SearchBarProps) {
  const t = useMessages();
  const path = useLocalePath();
  const navigate = useNavigate();

  // Seeded from the URL; the caller re-keys this component when the URL changes.
  const [keyword, setKeyword] = useState(initialKeyword);
  const [city, setCity] = useState(initialCity);

  const cities = PROVINCES.flatMap((province) => province.cities);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('kw', keyword.trim());
    if (city) params.set('city', city);

    const query = params.toString();
    navigate(`${path('/jobs')}${query ? `?${query}` : ''}`);
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={[
        'flex w-full flex-col items-stretch gap-2 rounded-card border border-outline bg-surface-raised p-2 shadow-[0_1px_2px_rgba(36,33,29,0.05)] sm:flex-row sm:items-center',
        compact ? '' : 'max-w-2xl',
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <SearchIcon size={16} className="shrink-0 text-text-secondary" />
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          aria-label={t.home.searchPlaceholder}
          placeholder={t.home.searchPlaceholder}
          className="w-full border-0 bg-transparent py-2.5 font-body text-body-md text-ink placeholder:text-text-secondary focus:outline-none"
        />
      </div>

      <div className="hidden h-8 w-px shrink-0 bg-outline sm:block" />

      <div className="flex items-center gap-2 px-3 sm:w-48 sm:shrink-0">
        <MapPinIcon size={16} className="shrink-0 text-text-secondary" />
        <select
          value={city}
          onChange={(event) => setCity(event.target.value)}
          aria-label={t.jobs.filterCity}
          className="w-full cursor-pointer border-0 bg-transparent py-2.5 font-body text-body-md text-ink focus:outline-none"
        >
          <option value="">{t.home.allCities}</option>
          {cities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center rounded-control bg-primary px-7 py-3 font-display text-label-md text-on-primary transition-colors duration-150 ease-paper hover:bg-primary-hover"
      >
        {t.jobs.search}
      </button>
    </form>
  );
}
