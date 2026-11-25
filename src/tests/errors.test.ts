import { expect, test } from 'vitest';
import { ApiError } from '../services/client';
import { errorKey } from '../services/errors';

test('maps a login 401 to invalid credentials', () => {
  expect(errorKey(new ApiError(401, 'Unauthorized'), 'login')).toBe('invalidCredentials');
});

test('maps a verify 401 to an invalid code', () => {
  expect(errorKey(new ApiError(401, 'Unauthorized'), 'verify')).toBe('invalidCode');
});

test('maps 429 to too many attempts', () => {
  expect(errorKey(new ApiError(429, 'Too many requests'))).toBe('tooManyAttempts');
});

test('maps a fetch failure to a network error', () => {
  expect(errorKey(new TypeError('Failed to fetch'))).toBe('network');
});

test('maps other errors to a generic message', () => {
  expect(errorKey(new ApiError(500, 'Server error'))).toBe('generic');
  expect(errorKey(new Error('Unexpected'))).toBe('generic');
});
