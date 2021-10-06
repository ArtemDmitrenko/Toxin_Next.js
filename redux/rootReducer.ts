import { combineReducers } from 'redux';

import { testCounterReducer } from './testCounter/testCounterReducer';
import { guestsDropdownReducer } from './guestsDropdown/guestsDropdownReducer';

const rootReducer = combineReducers({
  testCounter: testCounterReducer,
  guestsDropdown: guestsDropdownReducer,
});

export default rootReducer;
