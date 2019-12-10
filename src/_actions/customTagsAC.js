import {POPULATE_CUSTOM_TAGS, CREATE_CUSTOM_TAGS, DELETE_CUSTOM_TAGS, DELETE_GOAL} from './types';
import xcard from "../_apis/xcard";
import {alertError, alertSuccess} from "./alert";

export const getCustomTagsListing = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/custom-tags?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_CUSTOM_TAGS, payload: data.data });
      dispatch(alertSuccess('custom tag received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createCustomTag = ({
        alias,
        api_token,
        tag_name,
        type_id = 2,
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/custom-tags`,
      {tag_name, type_id}
    );
    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_CUSTOM_TAGS, payload: data });
      dispatch(alertSuccess('custom tag received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const deleteCustomTag = ({
                                  api_token,
                                  alias,
                                  tag_id
                                }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/custom-tags/${tag_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_CUSTOM_TAGS, payload: tag_id });
      dispatch(alertSuccess('custom tag deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};