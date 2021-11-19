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
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { SearchFilterState } from 'Root/components/SearchFilter/SearchFilter';

import filterDocumentsByConstraints from './helpers/filterDocumentsByConstraints';
import separateToPages from './helpers/separateToPages';
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

  public static getRooms = async (props: {
    documentsLimit: number,
    documentPoint?: QueryDocumentSnapshot<DocumentData>,
    filterConstraints?: SearchFilterState,
  }) => {
    const { documentsLimit, documentPoint, filterConstraints } = props;

    const queryParams: Array<QueryConstraint> = [
      orderBy('cost', 'desc'),
    ];

    if (documentPoint) {
      queryParams.push(startAfter(documentPoint));
    }

    const snapshot = await getDocs(query(collection(this.firestore, 'rooms'), ...queryParams));

    const documents = snapshot.docs;

    const filteredDocuments = filterDocumentsByConstraints(documents, filterConstraints);

    return {
      documents: separateToPages(filteredDocuments, documentsLimit),
      length: filteredDocuments.length,
    };
  };
}

export default Firebase;
