import TestCounterActionTypes from 'redux/testCounter/testCounterActionsTypes';
import InferValueTypes from 'redux/utils';

import * as actions from './testCounterActions';

type TestCounterState = {
  value: number,
};

type TestCounterAction = ReturnType<InferValueTypes<typeof actions>>;

const testCounterReducer = (state: TestCounterState = { value: 0 }, action: TestCounterAction) => {
  switch (action.type) {
    case TestCounterActionTypes.COUNTER_INCREMENT:
      return { ...state, value: state.value + 1 };

    case TestCounterActionTypes.COUNTER_DECREMENT:
      return { ...state, value: state.value - 1 };

    default:
      return state;
  }
};

export type { TestCounterState };
export { testCounterReducer };
