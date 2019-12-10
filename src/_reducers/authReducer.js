import { AUTH } from '../_actions/types';
import {isEmpty} from 'underscore';

const INITIAL_STATE = {
  isLoggedIn: null,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state , user: action.payload,isLoggedIn:!isEmpty(action.payload) };
    default:
      return state;
  }
};
