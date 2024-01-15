// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhMLAbK_wUlfNK1g2U45m9iq_k_LJeBKo",
  authDomain: "note-ed00f.firebaseapp.com",
  projectId: "note-ed00f",
  storageBucket: "note-ed00f.appspot.com",
  messagingSenderId: "232169395962",
  appId: "1:232169395962:web:b5ece0133a1b2382d41b43",
  measurementId: "G-GF8MG495VT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
