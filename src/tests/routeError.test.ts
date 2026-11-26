import { describe, expect, test } from 'vitest';
import { errorKind } from '../lib/routeError';
import { ApiError } from '../services/client';

function routeResponse(status: number) {
  return { status, statusText: '', internal: false, data: null };
}

describe('errorKind', () => {
  test('treats a missing error as not found, for the catch-all route', () => {
    expect(errorKind(undefined)).toBe('notFound');
    expect(errorKind(null)).toBe('notFound');
  });

  test('maps a 404 route response to not found', () => {
    expect(errorKind(routeResponse(404))).toBe('notFound');
  });

  test('maps 401 and 403 to forbidden', () => {
    expect(errorKind(routeResponse(401))).toBe('forbidden');
    expect(errorKind(new ApiError(403, 'Forbidden'))).toBe('forbidden');
  });

  test('maps an API 404 to not found', () => {
    expect(errorKind(new ApiError(404, 'Not found'))).toBe('notFound');
  });

  test('falls back to server for 5xx and thrown errors', () => {
    expect(errorKind(routeResponse(503))).toBe('server');
    expect(errorKind(new Error('boom'))).toBe('server');
    expect(errorKind('unexpected')).toBe('server');
  });
});
