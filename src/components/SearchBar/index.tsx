import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, SearchIcon } from '../Icon';
import { useLocalePath, useMessages } from '../../i18n';
import { PROVINCES } from '../../lib/geo';

interface SearchBarProps {
  initialKeyword?: string;
  initialProvince?: string;
  initialCity?: string;
  compact?: boolean;
}

export default function SearchBar({
  initialKeyword = '',
  initialProvince = '',
  initialCity = '',
  compact,
}: SearchBarProps) {
  const t = useMessages();
  const path = useLocalePath();
  const navigate = useNavigate();

  // Seeded from the URL; the caller re-keys this component when the URL changes.
  const [keyword, setKeyword] = useState(initialKeyword);
  const [province, setProvince] = useState(initialProvince);
  const [city, setCity] = useState(initialCity);

  function onLocationChange(value: string) {
    if (value.startsWith('province:')) {
      setProvince(value.slice('province:'.length));
      setCity('');
      return;
    }
    if (value.startsWith('city:')) {
      const nextCity = value.slice('city:'.length);
      const owner = PROVINCES.find((option) => option.cities.includes(nextCity));
      setProvince(owner?.id ?? '');
      setCity(nextCity);
      return;
    }
    setProvince('');
    setCity('');
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('kw', keyword.trim());
    if (province) params.set('province', province);
    if (city) params.set('city', city);

    const query = params.toString();
    navigate(`${path('/jobs')}${query ? `?${query}` : ''}`);
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      aria-label={t.home.searchPlaceholder}
      className={[
        'flex w-full flex-col items-stretch gap-grid-2 rounded-card border-2 border-dark-tan bg-surface-raised p-grid-2 sm:flex-row sm:items-center',
        compact ? '' : 'max-w-2xl',
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-grid-3 px-grid-3">
        <SearchIcon size={16} className="shrink-0 text-primary" />
        <input
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          aria-label={t.home.searchPlaceholder}
          placeholder={t.home.searchPlaceholder}
          className="w-full border-0 bg-transparent py-grid-2 font-body text-body-md text-on-surface placeholder:text-text-muted focus:outline-none"
        />
      </div>

      <div aria-hidden="true" className="hidden h-7 w-px shrink-0 bg-outline sm:block" />

      <div className="flex items-center gap-grid-2 px-grid-3 sm:w-56 sm:shrink-0">
        <MapPinIcon size={16} className="shrink-0 text-primary" />
        <select
          value={city ? `city:${city}` : province ? `province:${province}` : ''}
          onChange={(event) => onLocationChange(event.target.value)}
          aria-label={t.jobs.filterProvince + ' / ' + t.jobs.filterCity}
          className="w-full cursor-pointer border-0 bg-transparent py-grid-2 font-body text-body-sm text-on-surface focus:outline-none"
        >
          <option value="">{t.jobs.allLocations}</option>
          {PROVINCES.map((option) => (
            <optgroup key={option.id} label={option.name}>
              <option value={`province:${option.id}`}>
                {t.jobs.allProvincesOf.replace('{name}', option.name)}
              </option>
              {option.cities.map((option2) => (
                <option key={option2} value={`city:${option2}`}>
                  {option2}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center rounded-control bg-primary px-card-pad-lg py-grid-2 font-label text-label-md text-on-primary transition-colors duration-hover-colour ease-hover-colour hover:bg-primary-hover"
      >
        {t.jobs.search}
      </button>
    </form>
  );
}
