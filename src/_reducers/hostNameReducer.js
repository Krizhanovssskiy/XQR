import { SET_HOST_NAME } from '../_actions/types';

const initialState = "";

export default function globalState (state = initialState, action) {
    if (action.type === SET_HOST_NAME) return action.payload ;
     else return state;
}
