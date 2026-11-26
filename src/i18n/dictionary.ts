export type Locale = 'en' | 'id';

export interface NavMessages {
  home: string;
  jobs: string;
  companies: string;
  classes: string;
  messages: string;
  profile: string;
  login: string;
  logout: string;
}

export interface HomeMessages {
  badge: string;
  title: string;
  lead: string;
  searchPlaceholder: string;
  allCities: string;
  popular: string;
  meterTitle: string;
  meterValue: string;
  quickActionTitle: string;
  quickActions: {
    resume: { title: string; body: string };
    status: { title: string; body: string };
    classes: { title: string; body: string };
    experience: { title: string; body: string };
  };
  hotJobs: string;
  hotJobsBody: string;
  featured: string;
  featuredBody: string;
  viewAll: string;
}

export interface JobsMessages {
  title: string;
  lead: string;
  filterIndustry: string;
  filterProvince: string;
  filterCity: string;
  filterType: string;
  filterLanguage: string;
  filterSalary: string;
  all: string;
  search: string;
  sort: string;
  sortDefault: string;
  sortNewest: string;
  sortSalary: string;
  filters: string;
  pagination: string;
  reset: string;
  foundOne: string;
  foundMany: string;
  posted: string;
  language: string;
  employmentType: string;
  company: string;
  city: string;
  salary: string;
  actions: string;
  page: string;
  previous: string;
  next: string;
  empty: string;
  clearSearch: string;
}

export interface JobDetailMessages {
  responsibilities: string;
  requirements: string;
  companyCard: string;
  view: string;
  industry: string;
  size: string;
  founded: string;
  address: string;
  about: string;
  allJobs: string;
  similar: string;
  completeness: string;
  completenessBody: string;
  completeResume: string;
  apply: string;
  applied: string;
  closed: string;
  save: string;
  saved: string;
  negotiable: string;
  notFound: string;
  posted: string;
  experience: string;
  education: string;
}

export interface CompaniesMessages {
  title: string;
  lead: string;
  openRolesOne: string;
  openRolesMany: string;
  filterIndustry: string;
  empty: string;
  companyProfile: string;
  allJobsOf: string;
  noJobs: string;
  browseJobs: string;
  employees: string;
  since: string;
}

export interface StateMessages {
  loading: string;
  error: string;
  retry: string;
  empty: string;
}

export interface EnumsMessages {
  employmentType: Record<'full-time' | 'part-time' | 'contract' | 'internship', string>;
  industry: Record<
    'telecom' | 'finance' | 'ecommerce' | 'manufacturing' | 'travel' | 'electronics',
    string
  >;
  workingLanguage: Record<'en' | 'id', string>;
  scale: Record<string, string>;
}

export interface Messages {
  brand: {
    name: string;
    wordmarkAlt: string;
  };
  locale: {
    label: string;
  };
  nav: NavMessages;
  home: HomeMessages;
  jobs: JobsMessages;
  jobDetail: JobDetailMessages;
  companies: CompaniesMessages;
  state: StateMessages;
  enums: EnumsMessages;
  footer: {
    lines: [string, string, string];
    tagline: string;
    platform: string;
    company: string;
    resources: string;
    about: string;
    partners: string;
    terms: string;
    faq: string;
    help: string;
    privacy: string;
  };
  status: {
    delivered: string;
    pending: string;
    interview: string;
    notSuitable: string;
  };
  login: {
    title: string;
    tabPassword: string;
    tabCode: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submit: string;
    sendCode: string;
    resendIn: string;
    codeLabel: string;
    codeHint: string;
    noAccount: string;
    registerLink: string;
  };
  register: {
    step1Title: string;
    step2Title: string;
    sentTo: string;
    step3Title: string;
    emailLabel: string;
    fullName: string;
    fullNamePlaceholder: string;
    passwordLabel: string;
    confirmPasswordLabel: string;
    passwordHint: string;
    passwordMismatch: string;
    verify: string;
    finish: string;
    continue: string;
    resend: string;
    resendIn: string;
    backToLogin: string;
  };
  welcome: {
    title: string;
    greeting: string;
    subtitle: string;
    education: string;
    workHistory: string;
    notFilled: string;
    completeResume: string;
    browseJobs: string;
  };
  errors: {
    emailInvalid: string;
    nameRequired: string;
    nameTooLong: string;
    passwordRequired: string;
    confirmRequired: string;
    codeRequired: string;
    invalidCredentials: string;
    invalidCode: string;
    tooManyAttempts: string;
    network: string;
    generic: string;
  };
  panel: {
    loginLine: string;
    step: string;
    done: string;
  };
}
