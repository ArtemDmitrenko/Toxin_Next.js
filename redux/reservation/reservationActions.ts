import ReservationTypes from './reservationActionsTypes';

type ReservationGeneralAction<T, K> = {
  type: T,
  payload: K,
};

type MakeReservationData = {
  roomNumber: string,
  datesOfStay: { from: Date, to: Date },
};

type ReservationError = {
  error: string,
};

const makeReservation = (payload: MakeReservationData) => (<const>{
  type: ReservationTypes.MAKE_RESERVATION,
  payload,
});

const successReservation = () => (<const>{
  type: ReservationTypes.SUCCESS_RESERVATION,
});

const failedReservation = () => (<const>{
  type: ReservationTypes.FAILED_RESERVATION,
});

const errorReservation = (payload: ReservationError) => (<const>{
  type: ReservationTypes.ERROR_RESERVATION,
  payload,
});

export type { ReservationGeneralAction, MakeReservationData };
export {
  makeReservation,
  successReservation,
  failedReservation,
  errorReservation,
};
