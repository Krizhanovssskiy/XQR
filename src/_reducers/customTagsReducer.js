import { POPULATE_CUSTOM_TAGS, CREATE_CUSTOM_TAGS, DELETE_CUSTOM_TAGS } from '../_actions/types';

export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case(POPULATE_CUSTOM_TAGS):
      return [ ...payload ];

    case(CREATE_CUSTOM_TAGS):
      return [ ...state, payload ];

    case(DELETE_CUSTOM_TAGS):
      const deleteTagsList = state.filter(
        tag => tag.id !== payload
      );
      return [...deleteTagsList];

    default: return state;
  }
}