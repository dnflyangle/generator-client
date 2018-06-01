import { combineReducers } from 'redux';
import meetup from './meetup';
import meetupGroups from './meetupGroups';

export default combineReducers({
  meetup,
  meetupGroups,
});
