import { takeEvery, call, put } from 'redux-saga/effects';

import {
  usersSuccess,
  UsersData,
} from 'Root/redux/users/usersActions';
import UsersActionTypes from 'Root/redux/users/usersActionTypes';
import Firebase from 'Root/api/Firebase';

async function fetchFirebaseUsers() {
  const snapshot = await Firebase.getUsers();
  const users: UsersData = [];

  snapshot.forEach((doc) => {
    const { id } = doc;
    const user = doc.data();

    const result = {
      id,
      user,
    };
    users.push(result);
  });

  return users;
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
