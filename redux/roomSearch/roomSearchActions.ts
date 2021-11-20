import RoomSearchActionTypes from './roomSearchActionTypes';

type DatesOfStay = {
  arrival: string,
  departure: string,
};

type RoomSearchState = {
  datesOfStay: DatesOfStay,
  numberOfGuests: { [key:string]: number },
  numberOfGuestsByTitle: { [key:string]: number },
};

const setRoomSearchData = (payload: RoomSearchState) => (<const>{
  type: RoomSearchActionTypes.SET_ROOM_SEARCH_DATA,
  payload,
});

export type { RoomSearchState, DatesOfStay };
export { setRoomSearchData };
