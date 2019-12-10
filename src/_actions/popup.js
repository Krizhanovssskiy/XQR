import { POPUP_SHOW, POPUP_HIDE, ALERT_CLEAR } from './types';

export const showPopup = popupToShow => dispath => {
  dispath({ type: ALERT_CLEAR });
  dispath({
    type: POPUP_SHOW,
    payload: popupToShow
  });
};

export const hidePopup = () => dispath => {
  dispath({ type: ALERT_CLEAR });
  dispath({ type: POPUP_HIDE });
};
