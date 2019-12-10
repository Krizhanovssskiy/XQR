import {IS_OWN_PAGE} from '../_actions/types';


export default (state = false, action) => {
    if (action.type === IS_OWN_PAGE) return action.payload;
    else return state;
};
