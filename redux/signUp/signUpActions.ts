import SignUpActionsTypes from './signUpActionsTypes';

type SignUpGeneralAction<T, K> = {
  type: T,
  payload: K,
};

type UserSignUpData = {
  name: string | null,
  surname: string | null,
  dateOfBirth: string | null,
  email: string | null,
  password: string | null,
  sex: string | null,
  specialOffers?: boolean | null,
};

type SignUpStateData = {
  error: string | null
};

const signUpUserRequest = (payload: UserSignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_REQUEST,
  payload,
});

const signUpUserSuccess = (payload: SignUpStateData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_SUCCESS,
  payload,
});

const signUpUserError = (payload: SignUpStateData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_ERROR,
  payload,
});

export type { UserSignUpData, SignUpGeneralAction };
export { signUpUserRequest, signUpUserSuccess, signUpUserError };
