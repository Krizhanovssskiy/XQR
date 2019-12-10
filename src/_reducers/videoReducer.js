import {
  POPULATE_VIDEOS,
  GET_VIDEO,
  CREATE_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  UPLOAD_VIDEO_IMAGE,
  DELETE_VIDEO_IMAGE
} from '../_actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case POPULATE_VIDEOS:
      return action.payload;

    case GET_VIDEO:
      return [action.payload, ...state];

    case CREATE_VIDEO:
      return [action.payload, ...state];

    case UPDATE_VIDEO:
      const updatedVideos = [...state];
      const updateIdx = updatedVideos.findIndex(
        video => video.id === action.payload.id
      );
      updatedVideos[updateIdx] = action.payload;
      return updatedVideos;

    case DELETE_VIDEO:
      const { video_id } = action.payload;
      return state.filter(video => video.id !== video_id);

    case UPLOAD_VIDEO_IMAGE:
      const newVideos = [...state];
      const newIdx = newVideos.findIndex(
        video => video.id === action.payload.id
      );
      const newVideo = { ...newVideos[newIdx], image_url: action.payload.url };
      newVideos[newIdx] = newVideo;
      return newVideos;

    case DELETE_VIDEO_IMAGE:
      const delImageVideos = [...state];
      const delImageIdx = delImageVideos.findIndex(
        video => video.id === action.payload.id
      );
      const delImageVideo = { ...delImageVideos[delImageIdx], image_url: '' };
      delImageVideos[delImageIdx] = delImageVideo;
      return delImageVideos;

    default:
      return state;
  }
};
