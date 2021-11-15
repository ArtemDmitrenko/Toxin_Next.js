import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';
import roomsReducer, { RoomsState } from './rooms/roomsReducer';
import roomReducer, { RoomState } from './room/roomReducer';

type StoreState = {
  auth: AuthState,
  rooms: RoomsState,
  room: RoomState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  rooms: roomsReducer,
  room: roomReducer,
});

export default rootReducer;
