# AGENTS.md

Rules for anyone (human or AI agent) writing code in this repo. Full stack and conventions: [docs/engineering-standards.md](docs/engineering-standards.md).

## Config and secrets

- Never hardcode API URLs, tokens, keys, or credentials.
- Read them from env via `import.meta.env.VITE_*` (e.g. `import.meta.env.VITE_API_BASE_URL`).
- New env variable: add it to `.env.example` with an empty or dummy value. Never commit `.env`.

## Styling

- Use Tailwind classes in JSX for all styling.
- Plain CSS only for base/global styles in `src/index.css` (resets, fonts, root variables).
- No per-component or per-page `.css` files, no inline `style={{}}` unless the value is dynamic.

## Folder structure

- `src/pages/<name>/index.tsx`: one folder per page, routed in `src/router/index.tsx`.
- `src/components/<Name>/index.tsx`: reusable components. Anything used by more than one page lives here, not inside a page folder.
- `src/tests/`: all unit tests (see Testing).

## Code style

- Readable over clever: clear names, small functions, early returns.
- Keep comments minimal. never comment _what_ the code does.
- No commented-out code, no leftover `console.log`, no unused imports.

## Testing

- All unit tests go in `src/tests/`, named `<name>.test.ts`.
- Logic with branches (auth, loaders, reducers, helpers, validation) NEEDS a test. Pure display components don't.

## Before pushing / deploying

All this must pass:

```bash
bun run format   # auto-fix formatting
bun run lint     # code rules
bun run test     # unit tests in src/tests/
```
