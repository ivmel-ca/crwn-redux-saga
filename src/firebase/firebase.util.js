import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDd3pvYs4XCmXZcqlt6zZs0GhOW6DLpfB8",
    authDomain: "crwn-db-c76bf.firebaseapp.com",
    databaseURL: "https://crwn-db-c76bf.firebaseio.com",
    projectId: "crwn-db-c76bf",
    storageBucket: "crwn-db-c76bf.appspot.com",
    messagingSenderId: "378990614338",
    appId: "1:378990614338:web:6ea7e33fad2dd802811adb",
    measurementId: "G-5VPBG8EKDB"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;