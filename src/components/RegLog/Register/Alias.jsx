import React, {useState, useEffect,useRef} from 'react';
import {connect}                    from 'react-redux';
import PropTypes                    from 'prop-types';
import AwesomeDebouncePromise       from 'awesome-debounce-promise';
import {createAlias, alertClear}       from '../../../_actions';
import i18next                      from 'i18next';

import RegLog from '../../RegLog';
import './style.scss';

const host = '.xqr.one';


const Alias = ({createAlias,hostName, userRegistrationData, alert, user, isLoggedIn, alertClear, history}) => {
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const inputEl = useRef(null);

    useEffect(() => {
        let protocol = window.location.protocol;
        let subdomain = user.alias;
        let url=`${protocol}//${subdomain}.${hostName}`;

        if (user && isLoggedIn) return history.push(`/user/${user.alias}`, {isNewUser: true});
    }, [user, isLoggedIn, history]);
    const onChange = e => {
        /**Валидация алиаса обязательна*/
        const regex = /[a-zA-Z0-9_ -]$/;
        const aliasRaw = e.target.value;
        if (regex.test(aliasRaw) || aliasRaw.length === 0) setAlias(aliasRaw);
    };


    const clearAlert = () => {
        setError(null);
        alertClear();
    };

    const clearAlertDebounced = AwesomeDebouncePromise(clearAlert, 3000);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const {api_token} = userRegistrationData;
        if (api_token) {
            const aliasRow = alias.toLocaleLowerCase().replace(/ /g, "_");

            if (aliasRow.length >= 4 && aliasRow.length <= 50) createAlias(aliasRow, api_token);
            else if (aliasRow.length > 50) setError({message: i18next.t('error_character_length_over_50')});
            else setError({message: i18next.t('error_character_length_less_4')});

        } else setError({message: i18next.t('error')});
        clearAlertDebounced();
    };

    return (
        <RegLog header={i18next.t('url_your_page')}>
            <form onSubmit={onFormSubmit} className="Register__form Register__form--padding-custom">
                <div className="Register__inputs-text-box Register__inputs-text-box--mb-0
                Register__inputs--alias">
                    <p className="Register__description Register__description--mb-0">
                        {i18next.t('url_your_page')}
                    </p>
                    <div onClick={()=>inputEl.current.focus()}
                         className="Register__input-alias-box">
                        <div className="Register__description--alias">{host}</div>
                        <input
                            ref={inputEl}
                            name="alias"
                            onChange={onChange}
                            value={alias}
                            placeholder='username'
                            className="Register__input-alias"
                            type="text"
                        />
                    </div>
                    {( error && error.message ) ?
                        <p className="Register__description  Register__description--alert Register__description--mb-0 Register__description--type-abs">
                            {error.message}
                        </p>
                        : null}
                    {( alert && alert.message ) ?
                        <p className="Register__description  Register__description--alert Register__description--mb-0 Register__description--type-abs">
                            {i18next.t('error_alias_use')}
                        </p>
                        : null}
                </div>
                <div className="Register__footer Register__footer-flexend">
                    <button type="submit" className="reglog-btn">
                        {i18next.t('save_btn')}
                    </button>
                </div>
            </form>
        </RegLog>
    )
};

Alias.propTypes = {
    createAlias:   PropTypes.func.isRequired,
    alert:      PropTypes.object,
    user:       PropTypes.object,
    isLoggedIn: PropTypes.bool,
    history:    PropTypes.object,
};


export default connect(
    ({alert, registration, auth,hostName}) => ( {
        userRegistrationData: registration.userRegistrationData,
        alert,
        isLoggedIn:           auth.isLoggedIn,
        user:                 auth.user,
        hostName
    } ),
    {createAlias, alertClear}
)(Alias);
