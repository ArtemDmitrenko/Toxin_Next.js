import SignUpActionsTypes from './signUpActionsTypes';

type SignUpGeneralAction<T, K> = {
  type: T,
  payload: K,
};

type UserSignUpData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  sex: string,
  specialOffers: boolean,
};

type SignUpData = {
  error: string | null,
};

const signUpUserRequest = (payload: UserSignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_REQUEST,
  payload,
});

const signUpUserError = (payload: SignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_ERROR,
  payload,
});

export type { UserSignUpData, SignUpGeneralAction };
export { signUpUserRequest, signUpUserError };
