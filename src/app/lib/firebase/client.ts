import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRQxQMbGWoS8bB--ru183-CkwtLaH6zTk",

  authDomain: "lithe-event.firebaseapp.com",

  projectId: "lithe-event",

  storageBucket: "lithe-event.firebasestorage.app",

  messagingSenderId: "474221934035",

  appId: "1:474221934035:web:0a667a5ba3a81e483c6b26",

  measurementId: "G-LDD4MJ4ZJW",
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
