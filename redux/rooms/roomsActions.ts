import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import { SearchFilterState } from 'Components/SearchFilter/SearchFilter';

import RoomsActionTypes from './roomsActionTypes';

type RoomsGeneralAction<T, K> = {
  type: T,
  payload: K;
};

type FetchRoomsType = {
  size: number,
  limit: number,
  snapshot: Array<Array<QueryDocumentSnapshot<DocumentData>>>,
};

type RequestRoomsType = {
  limit: number,
  filterConstraints?: SearchFilterState,
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

const setCurrentPage = (payload: { newCurrentPage: number }) => (<const>{
  type: RoomsActionTypes.SET_CURRENT_PAGE,
  payload,
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
  setCurrentPage,
};
