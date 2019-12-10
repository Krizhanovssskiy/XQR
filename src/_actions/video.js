import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_VIDEOS,
  GET_VIDEO,
  CREATE_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  UPLOAD_VIDEO_IMAGE,
  DELETE_VIDEO_IMAGE
} from '../_actions/types';

export const getVideoListing = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/video?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_VIDEOS, payload: data.data });
      dispatch(alertSuccess('videos received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const getSingleVideo = (alias, video_id) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/video/${video_id}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: GET_VIDEO, payload: data });
      dispatch(alertSuccess('video received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createVideo = ({
  api_token,
  alias,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/video`,
      formData
    );

    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_VIDEO, payload: data });
      dispatch(alertSuccess('video created'));
    }
  } catch (err) {
    console.log(err.response);
    dispatch(alertError('error'));
  }
  }
};

export const updateVideo = ({
  api_token,
  alias,
  video_id,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/video/${video_id}`,
      formData
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_VIDEO, payload: data });
      dispatch(alertSuccess('video updated'));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyVideo = ({
  api_token,
  alias,
  video_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/video/${video_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_VIDEO, payload: { video_id } });
      dispatch(alertSuccess('video deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const uploadVideoImage = ({
  api_token,
  alias,
  video_id,
  formData
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/video/${video_id}/upload-image`,
      { formData }
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPLOAD_VIDEO_IMAGE, payload: { ...data, video_id } });
      dispatch(alertSuccess('video image uploaded'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const deleteVideoImage = ({
  api_token,
  alias,
  video_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/video/${video_id}/upload-image`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_VIDEO_IMAGE, payload: { video_id } });
      dispatch(alertSuccess('video image deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};
