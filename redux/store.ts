import { createStore, Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

let makeStore: MakeStore<Store>;

if (isDev) {
  makeStore = () => createStore(rootReducer, devToolsEnhancer({}));
} else {
  makeStore = () => createStore(rootReducer);
}

const wrapper = createWrapper(makeStore, { debug: false });

const store = configureStore({
  reducer: rootReducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { wrapper, store };
