import { takeEvery, call, put } from 'redux-saga/effects';

import CommentActionsTypes from 'Root/redux/comment/commentActionTypes';
import { addNewCommentFailed, CommentGeneralAction } from 'Root/redux/comment/commentActions';
import { NewCommentData } from 'Root/components/ReviewCard/ReviewCard';
import Firebase from 'Root/api/Firebase';

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
