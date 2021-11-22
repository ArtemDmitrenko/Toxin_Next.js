import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import passwordRecoveryReducer, { PasswordRecoveryState } from './auth/passwordRecoveryReducer';
import commentReducer, { CommentState } from './comment/commentReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import likeReducer, { LikeState } from './like/likeReducer';
import roomReducer, { RoomState } from './room/roomReducer';
import signUpReducer, { SignUpState } from './signUp/signUpReducer';
import reservationReducer, { ReservationState } from './reservation/reservationReducer';
import usersReducer, { UsersState } from './users/usersReducer';

type StoreState = {
  auth: AuthState,
  passwordRecovery: PasswordRecoveryState,
  rooms: RoomsState,
  comment: CommentState,
  room: RoomState,
  signUp: SignUpState,
  reservation: ReservationState,
  like: LikeState,
  users: UsersState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  rooms: roomsReducer,
  like: likeReducer,
  comment: commentReducer,
  room: roomReducer,
  signUp: signUpReducer,
  reservation: reservationReducer,
  users: usersReducer,
});

export default rootReducer;
