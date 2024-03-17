// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt1Er1knHHRv3_9Eb5wzCQXOY4vvFboXg",
  authDomain: "netflix-gpt-25f51.firebaseapp.com",
  projectId: "netflix-gpt-25f51",
  storageBucket: "netflix-gpt-25f51.appspot.com",
  messagingSenderId: "438752341905",
  appId: "1:438752341905:web:7bfa267553562ce351b430",
  measurementId: "G-9KP9PH4QGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();