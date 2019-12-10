import xcard        from "../_apis/xcard";
import {SEARCH}     from "./types";
import {alertError} from "./alert";


export const searchAction = (
    query,
    per_page    = 10,
    page_number = 1
) => async dispatch => {
    if (query) {
        try {
            let query_url_encoded = encodeURIComponent(query);
            const {data, status} = await xcard.get(`/profiles/search?q=${query_url_encoded}&per_page=${per_page}&page=${page_number}`);
            console.log(query_url_encoded,data)
            if (data && ( status === 200 || status === '200' )) dispatch({type: SEARCH, payload: data.data});
        } catch (err) {
            console.log(err);
            dispatch(alertError(err.response));
        }
    }
};

export const clearSearchAction = () => dispatch => {
    dispatch({type: SEARCH, payload: []});
}
