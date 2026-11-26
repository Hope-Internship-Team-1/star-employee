import type { EmploymentType, JobStatus, WorkingLanguage } from './dictionaries';
import type { LocalizedText } from './types';

export interface Job {
  id: string;
  companyId: string;
  title: LocalizedText;
  city: string;
  provinceId: string;
  type: EmploymentType;
  language: WorkingLanguage;
  salaryMin: number;
  salaryMax: number;
  experience: LocalizedText;
  education: LocalizedText;
  postedDaysAgo: number;
  status: JobStatus;
  responsibilities: LocalizedText[];
  requirements: LocalizedText[];
}

export const JOBS: Job[] = [
  {
    id: 'job_001',
    companyId: 'cmp_001',
    title: { en: 'Front-end Engineer (Web)', id: 'Front-end Engineer (Web)' },
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'en',
    salaryMin: 18_000_000,
    salaryMax: 25_000_000,
    experience: { en: '2+ years', id: '2+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 2,
    status: 'open',
    responsibilities: [
      {
        en: 'Build and maintain web applications for internal and customer-facing products.',
        id: 'Membangun dan memelihara aplikasi web untuk produk internal dan yang menghadap pelanggan.',
      },
      {
        en: 'Work with product managers and designers to turn requirements into clean, reusable interfaces.',
        id: 'Bekerja dengan product manager dan desainer untuk mengubah kebutuhan menjadi antarmuka yang rapi dan bisa dipakai ulang.',
      },
      {
        en: 'Improve page performance, accessibility and responsiveness across devices.',
        id: 'Meningkatkan performa halaman, aksesibilitas, dan responsivitas di berbagai perangkat.',
      },
    ],
    requirements: [
      {
        en: 'Strong JavaScript, HTML and CSS fundamentals.',
        id: 'Dasar JavaScript, HTML, dan CSS yang kuat.',
      },
      {
        en: 'Experience with React or Vue, including component design and state management.',
        id: 'Pengalaman dengan React atau Vue, termasuk desain komponen dan manajemen state.',
      },
      {
        en: 'Familiar with REST APIs, Git and a modern build toolchain.',
        id: 'Terbiasa dengan REST API, Git, dan toolchain build modern.',
      },
      {
        en: 'Able to work in English; Indonesian is an advantage.',
        id: 'Mampu bekerja dalam bahasa Inggris; bahasa Indonesia menjadi nilai tambah.',
      },
    ],
  },
  {
    id: 'job_002',
    companyId: 'cmp_002',
    title: { en: 'Back-end Engineer (Node.js)', id: 'Back-end Engineer (Node.js)' },
    city: 'Jakarta Pusat',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'en',
    salaryMin: 20_000_000,
    salaryMax: 28_000_000,
    experience: { en: '3+ years', id: '3+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 1,
    status: 'open',
    responsibilities: [
      {
        en: 'Design and build APIs and services that support millions of daily transactions.',
        id: 'Merancang dan membangun API serta layanan yang menopang jutaan transaksi harian.',
      },
      {
        en: 'Own data models, migrations, and the reliability of core services.',
        id: 'Bertanggung jawab atas model data, migrasi, dan keandalan layanan inti.',
      },
      {
        en: 'Work in an agile team and take part in code review.',
        id: 'Bekerja dalam tim agile dan ikut serta dalam code review.',
      },
    ],
    requirements: [
      {
        en: 'Solid programming fundamentals in Java or Node.js.',
        id: 'Dasar pemrograman yang kuat di Java atau Node.js.',
      },
      {
        en: 'Hands-on experience with a relational database and SQL.',
        id: 'Pengalaman langsung dengan basis data relasional dan SQL.',
      },
      {
        en: 'Experience with Git, code review and unit testing.',
        id: 'Pengalaman dengan Git, code review, dan unit testing.',
      },
      {
        en: 'Able to work in English; Indonesian is an advantage.',
        id: 'Mampu bekerja dalam bahasa Inggris; bahasa Indonesia menjadi nilai tambah.',
      },
    ],
  },
  {
    id: 'job_003',
    companyId: 'cmp_003',
    title: { en: 'Frontend Developer (React)', id: 'Frontend Developer (React)' },
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'id',
    salaryMin: 15_000_000,
    salaryMax: 22_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 3,
    status: 'open',
    responsibilities: [
      {
        en: 'Deliver high-quality web interfaces for marketplace products.',
        id: 'Menghadirkan antarmuka web berkualitas tinggi untuk produk marketplace.',
      },
      {
        en: 'Collaborate with design to keep a consistent design system.',
        id: 'Berkolaborasi dengan tim desain untuk menjaga konsistensi design system.',
      },
      {
        en: 'Write reusable components and improve build and release pipelines.',
        id: 'Menulis komponen yang bisa dipakai ulang dan memperbaiki pipeline build serta rilis.',
      },
    ],
    requirements: [
      {
        en: 'Good command of JavaScript, HTML and CSS.',
        id: 'Menguasai JavaScript, HTML, dan CSS dengan baik.',
      },
      {
        en: 'At least one project built with React or a comparable framework.',
        id: 'Setidaknya satu proyek yang dibangun dengan React atau framework sejenis.',
      },
      {
        en: 'Understanding of responsive design and web performance basics.',
        id: 'Memahami desain responsif dan dasar performa web.',
      },
      {
        en: 'Able to work in Indonesian and English.',
        id: 'Mampu bekerja dalam bahasa Indonesia dan Inggris.',
      },
    ],
  },
  {
    id: 'job_004',
    companyId: 'cmp_004',
    title: { en: 'Software Engineer, Web Platform', id: 'Software Engineer, Web Platform' },
    city: 'Jakarta Selatan',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'id',
    salaryMin: 16_000_000,
    salaryMax: 24_000_000,
    experience: { en: '2+ years', id: '2+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 5,
    status: 'open',
    responsibilities: [
      {
        en: 'Build and operate web platform services used by sellers and buyers.',
        id: 'Membangun dan mengoperasikan layanan platform web yang dipakai penjual dan pembeli.',
      },
      {
        en: 'Improve reliability, monitoring and release processes.',
        id: 'Meningkatkan keandalan, pemantauan, dan proses rilis.',
      },
      {
        en: 'Take part in technical design reviews.',
        id: 'Ikut serta dalam tinjauan desain teknis.',
      },
    ],
    requirements: [
      {
        en: 'Experience with web application development.',
        id: 'Pengalaman dalam pengembangan aplikasi web.',
      },
      {
        en: 'Comfortable with data structures and algorithms.',
        id: 'Nyaman dengan struktur data dan algoritma.',
      },
      {
        en: 'Able to work in Indonesian and English.',
        id: 'Mampu bekerja dalam bahasa Indonesia dan Inggris.',
      },
    ],
  },
  {
    id: 'job_005',
    companyId: 'cmp_005',
    title: { en: 'UI Engineer', id: 'UI Engineer' },
    city: 'Jakarta Barat',
    provinceId: 'dki-jakarta',
    type: 'contract',
    language: 'en',
    salaryMin: 12_000_000,
    salaryMax: 18_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 7,
    status: 'open',
    responsibilities: [
      {
        en: 'Translate design files into pixel-accurate web pages.',
        id: 'Menerjemahkan berkas desain menjadi halaman web yang presisi.',
      },
      {
        en: 'Maintain and extend the shared component library.',
        id: 'Memelihara dan mengembangkan pustaka komponen bersama.',
      },
      {
        en: 'Ensure accessibility and cross-browser consistency.',
        id: 'Memastikan aksesibilitas dan konsistensi antar-browser.',
      },
    ],
    requirements: [
      {
        en: 'Strong HTML and CSS skills, including responsive layout.',
        id: 'Kemampuan HTML dan CSS yang kuat, termasuk tata letak responsif.',
      },
      {
        en: 'Experience with a component library such as Ant Design or Element.',
        id: 'Pengalaman dengan pustaka komponen seperti Ant Design atau Element.',
      },
      {
        en: 'Attention to detail and good communication.',
        id: 'Teliti dan mampu berkomunikasi dengan baik.',
      },
    ],
  },
  {
    id: 'job_006',
    companyId: 'cmp_006',
    title: { en: 'Digital Product Specialist', id: 'Digital Product Specialist' },
    city: 'Jakarta Timur',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'id',
    salaryMin: 10_000_000,
    salaryMax: 15_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 8,
    status: 'open',
    responsibilities: [
      {
        en: 'Support digital product rollouts and analyse user feedback.',
        id: 'Mendukung peluncuran produk digital dan menganalisis umpan balik pengguna.',
      },
      {
        en: 'Coordinate between business, design and engineering teams.',
        id: 'Mengoordinasikan tim bisnis, desain, dan engineering.',
      },
      {
        en: 'Prepare product documentation and reports.',
        id: 'Menyiapkan dokumentasi dan laporan produk.',
      },
    ],
    requirements: [
      {
        en: 'Strong written and spoken Indonesian.',
        id: 'Kemampuan tulis dan lisan bahasa Indonesia yang kuat.',
      },
      {
        en: 'Working English; Chinese is an advantage for this role.',
        id: 'Bahasa Inggris yang memadai; bahasa Mandarin menjadi nilai tambah.',
      },
      {
        en: 'Organised and comfortable working with data.',
        id: 'Terorganisasi dan nyaman bekerja dengan data.',
      },
    ],
  },
  {
    id: 'job_007',
    companyId: 'cmp_007',
    title: { en: 'Junior Front-end Developer', id: 'Junior Front-end Developer' },
    city: 'Jakarta Barat',
    provinceId: 'dki-jakarta',
    type: 'internship',
    language: 'id',
    salaryMin: 6_000_000,
    salaryMax: 8_000_000,
    experience: { en: 'Under 1 year', id: 'Kurang dari 1 tahun' },
    education: { en: 'Diploma or bachelor', id: 'Diploma atau sarjana' },
    postedDaysAgo: 14,
    status: 'open',
    responsibilities: [
      {
        en: 'Support feature development and bug fixing on web products.',
        id: 'Mendukung pengembangan fitur dan perbaikan bug pada produk web.',
      },
      {
        en: 'Learn and apply the team engineering standards.',
        id: 'Mempelajari dan menerapkan standar engineering tim.',
      },
      {
        en: 'Take part in code review and knowledge sharing.',
        id: 'Ikut serta dalam code review dan berbagi pengetahuan.',
      },
    ],
    requirements: [
      {
        en: 'Basic JavaScript, HTML and CSS knowledge.',
        id: 'Pengetahuan dasar JavaScript, HTML, dan CSS.',
      },
      {
        en: 'A portfolio, course project or personal web project.',
        id: 'Portofolio, proyek kursus, atau proyek web pribadi.',
      },
      {
        en: 'Eagerness to learn and to ask questions.',
        id: 'Semangat belajar dan berani bertanya.',
      },
    ],
  },
  {
    id: 'job_008',
    companyId: 'cmp_008',
    title: { en: 'Full-stack Developer', id: 'Full-stack Developer' },
    city: 'Palembang',
    provinceId: 'sumatera-selatan',
    type: 'full-time',
    language: 'id',
    salaryMin: 14_000_000,
    salaryMax: 20_000_000,
    experience: { en: '2+ years', id: '2+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 3,
    status: 'open',
    responsibilities: [
      {
        en: 'Build both the web front end and the services behind it.',
        id: 'Membangun front end web sekaligus layanan di belakangnya.',
      },
      {
        en: 'Own small features end to end, from data model to interface.',
        id: 'Menangani fitur kecil dari ujung ke ujung, dari model data sampai antarmuka.',
      },
      {
        en: 'Improve code quality through tests and review.',
        id: 'Meningkatkan kualitas kode melalui pengujian dan review.',
      },
    ],
    requirements: [
      {
        en: 'Experience with both front-end and back-end web development.',
        id: 'Pengalaman dalam pengembangan web front end dan back end.',
      },
      {
        en: 'Comfortable with SQL and data modelling.',
        id: 'Nyaman dengan SQL dan pemodelan data.',
      },
      {
        en: 'Able to work in Indonesian and English.',
        id: 'Mampu bekerja dalam bahasa Indonesia dan Inggris.',
      },
    ],
  },
  {
    id: 'job_009',
    companyId: 'cmp_001',
    title: { en: 'Data Analyst', id: 'Data Analyst' },
    city: 'Bandung',
    provinceId: 'jawa-barat',
    type: 'full-time',
    language: 'en',
    salaryMin: 11_000_000,
    salaryMax: 16_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 4,
    status: 'open',
    responsibilities: [
      {
        en: 'Turn product and network data into dashboards the business can act on.',
        id: 'Mengubah data produk dan jaringan menjadi dasbor yang bisa ditindaklanjuti bisnis.',
      },
      {
        en: 'Maintain reporting definitions so numbers stay consistent across teams.',
        id: 'Menjaga definisi pelaporan agar angka tetap konsisten antar-tim.',
      },
    ],
    requirements: [
      {
        en: 'Solid SQL and spreadsheet skills.',
        id: 'Kemampuan SQL dan spreadsheet yang kuat.',
      },
      {
        en: 'Able to explain a finding to a non-technical audience.',
        id: 'Mampu menjelaskan temuan kepada audiens non-teknis.',
      },
    ],
  },
  {
    id: 'job_010',
    companyId: 'cmp_003',
    title: { en: 'QA Automation Engineer', id: 'QA Automation Engineer' },
    city: 'Yogyakarta',
    provinceId: 'di-yogyakarta',
    type: 'full-time',
    language: 'id',
    salaryMin: 9_000_000,
    salaryMax: 13_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 6,
    status: 'open',
    responsibilities: [
      {
        en: 'Write and maintain end-to-end tests for the buyer and seller journeys.',
        id: 'Menulis dan memelihara pengujian end-to-end untuk alur pembeli dan penjual.',
      },
      {
        en: 'Report defects with steps another engineer can reproduce.',
        id: 'Melaporkan cacat dengan langkah yang bisa direproduksi engineer lain.',
      },
    ],
    requirements: [
      {
        en: 'Experience with a browser automation tool.',
        id: 'Pengalaman dengan alat otomasi browser.',
      },
      {
        en: 'Comfortable reading JavaScript and debugging flaky tests.',
        id: 'Nyaman membaca JavaScript dan menelusuri pengujian yang tidak stabil.',
      },
    ],
  },
  {
    id: 'job_011',
    companyId: 'cmp_005',
    title: { en: 'Mobile Engineer (Flutter)', id: 'Mobile Engineer (Flutter)' },
    city: 'Surabaya',
    provinceId: 'jawa-timur',
    type: 'full-time',
    language: 'id',
    salaryMin: 13_000_000,
    salaryMax: 19_000_000,
    experience: { en: '2+ years', id: '2+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 9,
    status: 'open',
    responsibilities: [
      {
        en: 'Ship features in the booking app without regressing the offline paths.',
        id: 'Merilis fitur di aplikasi pemesanan tanpa merusak alur offline.',
      },
      {
        en: 'Work with backend engineers on API contracts.',
        id: 'Bekerja dengan engineer backend pada kontrak API.',
      },
    ],
    requirements: [
      {
        en: 'One shipped Flutter application.',
        id: 'Satu aplikasi Flutter yang sudah dirilis.',
      },
      {
        en: 'Understanding of state management and app release processes.',
        id: 'Memahami manajemen state dan proses rilis aplikasi.',
      },
    ],
  },
  {
    id: 'job_012',
    companyId: 'cmp_006',
    title: { en: 'Business Intelligence Intern', id: 'Business Intelligence Intern' },
    city: 'Surabaya',
    provinceId: 'jawa-timur',
    type: 'internship',
    language: 'id',
    salaryMin: 4_500_000,
    salaryMax: 6_000_000,
    experience: { en: 'Under 1 year', id: 'Kurang dari 1 tahun' },
    education: { en: 'Diploma or bachelor', id: 'Diploma atau sarjana' },
    postedDaysAgo: 5,
    status: 'open',
    responsibilities: [
      {
        en: 'Assist the analytics team with data cleaning and weekly reports.',
        id: 'Membantu tim analitik membersihkan data dan menyusun laporan mingguan.',
      },
    ],
    requirements: [
      {
        en: 'Currently enrolled in a final year of study.',
        id: 'Sedang menempuh tahun terakhir studi.',
      },
      {
        en: 'Basic Excel and SQL.',
        id: 'Dasar Excel dan SQL.',
      },
    ],
  },
  {
    id: 'job_013',
    companyId: 'cmp_007',
    title: { en: 'Technical Support Engineer', id: 'Technical Support Engineer' },
    city: 'Bandung',
    provinceId: 'jawa-barat',
    type: 'contract',
    language: 'en',
    salaryMin: 8_000_000,
    salaryMax: 11_000_000,
    experience: { en: '1-3 years', id: '1-3 tahun' },
    education: { en: 'Diploma or bachelor', id: 'Diploma atau sarjana' },
    postedDaysAgo: 11,
    status: 'open',
    responsibilities: [
      {
        en: 'Resolve device and account issues for retail partners.',
        id: 'Menyelesaikan masalah perangkat dan akun untuk mitra ritel.',
      },
    ],
    requirements: [
      {
        en: 'Clear written English for ticket handling.',
        id: 'Bahasa Inggris tertulis yang jelas untuk menangani tiket.',
      },
      {
        en: 'Comfortable with Android device diagnostics.',
        id: 'Nyaman dengan diagnostik perangkat Android.',
      },
    ],
  },
  {
    id: 'job_014',
    companyId: 'cmp_002',
    title: { en: 'Frontend Engineer, Digital Banking', id: 'Frontend Engineer, Digital Banking' },
    city: 'Jakarta Pusat',
    provinceId: 'dki-jakarta',
    type: 'full-time',
    language: 'en',
    salaryMin: 22_000_000,
    salaryMax: 30_000_000,
    experience: { en: '3+ years', id: '3+ tahun' },
    education: { en: "Bachelor's degree", id: 'Sarjana (S1)' },
    postedDaysAgo: 2,
    status: 'closed',
    responsibilities: [
      {
        en: 'Build accessible transaction flows for the mobile web banking app.',
        id: 'Membangun alur transaksi yang aksesibel untuk aplikasi mobile web perbankan.',
      },
    ],
    requirements: [
      {
        en: 'Experience with regulated financial interfaces.',
        id: 'Pengalaman dengan antarmuka keuangan yang teregulasi.',
      },
    ],
  },
];

export function getJob(id: string): Job | undefined {
  return JOBS.find((job) => job.id === id);
}

export function jobsOfCompany(companyId: string): Job[] {
  return JOBS.filter((job) => job.companyId === companyId && job.status === 'open');
}
