// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
const auth = getAuth(app);

const db = getFirestore(app);

const createRentalListing = async (vehicle) => {
  try {
    const docRef = await addDoc(collection(db, "rentals"), vehicle);
    console.log("Document written with ID: ", docRef.id);
    return [null, docRef.id];
  } catch (e) {
    console.error("Error adding document: ", e);
    return [e, null];
  }
};

export { db, auth, signInWithEmailAndPassword, signOut, createRentalListing };
