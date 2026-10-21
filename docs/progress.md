# Progress Tracker: Mood Tracker

> Maintained by Claude Code. Source of truth for what the app should do: `docs/prd-mood-tracker.md`.
>
> **Rules**
> - **AI status** is filled by Claude Code: `Not started`, `In progress`, `Done (tested)`, or `Blocked`. Use `Done (tested)` only if it was actually tested, and say how in the Notes column.
> - **Kop verified** is filled **only by Kop** after testing on the real Android phone. Claude Code must never tick it.
> - Update this file at the end of every stage, in the same commit as the work.

## Requirements

| REQ | Requirement (short) | Stage | AI status | Notes | Kop verified |
|---|---|---|---|---|---|
| REQ-1 | 24 fixed mood words in 4 zones | 2 | Not started | | [ ] |
| REQ-2 | Stable mood IDs; store ID, never display text | 1, 2 | In progress | Stage 1 part: entries store `moodId` only (read in app.js). The mood list itself comes in Stage 2. Not run by me. | [ ] |
| REQ-3 | No numeric mood score | all | Not started | | [ ] |
| REQ-4 | No custom mood words in v1 | all | Not started | | [ ] |
| REQ-5 | Zone buttons first, then that zone's words | 2 | Not started | | [ ] |
| REQ-6 | Save step: word, optional journal, collapsed date/time, Save | 2 | Not started | | [ ] |
| REQ-7 | Date/time defaults to now; backdating allowed; no future | 2 | Not started | | [ ] |
| REQ-8 | Multiple check-ins per day | 2 | Not started | | [ ] |
| REQ-9 | Entry fields stored (id, zone, moodId, timestamp, journal, tags, createdAt, updatedAt) | 1, 2 | In progress | Stage 1 part: IndexedDB store and add function with all 8 fields exist in app.js (code read). Not yet exercised with fake data; first real use is Stage 2. | [ ] |
| REQ-10 | Journal never used in any calculation or color | 2 to 4 | Not started | | [ ] |
| REQ-11 | History with Timeline / Calendar switch | 3 | Not started | | [ ] |
| REQ-12 | Timeline grouped by day, newest first | 3 | Not started | | [ ] |
| REQ-13 | Calendar day color = zone of latest entry (by timestamp) | 4 | Not started | | [ ] |
| REQ-14 | Zone glyph on each day; Light and Dark palettes readable | 4 | Not started | | [ ] |
| REQ-15 | Tap a day to see its entries, with prev/next day | 4 | Not started | | [ ] |
| REQ-16 | Edit and delete entries | 3 | Not started | | [ ] |
| REQ-17 | Delete needs confirmation | 3 | Not started | | [ ] |
| REQ-18 | Editing updates updatedAt and recolors calendar | 3 | Not started | | [ ] |
| REQ-19 | Local storage only; no network except own files | 1 | Done (tested) | Code read: no fetch/XHR/external URLs; data is in IndexedDB + localStorage. Kop confirmed on PC (localhost:8080) the app runs fully offline. | [ ] |
| REQ-20 | Request persistent storage; show status in Settings | 1 | In progress | Code asks for persistent storage on launch (app.js). I did not check whether Chrome grants it or that Settings shows the status. Needs the phone. | [ ] |
| REQ-21 | Settings data-loss warning | 5 | Not started | | [ ] |
| REQ-22 | Export JSON (`mood-backup-YYYY-MM-DD.json`) | 5 | Not started | | [ ] |
| REQ-23 | Export CSV (UTF-8 with BOM, correct escaping) | 5 | Not started | | [ ] |
| REQ-24 | Import JSON: validate, merge, skip existing ids, show summary | 5 | Not started | | [ ] |
| REQ-25 | Backup reminder banner (default 7 days, adjustable) | 5 | Not started | | [ ] |
| REQ-26 | EN default, switch to TH, remembered | 1 | Done (tested) | Kop tested on PC: EN/TH switching works with DevTools Offline on. Remembering after restart was not separately reported (code saves it in localStorage). | [ ] |
| REQ-27 | Gregorian dates in both languages; 24-hour time | 1 | Not started | No display date/time formatter yet (only an ISO helper in app.js). Needed once dates are shown (Stage 2/3). | [ ] |
| REQ-28 | Light/Dark toggle only; default Light; applied before first paint | 1 | Done (tested) | Kop tested on PC: Light/Dark switching works offline. Code sets the theme in index.html before first paint (read, flash not measured). | [ ] |
| REQ-29 | Journal text never translated | 2 | Not started | | [ ] |
| REQ-30 | Settings contents complete | 1, 5 | In progress | Stage 1 part only: language, theme, storage section, data-loss warning and app version are in Settings. Backup/export/import items come in Stage 5. | [ ] |
| REQ-31 | Installable on Android Chrome | 1 | In progress | manifest.json and both icons are present with standalone display (read). Installing on Android not tested; needs the phone over HTTPS. | [ ] |
| REQ-32 | Works offline; cache version string bumped each release | 1 | Done (tested) | Kop tested on PC: with Offline ticked the app opens and works; cache mood-tracker-v1 holds all 8 files. This is the first release so v1 stays; bump-on-update not yet exercised. Phone not tested. | [ ] |
| REQ-33 | Relative paths only (GitHub Pages sub-path) | 1 | In progress | All paths in sw.js, manifest.json and index.html are relative (read). Only run at localhost root, not yet under the GitHub Pages sub-path. | [ ] |
| REQ-34 | No PIN/lock screen | all | Not started | | [ ] |
| REQ-35 | No analytics, CDNs, external fonts, or third-party scripts | all | Not started | | [ ] |
| REQ-36 | `.gitignore` for backup/export files; `manifest.json` not ignored | 1 | Done (tested) | .gitignore lists mood-backup-*.json, mood-export-*.csv and backups/; manifest.json is not ignored (checked). git status is clean, no personal files in the repo. | [ ] |
| REQ-37 | Plain HTML/CSS/JS, no build step | all | Not started | | [ ] |
| REQ-38 | Suggested file layout | 1 | Done (tested) | Checked the file list: index.html, style.css, app.js, i18n.js, manifest.json, sw.js, icons/, .gitignore, README.md, CLAUDE.md and both docs files exist. Extra: serve.ps1 (local test server). | [ ] |
| REQ-39 | Mobile-first layout | 1 onward | In progress | Mobile-first CSS present; only seen on PC by Kop so far. Phone not tested. | [ ] |
| REQ-40 | Local server testing; deploy by Claude Code push to GitHub Pages | 1 | In progress | Local server (serve.ps1) works per Kop. Push is part of this commit; I have not checked the GitHub Pages result. | [ ] |
| REQ-41 | README for a non-developer | 1, 6 | In progress | README covers running locally, phone test and release. Reviewing history/undoing in GitHub Desktop is still to be added (Stage 6). | [ ] |

## Definition of Done checks (final, on a real Android phone)

| # | Check | AI status | Kop verified |
|---|---|---|---|
| 1 | Installs to home screen and opens standalone with icon and name | Not started | [ ] |
| 2 | Airplane mode: installed app opens and all features work | Not started | [ ] |
| 3 | Check-in in at most 3 taps; entry appears in timeline immediately | Not started | [ ] |
| 4 | Empty journal saves; multi-line journal keeps line breaks | Not started | [ ] |
| 5 | Backdated entry lands on the correct day; future date cannot be chosen | Not started | [ ] |
| 6 | Calendar color follows latest entry; later-saved earlier-time entry does not change it | Not started | [ ] |
| 7 | Editing changes calendar and timeline at once; delete asks for confirmation | Not started | [ ] |
| 8 | EN/TH switch changes all text and old entries' mood words; dates stay Gregorian | Not started | [ ] |
| 9 | Light/Dark persists after closing; calendar readable in both | Not started | [ ] |
| 10 | Export JSON, clear site data, import restores everything | Not started | [ ] |
| 11 | Importing the same file twice adds nothing and overwrites nothing | Not started | [ ] |
| 12 | Invalid import file shows an error and changes nothing | Not started | [ ] |
| 13 | CSV opens in Excel/Sheets with Thai intact; commas, quotes, line breaks stay in one cell | Not started | [ ] |
| 14 | Backup banner appears when overdue and disappears after JSON export | Not started | [ ] |
| 15 | Settings shows persistent-storage status and the data-loss warning | Not started | [ ] |
| 16 | New push with bumped cache version reaches the installed app after a reload or two | Not started | [ ] |
| 17 | Repository has no entries or backup files; `.gitignore` in place | Not started | [ ] |
| 18 | Claude Code commits and pushes by itself; history and undo visible in GitHub Desktop | Not started | [ ] |
| 19 | This progress file keeps the AI and Kop columns separate | Not started | [ ] |
