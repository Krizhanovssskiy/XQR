import { ADD_GROUPS_CONTACTS } from './types';

export const addGroupsContactsAC = (sevice) => {
  return {
    type: ADD_GROUPS_CONTACTS,
    payload: sevice
  }
};