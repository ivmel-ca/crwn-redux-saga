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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch(err) {
            console.error('error creating user', err.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
  });
  return  await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
      const { title, items} = doc.data();

      return {
          routeName: encodeURI(title.toLowerCase()),
          id: doc.id,
          title,
          items,
      };
  });

  return transformedCollection.reduce(
      (accumulator, collection) => {
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      }, {})
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;