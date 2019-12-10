import { ALERT_SUCCESS, ALERT_ERROR, ALERT_OBJECT, ALERT_CLEAR } from '../_actions/types';

export const alertSuccess = message => {
  return { type: ALERT_SUCCESS, payload: message };
};

export const alertError = message => {
  return { type: ALERT_ERROR, payload: message };
};


export const alertObject = obj => ({ type: ALERT_OBJECT, payload: obj });


export const alertClear = () => async dispath => dispath({ type: ALERT_CLEAR });
