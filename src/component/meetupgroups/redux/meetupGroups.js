import axios from 'axios';
import { orderBy } from 'lodash';
import { GET_GROUPS } from '../../../redux/apiEndpoint';

const FETCH_GROUPS_LOADING = 'FETCH_GROUPS_LOADING';
const FETCH_GROUPS_ERROR = 'FETCH_GROUPS_ERROR';
const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';

export const getGroups = () => (dispatch) => {
  dispatch({ type: FETCH_GROUPS_LOADING });
  return axios.get(GET_GROUPS)
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
    default:
      return state;
  }
};
