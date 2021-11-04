import { createStore, Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';

let makeStore: MakeStore<Store>;
let store: Store;

if (isDev) {
  makeStore = () => {
    store = createStore(rootReducer, devToolsEnhancer({}));
    return store;
  };
} else {
  makeStore = () => createStore(rootReducer);
}

const wrapper = createWrapper(makeStore, { debug: false });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export { wrapper };
