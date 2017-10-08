import helpers from '../helpers/api-helpers';

export function dbHasErrored(bool) {
  return {
    type: 'USER_DB_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function dbSuccess(userData) {
  return {
    type: 'USER_DB_SUCCESS',
    userData,
  };
}

export function getUserData(username) {
  return (dispatch) => {
    helpers.getUserData(username)
      .then(data => (
        dispatch(dbSuccess(data.results))
      ))
      .catch(() => {
        dispatch(dbHasErrored(true));
      });
  };
}

// export function changeNewsSelection(selection) {
//   return {
//     type: 'CHANGE_NEWS_SELECTION',
//     payload: { selection },
//   };
// }
