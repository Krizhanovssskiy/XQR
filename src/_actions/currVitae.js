import {
  POPULATE_CV,
  ADD_CV_ENTITY,
  UPDATE_CV_ENTITY,
  DELETE_CV_ENTITY,
  CREATE_CV_FORM,
  CLEAR_FROM_FORMS,
  CHANGE_INPUT_CV,
  REMOVE_CV_FORM,
  POPULATE_CV_FORMS
} from './types';
import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';
import Entity from '../_helpers/Entity';

export const getCV = (alias, per_page = 1, page = 1) => async dispatch => {
  try {
    const response = await xcard.get(
      `/profiles/${alias}/cv/detailed-list?per_page=${per_page}&page=${page}`
    );
    const {
      id,
      profile_cv_skills,
      profile_cv_certificates,
      profile_cv_languages,
      profile_cv_education,
      profile_cv_work
    } = response.data.data[0];
    const recievedCV = {
      id,
      profile_cv_skills,
      profile_cv_certificates,
      profile_cv_languages,
      profile_cv_education,
      profile_cv_work
    };
    dispatch({ type: POPULATE_CV, payload: recievedCV });
  } catch (err) {
    console.log(err);
    dispatch(alertError(err));
  }
};

export const addCvEntity = ({
  api_token,
  alias,
  cv_id,
  apiKey,
  apiPath,
  form
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const response = await xcard.post(
      `profiles/${alias}/cv/${cv_id}/${apiPath}`,
      { ...form }
    );
    dispatch({
      type: ADD_CV_ENTITY,
      payload: { apiKey, entity: response.data }
    });
    dispatch(alertSuccess(`${apiPath} added`));
  } catch (err) {
    console.log(err.response);
    // dispatch(alertError(err.response.data));
  }
};

export const updateCvEntity = ({
  api_token,
  id,
  alias,
  cv_id,
  apiKey,
  apiPath,
  form
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const response = await xcard.put(
      `/profiles/${alias}/cv/${cv_id}/${apiPath}/${id}`,
      { ...form }
    );
    dispatch({
      type: UPDATE_CV_ENTITY,
      payload: { apiKey, entity: response.data }
    });
    dispatch(alertSuccess(`${apiPath} updated`));
  } catch (err) {
    console.log(err.response);
    // dispatch(alertError(err.response.data));
  }
};

export const deleteCvEntity = ({
  api_token,
  alias,
  cv_id,
  id,
  apiPath,
  apiKey,
  formsKey
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const response = await xcard.delete(
      `/profiles/${alias}/cv/${cv_id}/${apiPath}/${id}`
    );
    if (response.status === 204) {
      dispatch({ type: DELETE_CV_ENTITY, payload: { apiKey, id } });
      dispatch({ type: REMOVE_CV_FORM, payload: { formsKey, id } });
      dispatch(alertSuccess(`${apiPath} deleted`));
    }
  } catch (err) {
    console.log(err.response);
    // dispatch(alertError(err.response.data));
  }
};

export const populateForms = ({ apiKey, formsKey, cvLabelIdx }) => {
  return { type: POPULATE_CV_FORMS, payload: { apiKey, formsKey, cvLabelIdx } };
};

export const createForm = ({ cv_id, inputsMetadata, formsKey, cvLabelIdx }) => {
  const form = new Entity({ cv_id, inputsMetadata, cvLabelIdx });

  return { type: CREATE_CV_FORM, payload: { formsKey, form } };
};

export const removeForm = ({ formsKey, id }) => {
  return { type: REMOVE_CV_FORM, payload: { formsKey, id } };
};

export const onFormInputChange = ({ formsKey, entity_id, name, value }) => {
  return {
    type: CHANGE_INPUT_CV,
    payload: { formsKey, entity_id, name, value }
  };
};

export const clearFromBlanks = () => {
  return { type: CLEAR_FROM_FORMS };
};
