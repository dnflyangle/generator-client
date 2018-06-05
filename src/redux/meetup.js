import axios from 'axios';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { FETCH_EVENTS } from './apiEndpoint';

const FETCH_EVENT_LOADING = 'FETCH_EVENT_LOADING';
const FETCH_EVENT_ERROR = 'FETCH_EVENT_ERROR';
const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';

const DOMPurify = createDOMPurify((new JSDOM('')).window);

export const fetchEvents = date => (dispatch) => {
  dispatch({ type: FETCH_EVENT_LOADING });
  return axios.post(FETCH_EVENTS, {
    date: date.format('DD/MM/YYYY'),
  })
    .then((response) => {
      dispatch({
        type: FETCH_EVENT_SUCCESS,
        eventsHTML: DOMPurify.sanitize(response.data),
      });
    })
    .catch(() => {
      dispatch({ type: FETCH_EVENT_ERROR });
    });
};

const initialState = {
  isLoading: false,
  hasError: false,
  eventsHTML: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        eventsHTML: undefined,
      };
    case FETCH_EVENT_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        eventsHTML: undefined,
      };
    case FETCH_EVENT_SUCCESS:
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
