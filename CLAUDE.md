# CLAUDE.md: Mood Tracker (Personal PWA)

## What this project is
A private, single-user mood tracking Progressive Web App for one Android phone (Chrome), hosted on GitHub Pages. The full spec is in `docs/prd-mood-tracker.md`. **Read it before making any change.** It is the source of truth.

## About the owner
Kop is a translator, not a developer. Explain what you did in plain language, avoid unexplained jargon, and never assume command-line git knowledge. Kop reviews changes and commits with GitHub Desktop.

## Hard rules
- Plain HTML, CSS, and JavaScript only. No frameworks, no bundlers, no build step, no npm dependencies required to run the app, no CDNs or external fonts.
- Do not add anything listed under "Out of Scope" in the PRD unless Kop explicitly asks.
- All data stays on the device. No network requests except loading the app's own files. No analytics or tracking.
- The GitHub repo is **public**. Never read, create, or commit real mood entries, journal text, or backup files. For testing, use clearly fake sample data only.
- Never commit `mood-backup-*.json`, `mood-export-*.csv`, or a `backups/` folder (they must stay in `.gitignore`). Do NOT ignore all `*.json`, because `manifest.json` is required.
- Use relative paths only (no leading `/`), because GitHub Pages serves the app under `/<repo-name>/`.
- All UI text lives in `i18n.js`, in both English (default) and Thai. Mood entries store mood IDs, never display text.
- If the stored data shape changes, keep old backups importable: increase `schemaVersion`, add a migration, and call this out clearly.
- Bump the service worker cache version on every release.
- Keep it simple. Prefer small, readable code with short comments over clever abstractions.

## How to work
1. Read the PRD and this file first.
2. For anything non-trivial, state a short plan and wait for Kop's OK before editing files.
3. Work on one stage or feature at a time. Do not build ahead of what was asked.
4. Run the app with a simple local static server to check your work (service workers need `localhost` or HTTPS). Tell Kop the address to open.
5. After each task, report in plain language: what changed, which files were touched, and how Kop can check it (on the PC and on the phone).
6. Do not run git commit or git push. Kop does this in GitHub Desktop after reviewing the changed files.
7. If the PRD is unclear or conflicts with a request, ask Kop instead of guessing.

## Definition of done for any change
- Works offline after first load.
- Works in both English and Thai, and in both Light and Dark themes.
- Does not break existing backups or the Export/Import features.
- Does not add personal data or backup files to the repo.
