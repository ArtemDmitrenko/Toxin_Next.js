import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static auth = getAuth;
}

export default Firebase;
