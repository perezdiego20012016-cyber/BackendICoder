import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBfXLi4OvbmOiIrUez4KLBHs0G_KYEvHNI",
  authDomain: "tiendadulces-back.firebaseapp.com",
  projectId: "tiendadulces-back",
  storageBucket: "tiendadulces-back.firebasestorage.app",
  messagingSenderId: "518662238310",
  appId: "1:518662238310:web:ebb9cf436b3d93832f7da7"
};
export const app = initializeApp(firebaseConfig);