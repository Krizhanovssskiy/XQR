import { ADD_ITEMS_ON_SHOP } from '../_actions/types';


const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case ADD_ITEMS_ON_SHOP:
      return [ ...state,  ...action.payload ];  // Если свойства совпадают то они перекрываются а нет добавляются

    default:
      return state;
  }
};
