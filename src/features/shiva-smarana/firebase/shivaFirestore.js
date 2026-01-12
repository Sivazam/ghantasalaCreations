// Firestore operations for Shiva Smarana
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    onSnapshot,
    increment,
    serverTimestamp
} from "firebase/firestore";
import { db, COLLECTIONS } from "./firebaseConfig";

// Generate or get visitor ID from localStorage
export const getVisitorId = () => {
    let visitorId = localStorage.getItem('shivaSmaranaVisitorId');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('shivaSmaranaVisitorId', visitorId);
    }
    return visitorId;
};

// Create or get user document
export const createOrGetUser = async (visitorId) => {
    const userRef = doc(db, COLLECTIONS.USERS, visitorId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // Create new user
        const userData = {
            visitorId,
            totalCount: 0,
            lastSessionCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        await setDoc(userRef, userData);
        return userData;
    }

    return userSnap.data();
};

// Update abhishekam count
export const updateAbhishekamCount = async (visitorId, sessionCount) => {
    const userRef = doc(db, COLLECTIONS.USERS, visitorId);
    const leaderboardRef = doc(db, COLLECTIONS.LEADERBOARD, visitorId);

    // Update user document
    await updateDoc(userRef, {
        totalCount: increment(sessionCount),
        lastSessionCount: sessionCount,
        updatedAt: serverTimestamp()
    });

    // Get updated total for leaderboard
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    // Update leaderboard
    await setDoc(leaderboardRef, {
        visitorId,
        totalCount: userData.totalCount,
        updatedAt: serverTimestamp()
    }, { merge: true });

    return userData.totalCount;
};

// Get leaderboard (top devotees)
export const getLeaderboard = async (limitCount = 10) => {
    const leaderboardQuery = query(
        collection(db, COLLECTIONS.LEADERBOARD),
        orderBy('totalCount', 'desc'),
        limit(limitCount)
    );

    const snapshot = await getDocs(leaderboardQuery);
    return snapshot.docs.map((doc, index) => ({
        rank: index + 1,
        ...doc.data()
    }));
};

// Subscribe to leaderboard updates (real-time)
export const subscribeToLeaderboard = (callback, limitCount = 10) => {
    const leaderboardQuery = query(
        collection(db, COLLECTIONS.LEADERBOARD),
        orderBy('totalCount', 'desc'),
        limit(limitCount)
    );

    return onSnapshot(leaderboardQuery, (snapshot) => {
        const leaderboard = snapshot.docs.map((doc, index) => ({
            rank: index + 1,
            ...doc.data()
        }));
        callback(leaderboard);
    });
};

// Get user's current data
export const getUserData = async (visitorId) => {
    const userRef = doc(db, COLLECTIONS.USERS, visitorId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};
