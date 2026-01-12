// Firebase configuration for Shiva Smarana feature
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB3LRBOLZKFZ43Loq-BDDlDxkx3LsOugKY",
    authDomain: "ghantasalaarts-57d43.firebaseapp.com",
    projectId: "ghantasalaarts-57d43",
    storageBucket: "ghantasalaarts-57d43.appspot.com",
    messagingSenderId: "868830517738",
    appId: "1:868830517738:web:9f3c41c85973d3472a3a93",
    measurementId: "G-JGMKVXMQSL"
};

// Initialize Firebase (avoid re-initializing if already done)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore database
export const db = getFirestore(app);

// Auth (for future use)
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Collection names
export const COLLECTIONS = {
    USERS: 'shivaSmaranaUsers',
    LEADERBOARD: 'shivaSmaranaLeaderboard',
    GLOBAL_STATS: 'shivaSmaranaGlobalStats'
};

export default app;
