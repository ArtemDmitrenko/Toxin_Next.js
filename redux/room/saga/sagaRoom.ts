import { takeEvery, put, call } from 'redux-saga/effects';

import RoomActionTypes from 'Root/redux/room/roomActionTypes';
import { RoomGeneralAction, RequestRoomType, fetchRoom } from 'Root/redux/room/roomActions';
import Firebase from 'Root/api/Firebase';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

type RequestInit = RoomGeneralAction<RoomActionTypes.REQUEST_ROOM, RequestRoomType>;

async function fetchFirebaseRoom(roomNumber: string) {
  const snapshot = await Firebase.getRoom(roomNumber);

  return snapshot.data();
}

function* roomWorker({ payload }: RequestInit) {
  if (payload.roomNumber === undefined) return;

  const snapshot: FirebaseDocumentType = yield call(fetchFirebaseRoom, payload.roomNumber);

  yield put(fetchRoom(snapshot));
}

function* roomWatcher() {
  yield takeEvery(RoomActionTypes.REQUEST_ROOM, roomWorker);
}

export default roomWatcher;
