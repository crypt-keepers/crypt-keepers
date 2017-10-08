import { combineReducers } from 'redux';
import {
  coin,
  modalIsOpen,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
} from './reducer';

export default combineReducers({
  coin,
  modalIsOpen,
  username,
  newsHasErrored,
  newsTrending,
  newsSelect,
});
