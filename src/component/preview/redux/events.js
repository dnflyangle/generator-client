import { format } from 'date-fns';
import { getEventsFromApi } from '../../../api';

const GET_EVENTS_LOADING = 'GET_EVENTS_LOADING';
const GET_EVENTS_ERROR = 'GET_EVENTS_ERROR';
const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';

export const fetchEvents = (date) => async (dispatch) => {
  dispatch({ type: GET_EVENTS_LOADING });

  try {
    const { data } = await getEventsFromApi(format(date, 'dd/mm/yyyy'));
    dispatch({
      type: GET_EVENTS_SUCCESS,
      eventsHTML: data,
    });
  } catch {
    dispatch({ type: GET_EVENTS_ERROR });
  }
};

const initialState = {
  isLoading: false,
  hasError: false,
  eventsHTML: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        eventsHTML: undefined,
      };
    case GET_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        eventsHTML: undefined,
      };
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        eventsHTML: action.eventsHTML,
      };
    default:
      return state;
  }
};
