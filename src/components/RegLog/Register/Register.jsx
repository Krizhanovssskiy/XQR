import './style.scss';
import 'react-phone-number-input/style.css'


import React, {Component, Fragment}         from 'react';
import {connect}                            from 'react-redux';
import {Link}                               from 'react-router-dom';
import RegLog                               from '../../RegLog';
import PropTypes                            from 'prop-types';
import {registration, alertClear, clearReg} from '../../../_actions';
import AuthBtn                              from '../AuthBtns';
import AwesomeDebouncePromise               from 'awesome-debounce-promise';

import {validateLogin, validatePassword} from '../../../_helpers/formValidation';


import PhoneInput, {formatPhoneNumber, isValidPhoneNumber} from 'react-phone-number-input';
import labels                                              from 'react-phone-number-input/locale/ru'
import codes                                               from "../../../_helpers/codePhone"
import i18next                                             from 'i18next';


const findInfoForCode = (listCodes, code) => listCodes.find(item => item.code == code);


class Register extends Component {
    static propTypes = {
        registration:         PropTypes.func,
        alertClear:           PropTypes.func,
        alert:                PropTypes.object,
        isRegister:           PropTypes.bool,
        userRegistrationData: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            login:            '',
            method_id:        1,
            formatLogin:      null,
            password:         '',
            formatPassword:   null,
            isAgree:          false,
            renderFormEmail:  false,
            placeholderPhone: ""
        };
        this.userFlag = React.createRef();
        this.countryDefault = "UA";
        this.clearAlert = () => props.alertClear();
        this.APIDebounced = AwesomeDebouncePromise(this.clearAlert, 3000);
        props.clearReg();

    }


    onInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value.trim();
        const name = target.name;
        this.setState({[name]: value});
        if (name === 'password') this.setState({formatPassword: validatePassword(value)});
        else if (name === 'login') this.setState({method_id: 1, formatLogin: validateLogin(value)});
    };

    onToogleTypeForm = () => this.setState({
        login:           "",
        password:        "",
        formatLogin:     null,
        formatPassword:  null,
        renderFormEmail: !this.state.renderFormEmail
    });

    onSendData = ({registration, ...params}) => {
        registration(params)
    };

    onInputPhoneChange = phoneRaw => {
        /**Обновляем плэйсхолдер для инпута */
        const code = this.userFlag.current.input.input.state.country;
        const res = findInfoForCode(codes, code);
        /**Записываем телефон, проставляем метод*/
        const phone = formatPhoneNumber(phoneRaw, 'International');
        this.setState({
            formatLogin:      ( phone ) ? isValidPhoneNumber(phone) : null,
            login:            phoneRaw,
            placeholderPhone: ( res && res.dial_code ),
            method_id:        2
        });
    }

    onFormSubmit = event => {
        event.preventDefault();
        const {state: {login, password, method_id, formatPassword, formatLogin, isAgree}, props: {registration}} = this;
        if (isAgree && formatPassword && formatLogin) {
            /**Проверка на реферала**/
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const referrer_alias = params.get('referrer_alias');

            this.onSendData({
                registration,
                login,
                method_id,
                password,
                confirmPass: password,
                referrer_alias
            });
        } else {
            console.log('check the form');
        }
        this.APIDebounced();
    };

    componentDidMount() {
        /**Устанавливаем плэйсхолдер для инпута */
        const code = this.userFlag.current.input.input.state.country;
        const res = findInfoForCode(codes, code);
        this.setState({placeholderPhone: res.dial_code})
    }

    componentDidUpdate(prevProps) {
        let {isRegister, userRegistrationData, history, alert} = this.props;
        const status_id = userRegistrationData.status_id === 4 || userRegistrationData.status_id === '4';

        if (( isRegister !== prevProps.isRegister )
            && userRegistrationData
            && status_id) {
            return history.push('/register/confirm');
        } else if (alert !== prevProps.alert) {
            const {message} = alert;
            if (message) {
                const {code} = message;
                if (( code === 4 || code === '4' ) || ( code === 3 || code === '3' )) return history.push('/register/confirm');
                else if (code === 8 || code === '8') return history.push('/register/alias');
            }
        }
    }

    componentWillUnmount() {
        this.props.alertClear();
    }

    renderFormWithEmail({onInputChange, login, password}) {
        return (
            <Fragment>
                <div>
                    <input
                        name="login"
                        onChange={onInputChange}
                        value={login}
                        className="reglog-input reglog-input--text-center"
                        type="text"
                        placeholder={i18next.t('email_use')}
                        autoComplete="login"
                    />
                </div>
                <div>
                    <input
                        name="password"
                        onChange={onInputChange}
                        value={password}
                        className="reglog-input reglog-input--text-center"
                        type="password"
                        placeholder={i18next.t('password_use')}
                        autoComplete="current-password"
                    />
                </div>
            </Fragment>

        )
    }

    renderFormWithPhone({login, placeholderPhone, password, onInputChange}) {
        return (
            <div className="Register__inputs-text-box">
                <div className="Register__input--type-phone">
                    <PhoneInput
                        country={this.countryDefault}
                        ref={this.userFlag}
                        labels={labels}
                        autoComplete="login"
                        inputClassName="reglog-input custom-input"
                        placeholder={placeholderPhone}
                        value={formatPhoneNumber(login, 'International')}
                        onChange={this.onInputPhoneChange}
                    />
                </div>
                <div>
                    <input
                        name="password"
                        onChange={onInputChange}
                        value={password}
                        className="reglog-input reglog-input--text-center"
                        type="password"
                        placeholder={i18next.t('password_use')}
                        autoComplete="current-password"
                    />
                </div>
            </div>
        )
    }

    render() {
        const {
                  onFormSubmit,
                  onInputChange,
                  state: {login, formatLogin, password, formatPassword, isAgree, renderFormEmail, placeholderPhone},
                  props: {alert}
              } = this;
        const btnClassName = isAgree && formatPassword === true && formatLogin ? 'reglog-btn' : 'reglog-btn--inactive';
        return (
            <RegLog header={i18next.t('reg')}>
                <Fragment>
                    <div className="Register__toogle--block">

                        <label className="radio">
                            <input type="radio" name="rdo" className="hidden"
                                   checked={!renderFormEmail}
                                   onChange={this.onToogleTypeForm}/>
                            <span className="label"></span>
                            {i18next.t('reg_phone')}
                        </label>

                        <label className="radio">
                            <input type="radio" name="rdo"
                                   className="hidden"
                                   checked={renderFormEmail}
                                   onChange={this.onToogleTypeForm}/>
                            <span className="label"></span>
                            {i18next.t('reg_email')}
                        </label>

                    </div>
                    <form onSubmit={onFormSubmit} className="Register__form">
                        {
                            ( renderFormEmail ) ?
                                this.renderFormWithEmail({
                                    onInputChange,
                                    login,
                                    formatLogin,
                                    password,
                                    formatPassword
                                }) :
                                this.renderFormWithPhone({
                                    onInputChange,
                                    login,
                                    formatLogin,
                                    password,
                                    formatPassword,
                                    placeholderPhone
                                })
                        }
                        {( alert.message && alert.message.message ) ? (
                            <p className="Register__description  Register__description--alert">{alert.message.message} </p> ) : formatLogin === false ?
                            ( <p className="Register__description  Register__description--alert">
                                {i18next.t('invalid_login')}
                            </p> ) : formatLogin ?
                                ( <p className="Register__description Register__description--success">
                                    {i18next.t('valid_login_req')}
                                </p> ) : null
                        }

                        {formatPassword === null ? (
                                <p className="Register__description">
                                    {i18next.t('create_new_password')}
                                </p> )
                            : formatPassword === 'symbols' ? (
                                <p className="Register__description Register__description--alert">
                                    {i18next.t('password_invalid_character')}
                                </p> ) : formatPassword === 'length' ? (
                                <p className="Register__description Register__description--alert">
                                    {i18next.t('password_invalid_length')}
                                </p> ) : (
                                <p className="Register__description Register__description--success">
                                    {i18next.t('password_valid')}
                                </p>
                            )}
                        <div className="Register__social">
                            <AuthBtn/>
                        </div>
                        <input
                            name="isAgree"
                            onChange={onInputChange}
                            checked={isAgree}
                            className="Register__checkbox-input"
                            type="checkbox"
                            id="terms"
                        />
                        <label className="Register__checkbox-label" htmlFor="terms">
                            <span className="Register__checkbox-btn"/>
                            {i18next.t('agree_to_terms')}
                        </label>
                        <span className="Register__terms-link">
                            {i18next.t('terms_conditions')}
                        </span>
                        <div className="Register__footer">
                            <Link to="/login" className="Register__footer-login">
                                {i18next.t('login_btn')}
                            </Link>
                            <button type="submit" className={btnClassName}>
                                {i18next.t('reg_btn')}
                            </button>
                        </div>
                    </form>

                </Fragment>
            </RegLog>
        );
    }
}

const mapStateToProps = ({alert, registration}) => ( {
    alert,
    isRegister:           registration.isRegister,
    userRegistrationData: registration.userRegistrationData
} );

export default connect(mapStateToProps, {clearReg, registration, alertClear})(Register);
