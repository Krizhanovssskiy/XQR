import xcard                        from '../../../_apis/xcard';
import {alertObject}                from '../../../_actions/index';
import {USER, PROFILE, ACTIVE_USER} from '../../../_actions/types';
import {resetCurrentUser}           from '../../../_actions';

/**********
 * Вспомогательные хелперы
 *********/

export const editUserData = (field, object) => dispatch => dispatch({type: USER, payload: {...object, ...field}});

export const getSingleUser = (user_id, api_token) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
        const url = `/users/${user_id}`;
        try {
            const {status, data} = await xcard.get(url);
            if (( status === 200 || status === '200' ) && data) {
                dispatch({type: ACTIVE_USER, payload: data})
            }
        } catch (err) {
            if (err) {
                const {statusText, status} = err.response;
                if (status === 401 || status === '401') {
                    dispatch(resetCurrentUser());
                }
                dispatch(alertObject({message: statusText}));
            }
        }
    }
};

export const getUserInfo = ({alias}) => async dispatch => {
    try {
        const url = `/profiles/${alias}`;
        let {status, data} = await xcard.get(url);
        if (( status === 200 || status === '200' ) && data)
            await dispatch({type: PROFILE, payload: data});
    } catch (err) {
        if(err && err.response){
            const {data, status} = err.response;
            console.log(status);
        }

        // resetCurrentUser
        //dispatch(alertObject({message: data}));
    }
};

export const setUserInfo = (
    {api_token, alias, profile_id},
    field
) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.put['X-Card-Token'] = api_token;
        const url = `/profiles/${alias}/edits/${profile_id}`;
        try {
            let {status, data} = await xcard.put(url, {...field});
            if (( status === 200 || status === '200' ) && data) {
                await dispatch({type: PROFILE, payload: data});
                dispatch(
                    alertObject({
                        message: 'Успешно',
                        code:    88
                    })
                );
            }
        } catch (err) {
            const {
                      data: {errors}
                  } = err.response;
            console.log(errors);
            dispatch(alertObject({message: 'Ошибка'}));
        }
    }
};

