import {
  POPULATE_FRIENDS,
  // POPULATE_FRIENDS_BY_CATEGORY,
  ADD_FRIEND,
  // ADD_FRIEND_AND_PAST_TO_SOME_CATEGORY,
  // PAST_FRIEND_TO_SOME_CATEGORY,
  // REMOVE_FRIEND_FROM_CATEGORY,
  REMOVE_FRIEND,
  POPULATE_SCROLL_FRIENDS,
  // SET_CURRENT_FRIEND,
  // RESET_CURRENT_FRIEND
} from '../_actions/types';

const INITIAL_STATE = {
  friendsList: [],
  isDataReceived: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_FRIENDS:
      return {
        ...state,
        friendsList: action.payload,
        isDataReceived: true
      };

    case POPULATE_SCROLL_FRIENDS:
      return {
        ...state,
        friendsList: [ ...state.friendsList, ...action.payload ],
        isDataReceived: true
      };

    case ADD_FRIEND:
      return {
        ...state,
        friendsList: [action.payload, ...state.friendsList]
      };

    case REMOVE_FRIEND:
      const removedFriendsList = state.friendsList.filter(
        friend => friend.friend_profile.alias !== action.payload.friend_alias
      );
      return {
        ...state,
        friendsList: removedFriendsList
      };

    default:
      return state;
  }
};
