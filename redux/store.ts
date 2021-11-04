import { applyMiddleware, createStore, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import rootReducer from './rootReducer';
import countWatcher from './testCounter/saga/counterSaga';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

const bindMiddleware = (middleware: SagaMiddleware[]) => {
  if (isDev) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

let store: Store;
const makeStore = () => {
  store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  sagaMiddleware.run(countWatcher);
  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { wrapper };
