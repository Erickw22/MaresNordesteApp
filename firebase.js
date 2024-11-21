import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAocbQjdGSkrM02VZgNOZxeELMnosabmsM",
  authDomain: "mapp-fn.firebaseapp.com",
  projectId: "mapp-fn",
  storageBucket: "mapp-fn.appspot.com",
  messagingSenderId: "933586749255",
  appId: "1:933586749255:web:35d9c0c609a3e950872e62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Inicialização do Firebase Auth com persistência
let authentication;
if (!authentication) {
  authentication = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { db, authentication };
