import xcard                      from '../_apis/xcard';
import {alertError, alertSuccess} from './alert';

import {
    POPULATE_CONTACTS,
    CREATE_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT
} from '../_actions/types';

export const updateInfoUserContactAction = data => dispatch =>
    dispatch({type: UPDATE_CONTACT, payload: data});

export const getContacts = (
    alias,
    per_page    = 10,
    page_number = 1
) => async dispatch => {
    try {



        const {data, status} = await xcard.get(`/profiles/${alias}/contacts?per_page=${per_page}&page=${page_number}`);

        if (data && ( status === 200 || status === '200' )) {
            dispatch({type: POPULATE_CONTACTS, payload: data.data});
            dispatch(alertSuccess('contacts received'));
        }


    } catch (err) {
        console.log(err);
        dispatch(alertError('error'));
    }
};

export const createContact = ({
                                  api_token,
                                  alias,
                                  profile_id,
                                  method_id,
                                  type_id = 1,
                                  network_id,
                                  status_id,
                                  contact_value,
                                  is_main = 1
                              }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
        try {

            const {data, status} = await xcard.post(`/profiles/${alias}/contacts`, {
                profile_id,
                method_id,
                type_id,
                network_id,
                status_id,
                contact_value,
                is_main
            });

            if (status === 201 || status === '201') {
                dispatch({type: CREATE_CONTACT, payload: data});
                dispatch(alertSuccess('contact created'));
            }
        } catch (err) {
            console.log(err);
            dispatch(alertError('error'));
        }
    }
};

export const updateContact = ({
                                  api_token,
                                  alias,
                                  contact_id,
                                  status_id = 1,
                                  contact_value,
                                  is_main = 1
                              }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
        try {
            const {data, status} = await xcard.put(
                `/profiles/${alias}/contacts/${contact_id}`,
                {
                    status_id,
                    contact_value,
                    is_main
                }
            );
            if (status === 200 || status === '200') {
                updateInfoUserContactAction(data)(dispatch);
                dispatch(alertSuccess('contact updated'));
            }
        } catch (err) {
            console.log(err);
            dispatch(alertError('error'));
        }
    }
};

export const deleteContact = ({
                                  alias,
                                  contact_id,
                                  api_token
                              }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
    }
    try {
        const {status} = await xcard.delete(
            `/profiles/${alias}/contacts/${contact_id}`
        );
        if (status === 204 || status === '204') {
            dispatch({type: DELETE_CONTACT, payload: contact_id});
            dispatch(alertSuccess('contact deleted'));
        }
    } catch (err) {
        console.log(err);
        dispatch(alertError('error'));
    }
};

export const deleteContactRedux = contact_id => {
    return {
        type:    DELETE_CONTACT,
        payload: contact_id
    };
};

export const addedContactRedux = item => {
    return {
        type:    CREATE_CONTACT,
        payload: item
    };
};

export const updateNetworks = ({
                                   api_token,
                                   alias,
                                   contact_id,
                                   status_id = 1,
                                   contact_value,
                                   is_main = 1
                               }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
        try {
            const {data, status} = await xcard.put(
                `/profiles/${alias}/contacts/${contact_id}`,
                {
                    status_id,
                    contact_value,
                    is_main
                }
            );
            if (status === 200 || status === '200') {
                dispatch({type: CREATE_CONTACT, payload: data});
                dispatch(alertSuccess('contact updated'));
            }
        } catch (err) {
            console.log(err);
            dispatch(alertError('error'));
        }
    }
};
