import { ApiError } from './client';

export type ErrorKey =
  | 'invalidCredentials'
  | 'invalidCode'
  | 'tooManyAttempts'
  | 'accountNotFound'
  | 'network'
  | 'generic';

export type ErrorContext = 'login' | 'verify';

export function errorKey(error: unknown, context: ErrorContext = 'login'): ErrorKey {
  if (error instanceof ApiError) {
    if (error.status === 429) return 'tooManyAttempts';
    if (error.status === 404) return 'accountNotFound';
    if (error.status === 401) return context === 'verify' ? 'invalidCode' : 'invalidCredentials';
    return 'generic';
  }

  if (error instanceof TypeError) return 'network';
  return 'generic';
}
