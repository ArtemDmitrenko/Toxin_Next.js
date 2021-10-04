import { AnyAction } from 'redux';

import { COUNTER_DECREMENT, COUNTER_INCREMENT } from 'Root/redux/testCounter/actions';

interface State {
  value: number,
}

const reducer = (state: State = { value: 0 }, action: AnyAction) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return { ...state, value: state.value + 1 };

    case COUNTER_DECREMENT:
      return { ...state, value: state.value - 1 };

    default:
      return { ...state };
  }
};

export { reducer };
export type { State };
