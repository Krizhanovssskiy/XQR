import { SERVICES, PORTFOLIO, CONTACTS } from '../_constants';
import {
  PICK_FEATURES_TAB,
  PICK_USERDETAILS_TAB,
  PICK_ABOUTME_TAB,
  PICK_GLOBAL_MENU_TAB
} from '../_actions/types';

const INITIAL_STATE = {
  featureTab: SERVICES.RU,
  userdetailsTab: PORTFOLIO.RU,
  aboutmeTab: 'Обо мне',
  globalMenuTab: CONTACTS.RU
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PICK_FEATURES_TAB:
      return { ...state, featureTab: action.payload };

    case PICK_USERDETAILS_TAB:
      return { ...state, userdetailsTab: action.payload };

    case PICK_ABOUTME_TAB:
      return { ...state, aboutmeTab: action.payload };

    case PICK_GLOBAL_MENU_TAB:
      return { ...state, globalMenuTab: action.payload };

    default:
      return state;
  }
};
