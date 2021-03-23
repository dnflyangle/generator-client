import { combineReducers } from 'redux';
import meetup from './meetup';
import meetupGroups from '../component/meetupgroups/redux/meetupGroups'
import addGroup from '../component/meetupgroups/redux/addGroup';

export default combineReducers({
  meetup,
  meetupGroups,
  addGroup,
});
