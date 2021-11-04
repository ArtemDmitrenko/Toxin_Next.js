import { takeEvery, call, put } from 'redux-saga/effects';

import Firebase from 'Root/api/Firebase';
import {
  AuthGeneralAction,
  LoginUserRequest,
  setAuthUserData,
  userAuthFailed,
} from '../authActions';
import AuthActionsTypes from '../authActionTypes';

type RequestToAuth = AuthGeneralAction<AuthActionsTypes.SET_AUTH_USER_DATA, LoginUserRequest>;

function* userLoginRequestWorker({ data }: RequestToAuth) {
  try {
    const { email, password } = data;
    const { user } = yield call(Firebase.singInWithEmail, email, password);

    yield put(setAuthUserData({
      userId: user.uid,
      email: user.email,
      error: '',
    }));
  } catch ({ code }) {
    yield put(userAuthFailed({
      userId: '',
      email: '',
      error: code as string,
    }));
  }
}

function* userLoginRequestWatcher() {
  yield takeEvery(AuthActionsTypes.USER_LOGIN_REQUEST, userLoginRequestWorker);
}

export default userLoginRequestWatcher;
