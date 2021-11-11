import { applyMiddleware, createStore, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { all } from 'redux-saga/effects';
import rootReducer from './rootReducer';
import { userLoginRequestWatcher, userLogoutRequestWatcher } from './auth/saga/sagaAuth';
import roomsWatcher from './rooms/saga/sagaRooms';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

const bindMiddleware = (middleware: SagaMiddleware[]) => {
  if (isDev) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    userLoginRequestWatcher(),
    userLogoutRequestWatcher(),
    roomsWatcher(),
  ]);
}

let store: Store;
const makeStore = () => {
  store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { wrapper };
