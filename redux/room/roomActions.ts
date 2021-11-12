import RoomActionTypes from './roomActionTypes';

type RequestRoomType = {
  roomNumber: number
};

const requestRoom = (payload: RequestRoomType) => (<const>{
  type: RoomActionTypes.REQUEST_ROOM,
  payload,
});

const fetchRoom = (payload: RequestRoomType) => (<const>{
  type: RoomActionTypes.FETCH_ROOM,
  payload,
});

export { requestRoom, fetchRoom };
