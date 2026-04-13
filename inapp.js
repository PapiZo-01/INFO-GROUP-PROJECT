const firebaseConfig = {
    apiKey: "AIzaSyCwy0fN1idfa6TD-aTUYPgmcX-qMhRQYI8",
    authDomain: "uwispots.firebaseapp.com",
    projectId: "uwispots",
    storageBucket: "uwispots.firebasestorage.app",
    messagingSenderId: "185820235293",
    appId: "1:185820235293:web:2384e8c62f465c6d0628f4"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
