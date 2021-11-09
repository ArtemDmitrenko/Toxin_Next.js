import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static auth = getAuth();

  public static signInWithEmail = async (
    email:string,
    password:string,
  ) => signInWithEmailAndPassword(this.auth, email, password);
}

export default Firebase;
