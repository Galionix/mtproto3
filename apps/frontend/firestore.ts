const config = {
  apiKey: process.env.NX_FIREBASE_API_KEY,
  authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NX_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NX_FIREBASE_APP_ID,
};
import { initializeApp, getApps } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

export const firebaseApp = !getApps().length
  ? initializeApp(config)
  : getApps()[0];

// export const auth = getAuth();
export const db = getFirestore(firebaseApp);
console.log(db.toJSON());

export const googleAuthProvider = new GoogleAuthProvider();

export const storage = getStorage(firebaseApp);
