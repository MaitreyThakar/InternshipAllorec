// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLMtTwBa3aJdXjbMiO5MHay0PdAc-UTeM",
  authDomain: "internai-allocation-system.firebaseapp.com",
  databaseURL: "https://internai-allocation-system-default-rtdb.firebaseio.com",
  projectId: "internai-allocation-system",
  storageBucket: "internai-allocation-system.firebasestorage.app",
  messagingSenderId: "937130886247",
  appId: "1:937130886247:web:bcba0f274abae2dc9280c2",
  measurementId: "G-TJ3DZ8YL6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize services
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;