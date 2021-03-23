import { combineReducers } from 'redux';
import meetupEvents from '../component/preview/redux/events';
import meetupGroups from '../component/meetupgroups/redux/meetupGroups';

export default combineReducers({
  meetupGroups,
  meetupEvents,
});
