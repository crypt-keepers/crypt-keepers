import { combineReducers } from 'redux';
<<<<<<< HEAD
import {
  coin,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
  newsCoin,
  panelSelect,
  tickerData,
  userData,
} from './reducer';

export default combineReducers({
  coin,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
  newsCoin,
  panelSelect,
  tickerData,
  userData,
=======
import { changeCoin, modalIsOpen } from './reducer';

export default combineReducers({
  changeCoin,
  modalIsOpen,
>>>>>>> (feat) redux setup
});
