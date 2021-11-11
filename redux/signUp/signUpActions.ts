import SignUpActionsTypes from './signUpActionsTypes';

// type userRegistrationAction<T, K> = {
//   type: T,
//   payload: K,
// };

type UserSignUpData = {
  name: string,
  surname: string,
  dateOfBirth: string,
  email: string,
  password: string,
  sex: string,
  specialOffers?: boolean
};

type UserSignUpErrorData = {
  error: string,
};

const signUpUser = (payload: UserSignUpData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER,
  payload,
});

const signUpUserSuccess = () => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_SUCCESS,
});

const signUpUserError = (payload: UserSignUpErrorData) => (<const>{
  type: SignUpActionsTypes.SIGNUP_USER_ERROR,
  payload,
});

export { signUpUser, signUpUserSuccess, signUpUserError };
