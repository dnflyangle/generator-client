import axios from 'axios';

const BACKEND_API = 'https://generator-meetup-tw.herokuapp.com';

const ADD_GROUPS = `${BACKEND_API}/groups`;
const GET_GROUPS = `${BACKEND_API}/groups`;
const GET_EVENTS = `${BACKEND_API}/generate`;

export const getGroupsFromApi = () => axios.get(GET_GROUPS);

export const addGroupsFromApi = (groupName) => axios.post(ADD_GROUPS, {
  groupName,
});

export const getEventsFromApi = (data) => axios.post(GET_EVENTS, {
  data,
});
