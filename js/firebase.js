// FIREBASE APP
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// FIRESTORE
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// AUTH
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyChrJuL-CT1490jYVQ7IBtrp2fDdGTVP-M",

  authDomain: "web-app-a4752.firebaseapp.com",

  projectId: "web-app-a4752",

  storageBucket: "web-app-a4752.firebasestorage.app",

  messagingSenderId: "244714993973",

  appId: "1:244714993973:web:f167fb9a7555052fcfb47c"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };