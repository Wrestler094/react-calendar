import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBeWKsZd6bMuq6b-3B2N1dc88qAArhShDc",
    authDomain: "calendar-reg.firebaseapp.com",
    projectId: "calendar-reg",
    storageBucket: "calendar-reg.appspot.com",
    messagingSenderId: "294455734648",
    appId: "1:294455734648:web:02674ae79a3f013fe1188d",
    measurementId: "G-8ZF5E1PQSK"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);