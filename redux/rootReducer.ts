import { combineReducers } from 'redux';

import { testCounterReducer } from './testCounter/testCounterReducer';

const rootReducer = combineReducers({
  testCounter: testCounterReducer,
});

export default rootReducer;
