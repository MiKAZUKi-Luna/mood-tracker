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
| REQ-2 | Stable mood IDs; store ID, never display text | 1, 2 | Not started | | [ ] |
| REQ-3 | No numeric mood score | all | Not started | | [ ] |
| REQ-4 | No custom mood words in v1 | all | Not started | | [ ] |
| REQ-5 | Zone buttons first, then that zone's words | 2 | Not started | | [ ] |
| REQ-6 | Save step: word, optional journal, collapsed date/time, Save | 2 | Not started | | [ ] |
| REQ-7 | Date/time defaults to now; backdating allowed; no future | 2 | Not started | | [ ] |
| REQ-8 | Multiple check-ins per day | 2 | Not started | | [ ] |
| REQ-9 | Entry fields stored (id, zone, moodId, timestamp, journal, tags, createdAt, updatedAt) | 1, 2 | Not started | | [ ] |
| REQ-10 | Journal never used in any calculation or color | 2 to 4 | Not started | | [ ] |
| REQ-11 | History with Timeline / Calendar switch | 3 | Not started | | [ ] |
| REQ-12 | Timeline grouped by day, newest first | 3 | Not started | | [ ] |
| REQ-13 | Calendar day color = zone of latest entry (by timestamp) | 4 | Not started | | [ ] |
| REQ-14 | Zone glyph on each day; Light and Dark palettes readable | 4 | Not started | | [ ] |
| REQ-15 | Tap a day to see its entries, with prev/next day | 4 | Not started | | [ ] |
| REQ-16 | Edit and delete entries | 3 | Not started | | [ ] |
| REQ-17 | Delete needs confirmation | 3 | Not started | | [ ] |
| REQ-18 | Editing updates updatedAt and recolors calendar | 3 | Not started | | [ ] |
| REQ-19 | Local storage only; no network except own files | 1 | Not started | | [ ] |
| REQ-20 | Request persistent storage; show status in Settings | 1 | Not started | | [ ] |
| REQ-21 | Settings data-loss warning | 5 | Not started | | [ ] |
| REQ-22 | Export JSON (`mood-backup-YYYY-MM-DD.json`) | 5 | Not started | | [ ] |
| REQ-23 | Export CSV (UTF-8 with BOM, correct escaping) | 5 | Not started | | [ ] |
| REQ-24 | Import JSON: validate, merge, skip existing ids, show summary | 5 | Not started | | [ ] |
| REQ-25 | Backup reminder banner (default 7 days, adjustable) | 5 | Not started | | [ ] |
| REQ-26 | EN default, switch to TH, remembered | 1 | Not started | | [ ] |
| REQ-27 | Gregorian dates in both languages; 24-hour time | 1 | Not started | | [ ] |
| REQ-28 | Light/Dark toggle only; default Light; applied before first paint | 1 | Not started | | [ ] |
| REQ-29 | Journal text never translated | 2 | Not started | | [ ] |
| REQ-30 | Settings contents complete | 1, 5 | Not started | | [ ] |
| REQ-31 | Installable on Android Chrome | 1 | Not started | | [ ] |
| REQ-32 | Works offline; cache version string bumped each release | 1 | Not started | | [ ] |
| REQ-33 | Relative paths only (GitHub Pages sub-path) | 1 | Not started | | [ ] |
| REQ-34 | No PIN/lock screen | all | Not started | | [ ] |
| REQ-35 | No analytics, CDNs, external fonts, or third-party scripts | all | Not started | | [ ] |
| REQ-36 | `.gitignore` for backup/export files; `manifest.json` not ignored | 1 | Not started | | [ ] |
| REQ-37 | Plain HTML/CSS/JS, no build step | all | Not started | | [ ] |
| REQ-38 | Suggested file layout | 1 | Not started | | [ ] |
| REQ-39 | Mobile-first layout | 1 onward | Not started | | [ ] |
| REQ-40 | Local server testing; deploy by Claude Code push to GitHub Pages | 1 | Not started | | [ ] |
| REQ-41 | README for a non-developer | 1, 6 | Not started | | [ ] |

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
