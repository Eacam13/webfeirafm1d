import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAtuIj5dFIY7NNDwPJBkyap1Qw5AUhAnO4",
  authDomain: "webfeira-46e5a.firebaseapp.com",
  projectId: "webfeira-46e5a",
  storageBucket: "webfeira-46e5a.appspot.com",
  messagingSenderId: "81482740230",
  appId: "1:81482740230:web:4115484485f692ea6bc987"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export  { db }