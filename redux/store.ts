import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const makeStore = () => createStore(rootReducer, devToolsEnhancer({}));

const wrapper = createWrapper(makeStore, { debug: false });

export const store = configureStore({
  reducer: rootReducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { wrapper };
