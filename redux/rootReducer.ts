import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import passwordRecoveryReducer, { PasswordRecoveryState } from './auth/passwordRecoveryReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import likeReducer, { LikeState } from './like/likeReducer';
import roomReducer, { RoomState } from './room/roomReducer';
import signUpReducer, { SignUpState } from './signUp/signUpReducer';

type StoreState = {
  auth: AuthState,
  passwordRecovery: PasswordRecoveryState,
  rooms: RoomsState,
  room: RoomState,
  like: LikeState,
  signUp: SignUpState
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  rooms: roomsReducer,
  like: likeReducer,
  room: roomReducer,
  signUp: signUpReducer,
});

export default rootReducer;
