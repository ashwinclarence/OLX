import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore,collection, getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

 // initialize firebase app
initializeApp(firebaseConfig);

// initialize services
export const db=getFirestore()
export const auth=getAuth()

// collection reference
export const colRef=collection(db,"fruits")
export const userRef=collection(db,"User")

// get collection data
getDocs(colRef).then((snapshot)=>{
  console.log(snapshot.docs);
  let fruits=[]
  snapshot.docs.forEach((doc)=>{
    fruits.push({...doc.data(),id:doc.id})
  }) 
  console.log(fruits)
})
.catch(err=>{
  console.log(err.message);
})