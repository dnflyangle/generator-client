import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import meetupGroupReducer, { getGroups, updateGroups } from './meetupGroups';

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

      it('should dispatch get groups success with groups', async () => {
        axios.get.mockReturnValue(Promise.resolve({ data: { groups: ['group1'] } }));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_GROUPS_SUCCESS',
          groups: ['group1'],
        });
      });

      it('should dispatch get groups error', async () => {
        axios.get.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'FETCH_GROUPS_ERROR',
        });
      });
      it('should dispatch update groups', () => {
        store.dispatch(updateGroups(['group1']));
        expect(store.getActions()[0]).toEqual({
          type: 'UPDATE_GROUPS',
          groups: ['group1'],
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
    it('should handle update group action', () => {
      const store = meetupGroupReducer({ groups: ['group1'] }, {
        type: 'UPDATE_GROUPS',
        groups: ['group2'],
      });
      expect(store).toEqual({
        groups: ['group2'],
      });
    });
  });
});