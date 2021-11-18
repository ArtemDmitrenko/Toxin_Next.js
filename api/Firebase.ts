import { initializeApp } from 'firebase/app';

import {
  Query,
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
  arrayUnion,
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  doc,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import { ReviewCardData } from 'Root/components/ReviewCard/ReviewCard';
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
        orderBy('cost', 'desc'),
        limit(documentsLimit),
        startAfter(documentPoint),
      );
    } else {
      request = query(
        collection(this.firestore, 'rooms'),
        orderBy('cost', 'desc'),
        limit(documentsLimit),
      );
    }

    const snapshot = await getDocs(request);

    return snapshot.docs;
  };

  public static addComment = async (reviewCardData: ReviewCardData) => {
    const { userId, text, roomNumber } = reviewCardData;
    const docRef = doc(this.firestore, `rooms/${roomNumber}`);
    await updateDoc(docRef, {
      commentaries: arrayUnion({
        userId,
        date: new Date(),
        text,
        likes: [],
      }),
    });
  };
}

export default Firebase;
