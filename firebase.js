import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  getDocs,
  enableIndexedDbPersistence
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6M5SgzgV0I4Z3MICqycv8bke8A-51xKU",
  authDomain: "sarthakdigi-6071a.firebaseapp.com",
  projectId: "sarthakdigi-6071a",
  storageBucket: "sarthakdigi-6071a.firebasestorage.app",
  messagingSenderId: "35108607121",
  appId: "1:35108607121:web:a7b71f05e00cf3fd165b30"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with a safe fallback for React Native
let auth;
try {
  // Use require to avoid bundling errors if AsyncStorage is not installed yet
  const { initializeAuth, getReactNativePersistence, getAuth } = require("firebase/auth");
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (err) {
    // Fallback to default in-memory persistence
    auth = getAuth(app);
  }
} catch (e) {
  // Final fallback in case imports fail at build time
  const { getAuth } = require("firebase/auth");
  auth = getAuth(app);
}

const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser doesn\'t support persistence.');
    }
});

// Helper functions for Firestore operations
export const createDocument = async (collectionName, documentId, data) => {
  try {
    await setDoc(doc(db, collectionName, documentId), {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error creating document:', error);
    return false;
  }
};

export const updateDocument = async (collectionName, documentId, data) => {
  try {
    // 1. Add validation checks for the required arguments
    if (!collectionName || typeof collectionName !== 'string') {
      console.error('Error: "collectionName" must be a non-empty string.');
      return false;
    }

    if (!documentId || typeof documentId !== 'string') {
      console.error('Error: "documentId" must be a non-empty string.');
      return false;
    }
    
    // 2. Ensure the data object is valid
    if (!data || typeof data !== 'object') {
      console.error('Error: "data" must be a valid object.');
      return false;
    }

    // Now, with validated arguments, proceed with the update
    const docRef = doc(db, collectionName, documentId);

    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    
    console.log('Document successfully updated!');
    return true;

  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
};

export const updateActiveStatus = async (collectionName, documentId, isActive) => {
  try {
    if (!collectionName || typeof collectionName !== 'string') {
      console.error('Error: "collectionName" must be a non-empty string.');
      return false;
    }

    if (!documentId || typeof documentId !== 'string') {
      console.error('Error: "documentId" must be a non-empty string.');
      return false;
    }

    const docRef = doc(db, collectionName, documentId);

    await updateDoc(docRef, {
      isActive: isActive,
      updatedAt: new Date().toISOString()
    });

    console.log('Active status successfully updated!');
    return true;

  } catch (error) {
    console.error('Error updating active status:', error);
    return false;
  }
};

export const getDocument = async (collectionName, documentId) => {
  try {
    if (!documentId) {
      console.error('Document ID is required');
      return null;
    }
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.metadata.fromCache) {
      console.log('Data came from cache');
    }
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

export const deleteDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

export const queryDocuments = async (collectionName, fieldPath, operator, value) => {
  try {
    const q = query(collection(db, collectionName), where(fieldPath, operator, value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error querying documents:', error);
    return [];
  }
};

export { app, auth, db };


