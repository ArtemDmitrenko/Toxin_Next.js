import { EventChannel, eventChannel } from 'redux-saga';
import {
  takeEvery,
  call,
  put,
  take,
} from 'redux-saga/effects';

import {
  AuthGeneralAction,
  LoginUserRequest,
  setAuthUserData,
  userAuthFailed,
  userLogoutSuccess,
} from 'Root/redux/auth/authActions';
import AuthActionsTypes from 'Root/redux/auth/authActionTypes';
import Firebase, { User } from 'Root/api/Firebase';

type RequestToAuth = AuthGeneralAction<AuthActionsTypes, LoginUserRequest>;

const getAuthChannel = async () => eventChannel((emit) => {
  const unsubscribe = Firebase.onAuthStateChanged((user) => emit({ user }));
  return unsubscribe;
});

function* authSuccess(user: User) {
  yield put(setAuthUserData({
    userId: user.uid,
    email: user.email,
    userName: user.displayName,
    error: null,
  }));
}

function* authFailed(code: string) {
  yield put(userAuthFailed({
    userId: null,
    email: null,
    userName: null,
    error: code,
  }));
}

function* userLoginRequestWorker({ data }: RequestToAuth) {
  try {
    const { email, password } = data;
    const { user } = yield call(Firebase.signInWithEmail, email, password);

    yield authSuccess(user);
  } catch ({ code }) {
    yield authFailed(String(code));
  }
}

function* checkAuthWorker() {
  try {
    const channel: EventChannel<unknown> = yield call(getAuthChannel);
    const { user } = yield take(channel);

    yield authSuccess(user);
  } catch ({ code }) {
    if (code !== undefined) yield authFailed(String(code));
  }
}

function* userLogoutRequestWorker() {
  yield call(Firebase.logOut);

  yield put(userLogoutSuccess({
    userId: null,
    email: null,
    userName: null,
    error: null,
  }));
}

function* userLoginRequestWatcher() {
  yield takeEvery(AuthActionsTypes.USER_LOGIN_REQUEST, userLoginRequestWorker);
  yield takeEvery(AuthActionsTypes.GET_USER_STATUS, checkAuthWorker);
}

function* userLogoutRequestWatcher() {
  yield takeEvery(AuthActionsTypes.USER_LOGOUT_REQUEST, userLogoutRequestWorker);
}

export { userLoginRequestWatcher, userLogoutRequestWatcher };
