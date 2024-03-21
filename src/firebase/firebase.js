import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";

//

// Sign up new users

const auth1 = getAuth();
createUserWithEmailAndPassword(auth1, email, password)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

//

// Sign in existing users

const auth2 = getAuth();
signInWithEmailAndPassword(auth2, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

//

// Set an authentication state observer and get user data

const auth3 = getAuth();
onAuthStateChanged(auth3, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

//

// Sign out


