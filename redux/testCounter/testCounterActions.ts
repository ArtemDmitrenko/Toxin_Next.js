import TestCounterActionTypes from './testCounterActionsTypes';

const counterIncrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_INCREMENT,
});

const asyncIncrement = () => (<const>{
  type: TestCounterActionTypes.ASYNC_COUNTER_INCREMENT,
});

const counterDecrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_DECREMENT,
});

const asyncDecrement = () => (<const>{
  type: TestCounterActionTypes.ASYNC_COUNTER_DECREMENT,
});

export {
  counterIncrement,
  counterDecrement,
  asyncIncrement,
  asyncDecrement,
};
