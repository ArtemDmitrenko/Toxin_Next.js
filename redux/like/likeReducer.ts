import InferValueTypes from 'Root/redux/utils';
import { CommentProps } from 'Components/Comment/Comment';

import LikeActionTypes from './likeActionTypes';
import * as actions from './likeActions';

type LikeAction = ReturnType<InferValueTypes<typeof actions>>;

type LikeState = {
  roomNumber: string,
  comments: Array<CommentProps>,
};

const initialState = {
  roomNumber: '',
  comments: [],
};

const likeReducer = (state: LikeState = initialState, action: LikeAction) => {
  switch (action.type) {
    case LikeActionTypes.LIKE_UPDATE__SUCCESS:
      return { ...action.data };
    case LikeActionTypes.LIKE_UPDATE_ERROR:
      return { ...state };

    default:
      return state;
  }
};

export type { LikeState };
export default likeReducer;
