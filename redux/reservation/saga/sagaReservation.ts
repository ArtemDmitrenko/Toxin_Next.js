import { takeEvery, put, call } from 'redux-saga/effects';
import Firebase from 'Root/api/Firebase';
import ReservationActionsTypes from 'Root/redux/reservation/reservationActionsTypes';

import {
  successReservation,
  errorReservation,
  ReservationGeneralAction,
  MakeReservationData,
} from 'Root/redux/reservation/reservationActions';

type RequestReservation = ReservationGeneralAction<
ReservationActionsTypes.MAKE_RESERVATION, MakeReservationData
>;

function* reservationWorker(action: RequestReservation) {
  try {
    yield call(Firebase.addReservationData, action.payload);
    yield put(successReservation());
  } catch ({ code }) {
    yield put(errorReservation({
      error: String(code),
    }));
  }
}

function* reservationWatcher() {
  yield takeEvery(ReservationActionsTypes.MAKE_RESERVATION, reservationWorker);
}

export default reservationWatcher;
