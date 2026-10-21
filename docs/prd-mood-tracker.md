# PRD: Personal Mood Tracker (PWA)

> Written for: Kop (owner, translator, not a developer) and for an AI coding agent (Claude Code) that will build it.
> Status: v1.1 spec, decisions locked through a design interview. Items marked **[Default]** were chosen by the assistant and can be changed.
> Changelog: v1.1 added the Development Pipeline & Tools section, the Claude Project workflow, and related requirements and checks.

## Overview

A private, single-user mood tracking app for one person's Android phone. The user quickly checks in with a specific feeling word (e.g. "Anxious", "Calm"), optionally writes a short journal note, and later reviews everything on a timeline and a color-coded monthly calendar. All data stays on the phone. The app is a Progressive Web App (PWA): a web page hosted on GitHub Pages that can be installed to the home screen and works offline.

It takes inspiration from Daylio (fast check-in, calendar overview) and Reflectly/Stoic (a journal attached to the check-in), but is deliberately simpler and fully private.

## Goals

- Check-in takes seconds: pick a zone, pick a word, save.
- A journal note is available on every check-in but is never required and never affects any score or summary.
- The monthly calendar shows mood patterns at a glance.
- Data never leaves the phone, and is easy to back up and restore.
- UI in English by default, switchable to Thai, with Light/Dark themes.
- Simple enough to host free on GitHub Pages and maintain without build tools.

## Who It's For

Only the owner (Kop), on one Android phone (Chrome). No accounts, no sharing, no other users.

## Core Requirements

### A. Mood model

- REQ-1: Moods are specific feeling words from a **fixed built-in list** (24 words, see Appendix A), grouped into **4 zones**: Bright, Stressed, Low, Calm. Each zone has 6 words.
- REQ-2: Each mood word has a stable internal ID (e.g. `anxious`). Entries store the ID, never the displayed text, so changing the language or renaming a word later does not affect old data.
- REQ-3: No numeric mood score exists. Zones are the only aggregation unit (used for calendar colors).
- REQ-4: Users cannot add or edit mood words in v1 (planned for a later version).

### B. Check-in flow

- REQ-5: The Check-in screen first shows 4 large zone buttons. Tapping a zone shows that zone's 6 words. Tapping a word selects it.
- REQ-6: After a word is selected, the user sees a save step containing: the selected word, an **optional** multi-line journal field, a collapsed "Change date/time" control, and a Save button. Journal text may be empty.
- REQ-7: Date/time defaults to "now". The "Change date/time" control is collapsed by default and allows picking any past date and time (backfilling). Future date/times are not allowed.
- REQ-8: Multiple check-ins per day are allowed, with no limit.
- REQ-9: Each saved entry stores: `id` (unique), `zone`, `moodId`, `timestamp` (the user-visible date/time), `journal` (string, may be empty), `tags` (array, always empty in v1, reserved for future activity tags), `createdAt`, `updatedAt`.
- REQ-10: The journal is stored with the entry and is never used in any calculation, color, or summary. It is read-only context when reviewing history.

### C. Review: timeline and calendar

- REQ-11: The History screen has two views the user can switch between: **Timeline** and **Calendar**.
- REQ-12: Timeline lists entries grouped by day, newest day first, newest entry first within a day. Each row shows time, zone indicator, mood word, and the journal text if present (long text truncated with expand on tap).
- REQ-13: Calendar shows one month at a time with previous/next month navigation. Each day cell is colored by the zone of that day's **latest entry**, where "latest" means the greatest `timestamp` (the time set on the entry, not the order it was saved). If two entries share the same timestamp, the later `createdAt` wins. Days with no entry use a neutral color.
- REQ-14: Color must never be the only signal: each colored day cell also shows a small zone glyph/letter. Colors are defined in two palettes (Light and Dark), both with readable contrast.
- REQ-15: Tapping a day opens that day's entries (same layout as Timeline, only that day), with previous/next day navigation.

### D. Edit and delete

- REQ-16: Any entry can be edited (mood word, zone, journal, date/time) or deleted from the timeline or day view.
- REQ-17: Deleting requires an explicit confirmation step. Deleted entries cannot be recovered except via a backup file.
- REQ-18: Editing updates `updatedAt` and recomputes calendar colors immediately.

### E. Data storage and backup

- REQ-19: All data is stored locally in the browser on the device (IndexedDB recommended). No data is ever sent to any server, and the app makes no network requests other than loading its own files.
- REQ-20: On first launch the app requests persistent storage (`navigator.storage.persist()`), and Settings shows whether it was granted.
- REQ-21: Settings contains a clear warning: clearing Chrome's site data for this app will permanently delete all entries; back up first.
- REQ-22: **Export JSON** (the real backup): includes `schemaVersion`, `exportedAt`, all entries (including the `tags` field), and settings. File name pattern: `mood-backup-YYYY-MM-DD.json`.
- REQ-23: **Export CSV** (read-only, for Excel/Google Sheets): one row per entry, columns `id, date, time, zone, mood_en, mood_th, journal, tags`. Must be UTF-8 with BOM so Thai text opens correctly in Excel, and must correctly escape commas, quotes, and line breaks inside journal text. File name pattern: `mood-export-YYYY-MM-DD.csv`. CSV cannot be imported back.
- REQ-24: **Import JSON**: merges into existing data. Entries whose `id` already exists are skipped (existing data is never overwritten or deleted). Before merging, validate the file (schema version, required fields); invalid files are rejected with a clear message and no changes. After import, show a result summary (X added, Y skipped).
- REQ-25: **Backup reminder banner**: on app open, if the last JSON export is older than N days (default **7**, adjustable in Settings), or entries exist but no export has ever been done, show a banner at the top with a "Back up now" button. The banner can be dismissed for the current session. Updating `lastBackupAt` happens only when a JSON export completes. No push notifications.

### F. Language, theme, and settings

- REQ-26: UI language is **English by default**, switchable to **Thai** in Settings. All UI text, zone names, and mood words exist in both languages, and the choice is remembered.
- REQ-27: Dates use the Gregorian calendar (ค.ศ.) in both languages, e.g. "21 Oct 2026" / "21 ต.ค. 2026". Times use 24-hour format. **[Default]**
- REQ-28: Theme toggle with exactly two states: **Light** and **Dark** (no "follow system"). Default is Light. The saved theme must be applied before the first paint to avoid a flash.
- REQ-29: Journal text is never translated; the user may type in any language.
- REQ-30: Settings screen contains: language, theme, backup reminder interval, Export JSON, Export CSV, Import JSON, persistent-storage status, data-loss warning, app version.

### G. PWA and offline

- REQ-31: The app is installable on Android Chrome (valid `manifest.json`, icons 192 and 512 px, `display: standalone`, theme color).
- REQ-32: The app works fully offline after first load (service worker caches all app files). The cache uses a **version string** that is bumped on every release so installed copies update after a new deploy.
- REQ-33: All file paths must be **relative** (not starting with `/`), because GitHub Pages serves the project under a sub-path (`/repo-name/`). `start_url` and service worker scope must work under that sub-path.

### H. Privacy and security

- REQ-34: No lock/PIN screen in v1; the app relies on the phone's own screen lock. **[Decided]**
- REQ-35: No analytics, tracking, ads, external fonts, CDNs, or third-party scripts. All assets are bundled in the repo.
- REQ-36: The repository is public (required for free GitHub Pages). It must never contain personal data. Include a `.gitignore` covering `mood-backup-*.json`, `mood-export-*.csv`, and a `backups/` folder. (Do **not** ignore all `*.json`, because `manifest.json` is required.)

### I. Technical approach

- REQ-37: Plain HTML, CSS, and JavaScript only. No frameworks, no bundlers, no build step, no Node dependencies required to run the app.
- REQ-38: Suggested file layout: `index.html`, `style.css`, `app.js`, `i18n.js` (all UI text and mood words in EN/TH, kept as a simple readable data structure the owner can edit), `manifest.json`, `sw.js`, `icons/`, `.gitignore`, `README.md`, `CLAUDE.md` (short standing rules for Claude Code, see Development Pipeline), and `docs/prd-mood-tracker.md` (a copy of this PRD).
- REQ-39: Layout is mobile-first (phone portrait). It should remain usable on a desktop browser for development testing but is not optimized for it.
- REQ-40: Local testing must use a local web server (service workers need `localhost` or HTTPS). Deployment is by committing in **GitHub Desktop** and pushing to GitHub; GitHub Pages serves from the main branch. No command-line git should be required of the owner (see Development Pipeline & Tools).
- REQ-41: `README.md` must explain, in plain language for a non-developer: how to run the app locally, how to test on the phone, and the release steps (bump cache version, commit and push with GitHub Desktop, reload the installed app).

## Development Pipeline & Tools

### Tools

| Tool | Role |
|---|---|
| **Claude (Project)** | Planning and design partner. Holds this PRD, discusses feature changes, updates the PRD, and writes ready-to-paste prompts for Claude Code. Does not replace Claude Code for editing files. |
| **VS Code** (Windows PC) | Editor and project folder. Used to read files, run a local preview, and review what Claude Code changed. |
| **Claude Code** | Writes and edits the code inside the project folder, runs the local preview, and follows `CLAUDE.md` and this PRD. |
| **GitHub Desktop** | Visual tool for committing and pushing, so no git commands are needed. Used to review changes before each commit. |
| **GitHub + GitHub Pages** | Stores version history and hosts the app (public repo, free). |
| **Android phone (Chrome)** | Real-device testing and the only place real data lives. |
| Antigravity | Optional alternative editor/assistant. Not required. |

### Pipeline (one feature change)

1. **Plan in the Claude Project.** Describe the change. Claude checks it against this PRD (requirements, Out of Scope, data compatibility), asks clarifying questions one at a time, then updates the affected PRD section(s) and the changelog.
2. **Build in VS Code with Claude Code.** Paste the prompt prepared in step 1. Claude Code edits files in the project folder and starts the local preview. For riskier changes, work on a separate branch (create it in GitHub Desktop).
3. **Test locally.** Open the local preview on the PC, and check that nothing was broken (see Definition of Done).
4. **Review and commit in GitHub Desktop.** Read the list of changed files and the diff, confirm no data or backup files are included, write a clear commit message, then commit.
5. **Release.** Bump the service worker cache version, commit, then push (Push origin). On a branch, merge into `main` first. GitHub Pages updates in 1-2 minutes.
6. **Test on the phone.** Reload the installed app (once or twice, since the old cached version may show first) and confirm the change.
7. **Sync the PRD.** If the PRD changed, update `docs/prd-mood-tracker.md` in the repo and replace the copy in the Claude Project knowledge so both match.

### Standing rules for Claude Code (to be placed in `CLAUDE.md`)

- Read `docs/prd-mood-tracker.md` before making changes. Do not add anything listed under Out of Scope without being told.
- Plain HTML/CSS/JS only. No frameworks, no build step, no external dependencies, no CDNs.
- Never read, create, or commit real user data or backup files. Use clearly fake sample data for testing only.
- Any change to the stored data shape must keep old backups importable (increase `schemaVersion` and add a migration), and must be called out explicitly.
- Bump the service worker cache version on every release.
- Use relative paths only (GitHub Pages sub-path).
- Keep UI text only in `i18n.js`, in both English and Thai.
- After each task, summarize what changed in plain language and list the files touched, so the owner can review them in GitHub Desktop.

### Claude Project workflow

- The owner keeps one Claude Project for this app so each new feature or fix can be its own session (chat) with the PRD always available as context.
- Project setup (name, description, instructions) is kept in a separate file: `claude-project-setup.md`.
- The PRD is the single source of truth for what the app should do. Decisions made in a session that change behavior must be written back into the PRD, otherwise they are lost.

## Out of Scope (v1)

- Activity tags UI (only the empty `tags` field is reserved in the data)
- Statistics/graphs page (zone share, top feelings, time-of-day patterns)
- Editing or adding mood words and zones
- PIN lock or data encryption
- Cloud sync, accounts, or multi-device sync (PC is used only for development and testing; real data lives on the phone only)
- Push notifications or timed check-in reminders
- CSV import
- Buddhist Era (พ.ศ.) dates
- iOS-specific handling, native app store builds
- A numeric mood score of any kind

## Definition of Done

Verify on a real Android phone with Chrome, using the deployed GitHub Pages URL:

- [ ] App can be installed to the home screen and opens in standalone mode with its icon and name.
- [ ] With airplane mode on, the installed app opens and all features work.
- [ ] Check-in: pick zone, pick word, save in at most 3 taps (no journal), and the entry appears in the timeline immediately.
- [ ] Saving with an empty journal works; saving with a multi-line journal preserves line breaks.
- [ ] A backdated entry (e.g. yesterday 08:00) appears on the correct day; a future date/time cannot be chosen.
- [ ] Two entries on one day (08:00 Stressed, 21:00 Calm) show the day as Calm in the calendar. Adding a backdated 07:00 entry afterwards does not change that day's color.
- [ ] Editing an entry's mood changes calendar color and timeline immediately; deleting asks for confirmation and removes it.
- [ ] Switching EN/TH changes all UI text, zone names, and mood words, including those on previously saved entries; dates stay Gregorian.
- [ ] Light/Dark toggle works, persists after closing the app, and the calendar colors/glyphs are readable in both.
- [ ] Export JSON creates `mood-backup-YYYY-MM-DD.json`; after clearing the app's site data, importing that file restores all entries (including journal text and timestamps).
- [ ] Importing the same file twice adds nothing the second time (reports all skipped) and never overwrites existing entries.
- [ ] Importing an invalid file shows an error and changes nothing.
- [ ] Export CSV opens in Excel or Google Sheets with Thai text intact, and journal entries with commas, quotes, and line breaks stay in a single cell.
- [ ] Backup banner appears when last export is older than the configured days (test by setting 1 day or adjusting the stored date) and disappears after a JSON export.
- [ ] Settings shows persistent-storage status and the data-loss warning.
- [ ] After pushing a new version with a bumped cache version, the installed app picks up the update after a reload or two.
- [ ] The repository contains no entries or backup files, and `.gitignore` is in place.
- [ ] The owner can run the app locally, commit, and push using only VS Code, Claude Code, and GitHub Desktop (no manual git commands), by following `README.md`.
- [ ] `CLAUDE.md` exists in the repo root with the standing rules above, and `docs/prd-mood-tracker.md` matches the PRD in the Claude Project.

## Constraints

- **Platform:** Android phone (Chrome). Development on a Windows PC with VS Code, Claude Code, and GitHub Desktop (details in Development Pipeline & Tools). Antigravity is available as an alternative editor.
- **Hosting:** GitHub Pages (free tier, public repository, sub-path URL).
- **Cost:** zero (no paid services, no developer accounts).
- **Build:** none. Static files only.
- **Storage limit awareness:** browser local data can be lost if the user clears site data or uninstalls Chrome data, which is why backups and the reminder exist.
- **Privacy:** data stays on-device; repository is public but data-free.

## Open Questions

1. **Mood word list and Thai wording**: draft in Appendix A needs the owner's review before release.
2. **Zone colors**: exact palettes for Light and Dark are to be chosen by the builder and approved by the owner on a real phone.
3. **Save step**: this spec uses a save step after picking a word (so the journal is reachable). If check-ins feel slow, consider saving immediately on word tap with an "Add note" action afterwards.
4. **App name and icon**: to be decided (working name: "Mood Tracker").
5. **Repository name** (affects the final URL).
6. **Future**: custom mood words, activity tags, statistics page, optional sync, in that rough order of likely value.
7. **Keeping two copies of the PRD in sync** (repo copy and Claude Project copy) relies on the owner remembering step 7 of the pipeline. If this proves error-prone, consider treating the repo copy as the master and re-uploading it to the Project after every change.
8. **Branching habit**: whether to always use branches or commit straight to `main` for small changes is left to the owner's comfort with GitHub Desktop.

---

## Appendix A: Zones and mood words (draft, EN / TH)

Internal IDs shown in `code`.

**Zone: Bright / สดใส** (high energy, pleasant) `bright`
- `excited` Excited / ตื่นเต้น
- `happy` Happy / มีความสุข
- `proud` Proud / ภูมิใจ
- `cheerful` Cheerful / ร่าเริง
- `inspired` Inspired / มีแรงบันดาลใจ
- `playful` Playful / สนุกสนาน

**Zone: Stressed / เครียด** (high energy, unpleasant) `stressed`
- `anxious` Anxious / กังวล
- `angry` Angry / โกรธ
- `pressured` Pressured / รู้สึกกดดัน
- `irritated` Irritated / หงุดหงิด
- `overwhelmed` Overwhelmed / รับมือไม่ไหว
- `restless` Restless / กระสับกระส่าย

**Zone: Low / หม่นหมอง** (low energy, unpleasant) `low`
- `sad` Sad / เศร้า
- `tired` Tired / เหนื่อย
- `lonely` Lonely / เหงา
- `bored` Bored / เบื่อ
- `discouraged` Discouraged / ท้อแท้
- `empty` Empty / ว่างเปล่า

**Zone: Calm / สงบ** (low energy, pleasant) `calm`
- `calm` Calm / สงบ
- `relieved` Relieved / โล่งใจ
- `content` Content / พึงพอใจ
- `peaceful` Peaceful / สบายใจ
- `grateful` Grateful / รู้สึกขอบคุณ
- `relaxed` Relaxed / ผ่อนคลาย

## Appendix B: Data shapes (reference)

```json
{
  "schemaVersion": 1,
  "exportedAt": "2026-10-21T21:40:00+07:00",
  "settings": { "language": "en", "theme": "light", "backupReminderDays": 7 },
  "entries": [
    {
      "id": "b3f1c2e0-...",
      "zone": "stressed",
      "moodId": "anxious",
      "timestamp": "2026-10-20T21:40:00+07:00",
      "journal": "Meeting went badly...",
      "tags": [],
      "createdAt": "2026-10-20T21:41:12+07:00",
      "updatedAt": "2026-10-20T21:41:12+07:00"
    }
  ]
}
```
