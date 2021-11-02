import { initializeApp } from 'firebase/app';
import { Query, DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';

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

  public static getFullSize = async () => {
    // временное неоптимальное решение
    const request = query(collection(this.firestore, 'rooms'));
    const snapshot = await getDocs(request);

    return snapshot.size;
  };

  public static getRooms = async (props: {
    documentsLimit: number,
    documentPoint?: QueryDocumentSnapshot<DocumentData>
  }) => {
    const { documentsLimit, documentPoint } = props;

    let request: Query<DocumentData>;

    if (documentPoint) {
      request = query(
        collection(this.firestore, 'rooms'),
        orderBy('cost'),
        limit(documentsLimit),
        startAfter(documentPoint),
      );
    } else {
      request = query(
        collection(this.firestore, 'rooms'),
        orderBy('cost'),
        limit(documentsLimit),
      );
    }

    const snapshot = await getDocs(request);

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
