import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import axios from 'axios';

import meetupReducer, { fetchEvents } from './events';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('meetupReducer', () => {
  describe('action', () => {
    describe('fetchEvents', () => {
      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
      });

      it('should dispatch loading action when start', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[0]).toEqual({
          type: 'GET_EVENTS_LOADING',
        });
      });

      it('should dispatch get events success with data', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: '<p></p>' }));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[1]).toEqual({
          type: 'GET_EVENTS_SUCCESS',
          eventsHTML: '<p></p>',
        });
      });

      it('should dispatch get events error', async () => {
        axios.post.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[1]).toEqual({
          type: 'GET_EVENTS_ERROR',
        });
      });
    });
  });
  describe('reducer', () => {
    it('should handle loading action', () => {
      const store = meetupReducer(undefined, { type: 'GET_EVENTS_LOADING' });
      expect(store).toEqual({
        isLoading: true,
        hasError: false,
        eventsHTML: undefined,
      });
    });
    it('should handle error action', () => {
      const store = meetupReducer(undefined, { type: 'GET_EVENTS_ERROR' });
      expect(store).toEqual({
        isLoading: false,
        hasError: true,
        eventsHTML: undefined,
      });
    });
    it('should handle success action', () => {
      const store = meetupReducer(undefined, {
        type: 'GET_EVENTS_SUCCESS',
        eventsHTML: 'html',
      });
      expect(store).toEqual({
        isLoading: false,
        hasError: false,
        eventsHTML: 'html',
      });
    });
  });
});
