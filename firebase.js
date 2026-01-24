// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBUQgksDWqis5CYkivxYnQTHY9GHiSR8SA",
  authDomain: "pdfproject-79cac.firebaseapp.com",
  projectId: "pdfproject-79cac",
  storageBucket: "pdfproject-79cac.appspot.com", // ✅ FIXED
  messagingSenderId: "588286215167",
  appId: "1:588286215167:web:d31467d50048fd6916ddca"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Anonymous auth so rooms work immediately
signInAnonymously(auth);
