import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";

function mustGetEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

const firebaseConfig = {
  apiKey: mustGetEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: mustGetEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: mustGetEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: mustGetEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: mustGetEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: mustGetEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: mustGetEnv("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
};

export const firebaseApp: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
