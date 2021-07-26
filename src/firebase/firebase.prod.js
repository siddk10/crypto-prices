import Firebase from "firebase/app";
import 'firebase/firestore'

import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBgetXB3RGK5qdswy0AlzCQA9Rl8ykrdd4",
    authDomain: "practice-cda51.firebaseapp.com",
    projectId: "practice-cda51",
    storageBucket: "practice-cda51.appspot.com",
    messagingSenderId: "961986618337",
    appId: "1:961986618337:web:548e9569073b4af12928a0"
  };
           
 export const firebase=Firebase.initializeApp(config)
 Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.SESSION)
 
  
  