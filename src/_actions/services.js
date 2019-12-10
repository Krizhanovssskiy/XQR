import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_SERVICES,
  // GET_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  // UPLOAD_SERVICE_IMAGE,
  // DELETE_SERVICE_IMAGE,
  SET_CURRENT_SERVICE,
  RESET_CURRENT_SERVICE
} from './types';

export const getServices = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/services?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_SERVICES, payload: data.data });
      dispatch(alertSuccess('services received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createService = ({
  api_token,
  alias,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/services`,
      formData
    );

    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_SERVICE, payload: data });
      dispatch(alertSuccess('service created'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateService = ({
  api_token,
  alias,
  service_id,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/services/${service_id}`,
      formData
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_SERVICE, payload: data });
      dispatch(alertSuccess('service updated'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyService = ({
  api_token,
  alias,
  service_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/services/${service_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_SERVICE, payload: { service_id } });
      dispatch(alertSuccess('service deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const setCurrentService = ({ id }) => {
  return { type: SET_CURRENT_SERVICE, payload: { id } };
};

export const resetCurrentService = () => {
  return { type: RESET_CURRENT_SERVICE };
};
