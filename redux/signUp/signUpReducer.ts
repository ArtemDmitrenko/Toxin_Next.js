import InferValueTypes from 'Root/redux/utils';

import SignUpActionsTypes from './signUpActionsTypes';
import * as actions from './signUpActions';

type SignUpState = {
  error: string | null,
};

type SignUpAction = ReturnType<InferValueTypes<typeof actions>>;

const initialState: SignUpState = {
  error: null,
};

const signUpReducer = (state = initialState, action: SignUpAction) => {
  switch (action.type) {
    case SignUpActionsTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export type { SignUpState };
export default signUpReducer;
