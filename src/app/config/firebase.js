
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC9ZAscX1xXPSubRPzROFihSQWLoUU5Mmw",
    authDomain: "reacte2isa.firebaseapp.com",
    databaseURL: "https://reacte2isa.firebaseio.com",
    projectId: "reacte2isa",
    storageBucket: "reacte2isa.appspot.com",
    messagingSenderId: "314805492110",
    appId: "1:314805492110:web:0d19571412e9f962d12cdf",
    measurementId: "G-12NPH9EHYK"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;