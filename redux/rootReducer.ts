import { combineReducers } from 'redux';
import { subscribeReducer } from './subscribe/subscribeReducer';

import { testCounterReducer } from './testCounter/testCounterReducer';

const rootReducer = combineReducers({
  testCounter: testCounterReducer,
  subscribe: subscribeReducer,
});

export default rootReducer;
