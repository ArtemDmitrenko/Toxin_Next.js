import InferValueTypes from 'Root/redux/utils';

import { RoomSearchState, DatesOfStay } from './roomSearchActions';
import RoomSearchActionTypes from './roomSearchActionTypes';
import * as actions from './roomSearchActions';

type RoomSearchAction = ReturnType<InferValueTypes<typeof actions>>;

const datesOfStay: DatesOfStay = {
  arrival: '',
  departure: '',
};

const numberOfGuests: { [key:string]: number } = {};
const numberOfGuestsByTitle: { [key:string]: number } = {};

const initialState: RoomSearchState = {
  datesOfStay,
  numberOfGuests,
  numberOfGuestsByTitle,
};

const roomSearchReducer = (state = initialState, action: RoomSearchAction): RoomSearchState => {
  switch (action.type) {
    case RoomSearchActionTypes.SET_ROOM_SEARCH_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export type { RoomSearchState };
export default roomSearchReducer;
