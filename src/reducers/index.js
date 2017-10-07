import { combineReducers } from 'redux';
import { changeCoin, modalIsOpen } from './reducer';

export default combineReducers({
  changeCoin,
  modalIsOpen,
});
