import { ALERT_SUCCESS, ALERT_ERROR, ALERT_OBJECT, ALERT_CLEAR } from '../_actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return { type: ALERT_SUCCESS, message: action.payload };

    case ALERT_ERROR:
      return { type: ALERT_ERROR, message: action.payload };

    case ALERT_OBJECT:
      return { type: ALERT_OBJECT, message: action.payload };

    case ALERT_CLEAR:
      return {};

    default:
      return state;
  }
};
