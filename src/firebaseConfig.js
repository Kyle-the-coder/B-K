// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZNLBoQVxkrATvU6NaAvnIPBhhg0RMhjY",
  authDomain: "bandk-8113a.firebaseapp.com",
  projectId: "bandk-8113a",
  storageBucket: "bandk-8113a.firebasestorage.app",
  messagingSenderId: "1067832083899",
  appId: "1:1067832083899:web:2b6ffe56d9d078ace2709e",
  measurementId: "G-Q3L9LTMTED",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
