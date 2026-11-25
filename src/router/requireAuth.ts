import { redirect } from 'react-router-dom';

export async function requireAuth() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
    credentials: 'include',
  });

  if (res.status === 401) return redirect('/login');
  if (!res.ok) throw new Error(`Session check failed with status ${res.status}`);

  return res.json();
}
