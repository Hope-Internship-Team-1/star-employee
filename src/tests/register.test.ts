import { expect, test, vi } from 'vitest';
import { ApiError } from '../services/client';
import { completeRegistration } from '../services/registration';
import { isPasswordLengthValid, passwordsMatch } from '../services/validation';

const input = { name: 'Budi', password: 'password123' };

test('accepts passwords from 8 to 72 characters', () => {
  expect(isPasswordLengthValid('a'.repeat(8))).toBe(true);
  expect(isPasswordLengthValid('a'.repeat(72))).toBe(true);
  expect(isPasswordLengthValid('a'.repeat(7))).toBe(false);
  expect(isPasswordLengthValid('a'.repeat(73))).toBe(false);
});

test('compares the confirmation against the password', () => {
  expect(passwordsMatch('secret123', 'secret123')).toBe(true);
  expect(passwordsMatch('secret123', 'secret124')).toBe(false);
});

test('updates the profile before setting the password', async () => {
  const calls: string[] = [];

  await completeRegistration(input, {
    updateMe: async () => {
      calls.push('updateMe');
    },
    setPassword: async () => {
      calls.push('setPassword');
    },
  });

  expect(calls).toEqual(['updateMe', 'setPassword']);
});

test('skips the password when the profile update fails', async () => {
  const setPassword = vi.fn();

  await expect(
    completeRegistration(input, {
      updateMe: async () => {
        throw new ApiError(400, 'Invalid name');
      },
      setPassword,
    }),
  ).rejects.toBeInstanceOf(ApiError);

  expect(setPassword).not.toHaveBeenCalled();
});

test('treats an existing password as success', async () => {
  await expect(
    completeRegistration(input, {
      updateMe: async () => ({}),
      setPassword: async () => {
        throw new ApiError(409, 'Password already set');
      },
    }),
  ).resolves.toBeUndefined();
});

test('propagates other password errors', async () => {
  await expect(
    completeRegistration(input, {
      updateMe: async () => ({}),
      setPassword: async () => {
        throw new ApiError(400, 'Password too short');
      },
    }),
  ).rejects.toMatchObject({ status: 400 });
});
