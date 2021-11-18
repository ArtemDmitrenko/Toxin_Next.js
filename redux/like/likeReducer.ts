import InferValueTypes from 'Root/redux/utils';
import FirebaseDocumentType from 'Root/api/FirebaseDocumentType';

import CommentActionTypes from './likeActionTypes';
import * as actions from './likeActions';

type CommentAction = ReturnType<InferValueTypes<typeof actions>>;

type RoomState = FirebaseDocumentType | null;

const commentReducer = (state: RoomState = null, action: CommentAction) => {
  switch (action.type) {
    case CommentActionTypes.COMMENT_FETCH:
      return { ...action.data };

    default:
      return state;
  }
};

export type { RoomState };
export default commentReducer;
