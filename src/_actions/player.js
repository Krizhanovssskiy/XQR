import {
  SHOW_PLAYER,
  HIDE_PLAYER
} from './types';

export const showPlayer = player => {
  player.play();
  return {
    type: SHOW_PLAYER,
    payload: player
  };
};

export const hidePlayer = player => {
  player.pause();
  player.currentTime = 0;
  player.value = 0;
  return {
    type: HIDE_PLAYER
  };
};
