// Import Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfcXO4GbNdPFY7qGbjwH1z3A78FwXiFAE",
  authDomain: "tuts-7ea8c.firebaseapp.com",
  projectId: "tuts-7ea8c",
  storageBucket: "tuts-7ea8c.appspot.com",
  messagingSenderId: "546514581101",
  appId: "1:546514581101:web:a34e661b6cad46f01db164",
  measurementId: "G-LK13NE8TBS",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Export Firebase authentication functions
const createUserWithEmailAndPassword = (auth, email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const signInWithEmailAndPassword = (auth, email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

// Export Firestore functions
const doc = (db, collection, id) => {
  return db.collection(collection).doc(id);
};

const setDoc = (docRef, data, options) => {
  if (options && options.merge) {
    return docRef.set(data, { merge: true });
  }
  return docRef.set(data);
};

const getDoc = async (docRef) => {
  const snapshot = await docRef.get();
  return {
    exists: () => snapshot.exists,
    data: () => snapshot.data()
  };
};

// Export Storage functions
const ref = (storage, path) => {
  return storage.ref(path);
};

const uploadBytes = (storageRef, file) => {
  return storageRef.put(file);
};

const getDownloadURL = (storageRef) => {
  return storageRef.getDownloadURL();
};

export {
  firebase,
  db,
  auth,
  storage,
  doc,
  setDoc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
