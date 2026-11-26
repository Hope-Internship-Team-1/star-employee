export function slugify(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const RESOURCE_ID = /(?:^|-)((?:cmp|job)_\d+)$/;

export function resourcePath(name: string, id: string): string {
  return `${slugify(name)}-${id}`;
}

// Accepts "front-end-engineer-job_001" and a bare "job_001", so old or
// hand-typed links keep working after the slug changes.
export function idFromResourcePath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  return RESOURCE_ID.exec(path)?.[1];
}
