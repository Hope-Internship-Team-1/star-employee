import { redirect } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { refreshSession } from '../services/session';

export async function requireAuth({ params }: LoaderFunctionArgs) {
  const user = await refreshSession();
  if (!user) return redirect(`/${params.locale}/login`);
  return user;
}
