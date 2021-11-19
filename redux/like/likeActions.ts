import { CommentProps } from 'Components/Comment/Comment';
import LikeActionTypes from './likeActionTypes';

type AuthGeneralAction<T, K> = {
  type: T,
  data: K;
};

type LikeState = {
  roomNumber: string,
  comments: Array<CommentProps>
};

const likeUpdate = (data: LikeState) => (<const>{
  type: LikeActionTypes.LIKE_UPDATE,
  data,
});

const likeUpdateSuccess = (data: LikeState) => (<const>{
  type: LikeActionTypes.LIKE_UPDATE__SUCCESS,
  data,
});

const likeUpdateError = ({ error }: { error : string }) => (<const>{
  type: LikeActionTypes.LIKE_UPDATE_ERROR,
  error,
});

export type { LikeState, AuthGeneralAction };
export { likeUpdate, likeUpdateSuccess, likeUpdateError };
