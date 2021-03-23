import meetupGroupReducer from './meetupGroups';

describe('meetupGroupReducer', () => {
  describe('reducer', () => {
    describe('get groups', () => {
      it('should handle loading action', () => {
        const store = meetupGroupReducer(undefined, { type: 'GET_GROUPS_LOADING' });
        expect(store).toEqual({
          getGroupsLoading: true,
          getGroupsError: false,
          groups: undefined,
          addGroupsLoading: false,
          addGroupsError: undefined,
          addGroupsSuccess: false,
        });
      });
      it('should handle error action', () => {
        const store = meetupGroupReducer(undefined, { type: 'GET_GROUPS_ERROR' });
        expect(store).toEqual({
          getGroupsLoading: false,
          getGroupsError: true,
          groups: undefined,
          addGroupsLoading: false,
          addGroupsError: undefined,
          addGroupsSuccess: false,
        });
      });
      it('should handle success action', () => {
        const store = meetupGroupReducer(undefined, {
          type: 'GET_GROUPS_SUCCESS',
          groups: ['group1'],
        });
        expect(store).toEqual({
          getGroupsLoading: false,
          getGroupsError: false,
          groups: ['group1'],
          addGroupsLoading: false,
          addGroupsError: undefined,
          addGroupsSuccess: false,
        });
      });
    });

    describe('add group', () => {
      it('should handle loading action', () => {
        const store = meetupGroupReducer(undefined, { type: 'ADD_GROUPS_LOADING' });
        expect(store).toEqual({
          getGroupsLoading: false,
          getGroupsError: false,
          groups: [],
          addGroupsLoading: true,
          addGroupsError: undefined,
          addGroupsSuccess: false,
        });
      });
      it('should handle error action', () => {
        const store = meetupGroupReducer(undefined,
          {
            type: 'ADD_GROUPS_ERROR',
            message: 'message',
          });
        expect(store).toEqual({
          getGroupsLoading: false,
          getGroupsError: false,
          groups: [],
          addGroupsLoading: false,
          addGroupsError: 'message',
          addGroupsSuccess: false,
        });
      });
      it('should handle success action', () => {
        const store = meetupGroupReducer(undefined, {
          type: 'ADD_GROUPS_SUCCESS',
        });
        expect(store).toEqual({
          getGroupsLoading: false,
          getGroupsError: false,
          groups: [],
          addGroupsLoading: false,
          addGroupsError: undefined,
          addGroupsSuccess: true,
        });
      });
    });
  });
});
