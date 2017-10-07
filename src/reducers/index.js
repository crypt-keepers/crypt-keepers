import { combineReducers } from 'redux';
import { coin, modalIsOpen, username } from './reducer';

export default combineReducers({
  coin,
  modalIsOpen,
  username,
});
