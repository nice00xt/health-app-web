import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBy2MmTxig-pVgb929z9czA58BLCwvYsB0",
    authDomain: "cardiapp-project.firebaseapp.com",
    databaseURL: "https://cardiapp-project.firebaseio.com",
    projectId: "cardiapp-project",
    storageBucket: "cardiapp-project.appspot.com",
    messagingSenderId: "1090939978430",
    appId: "1:1090939978430:web:ddb21db68aff48732294ef",
});

/*const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();*/

export default app;