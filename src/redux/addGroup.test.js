import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import addGroupReducer, { getGroups, getGroupNameFromUrl } from './addGroup';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('AddGroup', () => {
  describe('getGroupNameFromUrl', () => {
    it('should trim group name correctly', () => {
      const groupName = getGroupNameFromUrl('https://www.meetup.com/new-meetup/');
      expect(groupName).toEqual('new-meetup');

      const anotherGroupName = getGroupNameFromUrl('https://www.meetup.com/new-meetup');
      expect(anotherGroupName).toEqual('new-meetup');
    });
  });
  describe('action', () => {
    describe('getGroups', () => {
      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);
      const store = mockStore({});
      const url = 'https://www.meetup.com/new-meetup/';

      beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
      });

      it('should dispatch loading action when start', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(getGroups(url));
        expect(store.getActions()[0]).toEqual({
          type: 'ADD_GROUPS_LOADING',
        });
      });

      it('should dispatch add group success and update groups', async () => {
        axios.post.mockReturnValue(Promise.resolve({ data: { groups: ['group1'] } }));
        await store.dispatch(getGroups(url));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_SUCCESS',
        });
        expect(store.getActions()[2]).toEqual({
          type: 'UPDATE_GROUPS',
          groups: ['group1'],
        });
      });

      it('should dispatch fetch event error', async () => {
        axios.post.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(getGroups(url));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
        });
      });
    });
  });
  describe('reducer', () => {
    it('should handle loading action', () => {
      const store = addGroupReducer(undefined, { type: 'ADD_GROUPS_LOADING' });
      expect(store).toEqual({
        isLoading: true,
        hasError: false,
        isSuccess: false,
      });
    });
    it('should handle error action', () => {
      const store = addGroupReducer(undefined, { type: 'ADD_GROUPS_ERROR' });
      expect(store).toEqual({
        isLoading: false,
        hasError: true,
        isSuccess: false,
      });
    });
    it('should handle success action', () => {
      const store = addGroupReducer(undefined, {
        type: 'ADD_GROUPS_SUCCESS',
      });
      expect(store).toEqual({
        isLoading: false,
        hasError: false,
        isSuccess: true,
      });
    });
  });
});
