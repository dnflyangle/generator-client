import { combineReducers } from 'redux';
import meetup from './meetup';
import meetupGroups from './meetupGroups';
import addGroup from './addGroup';

export default combineReducers({
  meetup,
  meetupGroups,
  addGroup,
});
