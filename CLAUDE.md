# CLAUDE.md: Mood Tracker (Personal PWA)

## What this project is
A private, single-user mood tracking Progressive Web App for one Android phone (Chrome), hosted on GitHub Pages. The full spec is in `docs/prd-mood-tracker.md`. **Read it before making any change.** It is the source of truth.

## About the owner
Kop is a translator, not a developer. Explain what you did in plain language, avoid unexplained jargon, and never assume command-line git knowledge. Kop checks your work later: on the real phone, and by browsing commit history in GitHub Desktop.

## Hard rules
- Plain HTML, CSS, and JavaScript only. No frameworks, no bundlers, no build step, no npm dependencies required to run the app, no CDNs or external fonts.
- Do not add anything listed under "Out of Scope" in the PRD unless Kop explicitly asks.
- All data stays on the device. No network requests except loading the app's own files. No analytics or tracking.
- The GitHub repo is **public**. Never read, create, or commit real mood entries, journal text, or backup files. For testing, use clearly fake sample data only.
- Never commit `mood-backup-*.json`, `mood-export-*.csv`, or a `backups/` folder (they must stay in `.gitignore`). Do NOT ignore all `*.json`, because `manifest.json` is required.
- Use relative paths only (no leading `/`), because GitHub Pages serves the app under `/<repo-name>/`.
- All UI text lives in `i18n.js`, in both English (default) and Thai. Mood entries store mood IDs, never display text.
- If the stored data shape changes, keep old backups importable: increase `schemaVersion`, add a migration, and call this out clearly.
- Bump the service worker cache version whenever app files change.
- Keep it simple. Prefer small, readable code with short comments over clever abstractions.

## How to work
1. Read the PRD, `docs/progress.md`, and this file first.
2. Work on one stage at a time (the stage list is in the PRD and `docs/progress.md`). Do not build ahead of the stage you were asked to do.
3. Start with a short plan in the chat, then go ahead without waiting for approval, as long as the plan stays inside the PRD. **Stop and ask Kop** only if: the PRD is unclear or conflicts with the request; the work would change the stored data shape; the work would add something listed under Out of Scope; or a command would delete files outside the project folder.
4. Run the app with a simple local static server to check your work (service workers need `localhost` or HTTPS). Test what you built before committing, using fake sample data.
5. When a stage is finished and tested, do the Git steps below, then update progress, then stop. Do not start the next stage until Kop asks.

## Git: you commit and push (Kop reviews afterwards)
- Run `git status` before every commit. **Stop and tell Kop** if any `mood-backup-*.json`, `mood-export-*.csv`, `backups/` content, or any file that looks like personal data appears.
- Commit only after your local tests pass. Use a plain-language message that starts with the stage, e.g. `Stage 2: check-in flow with optional journal`.
- Bump the service worker cache version before committing if any app file changed.
- Push to `main` on `origin`. GitHub Pages then updates within 1-2 minutes.
- Never force-push, rewrite history, run `git reset --hard`, or delete branches.
- If push fails (for example a login or permission problem), stop and tell Kop exactly what happened. Never put passwords or tokens in any file, and never ask Kop to paste credentials into chat.

## Progress tracking
- Update `docs/progress.md` at the end of every stage, in the same commit as the work.
- Fill only the **AI status** and **Notes** columns. Mark `Done (tested)` only if you actually tested it, and say how in Notes. Use `In progress` or `Blocked` honestly.
- Never tick the **Kop verified** column. Only Kop does that, after testing on the real phone.

## End-of-stage report (in plain language)
- What changed, and which files were touched.
- The status of every requirement the stage covered (Done (tested), Partly done, or Not done), with one line on how Kop can check each.
- What Kop should test on the real Android phone.
- The commit message and whether the push succeeded.
- Anything you were unsure about or skipped.

## Definition of done for any change
- Works offline after first load.
- Works in both English and Thai, and in both Light and Dark themes.
- Does not break existing backups or the Export/Import features.
- Does not add personal data or backup files to the repo.
