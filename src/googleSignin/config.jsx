
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy ,updateDoc, doc} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC1y2U4w4zrsLrAnMf1F_fvJ4hilIeZmS4",
    authDomain: "comment-2f137.firebaseapp.com",
    projectId: "comment-2f137",
    storageBucket: "comment-2f137.appspot.com",
    messagingSenderId: "378017973271",
    appId: "1:378017973271:web:6ad3b829f710969c804852",
    measurementId: "G-B13LEXGBV4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, provider, firestore, collection, addDoc, onSnapshot, query, orderBy ,updateDoc, doc};
