import { apiFetch } from './client';
import { clearSession, setSession } from './session';
import type { RegisterInput, UpdateUserInput, User } from './types';

export function requestOtp(email: string): Promise<void> {
  return apiFetch('/auth/otp/request', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function verifyOtp(email: string, code: string): Promise<User> {
  const user = await apiFetch<User>('/auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
  clearSession();
  return user;
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

export async function loginWithPassword(email: string, password: string): Promise<User> {
  const user = await apiFetch<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  clearSession();
  return user;
}

export async function logout(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
  setSession(null);
}

export async function updateMe(patch: UpdateUserInput): Promise<User> {
  const user = await apiFetch<User>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
  clearSession();
  return user;
}
