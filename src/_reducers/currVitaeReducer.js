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
} from '../_actions/types';

const INITIAL_STATE = {
  id: null,
  profile_cv_skills: [],
  profile_cv_skills_forms: [],
  profile_cv_certificates: [],
  profile_cv_certificates_forms: [],
  profile_cv_languages: [],
  profile_cv_languages_forms: [],
  profile_cv_education: [],
  profile_cv_education_forms: [],
  profile_cv_work: [],
  profile_cv_work_forms: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_CV:
      return { ...state, ...action.payload };

    case ADD_CV_ENTITY:
      return {
        ...state,
        [action.payload.apiKey]: [
          ...state[action.payload.apiKey],
          action.payload.entity
        ]
      };

    case UPDATE_CV_ENTITY:
      const cuttedEntities = state[action.payload.apiKey].filter(
        ({ id }) => id !== action.payload.entity.id
      );
      return {
        ...state,
        [action.payload.apiKey]: [...cuttedEntities, action.payload.entity]
      };

    case DELETE_CV_ENTITY:
      return {
        ...state,
        [action.payload.apiKey]: state[action.payload.apiKey].filter(
          ({ id }) => id !== action.payload.id
        )
      };

    case CREATE_CV_FORM:
      return {
        ...state,
        [action.payload.formsKey]: [
          ...state[action.payload.formsKey],
          action.payload.form
        ]
      };

    case CHANGE_INPUT_CV:
      const { formsKey, entity_id, name, value } = action.payload;
      const idx = state[formsKey].findIndex(ent => ent.id === entity_id);
      const newEntity = {
        ...state[formsKey][idx],
        [name]: value,
        isTouched: true
      };
      const newForms = [...state[formsKey]];
      newForms[idx] = newEntity;
      return {
        ...state,
        [formsKey]: newForms
      };

    case REMOVE_CV_FORM:
      return {
        ...state,
        [action.payload.formsKey]: state[action.payload.formsKey].filter(
          entity => {
            return entity.id !== action.payload.id;
          }
        )
      };

    case CLEAR_FROM_FORMS:
      return {
        ...state,
        profile_cv_skills_forms: [],
        profile_cv_certificates_forms: [],
        profile_cv_languages_forms: [],
        profile_cv_education_forms: [],
        profile_cv_work_forms: []
      };

    case POPULATE_CV_FORMS:
      return {
        ...state,
        [action.payload.formsKey]: [
          ...state[action.payload.apiKey].map(entity => ({
            ...entity,
            cvLabelIdx: action.payload.cvLabelIdx
          }))
        ]
      };

    default:
      return state;
  }
};
