import InferValueTypes from 'Root/redux/utils';
import { UsersData } from 'Root/redux/users/usersActions';

import UsersActionTypes from './usersActionTypes';
import * as actions from './usersActions';

type UsersAction = ReturnType<InferValueTypes<typeof actions>>;

type UsersState = UsersData | null;

const usersReducer = (state: UsersState = null, action: UsersAction) => {
  switch (action.type) {
    case UsersActionTypes.USERS_SUCCESS:
      return { ...action.data };

    default:
      return state;
  }
};

export type { UsersState };
export default usersReducer;
