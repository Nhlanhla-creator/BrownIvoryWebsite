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
  apiKey: "AIzaSyDfcXO4GbNdPFY7qGbjwH1z3A78FwXiFAE",
  authDomain: "tuts-7ea8c.firebaseapp.com",
  projectId: "tuts-7ea8c",
  storageBucket: "tuts-7ea8c.appspot.com",
  messagingSenderId: "546514581101",
  appId: "1:546514581101:web:a34e661b6cad46f01db164",
  measurementId: "G-LK13NE8TBS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); 

export { db, auth,storage, createUserWithEmailAndPassword, signInWithEmailAndPassword };