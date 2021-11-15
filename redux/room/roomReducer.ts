import InferValueTypes from 'Root/redux/utils';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

import RoomActionTypes from './roomActionTypes';
import * as actions from './roomActions';

type RoomAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomState = FirebaseDocumentType | null;

const roomReducer = (state = null, action: RoomAction) => {
  switch (action.type) {
    case RoomActionTypes.FETCH_ROOM:
      return { ...action.payload };

    case RoomActionTypes.CLEAR_ROOM:
      return null;

    default:
      return state;
  }
};

export type { RoomState };
export default roomReducer;
