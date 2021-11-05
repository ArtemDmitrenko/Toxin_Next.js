import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { SignUpCardData } from 'Components/SignUpCard/SignUpCard';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static auth = getAuth(this.firebase);

  public static createUser = async (data: SignUpCardData) => {
    await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password,
    );
  };
}

export default Firebase;
