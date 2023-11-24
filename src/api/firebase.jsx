import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG9qaDP4qRHQK20sCQksHMGreFYXQLe1Y",
  authDomain: "mini-project-63161.firebaseapp.com",
  projectId: "mini-project-63161",
  storageBucket: "mini-project-63161.appspot.com",
  messagingSenderId: "744484656680",
  appId: "1:744484656680:web:97c06dcb89761cb3ca871d",
  measurementId: "G-DDGPK8VV4S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
