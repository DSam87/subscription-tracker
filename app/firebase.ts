import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhqkIa75Bt8QvV068vh5sCrcNPbvNjGJY",
  authDomain: "subscription-tracker-2da8d.firebaseapp.com",
  projectId: "subscription-tracker-2da8d",
  storageBucket: "subscription-tracker-2da8d.appspot.com",
  messagingSenderId: "646456190271",
  appId: "1:646456190271:web:548bdcf65d166fd5f2df8a",
  measurementId: "G-9ZLDTL7V3Z",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
