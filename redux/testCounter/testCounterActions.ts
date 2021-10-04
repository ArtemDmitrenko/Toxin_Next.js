import TestCounterActionTypes from './testCounterActionsTypes';

export const counterIncrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_INCREMENT,
});

export const counterDecrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_DECREMENT,
});
