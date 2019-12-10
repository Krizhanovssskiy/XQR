import {
  POPULATE_PORTFOLIO,
  CREATE_PORTFOLIO_WORK,
  UPDATE_PORTFOLIO_WORK,
  DELETE_PORTFOLIO_WORK,
  SET_PORTFOLIO_CURRENT_WORK,
  RESET_PORTFOLIO_CURRENT_WORK
} from '../_actions/types';

const INITIAL_STATE = {
  currentWork: {
    name: 'Наименование работы',
    description: 'Краткое описание',
    work_url: ''
  },
  works: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POPULATE_PORTFOLIO:
      return {
        ...state,
        works: action.payload
      };

    case CREATE_PORTFOLIO_WORK:
      return {
        ...state,
        works: [action.payload, ...state.works]
      };

    case UPDATE_PORTFOLIO_WORK:
      const updatedPortfolio = [...state.works];
      const updateIdx = updatedPortfolio.findIndex(
        work => work.id === action.payload.id
      );
      updatedPortfolio[updateIdx] = action.payload;
      return {
        ...state,
        works: updatedPortfolio
      };

    case DELETE_PORTFOLIO_WORK:
      const { work_id } = action.payload;
      return {
        ...state,
        works: state.works.filter(work => work.id !== work_id)
      };

    case SET_PORTFOLIO_CURRENT_WORK:
      return {
        ...state,
        currentWork: {
          ...state.works.find(work => work.id === action.payload.id)
        }
      };

    case RESET_PORTFOLIO_CURRENT_WORK:
      return {
        ...state,
        currentWork: INITIAL_STATE.currentWork
      };
      
    default:
      return state;
  }
};
