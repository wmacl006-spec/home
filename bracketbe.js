<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdaeqgul7uD2ZJEsiFo3BAmnh58IkrE9c",
  authDomain: "brackets-9b42e.firebaseapp.com",
  databaseURL: "https://brackets-9b42e-default-rtdb.firebaseio.com",
  projectId: "brackets-9b42e",
  storageBucket: "brackets-9b42e.firebasestorage.app",
  messagingSenderId: "64243279993",
  appId: "1:64243279993:web:e75baad143ad94835e0ca8",
  measurementId: "G-Y4HY2GW1PG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
</script>
