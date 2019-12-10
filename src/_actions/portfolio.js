import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_PORTFOLIO,
  CREATE_PORTFOLIO_WORK,
  UPDATE_PORTFOLIO_WORK,
  DELETE_PORTFOLIO_WORK,
  SET_PORTFOLIO_CURRENT_WORK,
  RESET_PORTFOLIO_CURRENT_WORK
} from '../_actions/types';

export const getPortfolio = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/portfolio?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_PORTFOLIO, payload: data.data });
      dispatch(alertSuccess('portfolio received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createWork = ({api_token, alias, formData}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/portfolio`,
      formData
    );

    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_PORTFOLIO_WORK, payload: data });
      dispatch(alertSuccess('portfolio work created'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateWork = ({api_token, alias, work_id, formData}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/portfolio/${work_id}`,
      formData
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_PORTFOLIO_WORK, payload: data });
      dispatch(alertSuccess('portfolio work updated'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyWork = ({ api_token, alias, work_id }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/portfolio/${work_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_PORTFOLIO_WORK, payload: { work_id } });
      dispatch(alertSuccess('portfolio work deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const setCurrentWork = ({ id }) => {
  return { type: SET_PORTFOLIO_CURRENT_WORK, payload: { id } };
};

export const resetCurrentWork = () => {
  return { type: RESET_PORTFOLIO_CURRENT_WORK };
};
