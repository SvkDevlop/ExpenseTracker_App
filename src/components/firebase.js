
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAVlW9AK6bGPMjkZmbyd9SYYl8agZNQJgc",
    authDomain: "expensetracker-8f053.firebaseapp.com",
    projectId: "expensetracker-8f053",
    storageBucket: "expensetracker-8f053.firebasestorage.app",
    messagingSenderId: "568305681757",
    appId: "1:568305681757:web:94c589aa27c981545514b4"
  };
const app=initializeApp(firebaseConfig);
var auth = getAuth(app);
var provider = new GoogleAuthProvider(); 
// const signInWithGooglePopup = () => {signInWithPopup(auth, provider)};
// firebase.initializeApp(firebaseConfig);
// var auth = firebase.auth();
// var provider = new firebase.auth.GoogleAuthProvider(); 
export {auth , provider};
// export {auth ,provider,signInWithGooglePopup };