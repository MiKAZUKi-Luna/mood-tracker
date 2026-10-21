# Mood Tracker

A private mood tracking app for one Android phone. It is a web page that can be installed to the home screen and works offline. All data stays on the phone. The full spec is in `docs/prd-mood-tracker.md`.

## Run it on your PC

The app needs a small local web server (opening `index.html` by double-clicking will not work properly). The file `serve.ps1` is a tiny server that needs nothing installed.

1. Open a terminal in this folder (in VS Code: Terminal > New Terminal).
2. Run:

   ```
   powershell -ExecutionPolicy Bypass -File serve.ps1
   ```

3. Open `http://localhost:8080` in Chrome.
4. Press `Ctrl+C` in the terminal to stop the server.

## Test on your phone

The installed app and offline mode only work over HTTPS, so the real test is on the deployed GitHub Pages address (see "Release" below):

1. Open the GitHub Pages address in Chrome on your phone.
2. Chrome menu (three dots) > "Install app" or "Add to Home screen".
3. Open it from the home screen. Turn on airplane mode and open it again to check it works offline.

## Release

1. Open `sw.js` and change the number in `CACHE_VERSION` (for example `mood-tracker-v1` to `mood-tracker-v2`). Do this on every release, otherwise phones keep showing the old version.
2. In GitHub Desktop, look at the changed files. Make sure no backup or export files are listed.
3. Write a short summary, click "Commit to main", then click "Push origin".
4. Wait 1-2 minutes for GitHub Pages to update.
5. On the phone, open the installed app and reload it once or twice (the old version may show first).

## Privacy

This repository is public. Never put real mood entries, journal text, or backup files in it. Files named `mood-backup-*.json` and `mood-export-*.csv` are ignored automatically.
