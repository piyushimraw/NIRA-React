import { auth } from './firebase';

//Login
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//Logout TODO implement in dashboard
export const doSignOut = () =>
  auth.signOut();
