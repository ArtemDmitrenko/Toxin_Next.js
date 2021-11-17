import { takeEvery, put, call } from 'redux-saga/effects';
import { DocumentData, QueryDocumentSnapshot, QueryConstraint } from '@firebase/firestore';

import {
  RequestRoomsType,
  RoomsGeneralAction,
  fetchRooms,
  showLoadingInit,
  hideLoadingInit,
  showLoadingAdditional,
  hideLoadingAdditional,
} from 'Root/redux/rooms/roomsActions';
import RoomsActionTypes from 'Root/redux/rooms/roomsActionTypes';
import Firebase from 'Root/api/Firebase';

type RequestInit = RoomsGeneralAction<RoomsActionTypes.REQUEST_ROOMS, RequestRoomsType>;

async function fetchFirebaseRooms(props: {
  documentsLimit: number,
  documentPoint?: QueryDocumentSnapshot<DocumentData>,
  filterConstraints?: Array<QueryConstraint>,
}) {
  const snapshot = await Firebase.getRooms(props);

  const totalItems = await Firebase.getSize(props.filterConstraints);

  return [snapshot, totalItems];
}

function* roomsWorker({ payload }: RequestInit) {
  if (payload.endDataPoint) {
    yield put(showLoadingAdditional());

    const [snapshot, size]: [Array<QueryDocumentSnapshot<DocumentData>>, number] = yield call(
      fetchFirebaseRooms,
      {
        documentsLimit: payload.limit,
        documentPoint: payload.endDataPoint,
        filterConstraints: payload.filterConstraints,
      },
    );

    yield put(fetchRooms({
      snapshot,
      size,
      limit: payload.limit,
      isAddition: true,
    }));
    yield put(hideLoadingAdditional());
  } else {
    yield put(showLoadingInit());

    const [snapshot, size]: [Array<QueryDocumentSnapshot<DocumentData>>, number] = yield call(
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
      isAddition: false,
    }));
    yield put(hideLoadingInit());
  }
}

function* roomsWatcher() {
  yield takeEvery(RoomsActionTypes.REQUEST_ROOMS, roomsWorker);
}

export default roomsWatcher;
