import './style.scss';

import React, {Component}                                   from 'react';
import {connect}                                            from 'react-redux';
import {Link}                                               from 'react-router-dom';
import RegLog                                               from '../..';
import {alertClear, accountConfirmation, getNewCodeConfirm} from '../../../../_actions';
import AwesomeDebouncePromise                               from 'awesome-debounce-promise';
import PropTypes                                            from 'prop-types';
import _                                                    from "underscore";
import {parseCode}                                          from "../../../../_helpers/authHeader";
import i18next                                              from 'i18next';


class ConfirmationReg extends Component {
    inputNames = [0, 1, 2, 3];
    inputs = [];
    _isMounted = false;

    static propTypes = {
        alert:               PropTypes.object,
        history:             PropTypes.object,
        alertClear:          PropTypes.func,
        accountConfirmation: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            inputsValues: ['', '', '', ''],
            error:        null,
            responceApi:  null
        };
        this.clearAlert = () => {
            this.setState({responceApi: null, error: null});
            props.alertClear();
        }
        this.APIDebounced = AwesomeDebouncePromise(this.clearAlert, 3000);
    }

    btnRef = React.createRef();

    onFormSubmit = (e) => {
        e.preventDefault();
        const {api_token} = this.props.userRegistrationData;
        const password = this.state.inputsValues.join('');
        if (password.length !== 4 || isNaN(password)) {
            this.setState({error: i18next.t('invalid_login')});
        } else {
            if (api_token) this.props.accountConfirmation(password, api_token);
        }
        this.APIDebounced();
    };

    componentDidUpdate(prevProps) {
        const {alert, history} = this.props;
        this._isMounted = true;
        const code = alert.message;
        if (code && prevProps.alert.message !== code) {
            this.setState({responceApi: parseCode(code)});
            if (( alert.message === 8 || alert.message === '8' )
                || ( alert.message === 10 || alert.message === '10' )) {
                history.push('/register/alias');
            }
        }
    }

    onSubmitGetNewCode = () => {
        const {api_token} = this.props.userRegistrationData;
        this.props.getNewCodeConfirm({api_token});
        this.APIDebounced();
    }


    componentWillUnmount() {
        this._isMounted = false;
        this.APIDebounced();
        this.props.alertClear();
    }

    onInputChange = e => {
        const {name, value} = e.target;
        if (( !isNaN(value) || value === '' ) && value.length <= 1) {
            this.setState(state => {
                const newInputsValues = [...state.inputsValues];
                newInputsValues[name] = value;
                return {inputsValues: newInputsValues};
            });
            if (!this.inputs[name].value) return;

            this.inputs[name].nextSibling
                ? this.inputs[name].nextSibling.focus()
                : this.btnRef.current.focus();
        }
    };

    renderInputs() {
        return this.inputNames.map((el, index) => {
            return (
                <input
                    key={el}
                    ref={input => ( this.inputs[index] = input )}
                    autoFocus={index === 0 ? true : false}
                    type="text"
                    maxLength="1"
                    className="ConfirmationReg__input"
                    placeholder="0"
                    autoComplete="off"
                    name={el}
                    onChange={this.onInputChange}
                    value={this.state.inputsValues[index]}
                />
            );
        });
    }

    render() {
        const {error, responceApi} = this.state;
        return (
            <RegLog header={i18next.t('reg_confirm')}>
                <form onSubmit={this.onFormSubmit} className="ConfirmationReg__form">
                    <div className="ConfirmationReg__formgroup">
                        {this.renderInputs()}
                    </div>
                    <p className="ConfirmationReg__description">
                        {i18next.t('password_confirm_email_phone')}
                    </p>
                    <div className="ConfirmationReg__btn-box">
                        <div className="ConfirmationReg__resend-btn" role="button" onClick={this.onSubmitGetNewCode}>
                            {i18next.t('send_again')}
                        </div>
                        {( responceApi && !_.isEmpty(responceApi) ) ?
                            <p className="Register__description  Register__description--alert Register__description--mb-0">
                                {responceApi.message}
                            </p>
                            : null}
                        {( error ) ?
                            <p className="Register__description  Register__description--alert Register__description--mb-0">
                                {error}
                            </p>
                            : null}
                        <button ref={this.btnRef} type="submit" className="reglog-btn">
                            {i18next.t('reg_btn')}
                        </button>
                        <div className="ConfirmationReg__login-btn" role="button">
                            <Link to="/login" className="Register__footer-login">
                                {i18next.t('login_btn')}
                            </Link>
                        </div>
                    </div>
                </form>
            </RegLog>
        );
    }
}


export default connect(
    ({alert, registration}) => ( {alert, userRegistrationData: registration.userRegistrationData} ),
    {alertClear, accountConfirmation, getNewCodeConfirm}
)(ConfirmationReg);

