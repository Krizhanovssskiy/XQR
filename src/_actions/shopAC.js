import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_SHOP,
  CREATE_SHOP,
  UPDATE_SHOP,
  DELETE_SHOP,
  SET_CURRENT_SHOP,
  RESET_CURRENT_SHOP
} from './types';

export const getShop = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/products?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_SHOP, payload: data.data });
      dispatch(alertSuccess('product received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createShop = ({
                                api_token,
                                alias,
                                formData
                              }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/products`,
      formData
    );
    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_SHOP, payload: data });
      dispatch(alertSuccess('product created'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateShop = ({
                                api_token,
                                alias,
                                product_id,
                                formData
                              }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/products/${product_id}`,
      formData
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_SHOP, payload: data });
      dispatch(alertSuccess('products updated'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyShop = ({
                                 api_token,
                                 alias,
                                product_id
                               }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/products/${product_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_SHOP, payload: { product_id } });
      dispatch(alertSuccess('service deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const setCurrentShop = ({ id }) => {
  return { type: SET_CURRENT_SHOP, payload: { id } };
};

export const resetCurrentShop = () => {
  return { type: RESET_CURRENT_SHOP };
};
