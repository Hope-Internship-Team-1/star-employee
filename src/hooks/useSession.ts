import { useEffect, useSyncExternalStore } from 'react';
import { getSessionSnapshot, loadSession, subscribeSession } from '../services/session';
import type { Session } from '../services/session';

export function useSession(): Session {
  const session = useSyncExternalStore(subscribeSession, getSessionSnapshot);

  useEffect(() => {
    loadSession().catch(() => {
      // Network failure: stay in the checking state instead of guessing guest.
    });
  }, [session]);

  return session;
}
