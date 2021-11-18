import { takeEvery, call, put } from 'redux-saga/effects';

import Firebase from 'Root/api/Firebase';
import { NewCommentData } from 'Root/components/ReviewCard/ReviewCard';
import CommentActionsTypes from '../commentActionTypes';
import { addNewCommentFailed, CommentGeneralAction } from '../commentActions';

type RequestToComment = CommentGeneralAction<CommentActionsTypes, NewCommentData>;

function* addCommentRequestWorker({ payload } : RequestToComment) {
  try {
    const { userId, text, roomNumber } = payload;
    yield call(Firebase.addComment, userId, text, roomNumber);
  } catch ({ code }) {
    yield put(addNewCommentFailed({
      error: String(code),
    }));
  }
}

function* addCommentRequestWatcher() {
  yield takeEvery(CommentActionsTypes.ADD_NEW_COMMENT_REQUEST, addCommentRequestWorker);
}

export default addCommentRequestWatcher;
