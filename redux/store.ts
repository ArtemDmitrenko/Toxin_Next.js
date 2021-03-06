import { applyMiddleware, createStore, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { all } from 'redux-saga/effects';

import { userLoginRequestWatcher, userLogoutRequestWatcher } from './auth/saga/sagaAuth';
import passwordRecoveryRequestWatcher from './auth/saga/sagaPasswordRecovery';
import roomsWatcher from './rooms/saga/sagaRooms';
import likeRequestWatcher from './like/saga/sagaLike';
import roomWatcher from './room/saga/sagaRoom';
import userSignUpRequestWatcher from './signUp/saga/sagaSignUp';
import reservationWatcher from './reservation/saga/sagaReservation';
import usersRequestWatcher from './users/saga/sagaUsers';
import addCommentRequestWatcher from './comment/saga/sagaComment';
import rootReducer from './rootReducer';

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
    passwordRecoveryRequestWatcher(),
    roomsWatcher(),
    addCommentRequestWatcher(),
    roomWatcher(),
    userSignUpRequestWatcher(),
    reservationWatcher(),
    likeRequestWatcher(),
    usersRequestWatcher(),
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
