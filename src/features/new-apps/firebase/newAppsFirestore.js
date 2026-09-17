import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '../../../firebase';
import { checkIsAdmin } from '../../dasara/firebase/dasaraFirestore';

const APPS_COLLECTION = 'newApps';

/**
 * Compress an image file to a lightweight Base64 data URI (max 180x180 px).
 * Typical size is 4KB - 12KB, perfectly suited for direct Firestore storage
 * without depending on Firebase Storage bucket quota.
 */
export const compressImageToBase64 = (file, maxWidth = 180, maxHeight = 180, quality = 0.85) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first for maximum compression, fallback to jpeg
        try {
          const dataUrl = canvas.toDataURL('image/webp', quality);
          if (dataUrl && dataUrl.startsWith('data:image/webp')) {
            resolve(dataUrl);
            return;
          }
        } catch (webpErr) {
          // ignore
        }

        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => {
        resolve(e.target.result || '');
      };
      img.src = e.target.result;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

/**
 * Sort apps by order (ascending), then by createdAt (descending)
 */
export const sortApps = (apps) => {
  return [...apps].sort((a, b) => {
    const orderA = a.order !== undefined && a.order !== null ? a.order : 9999;
    const orderB = b.order !== undefined && b.order !== null ? b.order : 9999;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
};

/**
 * Fetch all apps ordered
 */
export const getNewApps = async () => {
  try {
    const appsRef = collection(db, APPS_COLLECTION);
    const snapshot = await getDocs(appsRef);
    
    if (snapshot.empty) {
      return [];
    }
    
    const apps = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    return sortApps(apps);
  } catch (error) {
    console.error('Error fetching new apps:', error);
    return [];
  }
};

/**
 * Fetch a single app by ID
 */
export const getNewApp = async (appId) => {
  try {
    const docRef = doc(db, APPS_COLLECTION, appId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching app ${appId}:`, error);
    throw error;
  }
};

/**
 * Read file as text helper
 */
const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

/**
 * Upload HTML and optional icon file to Firestore & Firebase Storage
 * Resilient against Storage quota-exceeded: compresses icon to Base64
 * and stores HTML text directly in Firestore.
 */
export const createNewApp = async ({
  title,
  description = '',
  htmlFile,
  iconFile,
  iconUrl = '',
  category = 'Spiritual',
  order = 0
}) => {
  if (!title || !title.trim()) {
    throw new Error('App title is required.');
  }
  if (!htmlFile) {
    throw new Error('Please select an .html file to upload.');
  }

  const appId = 'app_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const timestamp = Date.now();

  let finalIconUrl = iconUrl || '';
  let htmlStorageUrl = '';
  let htmlContent = '';

  // Read HTML file as text
  try {
    htmlContent = await readFileAsText(htmlFile);
  } catch (err) {
    console.error('Failed to read HTML file:', err);
    throw new Error('Failed to read HTML file content: ' + err.message);
  }

  // 1. Prepare icon: compress to Base64 first so we ALWAYS have the image
  if (iconFile) {
    try {
      const base64 = await compressImageToBase64(iconFile);
      if (base64) {
        finalIconUrl = base64;
      }
    } catch (e) {
      console.warn('Base64 compression fallback error:', e);
    }
  }

  // 2. Attempt Storage upload for icon (optional optimization)
  if (iconFile) {
    try {
      const ext = iconFile.name.split('.').pop() || 'png';
      const iconStorageRef = ref(storage, `apps/icons/${appId}.${ext}`);
      const iconSnapshot = await uploadBytes(iconStorageRef, iconFile);
      finalIconUrl = await getDownloadURL(iconSnapshot.ref);
    } catch (iconErr) {
      console.warn('Firebase Storage icon upload failed (quota exceeded), using compressed Base64:', iconErr);
    }
  }

  // 3. Attempt Storage upload for HTML file
  try {
    const htmlStorageRef = ref(storage, `apps/html/${appId}_${htmlFile.name}`);
    const htmlMetadata = {
      contentType: 'text/html; charset=utf-8'
    };
    const htmlSnapshot = await uploadBytes(htmlStorageRef, htmlFile, htmlMetadata);
    htmlStorageUrl = await getDownloadURL(htmlSnapshot.ref);
  } catch (storageErr) {
    console.warn('Firebase Storage HTML upload failed (quota exceeded), cached in Firestore:', storageErr);
  }

  // Fallback if no icon URL
  if (!finalIconUrl) {
    finalIconUrl = '/spiritual_pattern.jpg';
  }

  // Prepare Firestore document
  const isCachableInFirestore = htmlContent && htmlContent.length < 750000;

  const appData = {
    id: appId,
    title: title.trim(),
    description: description ? description.trim() : '',
    category: category || 'Spiritual',
    iconUrl: finalIconUrl,
    htmlUrl: htmlStorageUrl,
    htmlFileName: htmlFile.name,
    htmlFileSize: htmlFile.size,
    htmlContent: isCachableInFirestore ? htmlContent : '',
    order: Number(order) || 0,
    createdAt: timestamp,
    updatedAt: timestamp,
    createdBy: auth.currentUser?.email || auth.currentUser?.uid || 'admin'
  };

  const docRef = doc(db, APPS_COLLECTION, appId);
  await setDoc(docRef, appData);

  return appData;
};

/**
 * Update an existing app
 * Resilient against Storage quota-exceeded: compresses icon to Base64
 * and stores HTML text directly in Firestore.
 */
export const updateNewApp = async (appId, {
  title,
  description,
  category,
  iconFile,
  iconUrl,
  htmlFile,
  order
}) => {
  const docRef = doc(db, APPS_COLLECTION, appId);
  const updates = {
    updatedAt: Date.now()
  };

  if (title !== undefined) updates.title = title.trim();
  if (description !== undefined) updates.description = description.trim();
  if (category !== undefined) updates.category = category;
  if (iconUrl !== undefined) updates.iconUrl = iconUrl;
  if (order !== undefined) updates.order = Number(order);

  // Handle icon update
  if (iconFile) {
    // 1. Compress to lightweight Base64 data URI first
    try {
      const base64 = await compressImageToBase64(iconFile);
      if (base64) {
        updates.iconUrl = base64;
      }
    } catch (e) {
      console.warn('Base64 compression error on update:', e);
    }

    // 2. Attempt Firebase Storage upload
    try {
      const ext = iconFile.name.split('.').pop() || 'png';
      const iconStorageRef = ref(storage, `apps/icons/${appId}_${Date.now()}.${ext}`);
      const iconSnapshot = await uploadBytes(iconStorageRef, iconFile);
      updates.iconUrl = await getDownloadURL(iconSnapshot.ref);
    } catch (iconErr) {
      console.warn('Firebase Storage upload failed (quota exceeded), preserved compressed Base64:', iconErr);
    }
  }

  // Handle HTML file update
  if (htmlFile) {
    const htmlContent = await readFileAsText(htmlFile);
    updates.htmlFileName = htmlFile.name;
    updates.htmlFileSize = htmlFile.size;
    if (htmlContent.length < 750000) {
      updates.htmlContent = htmlContent;
    }

    try {
      const htmlStorageRef = ref(storage, `apps/html/${appId}_${Date.now()}_${htmlFile.name}`);
      const htmlMetadata = { contentType: 'text/html; charset=utf-8' };
      const htmlSnapshot = await uploadBytes(htmlStorageRef, htmlFile, htmlMetadata);
      updates.htmlUrl = await getDownloadURL(htmlSnapshot.ref);
    } catch (storageErr) {
      console.warn('Firebase Storage HTML upload failed (quota exceeded), cached in Firestore:', storageErr);
    }
  }

  await updateDoc(docRef, updates);
  return updates;
};

/**
 * Reorder apps in batch
 */
export const updateAppsOrder = async (orderedApps) => {
  try {
    const batch = writeBatch(db);
    orderedApps.forEach((app, idx) => {
      if (app.id && !app.id.startsWith('sample_')) {
        const docRef = doc(db, APPS_COLLECTION, app.id);
        batch.update(docRef, { order: idx });
      }
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error updating apps order in Firestore:', error);
    throw error;
  }
};

/**
 * Delete an app
 */
export const deleteNewApp = async (appId, htmlUrl, iconUrl) => {
  try {
    const docRef = doc(db, APPS_COLLECTION, appId);
    await deleteDoc(docRef);

    // Attempt to delete storage files if they exist
    if (htmlUrl && htmlUrl.includes('firebasestorage')) {
      try {
        const htmlRef = ref(storage, htmlUrl);
        await deleteObject(htmlRef);
      } catch (e) {
        console.warn('Could not delete storage html file:', e);
      }
    }

    if (iconUrl && iconUrl.includes('firebasestorage')) {
      try {
        const iconRef = ref(storage, iconUrl);
        await deleteObject(iconRef);
      } catch (e) {
        console.warn('Could not delete storage icon file:', e);
      }
    }

    return true;
  } catch (error) {
    console.error(`Error deleting app ${appId}:`, error);
    throw error;
  }
};

export { checkIsAdmin };
