import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSlIPSa86rBiiWoy1DLG_za3g9Vd9p1_Y",
  authDomain: "myapp-decba.firebaseapp.com",
  projectId: "myapp-decba",
  storageBucket: "myapp-decba.appspot.com",
  messagingSenderId: "809608205758",
  appId: "1:809608205758:web:eff84daa118a127e68d5ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB,auth } ;