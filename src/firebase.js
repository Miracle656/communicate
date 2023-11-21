import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCHX0wMVRKCzFEHpfSWSjPvdKyrYiBWyU",
  authDomain: "communicate-6ad91.firebaseapp.com",
  projectId: "communicate-6ad91",
  storageBucket: "communicate-6ad91.appspot.com",
  messagingSenderId: "932871691044",
  appId: "1:932871691044:web:0cbea941e368b9cb2571b1",
  measurementId: "G-YMHKDK6BT7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);




export { db, auth };  