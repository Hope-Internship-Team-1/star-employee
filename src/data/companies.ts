import type { Company } from './types';

export const COMPANIES: Company[] = [
  {
    id: 'cmp_001',
    name: 'PT Telkom Indonesia',
    initials: 'TI',
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    industry: 'telecom',
    scale: '1000+',
    since: '1995',
    about: {
      en: 'Indonesian telecommunications and digital infrastructure provider serving more than 180 million customers nationwide.',
      id: 'Penyedia telekomunikasi dan infrastruktur digital Indonesia yang melayani lebih dari 180 juta pelanggan di seluruh negeri.',
    },
  },
  {
    id: 'cmp_002',
    name: 'PT Bank Central Asia',
    initials: 'BC',
    city: 'Jakarta Pusat',
    provinceId: 'dki-jakarta',
    industry: 'finance',
    scale: '1000+',
    since: '1957',
    about: {
      en: "One of Indonesia's largest banks, with an extensive branch network and a strong focus on digital banking services.",
      id: 'Salah satu bank terbesar di Indonesia, dengan jaringan cabang luas dan fokus kuat pada layanan perbankan digital.',
    },
  },
  {
    id: 'cmp_003',
    name: 'PT Tokopedia',
    initials: 'TK',
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    industry: 'ecommerce',
    scale: '200-1000',
    since: '2009',
    about: {
      en: 'A technology company building digital commerce and financial services for businesses and consumers across Indonesia.',
      id: 'Perusahaan teknologi yang membangun perdagangan digital dan layanan keuangan untuk pelaku usaha dan konsumen di Indonesia.',
    },
  },
  {
    id: 'cmp_004',
    name: 'PT Bukalapak',
    initials: 'BK',
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    industry: 'ecommerce',
    scale: '200-1000',
    since: '2011',
    about: {
      en: 'A marketplace platform connecting millions of sellers and buyers, with logistics and fintech products.',
      id: 'Platform marketplace yang menghubungkan jutaan penjual dan pembeli, dengan produk logistik dan fintech.',
    },
  },
  {
    id: 'cmp_005',
    name: 'PT Traveloka',
    initials: 'TV',
    city: 'Jakarta Barat',
    provinceId: 'dki-jakarta',
    industry: 'travel',
    scale: '200-1000',
    since: '2012',
    about: {
      en: 'A travel technology company offering accommodation, transport and attraction booking across Southeast Asia.',
      id: 'Perusahaan teknologi perjalanan yang menawarkan pemesanan akomodasi, transportasi, dan atraksi di Asia Tenggara.',
    },
  },
  {
    id: 'cmp_006',
    name: 'PT Gudang Garam',
    initials: 'GG',
    city: 'Jakarta Timur',
    provinceId: 'dki-jakarta',
    industry: 'manufacturing',
    scale: '1000+',
    since: '1953',
    about: {
      en: 'An Indonesian manufacturer with operations across the tobacco, food, and consumer goods industries.',
      id: 'Produsen Indonesia dengan operasi di industri tembakau, pangan, dan barang konsumen.',
    },
  },
  {
    id: 'cmp_007',
    name: 'PT Xiaomi Indonesia',
    initials: 'XM',
    city: 'Jakarta Barat',
    provinceId: 'dki-jakarta',
    industry: 'electronics',
    scale: '50-200',
    since: '2013',
    about: {
      en: 'A consumer technology company focused on smart devices and internet services for Indonesian users.',
      id: 'Perusahaan teknologi konsumen yang berfokus pada perangkat pintar dan layanan internet untuk pengguna Indonesia.',
    },
  },
  {
    id: 'cmp_008',
    name: 'PT Sampoerna Agro',
    initials: 'SA',
    city: 'Palembang',
    provinceId: 'sumatera-selatan',
    industry: 'manufacturing',
    scale: '1000+',
    since: '1983',
    about: {
      en: 'An integrated agribusiness company active in plantations, consumer products and digital farming services.',
      id: 'Perusahaan agribisnis terpadu yang bergerak di perkebunan, produk konsumen, dan layanan pertanian digital.',
    },
  },
];

export function getCompany(id: string): Company | undefined {
  return COMPANIES.find((company) => company.id === id);
}
