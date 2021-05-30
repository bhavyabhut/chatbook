import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyDQeSyhD4Xe3RFNHSqsM4xup1tL45XpOzg",
    authDomain: "chatbook-c303f.firebaseapp.com",
    projectId: "chatbook-c303f",
    storageBucket: "chatbook-c303f.appspot.com",
    messagingSenderId: "441707560405",
    appId: "1:441707560405:web:a61035392df357d4f8915c"
  }).auth()
