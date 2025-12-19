import { initializeApp, getApp, getApps } from "firebase/app";

// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEkXQdbvPoMy5b6ozQ1wFBbJXGoZYNaY0",

  authDomain: "student-event-liu.firebaseapp.com",

  databaseURL:
    "https://student-event-liu-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "student-event-liu",

  storageBucket: "student-event-liu.firebasestorage.app",

  messagingSenderId: "591190866940",

  appId: "1:591190866940:web:c1add9ccd12a3af0d09079",

  measurementId: "G-B6QH498G5E",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// console.log(analytics);

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
