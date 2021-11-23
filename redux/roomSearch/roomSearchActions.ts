import { Groups } from 'Components/Dropdown/Dropdown';
import { DatesOfStay } from 'Components/DateRange/DateRange';

import RoomSearchActionTypes from './roomSearchActionTypes';

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
