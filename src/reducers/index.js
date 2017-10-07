import { combineReducers } from 'redux';
import { coin, modalIsOpen } from './reducer';

export default combineReducers({
  coin,
  modalIsOpen,
});
