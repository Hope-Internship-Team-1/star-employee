import { createContext, useContext } from 'react';

export interface AuthFlowState {
  email: string;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const AuthFlowContext = createContext<AuthFlowState | null>(null);

export function useAuthFlow(): AuthFlowState {
  const state = useContext(AuthFlowContext);
  if (!state) throw new Error('useAuthFlow must be used inside AuthFlowProvider.');
  return state;
}
