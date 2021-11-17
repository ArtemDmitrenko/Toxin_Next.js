import { DocumentData, QueryDocumentSnapshot, QueryConstraint } from '@firebase/firestore';

import RoomsActionTypes from './roomsActionTypes';

type RoomsGeneralAction<T, K> = {
  type: T,
  payload: K;
};

type FetchRoomsType = {
  size: number,
  limit: number,
  snapshot: Array<QueryDocumentSnapshot<DocumentData>>,
  isAddition?: boolean,
};

type RequestRoomsType = {
  limit: number,
  endDataPoint?: QueryDocumentSnapshot<DocumentData>,
  filterConstraints?: Array<QueryConstraint>,
};

const requestRooms = (payload: RequestRoomsType) => (<const>{
  type: RoomsActionTypes.REQUEST_ROOMS,
  payload,
});

const fetchRooms = (payload: FetchRoomsType) => (<const>{
  type: RoomsActionTypes.FETCH_ROOMS,
  payload,
});

const showLoadingInit = () => (<const>{
  type: RoomsActionTypes.SHOW_LOADING_INIT,
});

const hideLoadingInit = () => (<const>{
  type: RoomsActionTypes.HIDE_LOADING_INIT,
});

const showLoadingAdditional = () => (<const>{
  type: RoomsActionTypes.SHOW_LOADING_ADDITIONAL,
});

const hideLoadingAdditional = () => (<const>{
  type: RoomsActionTypes.HIDE_LOADING_ADDITIONAL,
});

export type {
  RoomsGeneralAction,
  RequestRoomsType,
};
export {
  requestRooms,
  fetchRooms,
  showLoadingInit,
  hideLoadingInit,
  showLoadingAdditional,
  hideLoadingAdditional,
};
