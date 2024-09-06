// ---------------------------------- Modules ----------------------------------
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth' 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ---------------------------------- Firebase Configuration ----------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDNlErFLHNKoxoBhO-bPFP0DqxvYNQ9RMs",
  authDomain: "scrollar4u-b68bd.firebaseapp.com",
  projectId: "scrollar4u-b68bd",
  storageBucket: "scrollar4u-b68bd.appspot.com",
  messagingSenderId: "568774123730",
  appId: "1:568774123730:web:1f0b94b48c1f43b66a8d0b",
  measurementId: "G-HGFC2BGK5F"
};

// ---------------------------------- App Initialization ----------------------------------
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ---------------------------------- Authorization Exports ----------------------------------
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// ---------------------------------- Database Exports ----------------------------------
export const fireDB = getFirestore(app);
export const storage = getStorage(app);
