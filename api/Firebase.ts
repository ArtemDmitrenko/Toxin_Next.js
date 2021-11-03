import { initializeApp } from 'firebase/app';
import { Query, QueryDocumentSnapshot, DocumentData } from '@firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static firestore = getFirestore();

  public static getFullSize = async () => {
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
}

export default Firebase;
