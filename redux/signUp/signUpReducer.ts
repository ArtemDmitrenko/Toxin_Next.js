import InferValueTypes from 'Root/redux/utils';

import SignUpActionsTypes from './signUpActionsTypes';
import * as actions from './signUpActions';

type SignUpState = {
  error: string | null,
  isSignUp: boolean,
};

type SignUpAction = ReturnType<InferValueTypes<typeof actions>>;

const initialState: SignUpState = {
  error: null,
  isSignUp: false,
};

const signUpReducer = (state = initialState, action: SignUpAction) => {
  switch (action.type) {
    case SignUpActionsTypes.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        error: null,
        isSignUp: true,
      };
    case SignUpActionsTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        isSignUp: false,
        ...action.payload,
      };
    default:
      return state;
  }
};

export type { SignUpState };
export default signUpReducer;
