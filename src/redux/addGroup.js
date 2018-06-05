import axios from 'axios';
import { replace } from 'lodash';
import { updateGroups } from './meetupGroups';
import { ADD_GROUPS } from './apiEndpoint';

const ADD_GROUPS_LOADING = 'ADD_GROUPS_LOADING';
const ADD_GROUPS_ERROR = 'ADD_GROUPS_ERROR';
const ADD_GROUPS_SUCCESS = 'ADD_GROUPS_SUCCESS';

export const getGroupNameFromUrl = (url) => {
  const groupName = replace(url, 'https://www.meetup.com/', '');
  return replace(groupName, '/', '');
};

export const addGroupFromUrl = url => (dispatch) => {
  dispatch({ type: ADD_GROUPS_LOADING });
  return axios.post(ADD_GROUPS, {
    groupName: getGroupNameFromUrl(url),
  })
    .then((response) => {
      dispatch({ type: ADD_GROUPS_SUCCESS });
      dispatch(updateGroups(response.data.groups));
    })
    .catch(() => {
      dispatch({ type: ADD_GROUPS_ERROR });
    });
};

const initialState = {
  isLoading: false,
  hasError: false,
  isSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUPS_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isSuccess: false,
      };
    case ADD_GROUPS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isSuccess: false,
      };
    case ADD_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};
