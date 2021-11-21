import InferValueTypes from 'Root/redux/utils';

import ReservationTypes from './reservationActionsTypes';
import * as actions from './reservationActions';

type ReservationState = {
  isSuccessReservation: boolean | undefined,
  error: string | null,
};

const initialState: ReservationState = {
  isSuccessReservation: undefined,
  error: null,
};

type ReservationAction = ReturnType<InferValueTypes<typeof actions>>;

const reservationReducer = (state = initialState, action: ReservationAction) => {
  switch (action.type) {
    case ReservationTypes.SUCCESS_RESERVATION:
      return {
        ...state,
        isSuccessReservation: true,
      };
    case ReservationTypes.FAILED_RESERVATION:
      return {
        ...state,
        isSuccessReservation: false,
      };
    case ReservationTypes.ERROR_RESERVATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export type { ReservationState };
export default reservationReducer;
