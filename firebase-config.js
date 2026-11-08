// Потрібно лише для варіанта «власний сайт» (див. SETUP.md). Якщо не заповнювати — сторінка працює локально.
// Firebase → Project settings → General → Your apps → Web app → Config.
// Ці значення не секретні: доступ до даних закривають правила Firestore (firestore.rules).
window.FIREBASE_CONFIG = {
  apiKey: "ВСТАВТЕ_API_KEY",
  authDomain: "ваш-проєкт.firebaseapp.com",
  projectId: "ваш-проєкт",
  storageBucket: "ваш-проєкт.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000"
};
