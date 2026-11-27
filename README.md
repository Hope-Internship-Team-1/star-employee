# Employment Star — Job-Seeker Edition (EN/ID)

Team 1 · Houpu International 8-week internship.
Job-seeker web app for Indonesian university students and fresh graduates, in English and Indonesian locale.

Engineering rules: see [`docs/engineering-standards.md`](docs/engineering-standards.md).

---

## 1. Prerequisites

Install these once:

| Tool                                      | Version | Check           |
| ----------------------------------------- | ------- | --------------- |
| [Git](https://git-scm.com/)               | latest  | `git --version` |
| [Bun](https://bun.sh/)                    | 1.4.x   | `bun -v`        |
| [VS Code](https://code.visualstudio.com/) | latest  | —               |

Recommended VS Code extensions: **ESLint**, **Prettier – Code formatter**, **Tailwind CSS IntelliSense**.

Set your Git identity (use the same email as your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## 2. Get the project running

```bash
git clone https://github.com/Hope-Internship-Team-1/star-employee.git
cd star-employee
git checkout dev
bun install
cp .env.example .env        # PowerShell: Copy-Item .env.example .env
bun run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

---

## 3. Branches

| Branch                          | Purpose               | Can I push to it?          |
| ------------------------------- | --------------------- | -------------------------- |
| `main`                          | Production-ready code | ❌ No — PR from `dev` only |
| `dev`                           | Integration branch    | ❌ No — PR only            |
| `feature/<module>-<short-name>` | Your work             | ✅ Yes                     |
| `hotfix/<short-name>`           | Urgent production fix | ✅ Yes                     |

Branch name examples:

- `feature/m1-job-list-filters`
- `feature/m2-resume-editor`
- `feature/m3-apply-precheck`
- `feature/m4-career-classes`

---

## 4. Daily workflow

### 4.1 Start a new task

Always start from the latest `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/m2-resume-editor
```

### 4.2 Write code

- No hard-coded user-facing text: use the EN/ID language packs.
- No Chinese characters anywhere in the code (lint will fail).
- No secrets in code: use `.env` (never commit it).
- Uploads always go through the backend policy endpoint.

### 4.3 Check before you commit

Run all four. **All must pass**, or CI will fail on your PR:

```bash
bun run format        # auto-fix formatting
bun run lint          # code rules
bun run test          # unit tests
bun run build         # type check + production build
```

### 4.4 Commit

Commit messages are in **English**, using this format:

```
<type>: <short summary>
```

| Type       | Use for                                |
| ---------- | -------------------------------------- |
| `feat`     | New feature                            |
| `fix`      | Bug fix                                |
| `docs`     | Documentation only                     |
| `style`    | Formatting, no logic change            |
| `refactor` | Code change without new feature or fix |
| `test`     | Adding or changing tests               |
| `chore`    | Setup, config, dependencies            |

```bash
git add .
git status                      # check: no node_modules, dist or .env
git commit -m "feat: add education module form to resume editor"
```

Commit small and often. One commit = one logical change.

### 4.5 Push

```bash
git push -u origin feature/m2-resume-editor    # first push of a new branch
git push                                       # later pushes
```

---

## 5. Open a pull request

1. Go to the repository on GitHub → **Pull requests** → **New pull request**.
2. Set **base: `dev`** ← **compare: your feature branch**.
3. Title: same format as a commit, e.g. `feat: resume editor – education module`.
4. Description: copy this template and fill it in.

```markdown
## What

- Short list of what changed

## Module

M1 / M2 / M3 / M4

## How tested

- [ ] `bun run lint` passes
- [ ] `bun run test` passes
- [ ] `bun run build` passes
- [ ] Checked in the browser in **EN** and **ID**

## Screenshots

(paste UI screenshots here)
```

5. Click **Create pull request**.
6. Add a reviewer (right sidebar → **Reviewers**).

---

## 6. CI (automatic checks)

Every PR to `dev` or `main` runs three checks in order:

| Check   | Runs                                    | Fails when                         |
| ------- | --------------------------------------- | ---------------------------------- |
| `lint`  | `bun run lint` + `bun run format:check` | ESLint error or file not formatted |
| `test`  | `bun run test`                          | A unit test fails                  |
| `build` | `bun run build`                         | TypeScript error or build error    |

See the results in your PR under **Checks**, or in the **Actions** tab.

- ✅ All green → ready for review and merge.
- ❌ Something red → click **Details**, read the error, fix it on your branch, commit and push again. CI re-runs automatically.

---

## 7. Review and merge

A PR can be merged only when:

- all three checks are ✅ green, **and**
- at least **1 approval** from a reviewer, **and**
- the branch is up to date with `dev`.

If GitHub says the branch is out of date, click **Update branch** on the PR page.

If new commits are pushed after approval, the approval is removed and the PR needs a new review.

When everything is green, click **Merge pull request**, then **Delete branch**.

### Reviewing someone else's PR

1. Open the PR → **Files changed**.
2. Read the code; leave comments on specific lines if needed.
3. **Review changes** → **Approve** (or **Request changes**), and write **why** you approved.

---

## 8. After your PR is merged

```bash
git checkout dev
git pull
git branch -d feature/m2-resume-editor
```

Then start the next task from step 4.1.

---

## 9. Troubleshooting

| Problem                                     | Fix                                                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `bun: command not found`                    | Install Bun, then restart the terminal                                                                                |
| `git push` to `dev`/`main` is rejected      | Expected: protected branch. Push to a `feature/*` branch and open a PR                                                |
| CI `lint` fails on formatting               | Run `bun run format`, commit, push                                                                                    |
| CI fails on `bun install --frozen-lockfile` | Run `bun install` locally and commit the updated `bun.lock`                                                           |
| Merge button is grey                        | Check: CI green? 1 approval? Branch up to date?                                                                       |
| Merge conflict                              | `git checkout dev && git pull && git checkout <your-branch> && git merge dev`, fix conflicts in VS Code, commit, push |
| Accidentally committed `.env`               | Tell the team lead immediately; the secret must be rotated                                                            |

---

## 10. Scripts

| Command                | What it does                            |
| ---------------------- | --------------------------------------- |
| `bun run dev`          | Start the dev server                    |
| `bun run build`        | Type check and build for production     |
| `bun run preview`      | Preview the production build            |
| `bun run lint`         | Run ESLint                              |
| `bun run format`       | Format all files with Prettier          |
| `bun run format:check` | Check formatting without changing files |
| `bun run test`         | Run unit tests (Vitest)                 |
