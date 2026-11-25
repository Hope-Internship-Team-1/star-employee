export type Locale = 'en' | 'id';

export interface Messages {
  brand: {
    name: string;
  };
  locale: {
    label: string;
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
