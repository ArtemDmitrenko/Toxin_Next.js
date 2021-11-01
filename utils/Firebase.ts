import { initializeApp } from 'firebase/app';

abstract class Firebase {
  private static firebaseConfig = {
    apiKey: 'AIzaSyDjlISC_n81sYbH9ziz66rrYcOnEkNIWQo',
    authDomain: 'toxin-coolhackers.firebaseapp.com',
    projectId: 'toxin-coolhackers',
    storageBucket: 'toxin-coolhackers.appspot.com',
    messagingSenderId: '297163595644',
    appId: '1:297163595644:web:8cc3be821b5e331c2a0ef9',
    measurementId: 'G-71SVNT6E1K',
  };

  public static firebase = initializeApp(this.firebaseConfig);
}

export default Firebase;
