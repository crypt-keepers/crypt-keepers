export function changeCoin(state = 'Bitcoin', action) {
  switch (action.type) {
    case 'CHANGE_COIN':
      return action.coin;
    default:
      return state;
  }
}

export function modalIsOpen(state = 'true', action) {
  switch (action.type) {
    case 'MODAL_IS_OPEN':
      return action.isOpen;
    default:
      return state;
  }
}
