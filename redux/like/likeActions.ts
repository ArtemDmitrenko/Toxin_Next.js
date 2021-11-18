import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';
import CommentActionTypes from './likeActionTypes';

type AuthGeneralAction<T, K> = {
  type: T,
  data: K;
};

type CommentRequest = {
  roomNumber: string
};

const commentRequest = (data: CommentRequest) => (<const>{
  type: CommentActionTypes.COMMENT_REQUEST,
  data,
});

const commentFetch = (data: FirebaseDocumentType) => (<const>{
  type: CommentActionTypes.COMMENT_FETCH,
  data,
});

export type { CommentRequest, AuthGeneralAction };
export { commentRequest, commentFetch };
