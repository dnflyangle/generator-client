import {
  ADD_GROUPS_LOADING,
  ADD_GROUPS_ERROR,
  ADD_GROUPS_SUCCESS,
  GET_GROUPS_LOADING,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_ERROR,
} from './constants';

const initialState = {
  getGroupsLoading: false,
  getGroupsError: false,
  groups: undefined,
  addGroupsLoading: false,
  addGroupsError: undefined,
  addGroupsSuccess: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUPS_LOADING:
      return {
        ...state,
        getGroupsLoading: true,
        getGroupsError: false,
        groups: undefined,
      };
    case GET_GROUPS_ERROR:
      return {
        ...state,
        getGroupsLoading: false,
        getGroupsError: true,
        groups: undefined,
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        getGroupsLoading: false,
        getGroupsError: false,
        groups: action.groups,
      };
    case ADD_GROUPS_LOADING:
      return {
        ...state,
        addGroupsLoading: true,
        addGroupsError: undefined,
        addGroupsSuccess: false,
      };
    case ADD_GROUPS_ERROR:
      return {
        ...state,
        addGroupsLoading: false,
        addGroupsError: action.message,
        addGroupsSuccess: false,
      };
    case ADD_GROUPS_SUCCESS:
      return {
        ...state,
        addGroupsLoading: false,
        addGroupsError: undefined,
        addGroupsSuccess: true,
      };
    default:
      return state;
  }
};
