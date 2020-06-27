import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDbYBuAwivWADVYmkom1nSNAP87dOzJ62E",
  authDomain: "enye2-f7389.firebaseapp.com",
  databaseURL: "https://enye2-f7389.firebaseio.com",
  projectId: "enye2-f7389",
  storageBucket: "enye2-f7389.appspot.com",
  messagingSenderId: "788552640254",
  appId: "1:788552640254:web:6278336fd75f9b65e7e7af",
  measurementId: "G-X6H8MGNDRV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

