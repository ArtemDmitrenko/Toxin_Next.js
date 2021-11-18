import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import passwordRecoveryReducer, { PasswordRecoveryState } from './auth/passwordRecoveryReducer';
import commentReducer, { CommentState } from './comment/commentReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import signUpReducer, { SignUpState } from './signUp/signUpReducer';

type StoreState = {
  auth: AuthState,
  passwordRecovery: PasswordRecoveryState,
  rooms: RoomsState,
  comment: CommentState,
  signUp: SignUpState
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  rooms: roomsReducer,
  comment: commentReducer,
  signUp: signUpReducer,
});

export default rootReducer;
