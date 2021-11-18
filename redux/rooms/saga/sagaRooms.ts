import { takeEvery, put, call } from 'redux-saga/effects';
import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

import {
  RequestRoomsType,
  RoomsGeneralAction,
  fetchRooms,
  showLoadingInit,
  hideLoadingInit,
} from 'Root/redux/rooms/roomsActions';
import RoomsActionTypes from 'Root/redux/rooms/roomsActionTypes';
import Firebase from 'Root/api/Firebase';
import { SearchFilterState } from 'Components/SearchFilter/SearchFilter';

type RequestInit = RoomsGeneralAction<RoomsActionTypes.REQUEST_ROOMS, RequestRoomsType>;

async function fetchFirebaseRooms(props: {
  documentsLimit: number,
  documentPoint?: QueryDocumentSnapshot<DocumentData>,
  filterConstraints?: SearchFilterState,
}) {
  const { documents, length } = await Firebase.getRooms(props);

  return [documents, length];
}

function* roomsWorker({ payload }: RequestInit) {
  yield put(showLoadingInit());

  const [snapshot, size]: [
    Array<Array<QueryDocumentSnapshot<DocumentData>>>,
    number,
  ] = yield call(
    fetchFirebaseRooms,
    {
      documentsLimit: payload.limit,
      filterConstraints: payload.filterConstraints,
    },
  );

  yield put(fetchRooms({
    snapshot,
    limit: payload.limit,
    size,
  }));
  yield put(hideLoadingInit());
}

function* roomsWatcher() {
  yield takeEvery(RoomsActionTypes.REQUEST_ROOMS, roomsWorker);
}

export default roomsWatcher;
