import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import passwordRecoveryReducer, { PasswordRecoveryState } from './auth/passwordRecoveryReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import roomReducer, { RoomState } from './room/roomReducer';
import signUpReducer, { SignUpState } from './signUp/signUpReducer';
import roomSearchReducer, { RoomSearchState } from './roomSearch/roomSearchReducer';

type StoreState = {
  auth: AuthState,
  passwordRecovery: PasswordRecoveryState,
  rooms: RoomsState,
  signUp: SignUpState,
  roomSearch: RoomSearchState,
  room: RoomState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  rooms: roomsReducer,
  room: roomReducer,
  signUp: signUpReducer,
  roomSearch: roomSearchReducer,
});

export default rootReducer;
