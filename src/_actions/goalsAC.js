import {POPULATE_GOALS, CREATE_GOAL, DELETE_GOAL, UPDATE_GOAL} from './types';
import xcard from "../_apis/xcard";
import {alertError, alertSuccess} from "./alert";


export const getGoalsListing = (
  alias,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/goals?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_GOALS, payload: data.data });
      dispatch(alertSuccess('services received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const createGoal = ({
  alias,
  api_token,
  name,
  profile_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/goals`,
      {name, profile_id}
    );
    if (status === 201 || status === '201') {
      dispatch({ type: CREATE_GOAL, payload: data });
      dispatch(alertSuccess('goat received'));
    }


  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const destroyGoal = ({
                             api_token,
                             alias,
                             goal_id
                           }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status } = await xcard.delete(
      `/profiles/${alias}/goals/${goal_id}`
    );
    if (status === 204 || status === '204') {
      dispatch({ type: DELETE_GOAL, payload: goal_id });
      dispatch(alertSuccess('goal deleted'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const updateGoal = ({
                             api_token,
                             alias,
                             name,
                             id,
                             status_id = 1
                           }) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.put(
      `/profiles/${alias}/goals/${id}`,
      { name, status_id }
    );
    if (status === 200 || status === '200') {
      dispatch({ type: UPDATE_GOAL, payload: data });
      dispatch(alertSuccess('goal updated'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};