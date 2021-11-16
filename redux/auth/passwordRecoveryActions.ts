import PasswordRecoveryActionTypes from './passwordRecoveryActionTypes';

type AuthGeneralAction<T, K> = {
  type: T,
  data: K;
};

type PasswordRecoveryData = {
  isEmail: boolean,
  error: string | null,
};

type PasswordRecoveryRequest = {
  email: string,
};

const passwordRecoveryRequest = (data: PasswordRecoveryRequest) => (<const>{
  type: PasswordRecoveryActionTypes.PASSWORD_RECOVERY_REQUEST,
  data,
});

const passwordRecoverySuccess = (data: PasswordRecoveryData) => (<const>{
  type: PasswordRecoveryActionTypes.PASSWORD_RECOVERY_SUCCESS,
  data,
});

const passwordRecoveryFailed = (data: PasswordRecoveryData) => (<const>{
  type: PasswordRecoveryActionTypes.PASSWORD_RECOVERY_FAILED,
  data,
});

export type { AuthGeneralAction, PasswordRecoveryRequest };
export {
  passwordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFailed,
};
