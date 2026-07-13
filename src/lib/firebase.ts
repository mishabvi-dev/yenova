import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDUBRJKYPfDYqPUaOovf2q5gt54rYOovhA",
  authDomain: "yenova-bc996.firebaseapp.com",
  projectId: "yenova-bc996",
  storageBucket: "yenova-bc996.firebasestorage.app",
  messagingSenderId: "631620958525",
  appId: "1:631620958525:web:50fa4e14e969a54e4e6d54",
  measurementId: "G-P2M5K5X2RD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
