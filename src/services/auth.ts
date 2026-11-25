import { apiFetch } from './client';
import type { RegisterInput, UpdateUserInput, User } from './types';

export function requestOtp(email: string): Promise<void> {
  return apiFetch('/auth/otp/request', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function verifyOtp(email: string, code: string): Promise<User> {
  return apiFetch('/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
}

export function register(input: RegisterInput): Promise<User> {
  const body: RegisterInput = { email: input.email };

  if (input.name) body.name = input.name;
  if (input.phone) body.phone = input.phone;
  // The spec marks positions as optional with minItems 1, so omit an empty array.
  if (input.positions && input.positions.length > 0) body.positions = input.positions;

  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function setPassword(password: string): Promise<void> {
  if (password.length < 8 || password.length > 72) {
    throw new Error('Password must be between 8 and 72 characters.');
  }

  return apiFetch('/auth/password', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
}

export function loginWithPassword(email: string, password: string): Promise<User> {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout(): Promise<void> {
  return apiFetch('/auth/logout', { method: 'POST' });
}

export function getMe(): Promise<User> {
  return apiFetch('/users/me');
}

export function updateMe(patch: UpdateUserInput): Promise<User> {
  return apiFetch('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
}
