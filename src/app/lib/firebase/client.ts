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
  projectId: "student-event-liu",
  storageBucket: "student-event-liu.firebasestorage.app",
  messagingSenderId: "591190866940",
  appId: "1:591190866940:web:8badbf71eb11021bd09079",
  measurementId: "G-63THMWF6XC"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// console.log(analytics);

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
