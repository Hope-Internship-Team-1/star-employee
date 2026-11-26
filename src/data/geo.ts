export interface Province {
  id: string;
  name: string;
  cities: string[];
}

export const PROVINCES: Province[] = [
  {
    id: 'dki-jakarta',
    name: 'DKI Jakarta',
    cities: ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara'],
  },
  {
    id: 'jawa-barat',
    name: 'Jawa Barat',
    cities: ['Bandung', 'Bekasi', 'Depok', 'Bogor'],
  },
  {
    id: 'jawa-tengah',
    name: 'Jawa Tengah',
    cities: ['Semarang', 'Surakarta'],
  },
  {
    id: 'di-yogyakarta',
    name: 'DI Yogyakarta',
    cities: ['Yogyakarta', 'Sleman'],
  },
  {
    id: 'jawa-timur',
    name: 'Jawa Timur',
    cities: ['Surabaya', 'Malang'],
  },
  {
    id: 'sumatera-selatan',
    name: 'Sumatera Selatan',
    cities: ['Palembang'],
  },
];

export function citiesOf(provinceId: string | undefined): string[] {
  if (!provinceId) return PROVINCES.flatMap((province) => province.cities);
  return PROVINCES.find((province) => province.id === provinceId)?.cities ?? [];
}

export function provinceOfCity(city: string): Province | undefined {
  return PROVINCES.find((province) => province.cities.includes(city));
}
