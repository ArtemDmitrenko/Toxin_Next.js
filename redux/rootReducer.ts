import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';

type StoreState = {
  auth: AuthState,
  rooms: RoomsState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  rooms: roomsReducer,
});

export default rootReducer;
