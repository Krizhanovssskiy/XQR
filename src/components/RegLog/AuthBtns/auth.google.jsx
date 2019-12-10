import React from 'react';

import {connect}             from 'react-redux';
import {auth, registration}  from '../../../_actions';
import {withRouter}          from 'react-router'
import SocialNetworkLoginBtn from '../SocialNetworkLoginBtn';
import propTypes             from "prop-types";
import {useAuthBtnHooks}     from "./helpers/custom.hooks"

const AuthGoogle = ({auth, registration, location}) => {

    const initialFunc = () => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID
            }).then(() => {
                console.log('Успешно')
            })
        });
    };
    const authInSocial = (callback) => {
        if(window.gapi){
            const GoogleAuth = window.gapi.auth2.getAuthInstance();
            GoogleAuth.signIn({
                scope: 'email'
            }).then((user, err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const googleUserId = user.getBasicProfile().getId();
                callback(googleUserId,1)
            })
        }
        return;
    };

    const {onSignIn} = useAuthBtnHooks({auth, registration, location, initialFunc,authInSocial});

    return (
        <SocialNetworkLoginBtn onSignInClick={onSignIn}
                               name="google-color"/>
    )
};

AuthGoogle.propTypes = {
    registration: propTypes.func.isRequired,
    auth:         propTypes.func.isRequired,
};


export default connect(
    null,
    {auth, registration}
)(withRouter(AuthGoogle));
