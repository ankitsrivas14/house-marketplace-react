
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBm1GJ58dhue7BnfDq0y8oZbOWAxuCNwnA",
  authDomain: "house-marketplace-react-8b093.firebaseapp.com",
  projectId: "house-marketplace-react-8b093",
  storageBucket: "house-marketplace-react-8b093.appspot.com",
  messagingSenderId: "584468760730",
  appId: "1:584468760730:web:b631b8b4a8b542b8853723"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();