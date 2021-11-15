import { takeEvery, call, put } from 'redux-saga/effects';

import {
  AuthGeneralAction,
  PasswordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFailed,
} from 'Root/redux/auth/passwordRecoveryActions';
import PasswordRecoveryActionsTypes from 'Root/redux/auth/passwordRecoveryActionTypes';
import Firebase from 'Root/api/Firebase';

type RequestToAuth = AuthGeneralAction<PasswordRecoveryActionsTypes, PasswordRecoveryRequest>;

function* userPasswordRecoveryRequestWorker({ data }: RequestToAuth) {
  try {
    const { email } = data;
    yield call(Firebase.sendPasswordRecovery, email);

    yield put(passwordRecoverySuccess({
      isEmail: true,
      error: null,
    }));
  } catch ({ code }) {
    yield put(passwordRecoveryFailed({
      isEmail: false,
      error: '400',
    }));
  }
}

function* passwordRecoveryRequestWatcher() {
  yield takeEvery(
    PasswordRecoveryActionsTypes.PASSWORD_RECOVERY_REQUEST,
    userPasswordRecoveryRequestWorker,
  );
}

export default passwordRecoveryRequestWatcher;
