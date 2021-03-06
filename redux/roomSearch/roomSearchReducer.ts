import InferValueTypes from 'Root/redux/utils';

import { Groups, RoomSearchState, DatesOfStay } from './roomSearchActions';
import RoomSearchActionTypes from './roomSearchActionTypes';
import * as actions from './roomSearchActions';

type RoomSearchAction = ReturnType<InferValueTypes<typeof actions>>;

const datesOfStay: DatesOfStay = {
  arrival: '',
  departure: '',
};

const numberOfGuests: Groups = {};

const initialState: RoomSearchState = {
  datesOfStay,
  numberOfGuests,
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
