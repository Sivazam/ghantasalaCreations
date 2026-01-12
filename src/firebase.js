// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3LRBOLZKFZ43Loq-BDDlDxkx3LsOugKY",
    authDomain: "ghantasalaarts-57d43.firebaseapp.com",
    projectId: "ghantasalaarts-57d43",
    storageBucket: "ghantasalaarts-57d43.appspot.com",
    messagingSenderId: "868830517738",
    appId: "1:868830517738:web:9f3c41c85973d3472a3a93",
    measurementId: "G-JGMKVXMQSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, analytics };
