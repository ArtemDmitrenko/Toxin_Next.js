import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import InferValueTypes from 'Root/redux/utils';

import RoomsActionTypes from './roomsActionTypes';
import * as actions from './roomsActions';

type RoomsAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomsState = {
  rooms: Array<Array<QueryDocumentSnapshot<DocumentData>>>,
  size: number,
  totalPages: number,
  currentPage: number,
  loadingInit: boolean,
};

const initialState: RoomsState = {
  rooms: [],
  size: 0,
  totalPages: 1,
  currentPage: 1,
  loadingInit: false,
};

const roomsReducer = (state = initialState, action: RoomsAction): RoomsState => {
  switch (action.type) {
    case RoomsActionTypes.FETCH_ROOMS:
      return {
        ...state,
        rooms: action.payload.snapshot,
        size: action.payload.size,
        currentPage: 1,
        totalPages: action.payload.snapshot.length,
      };

    case RoomsActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload.newCurrentPage };

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
