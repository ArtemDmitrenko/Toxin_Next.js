import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

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

  public static updateUserName = (name: string) => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        updateProfile(user, {
          displayName: name,
        });
      }
    });
  };
}

export default Firebase;
