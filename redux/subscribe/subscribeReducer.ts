import SubscribeActionTypes from 'Root/redux/subscribe/subscribeActionTypes';
import { InferValueTypes } from 'Root/redux/utils';

import * as actions from './subscribeActions';

interface SubscribeState {
  email: string,
}

type SubscribeAction = ReturnType<InferValueTypes<typeof actions>>;

const subscribeReducer = (state: SubscribeState = { email: 'email' },
  action: SubscribeAction) => {
  if (action.type === SubscribeActionTypes.SUBSCRIBE) {
    return { ...state, email: action.email };
  }
  return { ...state };
};

export type { SubscribeState };
export { subscribeReducer };
