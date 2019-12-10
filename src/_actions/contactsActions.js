import xcard from '../_apis/xcard';
import { getApiTokenFromLocalStorage } from '../_helpers/authHeader';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_CONTACTS,
  CREATE_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT
} from '../_actions/types';





export const getContactsAction = (
  alias,
  per_page = 1,
  page_number = 1
) => async dispatch => {
  try {
    const { data } = await xcard.get(
      `/profiles/${alias}/contacts?per_page=${per_page}&page=${page_number}`
    );

    console.log( 'testContactsAction - 200', data );

    if (data.status === 200 || data.status === '200') {

      // console.log( 'testContactsAction - 200' );

      // dispatch({ type: POPULATE_CONTACTS, payload: data.data });
      // dispatch(alertSuccess('contacts received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createContactAction = ({
  alias,
  profile_id,
  method_id,
  type_id,
  status_id,
  contact_value,
  is_main
}) => async dispatch => {
  const api_token = getApiTokenFromLocalStorage('api_token');
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data } = await xcard.post(`/profiles/${alias}/contacts`, {
      profile_id,
      method_id,
      type_id,
      status_id,
      contact_value,
      is_main
    });
    if (data.status === 201 || data.status === '201') {
      dispatch({ type: CREATE_CONTACT, payload: data });
      dispatch(alertSuccess('contact created'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateContactAction = ({
  alias,
  contact_id,
  status_id,
  contact_value,
  is_main
}) => async dispatch => {
  const api_token = getApiTokenFromLocalStorage('api_token');
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data } = await xcard.post(
      `/profiles/${alias}/contacts/${contact_id}`,
      {
        status_id,
        contact_value,
        is_main
      }
    );
    if (data.status === 200 || data.status === '200') {
      dispatch({ type: UPDATE_CONTACT, payload: data });
      dispatch(alertSuccess('contact updated'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const deleteContactAction = ({ alias, contact_id }) => async dispatch => {
  const api_token = getApiTokenFromLocalStorage('api_token');
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data } = await xcard.post(
      `/profiles/${alias}/contacts/${contact_id}`
    );
    if (true) {
      dispatch({ type: DELETE_CONTACT, payload: {contact_id} });
      dispatch(alertSuccess('contact deleted'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};
