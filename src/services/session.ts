import { ApiError, apiFetch } from './client';
import type { User } from './types';

// undefined: still checking, null: guest.
export type Session = User | null | undefined;

interface MeResponse {
  authenticated: boolean;
  user: User;
}

let session: Session = undefined;
let pending: Promise<User | null> | null = null;
const listeners = new Set<() => void>();

function publish(next: Session) {
  session = next;
  listeners.forEach((listener) => listener());
}

async function fetchSession(): Promise<User | null> {
  try {
    const me = await apiFetch<MeResponse>('/users/me');
    return me.authenticated ? me.user : null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}

export function loadSession(): Promise<User | null> {
  pending ??= fetchSession().then(
    (user) => {
      publish(user);
      return user;
    },
    (error: unknown) => {
      pending = null;
      throw error;
    },
  );
  return pending;
}

export function refreshSession(): Promise<User | null> {
  pending = null;
  return loadSession();
}

export function setSession(user: User | null) {
  pending = Promise.resolve(user);
  publish(user);
}

export function clearSession() {
  pending = null;
  publish(undefined);
}

export function getSessionSnapshot(): Session {
  return session;
}

export function subscribeSession(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
