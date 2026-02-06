// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC02kw_lSspdP50eTO_ijeCgxo7qsFA7q0",
  authDomain: "foodie-ecommerce.firebaseapp.com",
  projectId: "foodie-ecommerce",
  storageBucket: "foodie-ecommerce.firebasestorage.app",
  messagingSenderId: "443060023454",
  appId: "1:443060023454:web:1de6194b95e6ffcaa34b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export default auth;
