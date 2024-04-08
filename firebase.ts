// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env["NEXT_PUBLIC_API_KEY"],
  authDomain: "robotiive-generate-license.firebaseapp.com",
  projectId: "robotiive-generate-license",
  storageBucket: "robotiive-generate-license.appspot.com",
  messagingSenderId: "552999315871",
  appId: "1:552999315871:web:f73cbda6b397efc407b5aa",
  measurementId: "G-ZCEYCLKGWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app, auth, provider }