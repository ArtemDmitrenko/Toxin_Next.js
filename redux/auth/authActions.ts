import AuthActionsTypes from './authActionTypes';

type AuthUserData = {
  userId: string | null,
  email: string | null,
};

const setAuthUserData = (data: AuthUserData) => (<const>{
  type: AuthActionsTypes.SET_AUTH_USER_DATA,
  data,
});

export default setAuthUserData;
