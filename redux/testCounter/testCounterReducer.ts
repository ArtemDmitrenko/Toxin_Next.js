import TestCounterActionTypes from 'Root/redux/testCounter/testCounterActionsTypes';
import { InferValueTypes } from 'Root/redux/utils';

import * as actions from './testCounterActions';

interface TestCounterState {
  value: number,
}

type TestCounterAction = ReturnType<InferValueTypes<typeof actions>>;

const testCounterReducer = (state: TestCounterState = { value: 0 }, action: TestCounterAction) => {
  switch (action.type) {
    case TestCounterActionTypes.COUNTER_INCREMENT:
      return { ...state, value: state.value + 1 };

    case TestCounterActionTypes.COUNTER_DECREMENT:
      return { ...state, value: state.value - 1 };

    default:
      return { ...state };
  }
};

export type { TestCounterState };
export { testCounterReducer };
