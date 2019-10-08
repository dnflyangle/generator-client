import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import addGroupReducer, { addGroupFromUrl, getGroupNameFromUrl } from './addGroup';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('AddGroup', () => {
  describe('getGroupNameFromUrl', () => {
    it('should trim group name correctly with event details', () => {
      const groupName = getGroupNameFromUrl('https://www.meetup.com/new-meetup/event/123');
      expect(groupName).toEqual('new-meetup');
    });

    it('should trim group name correctly with groups only', () => {
      const groupName = getGroupNameFromUrl('https://www.meetup.com/new-meetup');
      expect(groupName).toEqual('new-meetup');
    });

    it('should trim group name correctly with culture codes', () => {
      const groupName = getGroupNameFromUrl('https://www.meetup.com/en-AU/new-meetup');
      expect(groupName).toEqual('new-meetup');
    });
  });
  describe('action', () => {
    describe('addGroupFromUrl', () => {
      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);

      const url = 'https://www.meetup.com/new-meetup/';

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should dispatch loading action when start', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(addGroupFromUrl(url));
        expect(store.getActions()[0]).toEqual({
          type: 'ADD_GROUPS_LOADING',
        });
      });

      it('should dispatch add group success and update groups', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(Promise.resolve({ data: { groups: ['group1'] } }));
        await store.dispatch(addGroupFromUrl(url));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_SUCCESS',
        });
        expect(store.getActions()[2]).toEqual({
          type: 'UPDATE_GROUPS',
          groups: ['group1'],
        });
      });

      it('should dispatch fetch event error', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(addGroupFromUrl(url));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
          message: 'Failed to add group, please check the group url and try again.',
        });
      });

      it('should dispatch group already exist error', async () => {
        const store = mockStore({ meetupGroups: { groups: ['new-meetup'] } });
        await store.dispatch(addGroupFromUrl(url));
        expect(axios.post).not.toHaveBeenCalled();
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
          message: 'This group has already been added.',
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
      const store = addGroupReducer(undefined,
        { type: 'ADD_GROUPS_ERROR',
          message: 'message',
        });
      expect(store).toEqual({
        isLoading: false,
        hasError: true,
        isSuccess: false,
        message: 'message',
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
