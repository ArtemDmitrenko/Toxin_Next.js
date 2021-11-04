import { put, takeEvery } from 'redux-saga/effects';

import { counterDecrement, counterIncrement } from '../testCounterActions';
import TestCounterActionTypes from '../testCounterActionsTypes';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* incrementWorker() {
  yield delay(1000);
  yield put(counterIncrement());
}

function* decrementWorker() {
  yield delay(1000);
  yield put(counterDecrement());
}

function* countWatcher() {
  yield takeEvery(TestCounterActionTypes.ASYNC_COUNTER_INCREMENT, incrementWorker);
  yield takeEvery(TestCounterActionTypes.ASYNC_COUNTER_DECREMENT, decrementWorker);
}

export default countWatcher;
