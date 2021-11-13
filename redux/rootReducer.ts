import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import signUpReducer, { SignUpState } from './signUp/signUpReducer';

type StoreState = {
  auth: AuthState,
  rooms: RoomsState,
  signUp: SignUpState
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  rooms: roomsReducer,
  signUp: signUpReducer,
});

export default rootReducer;
