import GuestsDropdownActionsTypes from './guestsDropdownActionsTypes';

const createToggle = () => (<const>{
  type: GuestsDropdownActionsTypes.TOGGLE,
});

const createVisible = () => (<const>{
  type: GuestsDropdownActionsTypes.VISIBLE,
});

const createHidden = () => (<const>{
  type: GuestsDropdownActionsTypes.HIDDEN,
});

export { createToggle, createVisible, createHidden };
