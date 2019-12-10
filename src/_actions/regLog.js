import {REGISTRATION, SET_HOST_NAME,REGISTRATION_CLEAR, AUTH, GET_ALIAS, CLEAR_REG} from './types';
import {alertError, alertObject, alertSuccess}                        from './alert';
import {parseCode}                                                    from "../_helpers/authHeader";

import xcard       from '../_apis/xcard';
import * as moment from 'moment';


const setExpToken = () => moment().add(7, 'd').format("X");
export const clearReg = () => dispatch => dispatch({type: CLEAR_REG});
export const setCurrentUser = data => ( {type: AUTH, payload: data} );

export const resetCurrentUser = () => ( {type: AUTH, payload: {}} );
export const resetRegistration = () => ( {type: REGISTRATION_CLEAR, payload: {}} );


export const auth = ({
                         id,
                         network_id,
                         login,
                         password,
                         method_id,
                         language_id = 1
                     }) => async dispatch => {
    try {
        let authObject = {};

        if (method_id === 3 || method_id === '3') authObject = {id, network_id};
        else authObject = {login, password};

        authObject.method_id = method_id;
        authObject.language_id = language_id;

        let {status, data} = await xcard.post('/auth', authObject);

        if (( status === 200 || status === '200' ) && data) {
            if (!data.exp) data.exp = setExpToken();
            if (data.alias && data.alias.length > 0) {
                await dispatch(setCurrentUser(data));
            } else {
                await dispatch({type: REGISTRATION, payload: data});
                dispatch(alertObject({
                    message: "User does not have alias",
                    code:    88
                }));
            }
        }
    } catch (err) {
        const {data} = err.response;
        if (data.code) {
            await dispatch({type: REGISTRATION, payload: data.data});
            const obj = parseCode(data.code);
            await dispatch(alertObject(obj));
        } else {
            await dispatch(alertObject({message: data}));
        }
    }
};


export const registration = ({
                                 id,
                                 network_id,
                                 login,
                                 password,
                                 confirmPass,
                                 method_id,
                                 referrer_alias
                             }) => async dispatch => {
    try {
        let registrationObject = {};
        if (method_id === 3 || method_id === '3') {
            registrationObject = {
                id,
                network_id,
            }
        } else {
            registrationObject = {
                login,
                password,
                password_confirmation: confirmPass,
            };
        }
        registrationObject.method_id = method_id;
        if (referrer_alias) registrationObject.referrer_alias = referrer_alias;
        const {data} = await xcard.post('/registrations', registrationObject);
        if (data.data) {
            await dispatch({type: REGISTRATION, payload: {...data.data, method_id, login}});
            if (data.code === 8 || data.code === '8') {
                const obj = parseCode(data.code);
                await dispatch(alertObject(obj));
            }

        }
    } catch (err) {
        const {data} = err.response;
        if (data.code) {
            /**Если код 1, апи токен не возвращается */
            const obj = parseCode(data.code);
            if (( data.code === 1 || data.code === '1' )) return await dispatch(alertObject(obj));
            await dispatch({type: REGISTRATION, payload: {...data.data, method_id, login}});
            await dispatch(alertObject(obj));
        }
    }
};


export const getNewCodeConfirm = ({api_token}) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.post['X-Card-Token'] = api_token;
        try {
            const {data, code} = await xcard.post('/get-new-code');
        } catch (e) {
            dispatch(alertError(e.response.data.code));
        }
    }
};

export const accountConfirmation = (codeReq, api_token = "") => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.post['X-Card-Token'] = api_token;
        try {
            const {data} = await xcard.post('/confirm-account', {code: codeReq});
            dispatch(alertSuccess(data.code));
        } catch (e) {
            dispatch(alertError(e.response.data.code));
        }
    }
};


/**Не рабочее */
export const forgotPassword = obj => async dispatch => {


};


export const resetPassword = obj => async dispatch => {
    try {
        const {status, data} = await xcard.post('/reset-password', obj);

        if (status === 200 || status === '200') {
            const obj = parseCode(data.code);
            await dispatch(alertObject(obj));
        }
    } catch (err) {
        const {data} = err.response;
        console.log(data);
        if (data.code) {
            const obj = parseCode(data.code);
            await dispatch(alertObject(obj));
        }

    }
};


export const getNewResetCode = login => async dispatch => {
    try {
        const {status, data} = await xcard.post('/get-reset-code', {login});
        if (status === 201 || status === '201') {
            dispatch(alertSuccess(data.code));
        }
    } catch (err) {
        const {data} = err.response;
        console.log(data);
        if (data.code) {
            const obj = parseCode(data.code);
            await dispatch(alertObject(obj));
        } else {
            await dispatch(alertObject({message: "Аккаунт не существует"}));
        }

    }
};

export const setHostName=host=>dispatch=>dispatch({type: SET_HOST_NAME, payload: host});


export const createAlias = (alias, api_token) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.post['X-Card-Token'] = api_token;
        try {
            const {data} = await xcard.post('/profiles', {alias});
            if (( data.status_id === 1 || data.status_id === '1' ) && data.alias) {
                if (!data.exp) data.exp = setExpToken();
                if (!data.api_token) data.api_token = api_token;
                dispatch({type: GET_ALIAS, payload: data.alias});
                dispatch(setCurrentUser(data));
            }
        } catch (e) {
            dispatch(alertError(e.response.data));
        }
    }
};





