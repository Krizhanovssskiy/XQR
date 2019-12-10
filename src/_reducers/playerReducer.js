import { SHOW_PLAYER, HIDE_PLAYER } from '../_actions/types';

const INITIAL_STATE = {
  isPlayerActive: false,
  player: null
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PLAYER:
      return { ...state, isPlayerActive: true, player: action.payload };

    case HIDE_PLAYER:
      return { ...state, isPlayerActive: false, player: null };
    default:
      return state;
  }
};
