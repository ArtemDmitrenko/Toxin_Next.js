import { combineReducers } from 'redux';

import authReducer, { AuthState } from './auth/authReducer';

type StoreState = {
  auth: AuthState,
};

const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
});

export default rootReducer;
