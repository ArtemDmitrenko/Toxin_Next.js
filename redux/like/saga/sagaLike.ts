import { takeEvery, call, put } from 'redux-saga/effects';

import {
  likeUpdateError,
  likeUpdateSuccess,
  AuthGeneralAction,
  LikeState,
} from 'Root/redux/like/likeActions';
import LikeActionTypes from 'Root/redux/like/likeActionTypes';
import Firebase from 'Root/api/Firebase';

type LikeUpdateData = AuthGeneralAction<LikeActionTypes, LikeState>;

function* likeRequestWorker({ data }: LikeUpdateData) {
  try {
    const { roomNumber, comments } = data;

    yield call(Firebase.updateLike, roomNumber, comments);
    yield put(likeUpdateSuccess(data));
  } catch ({ code }) {
    yield put(likeUpdateError({
      error: String(code),
    }));
  }
}

function* likeRequestWatcher() {
  yield takeEvery(
    LikeActionTypes.LIKE_UPDATE,
    likeRequestWorker,
  );
}

export default likeRequestWatcher;
