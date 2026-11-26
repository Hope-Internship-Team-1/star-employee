import type { Industry, WorkSite } from '../services/types';

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
  title: string;
  lead: string;
  searchPlaceholder: string;
  allCities: string;
  popular: string;
  meterTitle: string;
  meterValue: string;
  quickActionTitle: string;
  quickActions: {
    resume: string;
    status: string;
    classes: string;
    experience: string;
  };
  hotJobs: string;
  featured: string;
  viewAll: string;
}

export interface JobsMessages {
  title: string;
  lead: string;
  rolesCount: string;
  cityCount: string;
  allLocations: string;
  allProvincesOf: string;
  viewMode: string;
  viewCards: string;
  viewList: string;
  showing: string;
  applyNow: string;
  recommended: string;
  resumeBadge: string;
  incompleteTitle: string;
  incompleteMeter: string;
  incompleteDesc: string;
  incompleteModules: string;
  completeProfile: string;
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
  site: string;
  actions: string;
  page: string;
  previous: string;
  next: string;
  empty: string;
  clearSearch: string;
}

export interface JobDetailMessages {
  backToJobs: string;
  responsibilities: string;
  requirements: string;
  companyCard: string;
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
  countOne: string;
  countMany: string;
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
  industry: Record<Industry, string>;
  site: Record<WorkSite, string>;
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
  poster: {
    line1: string;
    line2: string;
    slogan: string;
    colophon: string;
    edition: string;
    index: string;
  };
  login: {
    title: string;
    tabCode: string;
    tabPassword: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submit: string;
    submitting: string;
    sendCode: string;
    resendIn: string;
    resendInShort: string;
    codeLabel: string;
    codePlaceholder: string;
    codeHint: string;
    terms: string;
    termsRequired: string;
    retry: string;
    errorBanner: string;
    noAccount: string;
    registerLink: string;
  };
  register: {
    step1: string;
    step2: string;
    step3: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    sentTo: string;
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
    submitting: string;
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
  errorPage: {
    home: string;
    jobs: string;
    notFound: { title: string; body: string };
    forbidden: { title: string; body: string };
    server: { title: string; body: string };
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
}
