// src/app/lib/firebase/firebase.tsx
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEkXQdbvPoMy5b6ozQ1wFBbJXGoZYNaY0",
  authDomain: "student-event-liu.firebaseapp.com",
  databaseURL:
    "https://student-event-liu-default-rtdb.europe-north2.firebasedatabase.app",
  projectId: "student-event-liu",
  storageBucket: "student-event-liu.firebasestorage.app",
  messagingSenderId: "591190866940",
  appId: "1:591190866940:web:3a983babe996a957d09079",
  measurementId: "G-Y01ZFR9R1X",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore i europe-north2
export const rtdb = getDatabase(app);
export const storage = getStorage(app); // Storage i Firebase

// Only call in the browser (client components)
export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (!(await isSupported())) return null;
  return getAnalytics(app);
}
