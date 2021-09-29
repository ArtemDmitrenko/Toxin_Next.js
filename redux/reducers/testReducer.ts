import { AnyAction } from 'redux';
import { COUNTER_DECREMENT, COUNTER_INCREMENT } from '../actions/testActions';


const testReducer = (state = { value: 0 }, action: AnyAction) => {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return { ...state, value: state.value + 1 };

    case COUNTER_DECREMENT:
      return { ...state, value: state.value - 1 };

    default:
      return { ...state };
  }
};

export default testReducer;