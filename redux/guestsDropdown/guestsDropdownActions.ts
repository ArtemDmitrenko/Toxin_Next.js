import GuestsDropdownActionsTypes from './guestsDropdownActionsTypes';

export const createToggle = () => (<const>{
  type: GuestsDropdownActionsTypes.TOGGLE,
});

export const createVisible = () => (<const>{
  type: GuestsDropdownActionsTypes.VISIBLE,
});

export const createHidden = () => (<const>{
  type: GuestsDropdownActionsTypes.HIDDEN,
});
