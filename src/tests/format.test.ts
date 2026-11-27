import { expect, test } from 'vitest';
import { format } from '../i18n/format';

test('replaces every known placeholder', () => {
  expect(format('Code for {email} expires in {seconds}s', { email: 'a@b.c', seconds: 60 })).toBe(
    'Code for a@b.c expires in 60s',
  );
});

test('leaves unknown placeholders untouched', () => {
  expect(format('{seconds}s {missing}', { seconds: 60 })).toBe('60s {missing}');
});

test('handles a template without placeholders', () => {
  expect(format('Plain text', {})).toBe('Plain text');
});
