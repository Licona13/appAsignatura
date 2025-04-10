// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnoPoptyiO0T7b9e1YdbF_lMYgs6ptpqs",
  authDomain: "pruebadelectura-4c787.firebaseapp.com",
  databaseURL: "https://pruebadelectura-4c787-default-rtdb.firebaseio.com",
  projectId: "pruebadelectura-4c787",
  storageBucket: "pruebadelectura-4c787.firebasestorage.app",
  messagingSenderId: "406417971178",
  appId: "1:406417971178:web:10ee3c1f7a15a767198493",
  measurementId: "G-WQLCQ2RFF7"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
