// Mood Tracker: app shell, settings, and local storage (IndexedDB).

const APP_VERSION = "0.1.0 (Stage 1)";

/* ---------- Small settings (saved in localStorage) ---------- */

function getSetting(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    return fallback;
  }
}
function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

let currentLang = getSetting("language", "en") === "th" ? "th" : "en";
let currentTheme = getSetting("theme", "light") === "dark" ? "dark" : "light";
let storageState = "checking"; // checking | granted | notGranted | unsupported

/* ---------- Screen text, language, theme ---------- */

// Fill every element that has a data-i18n attribute with text in the current language
function applyLanguage() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(currentLang, el.dataset.i18n);
  });
  document.title = t(currentLang, "appName");
  document.querySelectorAll("#language-switch button").forEach(function (btn) {
    btn.setAttribute("aria-pressed", btn.dataset.lang === currentLang);
  });
  renderStorageStatus();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = currentTheme === "dark" ? "#14161a" : "#ffffff";
  document.querySelectorAll("#theme-switch button").forEach(function (btn) {
    btn.setAttribute("aria-pressed", btn.dataset.themeValue === currentTheme);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  saveSetting("language", lang);
  applyLanguage();
}
function setTheme(theme) {
  currentTheme = theme;
  saveSetting("theme", theme);
  applyTheme();
}

/* ---------- Bottom navigation ---------- */

function showTab(name) {
  document.querySelectorAll(".screen").forEach(function (screen) {
    screen.hidden = screen.id !== "screen-" + name;
  });
  document.querySelectorAll(".tab").forEach(function (tab) {
    if (tab.dataset.tab === name) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

/* ---------- Persistent storage request (REQ-20) ---------- */

function renderStorageStatus() {
  const keys = {
    checking: "storageChecking",
    granted: "storageGranted",
    notGranted: "storageNotGranted",
    unsupported: "storageUnsupported"
  };
  document.getElementById("storage-status").textContent = t(currentLang, keys[storageState]);
}

async function requestPersistentStorage() {
  if (!navigator.storage || !navigator.storage.persist) {
    storageState = "unsupported";
  } else {
    try {
      let granted = await navigator.storage.persisted();
      if (!granted) granted = await navigator.storage.persist();
      storageState = granted ? "granted" : "notGranted";
    } catch (e) {
      storageState = "notGranted";
    }
  }
  renderStorageStatus();
}

/* ---------- Entry storage (IndexedDB) ----------
   Entry shape (PRD Appendix B):
   { id, zone, moodId, timestamp, journal, tags, createdAt, updatedAt }
   No screen uses these yet. */

const DB_NAME = "mood-tracker";
const DB_VERSION = 1;
const STORE = "entries";

let dbPromise = null;

function openDb() {
  if (!dbPromise) {
    dbPromise = new Promise(function (resolve, reject) {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = function () {
        const store = request.result.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp");
      };
      request.onsuccess = function () { resolve(request.result); };
      request.onerror = function () { reject(request.error); };
    });
  }
  return dbPromise;
}

// Run one request on the entries store and wait for it to finish
async function runOnStore(mode, action) {
  const db = await openDb();
  return new Promise(function (resolve, reject) {
    const tx = db.transaction(STORE, mode);
    const request = action(tx.objectStore(STORE));
    tx.oncomplete = function () { resolve(request ? request.result : undefined); };
    tx.onerror = function () { reject(tx.error); };
    tx.onabort = function () { reject(tx.error); };
  });
}

// Current time as text with the local UTC offset, e.g. 2026-10-20T21:40:00+07:00
function nowIso(date) {
  const d = date || new Date();
  const pad = function (n) { return String(n).padStart(2, "0"); };
  const offset = -d.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
    "T" + pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds()) +
    sign + pad(Math.floor(abs / 60)) + ":" + pad(abs % 60);
}

// Add a new entry. Needs zone and moodId; timestamp and journal are optional.
async function addEntry(data) {
  const now = nowIso();
  const entry = {
    id: crypto.randomUUID(),
    zone: data.zone,
    moodId: data.moodId,
    timestamp: data.timestamp || now,
    journal: data.journal || "",
    tags: [],
    createdAt: now,
    updatedAt: now
  };
  await runOnStore("readwrite", function (store) { return store.add(entry); });
  return entry;
}

// All entries, newest timestamp first
async function listEntries() {
  const all = await runOnStore("readonly", function (store) { return store.getAll(); });
  return all.sort(function (a, b) {
    if (a.timestamp !== b.timestamp) return a.timestamp < b.timestamp ? 1 : -1;
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

// Change fields of an existing entry (id, createdAt and tags are kept)
async function updateEntry(id, changes) {
  const existing = await runOnStore("readonly", function (store) { return store.get(id); });
  if (!existing) throw new Error("Entry not found: " + id);
  const updated = Object.assign({}, existing, changes, {
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: nowIso()
  });
  await runOnStore("readwrite", function (store) { return store.put(updated); });
  return updated;
}

async function deleteEntry(id) {
  await runOnStore("readwrite", function (store) { return store.delete(id); });
}

/* ---------- Offline support ---------- */

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
}

/* ---------- Start ---------- */

document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () { showTab(tab.dataset.tab); });
});
document.querySelectorAll("#language-switch button").forEach(function (btn) {
  btn.addEventListener("click", function () { setLanguage(btn.dataset.lang); });
});
document.querySelectorAll("#theme-switch button").forEach(function (btn) {
  btn.addEventListener("click", function () { setTheme(btn.dataset.themeValue); });
});

document.getElementById("app-version").textContent = APP_VERSION;
applyTheme();
applyLanguage();
showTab("checkin");
requestPersistentStorage();
registerServiceWorker();
