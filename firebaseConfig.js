// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  initializeAuth,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  signOut,
} from "firebase/auth";

// TODO: Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgUnbK9pq2aofP3jQbGeVML50NRozv-SA",
  authDomain: "evrentalapp.firebaseapp.com",
  projectId: "evrentalapp",
  storageBucket: "evrentalapp.appspot.com",
  messagingSenderId: "70861969734",
  appId: "1:70861969734:web:c3bcc67a81ee4054ffed47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services (database, auth, etc)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, auth, signInWithEmailAndPassword, signOut };
