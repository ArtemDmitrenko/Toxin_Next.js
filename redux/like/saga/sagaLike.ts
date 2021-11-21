import { takeEvery, call, put } from 'redux-saga/effects';

import {
  likeUpdateSuccess,
  LikeGeneralAction,
  LikeState,
} from 'Root/redux/like/likeActions';
import LikeActionTypes from 'Root/redux/like/likeActionTypes';
import Firebase from 'Root/api/Firebase';

type LikeUpdateData = LikeGeneralAction<LikeActionTypes, LikeState>;

function* likeRequestWorker({ data }: LikeUpdateData) {
  const { roomNumber, comments } = data;

  yield call(Firebase.updateLike, roomNumber, comments);
  yield put(likeUpdateSuccess(data));
}

function* likeRequestWatcher() {
  yield takeEvery(
    LikeActionTypes.LIKE_UPDATE,
    likeRequestWorker,
  );
}

export default likeRequestWatcher;
