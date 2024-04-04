// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
  addDoc,
} from "firebase/firestore";

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

const getRentalListingsByEmail = async (email) => {
  const q = query(collection(db, "rentals"), where("ownerEmail", "==", email));
  const results = [];
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      results.push(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
  return results;
};

const getBookingsOfOwner = async (email) => {
  const q = query(collection(db, "book"), where("ownerEmail", "==", email));
  const results = [];
  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
  } catch (err) {
    console.error(`Error fetching bookings: ${err}`);
  }
  return results;
};

export {
  db,
  auth,
  signInWithEmailAndPassword,
  signOut,
  createRentalListing,
  getRentalListingsByEmail,
  getBookingsOfOwner,
};
