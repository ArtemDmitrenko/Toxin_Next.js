import InferValueTypes from 'Root/redux/utils';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

import RoomActionTypes from './roomActionTypes';
import * as actions from './roomActions';

type RoomAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomState = FirebaseDocumentType;

const initialState: RoomState = {
  room: 0,
  level: '',
  cost: 0,
  reviews: {},
  images: [],
  reserved: [],
  rules: {},
  accessibility: {},
  facilities: {
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  },
  additions: {},
  details: [],
  commentaries: [],
};

const roomReducer = (state = initialState, action: RoomAction) => {
  switch (action.type) {
    case RoomActionTypes.FETCH_ROOM:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export type { RoomState };
export default roomReducer;
