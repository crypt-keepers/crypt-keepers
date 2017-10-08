import { combineReducers } from 'redux';
import {
  coin,
  modalIsOpen,
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
  modalIsOpen,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
  newsCoin,
  panelSelect,
  tickerData,
  userData,
});
