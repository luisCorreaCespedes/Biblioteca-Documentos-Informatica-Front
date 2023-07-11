// Importación de funciones
import { initializeApp } from "firebase/app";

// Configuración de la APP
const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_FIREBASE_KEY,
    authDomain: "biblio-documentos-informatica.firebaseapp.com",
    projectId: "biblio-documentos-informatica",
    storageBucket: "biblio-documentos-informatica.appspot.com",
    messagingSenderId: "44390270507",
    appId: "1:44390270507:web:5aafbb467291eb3a414c6e"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;