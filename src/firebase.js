// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP-c1JVtbuYw1_PmRGGvi6Tgx5_99hc7c",
  authDomain: "chat-24a22.firebaseapp.com",
  projectId: "chat-24a22",
  storageBucket: "chat-24a22.appspot.com",
  messagingSenderId: "872716183741",
  appId: "1:872716183741:web:146d2984eefb57bff6efd4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
