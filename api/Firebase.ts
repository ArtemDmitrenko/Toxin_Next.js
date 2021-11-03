import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static initAuth = () => {
    const auth = getAuth();
    auth.languageCode = 'ru';

    return auth;
  };

  public static auth = this.initAuth();

  public static sendPasswordRecovery = async (email: string) => {
    await sendPasswordResetEmail(this.auth, email);
  };
}

export default Firebase;
