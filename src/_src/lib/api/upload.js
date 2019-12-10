import xcard from "../../../_apis/xcard";
import {DELETE_PROFILE_IMAGE, UPLOAD_PROFILE_IMAGE} from "../../../_actions/types";
import {alertError, alertSuccess} from "../../../_actions";


export const uploadUserProfileImage = ({
                                           api_token,
                                           alias,
                                           formData
                                       }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;
        try {
            const {data, status} = await xcard.post(
                `/profiles/${alias}/upload-image`,
                formData
            );
            console.log(data, status);
            if (status === 200 || status === '200') {
                dispatch({type: UPLOAD_PROFILE_IMAGE, payload: data});
                dispatch(alertSuccess('video image uploaded'));
            }
        } catch (err) {
            console.log(err);
            dispatch(alertError('error'));
        }
    }
    return null
};

export const deleteUserProfileImage = ({
                                           api_token,
                                           alias
                                       }) => async dispatch => {
    if (api_token) {
        xcard.defaults.headers.common['X-Card-Token'] = api_token;

        try {
            const {status} = await xcard.delete(`/profiles/${alias}/delete-image`);
            if (status === 204 || status === '204') {
                dispatch({type: DELETE_PROFILE_IMAGE});
                dispatch(alertSuccess('video image deleted'));
            }
        } catch (err) {
            console.log(err);
            dispatch(alertError('error'));
        }
    }
    return null
};
