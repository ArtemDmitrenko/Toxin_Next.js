import { takeEvery, call, put } from 'redux-saga/effects';

import {
  commentFetch,
  AuthGeneralAction,
  CommentRequest,
} from 'Root/redux/like/likeActions';
import CommentActionTypes from 'Root/redux/like/likeActionTypes';
import Firebase from 'Root/api/Firebase';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

type RequestToComment = AuthGeneralAction<CommentActionTypes, CommentRequest>;

async function fetchFirebaseRoom(roomNumber: string) {
  const snapshot = await Firebase.getRoom(roomNumber);

  return snapshot.data();
}

function* commentRequestWorker({ data }: RequestToComment) {
  const snapshot: FirebaseDocumentType = yield call(fetchFirebaseRoom, data.roomNumber);

  yield put(commentFetch(snapshot));
}

function* commentRequestWatcher() {
  yield takeEvery(
    CommentActionTypes.COMMENT_REQUEST,
    commentRequestWorker,
  );
}

export default commentRequestWatcher;
