import { takeEvery, call, put } from 'redux-saga/effects';

import {
  AuthGeneralAction,
  LoginUserRequest,
  setAuthUserData,
  userAuthFailed,
} from 'Root/redux/auth/authActions';
import AuthActionsTypes from 'Root/redux/auth/authActionTypes';
import Firebase from 'Root/api/Firebase';

type RequestToAuth = AuthGeneralAction<AuthActionsTypes, LoginUserRequest>;

function* userLoginRequestWorker({ data }: RequestToAuth) {
  try {
    const { email, password } = data;
    const { user } = yield call(Firebase.signInWithEmail, email, password);

    yield put(setAuthUserData({
      userId: user.uid,
      email: user.email,
      userName: user.displayName,
      error: null,
    }));
  } catch ({ code }) {
    yield put(userAuthFailed({
      userId: null,
      email: null,
      userName: null,
      error: code as string,
    }));
  }
}

function* userLoginRequestWatcher() {
  yield takeEvery(AuthActionsTypes.USER_LOGIN_REQUEST, userLoginRequestWorker);
}

export default userLoginRequestWatcher;
