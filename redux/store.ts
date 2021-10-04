import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import { reducer } from './testCounter/reducer';

const makeStore = () => createStore(reducer, devToolsEnhancer({}));

const store = createWrapper(makeStore, { debug: false });

export default store;
