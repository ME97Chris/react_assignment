// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh7kWJJWdIZx9sXb7C9nB9AORXgvYcur8",
  authDomain: "reactassignment-1ca5c.firebaseapp.com",
  projectId: "reactassignment-1ca5c",
  storageBucket: "reactassignment-1ca5c.appspot.com",
  messagingSenderId: "1027479058700",
  appId: "1:1027479058700:web:c8ec614149378006d23129",
  measurementId: "G-ZWWG3EWP98"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase(app);

export {firebase}