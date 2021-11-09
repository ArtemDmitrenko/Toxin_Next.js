import AuthActionsTypes from './authActionTypes';

type AuthGeneralAction<T, K> = {
  type: T,
  data: K;
};

type AuthUserData = {
  userId: string | null,
  email: string | null,
  userName: string | null,
  error: string,
};

type LoginUserRequest = {
  email: string,
  password: string,
};

const setAuthUserData = (data: AuthUserData) => (<const>{
  type: AuthActionsTypes.SET_AUTH_USER_DATA,
  data,
});

const userAuthFailed = (data: AuthUserData) => (<const>{
  type: AuthActionsTypes.SET_AUTH_USER_FAILED_STATUS,
  data,
});

const userLoginRequest = (data: LoginUserRequest) => (<const>{
  type: AuthActionsTypes.USER_LOGIN_REQUEST,
  data,
});

export type { LoginUserRequest, AuthGeneralAction };
export { setAuthUserData, userLoginRequest, userAuthFailed };
