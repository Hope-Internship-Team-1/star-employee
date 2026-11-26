export interface Province {
  id: string;
  name: string;
  cities: string[];
}

// ponytail: mirrors the cities in the API data; the backend has no geo endpoint yet.
export const PROVINCES: Province[] = [
  {
    id: 'dki-jakarta',
    name: 'DKI Jakarta',
    cities: ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara'],
  },
  { id: 'banten', name: 'Banten', cities: ['Tangerang', 'Cilegon'] },
  { id: 'jawa-barat', name: 'Jawa Barat', cities: ['Bandung', 'Pangandaran'] },
  { id: 'jawa-tengah', name: 'Jawa Tengah', cities: ['Semarang', 'Kudus'] },
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    cities: ['Surabaya', 'Malang', 'Sidoarjo', 'Gresik', 'Kediri', 'Madiun'],
  },
  { id: 'kalimantan-timur', name: 'Kalimantan Timur', cities: ['Bontang'] },
  { id: 'kepulauan-riau', name: 'Kepulauan Riau', cities: ['Batam'] },
];

export function citiesOf(provinceId: string | undefined): string[] {
  if (!provinceId) return PROVINCES.flatMap((province) => province.cities);
  return PROVINCES.find((province) => province.id === provinceId)?.cities ?? [];
}
