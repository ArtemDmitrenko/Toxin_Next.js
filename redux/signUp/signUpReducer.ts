import InferValueTypes from 'Root/redux/utils';

import SignUpActionsTypes from './signUpActionsTypes';
import * as actions from './signUpActions';

type SignUpState = {
  // name: string | null,
  // surname: string | null,
  // dateOfBirth: string | null,
  // email: string | null,
  // password: string | null,
  // sex: string | null,
  // specialOffers?: boolean | null,
  error: string | null,
};

const initialState: SignUpState = {
  // name: null,
  // surname: null,
  // dateOfBirth: null,
  // email: null,
  // password: null,
  // sex: null,
  // specialOffers?: null,
  error: null,
};

type SignUpAction = ReturnType<InferValueTypes<typeof actions>>;

const signUpReducer = (state = initialState, action: SignUpAction) => {
  switch (action.type) {
    case SignUpActionsTypes.SIGNUP_USER_SUCCESS:
      return { ...state, ...action.payload, error: null };
    case SignUpActionsTypes.SIGNUP_USER_ERROR:
      return { ...state, ...action.payload, error: action.payload.error };
    default:
      return state;
  }
};

export type { SignUpState };
export default signUpReducer;
