import { combineReducers } from 'redux';
import {
  coin,
  modalIsOpen,
  username,
  newsHasErrored,
  newsTrending,
} from './reducer';

export default combineReducers({
  coin,
  modalIsOpen,
  username,
  newsHasErrored,
  newsTrending,
});
