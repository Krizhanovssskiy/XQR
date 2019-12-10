import {
  PICK_FEATURES_TAB,
  PICK_USERDETAILS_TAB,
  PICK_ABOUTME_TAB,
  PICK_GLOBAL_MENU_TAB
} from './types';

export const pickFeaturesTab = tab => {
  return {
    type: PICK_FEATURES_TAB,
    payload: tab
  };
};

export const pickUserdetailsTab = tab => {
  return {
    type: PICK_USERDETAILS_TAB,
    payload: tab
  };
};

export const pickAboutMeTab = tab => {
  return {
    type: PICK_ABOUTME_TAB,
    payload: tab
  };
};

export const pickGlobalMenuTab = tab => {
  return {
    type: PICK_GLOBAL_MENU_TAB,
    payload: tab
  };
};
