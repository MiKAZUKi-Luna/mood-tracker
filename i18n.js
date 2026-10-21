// All UI text lives here, in English (en) and Thai (th).
// Entries store mood IDs and zone IDs only, never the words below.

const I18N = {
  // Interface text
  ui: {
    en: {
      appName: "Mood Tracker",
      tabCheckin: "Check-in",
      tabHistory: "History",
      tabSettings: "Settings",
      checkinTitle: "Check-in",
      checkinPlaceholder: "How are you feeling? The check-in screen will appear here.",
      historyTitle: "History",
      historyPlaceholder: "Your timeline and calendar will appear here.",
      settingsTitle: "Settings",
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      storageTitle: "Storage",
      storageGranted: "Persistent storage: granted. Chrome will keep your data.",
      storageNotGranted: "Persistent storage: not granted. Chrome may delete data when the phone is low on space.",
      storageUnsupported: "Persistent storage: not supported by this browser.",
      storageChecking: "Persistent storage: checking...",
      dataWarning: "Warning: clearing Chrome's site data for this app will permanently delete all entries. Back up first.",
      version: "App version"
    },
    th: {
      appName: "บันทึกอารมณ์",
      tabCheckin: "เช็คอิน",
      tabHistory: "ประวัติ",
      tabSettings: "ตั้งค่า",
      checkinTitle: "เช็คอิน",
      checkinPlaceholder: "วันนี้รู้สึกอย่างไร? หน้าเช็คอินจะอยู่ตรงนี้",
      historyTitle: "ประวัติ",
      historyPlaceholder: "ไทม์ไลน์และปฏิทินของคุณจะอยู่ตรงนี้",
      settingsTitle: "ตั้งค่า",
      language: "ภาษา",
      theme: "ธีม",
      themeLight: "สว่าง",
      themeDark: "มืด",
      storageTitle: "พื้นที่จัดเก็บ",
      storageGranted: "พื้นที่จัดเก็บถาวร: อนุญาตแล้ว Chrome จะเก็บข้อมูลของคุณไว้",
      storageNotGranted: "พื้นที่จัดเก็บถาวร: ยังไม่อนุญาต Chrome อาจลบข้อมูลเมื่อเครื่องเหลือที่ว่างน้อย",
      storageUnsupported: "พื้นที่จัดเก็บถาวร: เบราว์เซอร์นี้ไม่รองรับ",
      storageChecking: "พื้นที่จัดเก็บถาวร: กำลังตรวจสอบ...",
      dataWarning: "คำเตือน: การล้างข้อมูลเว็บไซต์ของแอปนี้ใน Chrome จะลบบันทึกทั้งหมดอย่างถาวร กรุณาสำรองข้อมูลก่อน",
      version: "เวอร์ชันแอป"
    }
  },

  // Zones (IDs: bright, stressed, low, calm) with their mood words
  zones: {
    bright: {
      en: "Bright", th: "สดใส",
      moods: ["excited", "happy", "proud", "cheerful", "inspired", "playful"]
    },
    stressed: {
      en: "Stressed", th: "เครียด",
      moods: ["anxious", "angry", "pressured", "irritated", "overwhelmed", "restless"]
    },
    low: {
      en: "Low", th: "หม่นหมอง",
      moods: ["sad", "tired", "lonely", "bored", "discouraged", "empty"]
    },
    calm: {
      en: "Calm", th: "สงบ",
      moods: ["calm", "relieved", "content", "peaceful", "grateful", "relaxed"]
    }
  },

  // Mood words by ID
  moods: {
    excited: { en: "Excited", th: "ตื่นเต้น" },
    happy: { en: "Happy", th: "มีความสุข" },
    proud: { en: "Proud", th: "ภูมิใจ" },
    cheerful: { en: "Cheerful", th: "ร่าเริง" },
    inspired: { en: "Inspired", th: "มีแรงบันดาลใจ" },
    playful: { en: "Playful", th: "สนุกสนาน" },

    anxious: { en: "Anxious", th: "กังวล" },
    angry: { en: "Angry", th: "โกรธ" },
    pressured: { en: "Pressured", th: "รู้สึกกดดัน" },
    irritated: { en: "Irritated", th: "หงุดหงิด" },
    overwhelmed: { en: "Overwhelmed", th: "รับมือไม่ไหว" },
    restless: { en: "Restless", th: "กระสับกระส่าย" },

    sad: { en: "Sad", th: "เศร้า" },
    tired: { en: "Tired", th: "เหนื่อย" },
    lonely: { en: "Lonely", th: "เหงา" },
    bored: { en: "Bored", th: "เบื่อ" },
    discouraged: { en: "Discouraged", th: "ท้อแท้" },
    empty: { en: "Empty", th: "ว่างเปล่า" },

    calm: { en: "Calm", th: "สงบ" },
    relieved: { en: "Relieved", th: "โล่งใจ" },
    content: { en: "Content", th: "พึงพอใจ" },
    peaceful: { en: "Peaceful", th: "สบายใจ" },
    grateful: { en: "Grateful", th: "รู้สึกขอบคุณ" },
    relaxed: { en: "Relaxed", th: "ผ่อนคลาย" }
  }
};

// Look up UI text in the given language (falls back to English)
function t(lang, key) {
  return (I18N.ui[lang] && I18N.ui[lang][key]) || I18N.ui.en[key] || key;
}
function zoneName(lang, zoneId) {
  return I18N.zones[zoneId][lang];
}
function moodName(lang, moodId) {
  return I18N.moods[moodId][lang];
}
