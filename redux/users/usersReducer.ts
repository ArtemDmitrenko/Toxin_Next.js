import InferValueTypes from 'Root/redux/utils';

import UsersActionTypes from './usersActionTypes';
import * as actions from './usersActions';

type UsersAction = ReturnType<InferValueTypes<typeof actions>>;

type UsersState = {};

const initialState = {};

const usersReducer = (state: UsersState = initialState, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.USERS_SUCCESS:
      return { ...action.data };

    default:
      return state;
  }
};

export type { UsersState };
export default usersReducer;
