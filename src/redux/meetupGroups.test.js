import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import meetupGroupReducer, { getGroups } from './meetupGroups';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('meetupGroupReducer', () => {
  describe('action', () => {
    describe('getGroups', () => {
      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});

      beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
      });

      it('should dispatch loading action when start', async () => {
        axios.get.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(getGroups());
        expect(store.getActions()[0]).toEqual({
          type: 'FETCH_GROUPS_LOADING',
        });
      });

      it('should dispatch fetch event success with purified dom data', async () => {
        axios.get.mockReturnValue(Promise.resolve({ data: { groups: ['group1'] } }));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_GROUPS_SUCCESS',
          groups: ['group1'],
        });
      });

      it('should dispatch fetch event error', async () => {
        axios.get.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_GROUPS_ERROR',
        });
      });
    });
  });
  describe('reducer', () => {
    it('should handle loading action', () => {
      const store = meetupGroupReducer(undefined, { type: 'FETCH_GROUPS_LOADING' });
      expect(store).toEqual({
        isLoading: true,
        hasError: false,
        groups: undefined,
      });
    });
    it('should handle error action', () => {
      const store = meetupGroupReducer(undefined, { type: 'FETCH_GROUPS_ERROR' });
      expect(store).toEqual({
        isLoading: false,
        hasError: true,
        groups: undefined,
      });
    });
    it('should handle success action', () => {
      const store = meetupGroupReducer(undefined, {
        type: 'FETCH_GROUPS_SUCCESS',
        groups: ['group1'],
      });
      expect(store).toEqual({
        isLoading: false,
        hasError: false,
        groups: ['group1'],
      });
    });
  });
});
