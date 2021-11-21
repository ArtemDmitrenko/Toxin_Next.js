import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import UsersActionTypes from './usersActionTypes';

type UsersData = Array<QueryDocumentSnapshot<DocumentData>>;

const usersRequest = () => (<const>{
  type: UsersActionTypes.USERS_REQUEST,
});

const usersSuccess = (data: UsersData) => (<const>{
  type: UsersActionTypes.USERS_SUCCESS,
  data,
});

export type { UsersData };
export { usersRequest, usersSuccess };
