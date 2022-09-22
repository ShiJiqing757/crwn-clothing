import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAKmfn1IlEkDBdEF_Z95hX6tJv5CCy26HU",
    authDomain: "crwn-clothing-db-30b96.firebaseapp.com",
    projectId: "crwn-clothing-db-30b96",
    storageBucket: "crwn-clothing-db-30b96.appspot.com",
    messagingSenderId: "781301227586",
    appId: "1:781301227586:web:8c466b395bfb1587d14ddb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const { displayName,email } = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                ...additionalInformation,
            });
        } catch(error){
            console.log('error creating the user',error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if (!email || !password) return;

    return await signInAuthUserWithEmailAndPassword(auth,email,password);
}