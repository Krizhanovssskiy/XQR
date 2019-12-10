import { POPULATE_GOALS, CREATE_GOAL, DELETE_GOAL, UPDATE_GOAL } from '../_actions/types';

export default ( state = [], action) => {
  const { type, payload } = action;
  switch (type) {

    case POPULATE_GOALS:
      return [ ...payload ];

    case CREATE_GOAL:
      return [ ...state, payload];

    case DELETE_GOAL:
      const deleteGoalList = state.filter(
        goal => goal.id !== payload
      );
      return [...deleteGoalList];

    case UPDATE_GOAL:
      const updateGoalList = [...state ];
      const updateIdx = updateGoalList.findIndex(
        goal => goal.id === payload.id
      );
      updateGoalList[updateIdx] = payload;
      return updateGoalList;

    default: return state;
  }
}