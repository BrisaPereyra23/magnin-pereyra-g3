import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAdYZx_9HpZUlLyBfRlXV6vOWIpnwxAu_I",
  authDomain: "magnin-pereyra-g3.firebaseapp.com",
  projectId: "magnin-pereyra-g3",
  //storageBucket: "magnin-pereyra-g3.firebasestorage.app",
  storageBucket: "magnin-pereyra-g3.appspot.com",
  messagingSenderId: "471192441541",
  appId: "1:471192441541:web:48b4c4e499f30b2da5d6ac"
};

app.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();