import { collection, doc, getDoc, getDocs, setDoc, writeBatch, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';
import { dasaraInitialData } from '../data/dasaraInitialData';

/**
 * Fetch all dasara days, merging Firestore edits with initial data so all 10 days are always shown
 */
export const getDasaraDays = async () => {
  try {
    const dasaraRef = collection(db, 'dasaraDays');
    const q = query(dasaraRef, orderBy('dayNumber'));
    const snapshot = await getDocs(q);
    const firestoreDays = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const firestoreMap = new Map(firestoreDays.map(d => [Number(d.dayNumber), d]));
    const mergedDays = dasaraInitialData.map(initialDay => {
      const fromDb = firestoreMap.get(Number(initialDay.dayNumber));
      if (fromDb) {
        firestoreMap.delete(Number(initialDay.dayNumber));
        return { ...initialDay, ...fromDb };
      }
      return initialDay;
    });

    const allDays = [...mergedDays, ...Array.from(firestoreMap.values())];
    return allDays.sort((a, b) => a.dayNumber - b.dayNumber);
  } catch (error) {
    console.error('Error fetching Dasara days:', error);
    return dasaraInitialData;
  }
};

/**
 * Fetch a specific day by its dayNumber, merging with initial data as fallback
 */
export const getDasaraDay = async (dayNumber) => {
  try {
    const parsedNum = parseInt(dayNumber, 10);
    const initial = dasaraInitialData.find(d => d.dayNumber === parsedNum);
    const dayDoc = doc(db, 'dasaraDays', `day${parsedNum}`);
    const snapshot = await getDoc(dayDoc);
    if (snapshot.exists()) {
      return { ...initial, id: snapshot.id, ...snapshot.data() };
    } else {
      return initial || null;
    }
  } catch (error) {
    console.error(`Error fetching Dasara day ${dayNumber}:`, error);
    return dasaraInitialData.find(d => d.dayNumber === parseInt(dayNumber, 10)) || null;
  }
};


/**
 * Update a specific day
 */
export const updateDasaraDay = async (dayNumberOrData, optionalData) => {
  try {
    const dayNumber = typeof dayNumberOrData === 'object' ? dayNumberOrData.dayNumber : dayNumberOrData;
    const data = typeof dayNumberOrData === 'object' ? dayNumberOrData : optionalData;
    const dayDoc = doc(db, 'dasaraDays', `day${dayNumber}`);
    await setDoc(dayDoc, data, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error updating Dasara day:`, error);
    throw error;
  }
};

/**
 * Seed initial data to Firestore (batch write)
 */
export const seedDasaraData = async (initialData) => {
  try {
    const batch = writeBatch(db);
    initialData.forEach((dayData) => {
      const dayRef = doc(db, 'dasaraDays', `day${dayData.dayNumber}`);
      batch.set(dayRef, dayData);
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error seeding Dasara data:', error);
    throw error;
  }
};

/**
 * Check if a user is admin
 */
export const checkIsAdmin = async (uid) => {
  if (!uid) return false;
  try {
    const userDoc = doc(db, 'users', uid);
    const snapshot = await getDoc(userDoc);
    if (snapshot.exists()) {
      return snapshot.data().isAdmin === true;
    }
    return false;
  } catch (error) {
    console.error(`Error checking admin status for ${uid}:`, error);
    return false;
  }
};

/**
 * Upload an image for a specific Dasara day to Firebase Storage and return the download URL
 */
export const uploadDasaraImage = async (dayNumber, file) => {
  if (!file) throw new Error('No file provided for upload');
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `day${dayNumber}_${Date.now()}.${ext}`;
    const storageRef = ref(storage, `dasara/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error(`Error uploading image for day ${dayNumber}:`, error);
    throw error;
  }
};
