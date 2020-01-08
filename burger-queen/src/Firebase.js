import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2YuJ9ugP-UpSd0l0lq3lQnaem3iwi8os",
    authDomain: "burger-queen-b969a.firebaseapp.com",
    databaseURL: "https://burger-queen-b969a.firebaseio.com",
    projectId: "burger-queen-b969a",
    storageBucket: "burger-queen-b969a.appspot.com",
    messagingSenderId: "129096169064",
    appId: "1:129096169064:web:501f80d4aad04f36bfeddd",
    measurementId: "G-EBW4MRGNCV"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;