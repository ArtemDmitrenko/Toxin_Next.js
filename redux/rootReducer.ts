import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import passwordRecoveryReducer, { PasswordRecoveryState } from './auth/passwordRecoveryReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';

type StoreState = {
  auth: AuthState,
  passwordRecovery: PasswordRecoveryState,
  rooms: RoomsState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  rooms: roomsReducer,
});

export default rootReducer;
