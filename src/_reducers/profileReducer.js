import {
  PROFILE,
  UPLOAD_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE
} from '../_actions/types';


export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE:
      return { ...state, ...action.payload };

    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        profile_images: [
          { ...state.profile_images[0], image_url: action.payload.url }
        ]
      };

    case DELETE_PROFILE_IMAGE:
      return {
        ...state,
        profile_images: []
      };

    default:
      return state;
  }
};
