import InferValueTypes from 'Root/redux/utils';

import CommentActionsTypes from './commentActionTypes';
import * as actions from './commentActions';

type CommentState = {
  error: string | null,
};

const initialState: CommentState = {
  error: null,
};

type CommentAction = ReturnType<InferValueTypes<typeof actions>>;

const commentReducer = (state = initialState, action: CommentAction) => {
  switch (action.type) {
    case CommentActionsTypes.ADD_NEW_COMMENT_FAILED:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export type { CommentState };
export default commentReducer;
