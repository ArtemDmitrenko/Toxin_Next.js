import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

import { testCounterReducer } from './testCounter/testCounterReducer';

const rootReducer = combineReducers({
  testCounter: testCounterReducer,
  auth: authReducer,
});

export default rootReducer;
