import UsersActionTypes from './usersActionTypes';

type UsersGeneralAction<T, K> = {
  type: T,
  data: K;
};

type UsersData = {
  id: string,
  user: {},
}[];

const usersRequest = () => (<const>{
  type: UsersActionTypes.USERS_REQUEST,
});

const usersSuccess = (data: UsersData) => (<const>{
  type: UsersActionTypes.USERS_SUCCESS,
  data,
});

export type { UsersGeneralAction, UsersData };
export { usersRequest, usersSuccess };
