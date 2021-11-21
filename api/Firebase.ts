import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  QueryDocumentSnapshot,
  DocumentData,
  QueryConstraint,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  orderBy,
  startAfter,
} from 'firebase/firestore';

import { SignUpCardData } from 'Root/components/SignUpCard/SignUpCard';

import { SearchFilterState } from 'Root/components/SearchFilter/SearchFilter';

import filterDocumentsByConstraints from './helpers/filterDocumentsByConstraints';
import separateToPages from './helpers/separateToPages';
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

  public static getRoom = async (roomNumber: string) => {
    const room = await getDoc(doc(this.firestore, 'rooms', roomNumber));

    return room;
  };

  public static logOut = async () => { signOut(this.auth); };
}

export default Firebase;
