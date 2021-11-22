import { initializeApp } from 'firebase/app';
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  Query,
  QueryDocumentSnapshot,
  DocumentData,
  updateDoc,
  arrayUnion,
} from '@firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';

import { SignUpCardData } from 'Root/components/SignUpCard/SignUpCard';

import firebaseCfg from './firebaseConfig';

abstract class Firebase {
  private static firebaseConfig = firebaseCfg;

  public static firebase = initializeApp(this.firebaseConfig);

  public static createUser = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
  };

  public static addUserInfo = async (usersData: SignUpCardData) => {
    const userUid = this.auth.currentUser?.uid;
    if (userUid) {
      await setDoc(doc(this.firestore, 'users', userUid), {
        name: usersData.name,
        surname: usersData.surname,
        dateOfBirth: usersData.dateOfBirth,
        sex: usersData.sex,
        specialOffers: usersData.specialOffers,
      });
    }
  };

  public static updateUserName = (name: string, surname: string) => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        updateProfile(user, {
          displayName: `${name} ${surname}`,
        });
      }
    });
  };

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

  public static onAuthStateChanged = onAuthStateChanged.bind(this, this.auth);

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

  public static addComment = async (
    userId: string,
    text: string,
    roomNumber: string,
  ) => {
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

  public static getRoom = async (roomNumber: string) => {
    const room = await getDoc(doc(this.firestore, 'rooms', roomNumber));

    return room;
  };

  public static logOut = async () => { signOut(this.auth); };
}

export type { User };
export default Firebase;
