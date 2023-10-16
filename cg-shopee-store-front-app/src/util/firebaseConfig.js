import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvO6uQUBMZ5Iox-snLmqx1fRWallXuJYg",
    authDomain: "cogy-ecommerce-v2.firebaseapp.com",
    projectId: "cogy-ecommerce-v2",
    storageBucket: "cogy-ecommerce-v2.appspot.com",
    messagingSenderId: "600181784352",
    appId: "1:600181784352:web:e0a0420b72b9d8679ce145"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
