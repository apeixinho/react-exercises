import * as firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB1u9qeAM64NlmyjYD96Gn6hCgGGhGG_vw",
  authDomain: "duckr-900ff.firebaseapp.com",
  databaseURL: "https://duckr-900ff.firebaseio.com",
  projectId: "duckr-900ff",
  storageBucket: "duckr-900ff.appspot.com",
  messagingSenderId: "194768112706"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth;

export const usersDucksExpirationLength = 100000;
export const userExpirationLength = 100000;
