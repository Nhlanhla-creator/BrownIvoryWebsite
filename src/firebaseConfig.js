// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT_b-14S1L17qVXN-8w6RteS2sRvmrmsA",
  authDomain: "brownivorygroup-database.firebaseapp.com",
  projectId: "brownivorygroup-database",
  storageBucket: "brownivorygroup-database.firebasestorage.app",
  messagingSenderId: "930035285082",
  appId: "1:930035285082:web:55cb4d761a4f4541c46c63",
  measurementId: "G-BG459F0TL6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 

export { db, auth,storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };