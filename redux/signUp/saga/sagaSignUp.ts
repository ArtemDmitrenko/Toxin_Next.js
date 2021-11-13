import { takeEvery, call, put } from 'redux-saga/effects';
import Firebase from 'Root/api/Firebase';
import SignUpActionsTypes from '../signUpActionsTypes';
import {
  UserSignUpData,
  signUpUserSuccess,
  signUpUserError,
  SignUpGeneralAction,
} from '../signUpActions';

type RequestToSignUp = SignUpGeneralAction<SignUpActionsTypes.SIGNUP_USER_REQUEST, UserSignUpData>;

function* userSignUpRequestWorker(action: RequestToSignUp) {
  const { payload } = action;
  try {
    yield call(Firebase.createUser, payload.email, payload.password);
    // здесь будет еще одно асинхронная функция по добавлению данных о пользователе в Firestore
    yield put(signUpUserSuccess());
  } catch ({ code }) {
    yield put(signUpUserError({
      error: code as string,
      isSignUp: false,
    }));
  }
}

function* userSignUpRequestWatcher() {
  yield takeEvery(SignUpActionsTypes.SIGNUP_USER_REQUEST, userSignUpRequestWorker);
}

export default userSignUpRequestWatcher;
