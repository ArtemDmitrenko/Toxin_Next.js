import TestCounterActionTypes from './testCounterActionsTypes';

const counterIncrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_INCREMENT,
});

const counterDecrement = () => (<const>{
  type: TestCounterActionTypes.COUNTER_DECREMENT,
});

export { counterIncrement, counterDecrement };
