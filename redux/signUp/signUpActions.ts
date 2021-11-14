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
  specialOffers: boolean | null,
};

type SignUpData = {
  error: string | null,
};

const signUpUserRequest = (payload: UserSignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_REQUEST,
  payload,
});

const signUpUserSuccess = () => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_SUCCESS,
});

const signUpUserError = (payload: SignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_ERROR,
  payload,
});

export type { UserSignUpData, SignUpGeneralAction };
export { signUpUserRequest, signUpUserSuccess, signUpUserError };
