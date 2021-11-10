import AuthActionsTypes from './authActionTypes';

type AuthGeneralAction<T, K> = {
  type: T,
  data: K;
};

type AuthUserData = {
  userId: string | null,
  email: string | null,
  userName: string | null,
  error: string | null,
};

type LoginUserRequest = {
  email: string,
  password: string,
};

type PasswordRecoveryRequest = {
  email: string,
}

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

const passwordRecoveryRequest = (data: PasswordRecoveryRequest) => (<const>{
  type: AuthActionsTypes.PASSWORD_RECOVERY_REQUEST,
  data,
});

const passwordRecoverySuccess = (data: AuthUserData) => (<const>{
  type: AuthActionsTypes.PASSWORD_RECOVERY_SUCCESS,
  data,
});

const passwordRecoveryFailed = (data: AuthUserData) => (<const>{
  type: AuthActionsTypes.PASSWORD_RECOVERY_FAILED,
  data,
});

export type { LoginUserRequest, PasswordRecoveryRequest, AuthGeneralAction };
export {
  setAuthUserData,
  userLoginRequest,
  userAuthFailed,
  passwordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFailed
};
