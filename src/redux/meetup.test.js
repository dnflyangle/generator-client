import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';
import axios from 'axios';

import meetupReducer, { fetchEvents } from './meetup';

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
      })

      it('should dispatch loading action when start', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[0]).toEqual({
          type: 'FETCH_EVENT_LOADING',
        });
      });

      it('should dispatch fetch event success with purified dom data', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: '<svg><g/onload=alert(2)//<p>' }));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_EVENT_SUCCESS',
          eventsHTML: "<svg><g></g></svg>"
        });
      });

      it('should dispatch fetch event error', async () => {
        axios.post.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(fetchEvents(moment('2018-05-28', 'YYYY-MM-DD')));
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_EVENT_ERROR',
        });
      });
    });
  });
});
