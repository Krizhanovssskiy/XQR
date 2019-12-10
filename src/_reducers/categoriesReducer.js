import {
  POPULATE_CATEGORIES,
  // GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  // UPLOAD_CATEGORY_IMAGE,
  // DELETE_CATEGORY_IMAGE,
  SET_CURRENT_CATEGORY,
  RESET_CURRENT_CATEGORY
} from '../_actions/types';

import i18next from "i18next";

const INITIAL_STATE = {
  categoriesList: [],
  currentCategory: {
    name: i18next.t("group_contact.name_group"),
    image_url: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_CATEGORIES:
      return {
        ...state,
        categoriesList: action.payload
      };

    case CREATE_CATEGORY:
      return {
        ...state,
        categoriesList: [action.payload, ...state.categoriesList]
      };

    case UPDATE_CATEGORY:
      const updatedCategorysList = [...state.categoriesList];
      const updatedIdx = updatedCategorysList.findIndex(
        category => category.id === action.payload.id
      );
      updatedCategorysList[updatedIdx] = action.payload;
      return {
        ...state,
        categoriesList: updatedCategorysList
      };

    case DELETE_CATEGORY:
      const deletedCategorysList = state.categoriesList.filter(
        category => category.id !== action.payload.category_id
      );
      return {
        ...state,
        categoriesList: deletedCategorysList
      };

    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: {
          ...state.categoriesList.find(
            category => category.id === action.payload.id
          )
        }
      };

    case RESET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: INITIAL_STATE.currentCategory
      };

    default:
      return state;
  }
};
