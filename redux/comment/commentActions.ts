import { NewCommentData } from 'Root/components/ReviewCard/ReviewCard';
import CommentActionsTypes from './commentActionTypes';

type CommentGeneralAction<T, K> = {
  type: T,
  payload: K;
};

const addNewCommentRequest = (payload: NewCommentData) => (<const>{
  type: CommentActionsTypes.ADD_NEW_COMMENT_REQUEST,
  payload,
});

const addNewCommentFailed = (payload: { error: string | null }) => (<const>{
  type: CommentActionsTypes.ADD_NEW_COMMENT_FAILED,
  payload,
});

export type { CommentGeneralAction };
export {
  addNewCommentRequest,
  addNewCommentFailed,
};
