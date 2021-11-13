import InferValueTypes from 'Root/redux/utils';

import SignUpActionsTypes from './signUpActionsTypes';
import * as actions from './signUpActions';
import { SignUpStateData } from './signUpActions';

const initialState: SignUpStateData = {
  error: null,
  isSignUp: false,
};

type SignUpAction = ReturnType<InferValueTypes<typeof actions>>;

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
        ...action.payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;
