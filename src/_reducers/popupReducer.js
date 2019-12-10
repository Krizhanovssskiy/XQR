import { POPUP_SHOW, POPUP_HIDE } from '../_actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case POPUP_SHOW:
      return action.payload;

    case POPUP_HIDE:
      return null;

    default:
      return state;
  }
};
