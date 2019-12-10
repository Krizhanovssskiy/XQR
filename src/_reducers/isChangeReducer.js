import {IS_CHANGE_PAGE} from '../_actions/types';


export default (state = false, action) => {
    if (action.type === IS_CHANGE_PAGE) return action.payload;
    else return state;
};
