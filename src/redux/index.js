import { combineReducers } from 'redux';
import meetup from './meetup';
import addGroup from './addGroup';

export default combineReducers({
  meetup,
  addGroup,
});
