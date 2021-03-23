import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getGroupNameFromUrl, addGroup, getGroups } from './actions';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('meetup groups actions', () => {
  describe('getGroupNameFromUrl', () => {
    it('should trim group name correctly with event details', () => {
      const groupName = getGroupNameFromUrl(
        'https://www.meetup.com/new-meetup/event/123',
      );
      expect(groupName).toEqual('new-meetup');
    });

    it('should trim group name correctly with groups only', () => {
      const groupName = getGroupNameFromUrl(
        'https://www.meetup.com/new-meetup',
      );
      expect(groupName).toEqual('new-meetup');
    });

    it('should trim group name correctly with groups only and / at the end', () => {
      const groupName = getGroupNameFromUrl(
        'https://www.meetup.com/new-meetup/',
      );
      expect(groupName).toEqual('new-meetup');
    });

    it('should trim group name correctly with culture codes', () => {
      const groupName = getGroupNameFromUrl(
        'https://www.meetup.com/en-AU/new-meetup',
      );
      expect(groupName).toEqual('new-meetup');
    });
  });
  describe('action', () => {
    describe('addGroup', () => {
      const middlewares = [thunk];
      const mockStore = configureStore(middlewares);

      const url = 'https://www.meetup.com/new-meetup/';

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should dispatch loading action when start', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(Promise.resolve({ data: null }));
        await store.dispatch(addGroup(url, []));
        expect(store.getActions()[0]).toEqual({
          type: 'ADD_GROUPS_LOADING',
        });
      });

      it('should dispatch add group success', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(
          Promise.resolve({ data: { groups: ['group1'] } }),
        );
        await store.dispatch(addGroup(url, []));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_SUCCESS',
        });
      });

      it('should dispatch get groups after add group success', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(
          Promise.resolve({ data: { groups: ['group1'] } }),
        );
        await store.dispatch(addGroup(url, []));
        expect(store.getActions()[2]).toEqual({
          type: 'GET_GROUPS_LOADING',
        });
      });

      it('should dispatch add group error', async () => {
        const store = mockStore({ meetupGroups: {} });
        axios.post.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(addGroup(url, []));
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
          message:
            'Failed to add group, please check the group url and try again.',
        });
      });

      it('should dispatch group already exist error', async () => {
        const store = mockStore({ meetupGroups: { groups: ['new-meetup'] } });
        await store.dispatch(addGroup(url, ['new-meetup']));
        expect(axios.post).not.toHaveBeenCalled();
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
          message: 'This group has already been added.',
        });
      });

      it('should dispatch group name is empty error', async () => {
        const store = mockStore({ meetupGroups: { groups: ['new-meetup'] } });
        await store.dispatch(addGroup(undefined, ['new-meetup']));
        expect(axios.post).not.toHaveBeenCalled();
        expect(store.getActions()[1]).toEqual({
          type: 'ADD_GROUPS_ERROR',
          message: 'Group name can not be empty.',
        });
      });
    });

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
          type: 'GET_GROUPS_LOADING',
        });
      });

      it('should dispatch get groups success with groups', async () => {
        axios.get.mockReturnValue(Promise.resolve({ data: { groups: ['group1'] } }));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'GET_GROUPS_SUCCESS',
          groups: ['group1'],
        });
      });

      it('should dispatch get groups error', async () => {
        axios.get.mockReturnValue(Promise.reject(new Error('error')));
        await store.dispatch(getGroups());
        expect(store.getActions()[1]).toEqual({
          type: 'GET_GROUPS_ERROR',
        });
      });
    });
  });
});
