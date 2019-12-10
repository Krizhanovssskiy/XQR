import React ,{useCallback}   from 'react';
import {withRouter}          from 'react-router'
import SocialNetworkLoginBtn from '../SocialNetworkLoginBtn';
import {useAuthBtnHooks}     from "./helpers/custom.hooks";
import propTypes             from "prop-types";
import {connect}             from "react-redux";
import {auth, registration}  from "../../../_actions";


const FacebookAuth = ({auth, registration, location}) => {

    const initialFunc = useCallback(
        () => {
            window.fbAsyncInit = function() {
                const FB=window.FB;
                FB.init({
                    appId      : '307712030039400',
                    cookie     : true,
                    xfbml      : true,
                    version    : 'v4.0'
                });
                FB.AppEvents.logPageView();
                window.FB.getLoginStatus(response => {
                    //если залогинен?
                });
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        },
        [window.FB],
    );


    const authInSocial = (callback) => {
        const FB=window.FB;
        if(FB) {
            FB.login(response => {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me',res=>{
                        callback(res.id,2);
                    });
                }else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },{scope: 'email'})
        }
    };

    const {onSignIn} = useAuthBtnHooks({auth, registration, location, initialFunc,authInSocial});
    return (
        <SocialNetworkLoginBtn onSignInClick={onSignIn} name="facebook-color"/>
    );
};

FacebookAuth.propTypes = {
    registration: propTypes.func.isRequired,
    auth:         propTypes.func.isRequired,
};


export default connect(
    null,
    {auth, registration}
)(withRouter(FacebookAuth));



