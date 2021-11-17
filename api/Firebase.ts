import { initializeApp } from 'firebase/app';
import {
  QueryDocumentSnapshot,
  DocumentData,
  QueryConstraint,
} from '@firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { SearchFilterState } from 'Root/components/SearchFilter/SearchFilter';

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

  public static firestore = getFirestore();

  public static signInWithEmail = async (
    email: string,
    password: string,
  ) => signInWithEmailAndPassword(this.auth, email, password);

  public static sendPasswordRecovery = async (email: string) => {
    await sendPasswordResetEmail(this.auth, email);
  };

  public static getSize = async (queryConstraints: Array<QueryConstraint> = []) => {
    const request = query(collection(this.firestore, 'rooms'), ...queryConstraints);
    const snapshot = await getDocs(request);

    return snapshot.size;
  };

  public static getRooms = async (props: {
    documentsLimit: number,
    documentPoint?: QueryDocumentSnapshot<DocumentData>,
    filterConstraints?: Array<QueryConstraint>,
  }) => {
    const { documentsLimit, documentPoint, filterConstraints = [] } = props;

    const queryParams: Array<QueryConstraint> = [
      ...filterConstraints,
      orderBy('cost', 'desc'),
      limit(documentsLimit),
    ];

    if (documentPoint) {
      queryParams.push(startAfter(documentPoint));
    }

    const snapshot = await getDocs(query(collection(this.firestore, 'rooms'), ...queryParams));

    return snapshot.docs;
  };

  public static createConstraints = (data: SearchFilterState) => {
    const queryParams: Array<QueryConstraint> = [];

    if (data.rangeSlider) {
      const [min, max] = data.rangeSlider;

      queryParams.push(where('cost', '>=', min));
      queryParams.push(where('cost', '<=', max));
    }

    return queryParams;
  };
}

export default Firebase;
