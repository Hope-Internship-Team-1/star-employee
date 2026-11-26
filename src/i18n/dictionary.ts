export type Locale = 'en' | 'id';

export interface Messages {
  brand: {
    name: string;
  };
  locale: {
    label: string;
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
  notFound: {
    code: string;
    message: string;
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
