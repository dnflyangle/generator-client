import axios from 'axios';
import { orderBy } from 'lodash';

const FETCH_GROUPS_LOADING = 'FETCH_GROUPS_LOADING';
const FETCH_GROUPS_ERROR = 'FETCH_GROUPS_ERROR';
const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
const UPDATE_GROUPS = 'UPDATE_GROUPS';

export const getGroups = () => (dispatch) => {
  dispatch({ type: FETCH_GROUPS_LOADING });
  return axios.get('https://generator-meetup-tw.herokuapp.com/groups')
    .then((response) => {
      dispatch({
        type: FETCH_GROUPS_SUCCESS,
        groups: orderBy(response.data.groups),
      });
    })
    .catch(() => {
      dispatch({ type: FETCH_GROUPS_ERROR });
    });
};

export const updateGroups = groups => ({
  type: UPDATE_GROUPS,
  groups,
});

const initialState = {
  isLoading: false,
  hasError: false,
  groups: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        groups: undefined,
      };
    case FETCH_GROUPS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        groups: undefined,
      };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        groups: action.groups,
      };
    case UPDATE_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };
    default:
      return state;
  }
};
