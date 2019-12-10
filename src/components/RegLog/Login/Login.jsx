import './style.scss';
import React, {Component, Fragment} from 'react';
import {connect}                    from 'react-redux';
import {Link, withRouter}           from 'react-router-dom';
import propTypes                    from "prop-types";
import {auth}                       from '../../../_actions';
import AuthBtn                      from '../AuthBtns';
import RegLog                       from '../../RegLog';
import {setCurrentUser}             from "../../../_actions";
import {validateLogin}              from '../../../_helpers/formValidation';
import {alertClear, alertObject}    from '../../../_actions';
import AwesomeDebouncePromise       from 'awesome-debounce-promise';
import i18next                      from 'i18next';
import MainLayout                   from '../../../_src/layouts/Main'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login:    '',
            password: '',
        };
        this.clearAlert = () => {
            props.alertClear()
        };
        const {user} = props;
        if (props.isLoggedIn && user && user.alias) return props.history.push(`/user/${user.alias}`);
        this.APIDebounced = AwesomeDebouncePromise(this.clearAlert, 3000);
    }


    static propTypes = {
        alert:          propTypes.object,
        alertError:     propTypes.func,
        setCurrentUser: propTypes.func.isRequired,
        auth:           propTypes.func.isRequired,
        alertClear:     propTypes.func,
        isLoggedIn:     propTypes.bool,
        user:           propTypes.object
    };


    onInputChange = event => {
        const {value, name} = event.target;
        this.setState({
            [name]: value.trim()
        });
    };


    componentDidUpdate(prevProps) {
        /**Редиректим пользователя, если он залогинен */
        const {user, isLoggedIn, history, alert} = this.props;
        if (( isLoggedIn !== prevProps.isLoggedIn ) && isLoggedIn && user) return history.push(`/user/${user.alias}`);
        if (alert && alert.message) {
            const {code} = alert.message;
            /**Редиректим на страницу подтверждения */
            if (( code === 4 || code === '4' ) || ( code === 3 || code === '3' ) || ( code === 6 || code === '6' )) return history.push('/register/confirm');
            /**Редиректим на страницу выбора алиаса, 88 код придуманный*/
            if (code === 88 || code === '88') return history.push('/register/alias');
        }
    }

    componentWillUnmount() {
        this.props.alertClear();
    }

    onFormSubmit = event => {
        event.preventDefault();
        const {state: {login, password}, props: {auth, alertObject}} = this;
        const login_processed=login.replace(/ /g, "");
        const type = validateLogin(login_processed);
        if (type && password) {
            auth({
                login:login_processed,
                password,
                method_id: ( type === 'phone' ) ? 2 : 1
            })
        } else if (!type) alertObject({message: 'Используйте телефон или email', code: ""});
        else alertObject({message: 'Введите пароль', code: ""});
        this.APIDebounced();
    };


    renderInputs() {
        return (
            <Fragment>
                <input
                    name="login"
                    onChange={this.onInputChange}
                    value={this.state.login}
                    className="reglog-input"
                    type="text"
                    placeholder={i18next.t('phone_email')}
                    autoComplete="login"
                />

                <input
                    name="password"
                    onChange={this.onInputChange}
                    value={this.state.password}
                    className="reglog-input"
                    type="password"
                    placeholder={i18next.t('password')}
                    autoComplete="current-password"
                />
            </Fragment> )
    }

    render() {
        const {alert} = this.props;
        return (
            <MainLayout>
                <RegLog header={i18next.t('login')}>
                    <form onSubmit={this.onFormSubmit} className="Login__form">
                        {this.renderInputs()}
                        {( alert && alert.message ) ?
                            <p className="Register__description  Register__description--alert
             Register__description--mb-0 Register__description--text-r">
                                {alert.message.message}
                            </p>
                            : null}
                        <div className="Login__link--block">
                            <Link to="/forgot-password" className="Login__link">
                                {i18next.t('forgot_password')}
                            </Link>
                        </div>
                        <div className="Login__footer">
                            <Link to="/register" className="Login__link">
                                {i18next.t('create_account_btn')}
                            </Link>
                            <button type="submit" className="reglog-btn">
                                {i18next.t('login_btn')}
                            </button>
                        </div>
                    </form>
                    <div className="Login__social">
                        <AuthBtn/>
                    </div>
                </RegLog>
            </MainLayout>
        );
    }
}

export default connect(
    ({auth, alert}) => ( {
        alert,
        isLoggedIn: auth.isLoggedIn,
        user:       auth.user
    } ),
    {
        alertObject,
        alertClear,
        auth,
        setCurrentUser,
    }
)(withRouter(Login));
