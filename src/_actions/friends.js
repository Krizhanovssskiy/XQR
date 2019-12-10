import xcard from '../_apis/xcard';
import { alertError, alertSuccess } from './alert';

import {
  POPULATE_FRIENDS,
  POPULATE_FRIENDS_BY_CATEGORY,
  ADD_FRIEND,
  ADD_FRIEND_AND_PAST_TO_SOME_CATEGORY,
  PAST_FRIEND_TO_SOME_CATEGORY,
  REMOVE_FRIEND_FROM_CATEGORY,
  REMOVE_FRIEND,
  POPULATE_SCROLL_FRIENDS
  // SET_CURRENT_FRIEND,
  // RESET_CURRENT_FRIEND
} from './types';

export const getFriends = (
  api_token,
  alias,
  per_page = 15,
  page_number = 1
) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;

    try {
      const { data, status } = await xcard.get(
        `/profiles/${alias}/friends?per_page=${per_page}&page=${page_number}`
      );
      if (status === 200 || status === '200') {
        dispatch({ type: POPULATE_FRIENDS, payload: data.data });
        dispatch(alertSuccess('friends received'));
      }
    } catch (err) {
      console.log(err);
      dispatch(alertError('error'));
    }
  }
};

export const getScrollFriend = (
  api_token,
  alias,
  per_page,
  page_number
) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;

    try {
      const { data, status } = await xcard.get(
        `/profiles/${alias}/friends?per_page=${per_page}&page=${page_number}`
      );
      if (status === 200 || status === '200') {
        dispatch({ type: POPULATE_SCROLL_FRIENDS, payload: data.data });
        dispatch(alertSuccess('friends received'));
      }
    } catch (err) {
      console.log(err);
      dispatch(alertError('error'));
    }
  }
};

export const getFriendsByCategory = (
  api_token,
  alias,
  category_id,
  per_page = 10,
  page_number = 1
) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.get(
      `/profiles/${alias}/friends/category/${category_id}?per_page=${per_page}&page=${page_number}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: POPULATE_FRIENDS_BY_CATEGORY, payload: data.data });
      dispatch(alertSuccess('friends by category received'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const addFriend = ({
  api_token,
  alias,
  friend_alias
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { status, data } = await xcard.post(
      `/profiles/${alias}/friends/${friend_alias}`
    );
    if (status === 200 || status === '200') {
      dispatch({ type: ADD_FRIEND, payload: data });
      dispatch(alertSuccess('friend added'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const addFriendAndPastToSomeCategory = ({
  api_token,
  alias,
  friend_alias,
  category_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/friends/${friend_alias}/category/${category_id}`
    );

    if (status === 201 || status === '201') {
      dispatch({ type: ADD_FRIEND_AND_PAST_TO_SOME_CATEGORY, payload: data });
      dispatch(alertSuccess('friend added and pasted to some category'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const pastFriendToSomeCategory = ({
  api_token,
  alias,
  friend_alias,
  category_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.post(
      `/profiles/${alias}/friends/${friend_alias}/edits/category/${category_id}`
    );

    if (status === 201 || status === '201') {
      dispatch({ type: PAST_FRIEND_TO_SOME_CATEGORY, payload: data });
      dispatch(alertSuccess('friend pasted to the category'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const removeFriendFromCategory = ({
  api_token,
  alias,
  friend_alias,
  category_id
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const { data, status } = await xcard.delete(
      `/profiles/${alias}/friends/${friend_alias}/edits/category/${category_id}`
    );

    if (status === 204 || status === '204') {
      dispatch({ type: REMOVE_FRIEND_FROM_CATEGORY, payload: data });
      dispatch(alertSuccess('friend removed from the category'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

export const removeFriend = ({
  api_token,
  alias,
  friend_alias
}) => async dispatch => {
  if (api_token) {
    xcard.defaults.headers.common['X-Card-Token'] = api_token;
  }
  try {
    const response = await xcard.delete(
      `/profiles/${alias}/friends/${friend_alias}`
    );
    if (response.status === 204 || response.status === '204') {
      dispatch({ type: REMOVE_FRIEND, payload: { friend_alias } });
      dispatch(alertSuccess('friend removed'));
    }
  } catch (err) {
    console.log(err);
    dispatch(alertError('error'));
  }
};

// export const setCurrentCategory = ({ id }) => {
//   return { type: SET_CURRENT_FRIEND, payload: { id } };
// };

// export const resetCurrentCategory = () => {
//   return { type: RESET_CURRENT_FRIEND };
// };

export const determineIfCurrentPageAFriend = alias => {};
