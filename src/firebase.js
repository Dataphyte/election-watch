// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCCyfM3FoyMc7qbWyzm6hKVqHJmSI4K6A4',
  authDomain: 'election-watch-7d7b4.firebaseapp.com',
  projectId: 'election-watch-7d7b4',
  storageBucket: 'election-watch-7d7b4.appspot.com',
  messagingSenderId: '228601362119',
  databaseURL: 'https://election-watch-7d7b4-default-rtdb.firebaseio.com',
  appId: '1:228601362119:web:72b9cf058bbd12e59e30e2',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
