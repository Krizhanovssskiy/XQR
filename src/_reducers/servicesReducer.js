import {
  POPULATE_SERVICES,
  // GET_SERVICE,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
  // UPLOAD_SERVICE_IMAGE,
  // DELETE_SERVICE_IMAGE,
  SET_CURRENT_SERVICE,
  RESET_CURRENT_SERVICE
} from '../_actions/types';

const INITIAL_STATE = {
  servicesList: [],
  currentService: {
    name: '',
    price: '',
    description: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_SERVICES:
      return {
        ...state,
        servicesList: action.payload
      };

    case CREATE_SERVICE:
      return {
        ...state,
        servicesList: [action.payload, ...state.servicesList]
      };

    case UPDATE_SERVICE:
      const updatedServicesList = [...state.servicesList];
      const updatedIdx = updatedServicesList.findIndex(
        service => service.id === action.payload.id
      );
      updatedServicesList[updatedIdx] = action.payload;
      return {
        ...state,
        servicesList: updatedServicesList
      };

    case DELETE_SERVICE:
      const deletedServicesList = state.servicesList.filter(
        service => service.id !== action.payload.service_id
      );
      return {
        ...state,
        servicesList: deletedServicesList
      };

    case SET_CURRENT_SERVICE:
      return {
        ...state,
        currentService: {
          ...state.servicesList.find(
            service => service.id === action.payload.id
          )
        }
      };

    case RESET_CURRENT_SERVICE:
      return {
        ...state,
        currentService: INITIAL_STATE.currentService
      };

    default:
      return state;
  }
};
