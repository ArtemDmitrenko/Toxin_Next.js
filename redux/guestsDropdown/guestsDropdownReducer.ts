import InferValueTypes from 'redux/utils';

import GuestsDropdownActionsTypes from './guestsDropdownActionsTypes';
import * as actions from './guestsDropdownActions';

type GuestsDropdownState = {
  isActive: boolean,
};

type GuestsDropdownAction = ReturnType<InferValueTypes<typeof actions>>;

const guestsDropdownReducer = (state: GuestsDropdownState = {
  isActive: false,
}, action: GuestsDropdownAction) => {
  switch (action.type) {
    case GuestsDropdownActionsTypes.TOGGLE:
      return { ...state, isActive: !state.isActive };

    case GuestsDropdownActionsTypes.VISIBLE:
      return { ...state, isActive: true };

    case GuestsDropdownActionsTypes.HIDDEN:
      return { ...state, isActive: false };

    default:
      return state;
  }
};

export type { GuestsDropdownAction };
export { guestsDropdownReducer };
