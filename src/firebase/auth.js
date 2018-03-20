import { auth } from './firebase';

//Login
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//LogOut
export const doSignOut = () =>
  console.log("Signed out");
  auth.signOut();
