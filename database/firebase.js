// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: "AIzaSyAzwHmWodJDO10ASTYdohWDAFCUbYZS7hw",
  authDomain: "expo-app-27aef.firebaseapp.com",
  projectId: "expo-app-27aef",
  storageBucket: "expo-app-27aef.appspot.com",
  messagingSenderId: "144666709487",
  appId: "1:144666709487:web:c2c6f42577934b392dfa1a",
  measurementId: "G-T6YP6NQSXE"
};
 
// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;