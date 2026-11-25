import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthFlowContext } from './authFlowContext';

export function AuthFlowProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('');
  const value = useMemo(() => ({ email, setEmail, reset: () => setEmail('') }), [email]);

  return <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>;
}
