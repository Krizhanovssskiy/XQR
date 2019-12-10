import { ACTIVE_USER } from '../_actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIVE_USER:
      return action.payload;
    default:
      return state;
  }
};
