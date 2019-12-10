import {LANGUAGE_INIT} from "./types";

export const lang_init = (lang) => dispatch => dispatch({type: LANGUAGE_INIT, payload: lang});
