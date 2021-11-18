import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import InferValueTypes from 'Root/redux/utils';

import RoomsActionTypes from './roomsActionTypes';
import * as actions from './roomsActions';

type RoomsAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomsState = {
  rooms: Array<Array<QueryDocumentSnapshot<DocumentData>>>,
  size: number,
  totalPages: number,
  currentPages: number,
  loadingInit: boolean,
};

const initialState: RoomsState = {
  rooms: [],
  size: 0,
  totalPages: 1,
  currentPages: 1,
  loadingInit: false,
};

const roomsReducer = (state = initialState, action: RoomsAction): RoomsState => {
  switch (action.type) {
    case RoomsActionTypes.FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload.snapshot,
        size: action.payload.size,
        currentPages: 1,
        totalPages: Math.ceil(action.payload.size / action.payload.limit),
      };

    case RoomsActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPages: action.payload.newCurrentPage };

    case RoomsActionTypes.SHOW_LOADING_INIT:
      return { ...state, loadingInit: true };

    case RoomsActionTypes.HIDE_LOADING_INIT:
      return { ...state, loadingInit: false };

    default:
      return state;
  }
};

export type { RoomsState };
export default roomsReducer;
