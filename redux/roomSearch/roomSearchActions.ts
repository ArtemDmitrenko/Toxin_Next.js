import RoomSearchActionTypes from './roomSearchActionTypes';

type Groups = {
  [key: string]: {
    wordforms: [string, string, string],
    items: {
      [key: string]: {
        title: string,
        value: number,
      },
    },
  },
};

type DatesOfStay = {
  arrival: string,
  departure: string,
};

type RoomSearchState = {
  datesOfStay: DatesOfStay,
  numberOfGuests: Groups,
};

const setRoomSearchData = (payload: RoomSearchState) => (<const>{
  type: RoomSearchActionTypes.SET_ROOM_SEARCH_DATA,
  payload,
});

export type { RoomSearchState, DatesOfStay, Groups };
export { setRoomSearchData };
