import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { reducer } from './testCounter/reducer';

const middlewares = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;
