import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCs2V4vHW0x4LmWJdYLMzgLxEMTW2f0GeU",
  authDomain: "nira-android.firebaseapp.com",
  databaseURL: "https://nira-android.firebaseio.com",
  projectId: "nira-android",
  storageBucket: "nira-android.appspot.com",
  messagingSenderId: "296340034835"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
