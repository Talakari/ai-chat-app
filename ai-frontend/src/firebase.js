import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDv3PWP9YYAInc1a_Lx7IJoVThT8JvnqvA",
  authDomain: "aiai-65884.firebaseapp.com",
  projectId: "aiai-65884",
  storageBucket: "aiai-65884.firebasestorage.app",
  messagingSenderId: "450899773021",
  appId: "1:450899773021:web:64fc311be1f671d5ac2fb4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);