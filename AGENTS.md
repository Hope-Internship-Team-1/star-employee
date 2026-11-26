# AGENTS.md

Rules for anyone (human or AI agent) writing code in this repo. Full stack and conventions: [docs/engineering-standards.md](docs/engineering-standards.md).

## Config and secrets

- Never hardcode API URLs, tokens, keys, or credentials.
- Read them from env via `import.meta.env.VITE_*` (e.g. `import.meta.env.VITE_API_BASE_URL`).
- New env variable: add it to `.env.example` with an empty or dummy value. Never commit `.env`.

## Session

- Login state comes only from `GET /users/me` (`{ authenticated, user }`, 401 = guest). Never infer it from another endpoint failing.
- Components: `useSession()` from `src/hooks/useSession.ts`. `undefined` = still checking, `null` = guest, `User` = signed in. Wait until it is not `undefined` before calling anything whose endpoint depends on login.
- Pick the endpoint by session, e.g. `/jobs/recommendations` for users, `/jobs/recommendations/random` for guests. Never call a login-required endpoint for a guest.
- Pages that need login: put the route under the `requireAuth` loader (it re-checks `/users/me` on every navigation).
- Anything that changes the session (login, OTP verify, logout, profile update) must update the store in `src/services/session.ts` (`clearSession` / `setSession`). The functions in `src/services/auth.ts` already do.

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
