import { LANGUAGE_INIT } from '../_actions/types';

const initialState = "";

export default function globalState (state = initialState, action) {
    if (action.type === LANGUAGE_INIT) return action.payload ;
     else return state;
}
