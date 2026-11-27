import { isRouteErrorResponse } from 'react-router-dom';
import { ApiError } from '../services/client';

export type ErrorKind = 'notFound' | 'forbidden' | 'server';

export const ERROR_CODES: Record<ErrorKind, number> = {
  notFound: 404,
  forbidden: 403,
  server: 500,
};

function statusOf(error: unknown): number | undefined {
  if (isRouteErrorResponse(error)) return error.status;
  if (error instanceof ApiError) return error.status;
  return undefined;
}

export function errorKind(error: unknown): ErrorKind {
  if (error == null) return 'notFound';

  const status = statusOf(error);
  if (status === 404) return 'notFound';
  if (status === 401 || status === 403) return 'forbidden';
  return 'server';
}
