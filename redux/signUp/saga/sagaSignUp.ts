import Router from 'next/router';
import { takeEvery, put, call } from 'redux-saga/effects';
import Firebase from 'Root/api/Firebase';
import SignUpActionsTypes from 'Root/redux/signUp/signUpActionsTypes';
import {
  UserSignUpData,
  signUpUserError,
  SignUpGeneralAction,
} from 'Root/redux/signUp/signUpActions';

type RequestToSignUp = SignUpGeneralAction<SignUpActionsTypes.SIGNUP_USER_REQUEST, UserSignUpData>;

function* userSignUpRequestWorker(action: RequestToSignUp) {
  const { payload } = action;
  const {
    email,
    password,
    name,
    surname,
  } = payload;

  try {
    yield call(Firebase.createUser, email, password);
    yield call(Firebase.addUserInfo, payload);
    yield call(Firebase.updateUserName, name, surname);
    Router.push('/auth/log-in');
  } catch ({ code }) {
    yield put(signUpUserError({
      error: String(code),
    }));
  }
}

function* userSignUpRequestWatcher() {
  yield takeEvery(SignUpActionsTypes.SIGNUP_USER_REQUEST, userSignUpRequestWorker);
}

export default userSignUpRequestWatcher;
