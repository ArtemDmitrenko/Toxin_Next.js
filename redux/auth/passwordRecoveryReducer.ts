import InferValueTypes from 'Root/redux/utils';

import PasswordRecoveryActionTypes from './passwordRecoveryActionTypes';
import * as actions from './passwordRecoveryActions';

type PasswordRecoveryState = {
  isEmail: boolean,
  error: string | null,
};

const initialState: PasswordRecoveryState = {
  isEmail: false,
  error: null,
};

type PasswordRecoveryAction = ReturnType<InferValueTypes<typeof actions>>;

const passwordRecoveryReducer = (state = initialState, action: PasswordRecoveryAction) => {
  switch (action.type) {
    case PasswordRecoveryActionTypes.PASSWORD_RECOVERY_SUCCESS:
      return { ...state, ...action.data };
    case PasswordRecoveryActionTypes.PASSWORD_RECOVERY_FAILED:
      return { ...state, ...action.data };

    default:
      return state;
  }
};

export type { PasswordRecoveryState };
export default passwordRecoveryReducer;
