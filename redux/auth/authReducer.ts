import InferValueTypes from 'Root/redux/utils';

import AuthActionsTypes from './authActionTypes';
import * as actions from './authActions';

type AuthState = {
  userId: string | null,
  email: string | null,
  userName: string | null,
  isAuth: boolean,
  error: string,
};

const initialState: AuthState = {
  userId: null,
  email: null,
  userName: null,
  isAuth: false,
  error: '',
};

type AuthAction = ReturnType<InferValueTypes<typeof actions>>;

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionsTypes.SET_AUTH_USER_DATA:
      return { ...state, ...action.data, isAuth: true };
    case AuthActionsTypes.SET_AUTH_USER_FAILED_STATUS:
      return { ...state, ...action.data, isAuth: false };

    default:
      return state;
  }
};

export type { AuthState };
export default authReducer;
