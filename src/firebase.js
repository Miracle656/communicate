import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIihTXC7X73VlDXclkuk-lp13HAC-F5Cw",
  authDomain: "communicate-3c370.firebaseapp.com",
  projectId: "communicate-3c370",
  storageBucket: "communicate-3c370.appspot.com",
  messagingSenderId: "88518914980",
  appId: "1:88518914980:web:ba0a48e3525aeeb2c08731",
  measurementId: "G-KDD0FCHCXR"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);




export { db, auth };  