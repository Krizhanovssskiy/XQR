import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_CATEGORIES,
  // GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  // UPLOAD_CATEGORY_IMAGE,
  // DELETE_CATEGORY_IMAGE,
  SET_CURRENT_CATEGORY,
  RESET_CURRENT_CATEGORY
} from './types';

export const getCategories = (
  api_token,
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/friend-categories?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_CATEGORIES, payload: data.data });
      dispatch(alertSuccess('friend-categories received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createCategory = ({
  api_token,
  alias,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/friend-categories`,
      formData
    );

    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_CATEGORY, payload: data });
      dispatch(alertSuccess('category created'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateCategory = ({
  api_token,
  alias,
  category_id,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/friend-categories/${category_id}`,
      formData
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_CATEGORY, payload: data });
      dispatch(alertSuccess('category updated'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyCategory = ({
  api_token,
  alias,
  category_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/friend-categories/${category_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_CATEGORY, payload: { category_id } });
      dispatch(alertSuccess('category deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const setCurrentCategory = ({ id }) => {
  return { type: SET_CURRENT_CATEGORY, payload: { id } };
};

export const resetCurrentCategory = () => {
  return { type: RESET_CURRENT_CATEGORY };
};
