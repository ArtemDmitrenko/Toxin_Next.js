import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import InferValueTypes from 'Root/redux/utils';

import RoomsActionTypes from './roomsActionTypes';
import * as actions from './roomsActions';

type RoomsAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomsState = {
  rooms: Array<QueryDocumentSnapshot<DocumentData>>,
  size: number,
  totalPages: number,
  currentPages: number,
  loadingInit: boolean,
  loadingAdditional: boolean,
};

const initialState: RoomsState = {
  rooms: [],
  size: 0,
  totalPages: 1,
  currentPages: 1,
  loadingInit: false,
  loadingAdditional: false,
};

const roomsReducer = (state = initialState, action: RoomsAction): RoomsState => {
  switch (action.type) {
    case RoomsActionTypes.FETCH_ROOMS:
      if (action.payload.isAddition) {
        return {
          ...state,
          rooms: [...state.rooms, ...action.payload.snapshot],
          currentPages: state.currentPages + 1,
        };
      }

      return {
        ...state,
        rooms: action.payload.snapshot,
        size: action.payload.size,
        totalPages: Math.ceil(action.payload.size / action.payload.limit),
      };

    case RoomsActionTypes.SHOW_LOADING_INIT:
      return { ...state, loadingInit: true };

    case RoomsActionTypes.HIDE_LOADING_INIT:
      return { ...state, loadingInit: false };

    case RoomsActionTypes.SHOW_LOADING_ADDITIONAL:
      return { ...state, loadingAdditional: true };

    case RoomsActionTypes.HIDE_LOADING_ADDITIONAL:
      return { ...state, loadingAdditional: false };

    default:
      return state;
  }
};

export type { RoomsState };
export default roomsReducer;
