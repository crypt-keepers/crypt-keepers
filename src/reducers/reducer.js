export function coin(state = 'Bitcoin', action) {
  switch (action.type) {
    case 'CHANGE_COIN':
      return action.payload.coin;
    default:
      return state;
  }
}

export function modalIsOpen(state = true, action) {
  switch (action.type) {
    case 'MODAL_IS_OPEN':
      return action.isOpen;
    default:
      return state;
  }
}

export function username(state = '', action) {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return action.payload.username;
    default:
      return state;
  }
}

export function newsHasErrored(state = false, action) {
  switch (action.type) {
    case 'NEWS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function newsTrending(state = [], action) {
  switch (action.type) {
    case 'NEWS_TRENDING_FETCH_DATA_SUCCESS':
      return action.news;
    default:
      return state;
  }
}
