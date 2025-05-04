import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAImADMOdPDKRrBYuuKf9NKIvWZBaZ9Dro",
    authDomain: "countries-app-d4874.firebaseapp.com",
    projectId: "countries-app-d4874",
    storageBucket: "countries-app-d4874.firebasestorage.app",
    messagingSenderId: "822220027738",
    appId: "1:822220027738:web:fa189ea32f52ceacec2563",
    measurementId: "G-C6DDKXBYCV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;