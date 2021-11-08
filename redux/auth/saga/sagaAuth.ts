import { takeEvery, call, put } from 'redux-saga/effects';

import {
  AuthGeneralAction,
  LoginUserRequest,
  setAuthUserData,
  userAuthFailed,
} from 'Root/redux/auth/authActions';
import AuthActionsTypes from 'Root/redux/auth/authActionTypes';
import Firebase from 'Root/api/Firebase';

type RequestToAuth = AuthGeneralAction<AuthActionsTypes.SET_AUTH_USER_DATA, LoginUserRequest>;

function* userLoginRequestWorker({ data }: RequestToAuth) {
  try {
    const { email, password } = data;
    const { user } = yield call(Firebase.signInWithEmail, email, password);

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
