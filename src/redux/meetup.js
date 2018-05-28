import axios from 'axios';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const FETCH_EVENT_LOADING = 'FETCH_EVENT_LOADING';
const FETCH_EVENT_ERROR = 'FETCH_EVENT_ERROR';
const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';

const DOMPurify = createDOMPurify((new JSDOM('')).window);

export const fetchEvents = date => dispatch => {
  dispatch({ type: FETCH_EVENT_LOADING });
  axios.post('https://generator-meetup-tw.herokuapp.com/generate', {
    date: date.format('DD/MM/YYYY'),
  })
    .then((response) => {
      dispatch({
        type: FETCH_EVENT_SUCCESS,
        groupedEvents: DOMPurify.sanitize(response.data),
      })
    })
    .catch(() => {
      dispatch(errorOccurred());
    });
}

export const errorOccurred = () => ({
  type: FETCH_EVENT_ERROR
})

const initialState = {
  isLoading: false,
  hasError: false,
  groupedEvents: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        groupedEvents: undefined,
      }
    case FETCH_EVENT_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        groupedEvents: undefined,
      }
    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        groupedEvents: action.groupedEvents,
      }
    default:
      return state;
  }
};
