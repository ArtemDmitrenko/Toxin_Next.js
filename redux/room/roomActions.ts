import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

import RoomActionTypes from './roomActionTypes';

type RoomGeneralAction<T, K> = {
  type: T,
  payload: K;
};

type RequestRoomType = {
  roomNumber: string
};

const requestRoom = (payload: RequestRoomType) => (<const>{
  type: RoomActionTypes.REQUEST_ROOM,
  payload,
});

const fetchRoom = (payload: FirebaseDocumentType) => (<const>{
  type: RoomActionTypes.FETCH_ROOM,
  payload,
});

const clearRoom = () => (<const>{
  type: RoomActionTypes.CLEAR_ROOM,
});

export type { RoomGeneralAction, RequestRoomType };
export { requestRoom, fetchRoom, clearRoom };
