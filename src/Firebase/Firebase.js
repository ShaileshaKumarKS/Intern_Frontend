// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"

import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASk_RGOtcym7GssVltz_cIQ_qesxlLdaI",
  authDomain: "internclone.firebaseapp.com",
  projectId: "internclone",
  storageBucket: "internclone.appspot.com",
  messagingSenderId: "256499954559",
  appId: "1:256499954559:web:7e2ddfb459c1635fc4204a",
  measurementId: "G-SE55TWKGTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app);

const auth=getAuth(app)
const provider=new GoogleAuthProvider();

export {auth,provider,uploadBytesResumable,storage,ref,getDownloadURL,}