import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-6hfnv_RgNEwyUGxkXiC4Ay13Sa8n8r4",
  authDomain: "sarthakdigi-9d56a.firebaseapp.com",
  projectId: "sarthakdigi-9d56a",
  storageBucket: "sarthakdigi-9d56a.firebasestorage.app",
  messagingSenderId: "512104532100",
  appId: "1:512104532100:web:dae28f1c70ea48c8f75ad1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with a safe fallback for React Native
let auth;
try {
  // Use require to avoid bundling errors if AsyncStorage is not installed yet
  const { initializeAuth, getReactNativePersistence, getAuth } = require("firebase/auth");
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (err) {
    // Fallback to default in-memory persistence
    auth = getAuth(app);
  }
} catch (e) {
  // Final fallback in case imports fail at build time
  const { getAuth } = require("firebase/auth");
  auth = getAuth(app);
}

export { app, auth };

