// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, // Use environment variable for API key
  authDomain: "qrqe-mgmt---video-submission.firebaseapp.com",
  projectId: "qrqe-mgmt---video-submission",
  storageBucket: "qrqe-mgmt---video-submission.firebasestorage.app",
  messagingSenderId: "908001990389",
  appId: "1:908001990389:web:0cb1d95059978bae95d7bc",
  measurementId: "G-D3WVQ5YXLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);