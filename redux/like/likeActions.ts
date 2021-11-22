import { CommentProps } from 'Components/Comment/Comment';
import LikeActionTypes from './likeActionTypes';

type LikeGeneralAction<T, K> = {
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

export type { LikeState, LikeGeneralAction };
export { likeUpdate, likeUpdateSuccess };
