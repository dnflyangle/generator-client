import axios from 'axios';
import { includes } from 'lodash';
import { updateGroups } from './meetupGroups';
import { ADD_GROUPS } from './apiEndpoint';

const ADD_GROUPS_LOADING = 'ADD_GROUPS_LOADING';
const ADD_GROUPS_ERROR = 'ADD_GROUPS_ERROR';
const ADD_GROUPS_SUCCESS = 'ADD_GROUPS_SUCCESS';

export const getGroupNameFromUrl = (url) => {
  const groupURL = url.match(/^https:\/\/www.meetup.com\/(?:en-[a-z]{2}\/)*([^\/]+)/i);
  return groupURL[1];
};

export const addGroupFromUrl = url => (dispatch, getState) => {
  dispatch({ type: ADD_GROUPS_LOADING });
  const exisitingGroupNames = getState().meetupGroups.groups;
  const newGroupName = getGroupNameFromUrl(url);
  if (includes(exisitingGroupNames, newGroupName)) {
    dispatch({
      type: ADD_GROUPS_ERROR,
      message: 'This group has already been added.',
    });
    return null;
  }
  return axios.post(ADD_GROUPS, {
    groupName: newGroupName,
  })
    .then((response) => {
      dispatch({ type: ADD_GROUPS_SUCCESS });
      dispatch(updateGroups(response.data.groups));
    })
    .catch(() => {
      dispatch({
        type: ADD_GROUPS_ERROR,
        message: 'Failed to add group, please check the group url and try again.',
      });
    });
};

const initialState = {
  isLoading: false,
  hasError: false,
  isSuccess: false,
  message: undefined,
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
        message: action.message,
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
