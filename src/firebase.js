// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS_oLX1Re3Ed-i9VDl0-tekrk-El01p0Y",
    authDomain: "authentication-cb803.firebaseapp.com",
    projectId: "authentication-cb803",
    storageBucket: "authentication-cb803.appspot.com",
    messagingSenderId: "637110923528",
    appId: "1:637110923528:web:b93024b3ee4016b0cbbcbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)