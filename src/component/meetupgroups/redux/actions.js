import {
  ADD_GROUPS_LOADING,
  ADD_GROUPS_ERROR,
  ADD_GROUPS_SUCCESS,
  GET_GROUPS_LOADING,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR,
} from './constants';

import { addGroupsFromApi, getGroupsFromApi } from '../../../api/index';

export const getGroupNameFromUrl = (url) => {
  const groups = url.match(
    /^https:\/\/www.meetup.com\/(?:en-[a-z]{2}\/)*([^/]+)/i,
  );
  return groups ? groups[1] : undefined;
};

export const getGroups = () => async (dispatch) => {
  dispatch({ type: GET_GROUPS_LOADING });

  try {
    const response = await getGroupsFromApi();
    dispatch({
      type: GET_GROUPS_SUCCESS,
      groups: response.data.groups.sort(),
    });
  } catch {
    dispatch({ type: GET_GROUPS_ERROR });
  }
};

export const addGroup = (url, existingGroupNames) => async (
  dispatch,
) => {
  dispatch({ type: ADD_GROUPS_LOADING });

  if (!url) {
    dispatch({
      type: ADD_GROUPS_ERROR,
      message: 'Group name can not be empty.',
    });
    return;
  }

  const newGroupName = getGroupNameFromUrl(url);
  if (existingGroupNames.includes(newGroupName)) {
    dispatch({
      type: ADD_GROUPS_ERROR,
      message: 'This group has already been added.',
    });
    return;
  }

  try {
    await addGroupsFromApi(newGroupName);
    dispatch({ type: ADD_GROUPS_SUCCESS });
    dispatch(getGroups());
  } catch {
    dispatch({
      type: ADD_GROUPS_ERROR,
      message: 'Failed to add group, please check the group url and try again.',
    });
  }
};
