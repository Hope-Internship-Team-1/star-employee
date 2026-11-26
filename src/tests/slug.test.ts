import { describe, expect, test } from 'vitest';
import { idFromResourcePath, resourcePath, slugify } from '../lib/slug';

describe('slugify', () => {
  test('lowercases and hyphenates', () => {
    expect(slugify('Front-end Engineer (Web)')).toBe('front-end-engineer-web');
  });

  test('strips accents rather than dropping the character', () => {
    expect(slugify('Résumé Builder')).toBe('resume-builder');
  });

  test('collapses runs of punctuation and trims edges', () => {
    expect(slugify('  PT Bank Central Asia -- Jakarta  ')).toBe('pt-bank-central-asia-jakarta');
  });
});

describe('resourcePath', () => {
  test('appends the id so the URL stays unique when titles repeat', () => {
    expect(resourcePath('Frontend Developer', 'job_003')).toBe('frontend-developer-job_003');
  });

  test('produces the same slug for two identical titles with different ids', () => {
    expect(resourcePath('UI Engineer', 'job_001')).not.toBe(resourcePath('UI Engineer', 'job_002'));
  });
});

describe('idFromResourcePath', () => {
  test('recovers the job id from a slug', () => {
    expect(idFromResourcePath('front-end-engineer-web-job_001')).toBe('job_001');
  });

  test('recovers the company id from a slug', () => {
    expect(idFromResourcePath('pt-bank-central-asia-cmp_002')).toBe('cmp_002');
  });

  test('still resolves a bare id for old links', () => {
    expect(idFromResourcePath('job_008')).toBe('job_008');
  });

  test('returns undefined when no id is present', () => {
    expect(idFromResourcePath('front-end-engineer-web')).toBeUndefined();
    expect(idFromResourcePath(undefined)).toBeUndefined();
  });

  test('does not match an id-looking fragment in the middle of the slug', () => {
    expect(idFromResourcePath('job_001-extra-job_002')).toBe('job_002');
  });
});
