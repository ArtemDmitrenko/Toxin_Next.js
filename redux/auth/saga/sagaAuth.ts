import { takeEvery, call, put } from 'redux-saga/effects';

import {
  AuthGeneralAction,
  LoginUserRequest,
  setAuthUserData,
  userAuthFailed,
  passwordRecoverySuccess,
  passwordRecoveryFailed,
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

function* userPasswordRecoveryRequestWorker({ data }: RequestToAuth) {
  try {
    const { email } = data;
    yield call(Firebase.sendPasswordRecovery, email);

    yield put(passwordRecoverySuccess({
      userId: null,
      email,
      userName: null,
      error: null,
    }));
  } catch ({ code }) {
    const { email } = data;
    yield put(passwordRecoveryFailed({
      userId: null,
      email,
      userName: null,
      error: code as string,
    }));
  }
}

function* userLoginRequestWatcher() {
  yield takeEvery(AuthActionsTypes.USER_LOGIN_REQUEST, userLoginRequestWorker);
}

function* passwordRecoveryRequestWatcher() {
  yield takeEvery(AuthActionsTypes.PASSWORD_RECOVERY_REQUEST, userPasswordRecoveryRequestWorker);
}

export { userLoginRequestWatcher, passwordRecoveryRequestWatcher };
