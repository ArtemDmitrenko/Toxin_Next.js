import { takeEvery, put, call } from 'redux-saga/effects';
import Firebase from 'Root/api/Firebase';
import SignUpActionsTypes from 'Root/redux/signUp/signUpActionsTypes';
import {
  UserSignUpData,
  signUpUserSuccess,
  signUpUserError,
  SignUpGeneralAction,
} from 'Root/redux/signUp/signUpActions';

type RequestToSignUp = SignUpGeneralAction<SignUpActionsTypes.SIGNUP_USER_REQUEST, UserSignUpData>;

function* userSignUpRequestWorker(action: RequestToSignUp) {
  const { payload } = action;
  try {
    yield call(Firebase.createUser, payload.email, payload.password);
    yield call(Firebase.addUserInfo, payload);
    yield call(Firebase.updateUserName, payload.name, payload.surname);
    yield put(signUpUserSuccess());
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
