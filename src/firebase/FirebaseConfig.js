import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANn2Kh8F-mtRmnbsDsJe6kRlADM1JChRI",
  authDomain: "sistematienda-2b54a.firebaseapp.com",
  projectId: "sistematienda-2b54a",
  storageBucket: "sistematienda-2b54a.appspot.com",
  messagingSenderId: "795413672695",
  appId: "1:795413672695:web:f64dbb710b31a5d5d599f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;