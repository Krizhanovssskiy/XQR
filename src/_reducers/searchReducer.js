import {
   SEARCH
} from '../_actions/types';


export default (state = [], action) => {
    switch (action.type) {
        case SEARCH:
            return [ ...action.payload ];
        default:
            return state;
    }
};
