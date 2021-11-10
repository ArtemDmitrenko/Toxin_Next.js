import { initializeApp } from 'firebase/app';

import {
  Query,
  QueryDocumentSnapshot,
  DocumentData,
  setDoc,
} from '@firebase/firestore';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  startAfter,
  limit,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import RoomReviews from 'Components/Pagination/helpers/RoomReviews';
import roomInformation from 'Components/RoomInformation/roomInformation.json';

import firebaseCfg from './firebaseConfig';
import FirebaseDocumentType from './FirebaseDocumentType';

type OldFirebaseDocumentType = {
  room: number,
  level: string,
  cost: number,
  reviews: RoomReviews,
  images: Array<{
    alt: string,
    src: string,
  }>,
};

function getRandomArbitrary(min: number, max: number, step?: number) {
  const generatedNumber = Math.floor((Math.random() * (max - min)) + 0.5) + min;

  if (step) {
    return Math.floor(generatedNumber / step) * step;
  }

  return generatedNumber;
}

const mutateDocuments = (docs: Array<OldFirebaseDocumentType>) => {
  const newDocs: Array<FirebaseDocumentType> = [];

  docs.forEach((document) => {
    const newBedrooms = getRandomArbitrary(1, 3);

    newDocs.push({
      ...document,
      reserved: [],
      rules: {
        allowSmoke: !!getRandomArbitrary(0, 1),
        allowPets: !getRandomArbitrary(0, 2),
        allowGuests: !getRandomArbitrary(0, 5),
      },
      accessibility: {
        isWideHall: !!getRandomArbitrary(0, 1),
        isHelper: !getRandomArbitrary(0, 5),
      },
      facilities: {
        bedrooms: newBedrooms,
        beds: newBedrooms + getRandomArbitrary(0, 2),
        bathrooms: getRandomArbitrary(1, 2),
      },
      additions: {
        breakfast: !!getRandomArbitrary(0, 5),
        desk: !!getRandomArbitrary(0, 5),
        feedingChair: !!getRandomArbitrary(0, 5),
        crib: !!getRandomArbitrary(0, 5),
        television: !!getRandomArbitrary(0, 5),
        shampoo: !!getRandomArbitrary(0, 5),
        additionTelevision: !!getRandomArbitrary(0, 3),
        additionShampoo: !!getRandomArbitrary(0, 5),
      },
      details: [...(roomInformation.slice(
        getRandomArbitrary(0, 1),
        getRandomArbitrary(1, 2),
      ))],
      commentaries: [],
    });
  });

  return newDocs;
};

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

  public static modifyCollection = async () => {
    const snapshot = await getDocs(collection(this.firestore, 'rooms'));
    const docs = snapshot.docs.map((document) => (
      document.data()
    )) as Array<OldFirebaseDocumentType>;

    const mutatedDocs = mutateDocuments(docs);

    mutatedDocs.forEach(async (document) => {
      await setDoc(doc(this.firestore, 'rooms', String(document.room)), document);
    });
  };
}

// Чтобы перезаписать данные на сервере расскоментируйте строку ниже
// она будет приведена в соответствие с заданной функцией mutateDocuments
// Firebase.modifyCollection();

export default Firebase;
