import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// import roomsMock from 'Root/public/rooms-mock/rooms.json';

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

  public static firestore = getFirestore();

  public static getRooms = async () => {
    const snapshot = await getDocs(collection(this.firestore, 'rooms'));

    return snapshot;
  };

  // метод заполняющий базу на облаке Firebase на основе public/rooms-mock/rooms.json
  //
  // public static fillCollection = () => {
  //   roomsMock.forEach(async (room) => {
  //     await setDoc(doc(this.firestore, 'rooms', String(room.room)), room);
  //   });
  // };
}

export default Firebase;
