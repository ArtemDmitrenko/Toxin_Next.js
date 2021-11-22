import { takeEvery, call, put } from 'redux-saga/effects';

import {
  usersSuccess,
  UsersData,
} from 'Root/redux/users/usersActions';
import UsersActionTypes from 'Root/redux/users/usersActionTypes';
import Firebase from 'Root/api/Firebase';

async function fetchFirebaseUsers() {
  const snapshot = await Firebase.getUsers();

  return snapshot;
}

function* usersRequestWorker() {
  const snapshot: UsersData = yield call(fetchFirebaseUsers);

  yield put(usersSuccess(snapshot));
}

function* usersRequestWatcher() {
  yield takeEvery(
    UsersActionTypes.USERS_REQUEST,
    usersRequestWorker,
  );
}

export default usersRequestWatcher;
