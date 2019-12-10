import './style.scss';

import React, {Fragment, useState, useEffect} from 'react';
import {connect}                                         from 'react-redux';
import {withRouter}                                      from 'react-router';
import {editUserData, setUserInfo}                       from '../../_src/lib/api';
import {alertClear}                                      from '../../_actions';
import _                                                 from "underscore";
import PropTypes                                         from "prop-types";
import i18next                                           from 'i18next';

const renderFirstNameBlock = ({clazzInputName, first_name}) => (
    <div className="UserNameSpecialty__form  UserNameSpecialty__form-name">
        <div className={`${clazzInputName} UserNameSpecialty__form-input`}>
            {first_name}
        </div>
    </div>
);

const renderProfessionBlock = ({clazzInputSpec, specialty}) => (
    <div className="UserNameSpecialty__form UserNameSpecialty__form-profession">
        <div className={`${clazzInputSpec} UserNameSpecialty__form-input`}>
            {specialty}
        </div>
    </div>
);


const isSubmit = ({
                      name,
                      user_profile,
                      setUserInfo,
                      user,
                      specialty,
                      first_name,
                      alertClear
                  }) => {
    const {alias, id} = user_profile;
    const {api_token} = user;

    if (api_token && user_profile.hasOwnProperty(name)) {
        const value = ( name === 'specialty' ) ? specialty : first_name;
        let field = {[name]: value};
        setUserInfo(
            {
                api_token,
                alias,
                profile_id: id
            },
            field
        );
        clearAlertDebounced(alertClear)
    }
};

const clearAlert = alertClear => {
    alertClear()
};

const clearAlertDebounced = _.debounce(clearAlert, 3000);
const sendDataDebounced = _.debounce(isSubmit, 1000);


const UserNameSpecialty = ({
                               alertClear,
                               setUserInfo,
                               user,
                               isChangePage,
                               alert,
                               user_profile
                           }) => {


    const [specialty, setSpecialty] = useState("");
    const [first_name, setFirstName] = useState("");

    useEffect(() => {
        if (user_profile && ( specialty !== user_profile.specialty
            && first_name !== user_profile.first_name )) {
            setSpecialty(user_profile.specialty);
            setFirstName(user_profile.first_name);
        }
    }, [user_profile]);


    const changeValue = name => async e => {
        const value = e.target.value;
        ( name === 'specialty' ) ?  setSpecialty(value) :  setFirstName(value);
        sendDataDebounced({setUserInfo, name, user_profile, user, alertClear, specialty:value, first_name:value});
    };

    const clazzInputName = first_name
        ? 'UserNameSpecialty__form-input-username-done UserNameSpecialty__form-input-username'
        : 'UserNameSpecialty__form-input-username';

    const clazzInputSpec = specialty
        ? 'UserNameSpecialty__form-input-userspec-done UserNameSpecialty__form-input-userspec'
        : 'UserNameSpecialty__form-input-userspec';


    return (
        <div className="UserNameSpecialty__blocks--form">
            {isChangePage ? (
                <Fragment>
                    <form className="UserNameSpecialty__form  UserNameSpecialty__form-name">
                        <input
                            value={first_name || ''}
                            placeholder={i18next.t("user_name_specialty.plaseholder_name")}
                            onChange={changeValue('first_name')}
                            type="text"
                            className={`${clazzInputName} UserNameSpecialty__form-input`}
                        />
                    </form>
                    <form className="UserNameSpecialty__form UserNameSpecialty__form-profession">
                        <input
                            value={specialty || ''}
                            placeholder={i18next.t("user_name_specialty.plaseholder_specialty")}
                            onChange={changeValue('specialty')}
                            type="text"
                            className={`${clazzInputSpec} UserNameSpecialty__form-input`}
                        />
                    </form>
                    {alert && alert.message ? (
                        alert.message.code === 88 ? (
                            <p className="Register__description Register__description--mb-0 Register__description--success">
                                {alert.message.message}
                            </p>
                        ) : (
                            <p className="Register__description Register__description--mb-0 Register__description--alert">
                                {alert.message.message}
                            </p>
                        )
                    ) : null}
                </Fragment>
            ) : (
                <Fragment>
                    {renderFirstNameBlock({clazzInputName, first_name})}
                    {renderProfessionBlock({clazzInputSpec, specialty})}
                </Fragment>
            )}
        </div>
    );

};

UserNameSpecialty.propTypes = {
    isChangePage: PropTypes.bool,
    userProfile:  PropTypes.object,
    editUserData: PropTypes.func,
    user:         PropTypes.object,
    alert:        PropTypes.object,
    setUserInfo:  PropTypes.func.isRequired,
    alertClear:   PropTypes.func
};

export default connect(
    ({profile, alert, auth, isChangePage}) => ( {
        isChangePage,
        isLoggedIn:   auth.isLoggedIn,
        user:         auth.user,
        user_profile: profile,
        alert
    } ),
    {editUserData, setUserInfo, alertClear}
)(withRouter(UserNameSpecialty));
