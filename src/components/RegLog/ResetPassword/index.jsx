import RegLog from '../../RegLog';

import React, {useState, useEffect}      from 'react';
import {withRouter}                      from 'react-router-dom';
import {connect}                         from 'react-redux';
import {validatePassword, validateLogin} from '../../../_helpers/formValidation';

import {resetPassword, alertClear} from '../../../_actions'
import PropTypes                   from 'prop-types';
import _                           from 'underscore';
import i18next                     from "i18next";


const ResetPassword = ({alert, resetPassword, alertClear, login, history}) => {

    const [inputsValue, setInputValue] = useState({
        login:           "",
        password:        "",
        passwordConfirm: "",
        error:           "",
        code:            ""
    });
    useEffect(() => {
        const code = alert.message && alert.message.code;
        if (code === 12 || code === '12') {
            alertClear();
            return history.push('/login');
        }
    }, [alert.message])


    useEffect(() => {
        if (login && !inputsValue['login']) setInputValue({...inputsValue, login});
    }, [login])

    const onChange = name => e => {
        const value = e.target.value;
        switch (name) {
            case 'login':
                setInputValue({...inputsValue, login: value});
                break;
            case 'password':
                if (validatePassword(value)) setInputValue({...inputsValue, password: value});
                break;
            case 'passwordConfirm':
                if (validatePassword(value)) setInputValue({...inputsValue, passwordConfirm: value});
                break;
            case 'code':
                if (value.length <= 4) setInputValue({...inputsValue, code: value});
                break;
        }

    }

    const clearError = () => {
        setInputValue({
            ...inputsValue,
            error: ""
        });
    }

    const clearErrorDebounced = _.debounce(clearError, 3000);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        let error = "";

        if (!validateLogin(inputsValue['login'])) error = 'Неккоректный логин';
        else if (inputsValue['password'] !== inputsValue['passwordConfirm']) error = 'Пароли не совпадают';
        else if (!inputsValue['code']) error = 'Введи код подтверждения';


        if (error) {
            setInputValue({
                ...inputsValue,
                error
            });
            clearErrorDebounced();
        } else {
            await resetPassword({
                login:                 inputsValue['login'],
                password:              inputsValue['password'],
                password_confirmation: inputsValue['passwordConfirm'],
                code:                  inputsValue['code']
            });
        }


    };

    const code = alert.message && alert.message.code;
    return (
        <RegLog header={i18next.t('password_recovery')}>
            <form className="ChangePass__form" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    onChange={onChange('login')}
                    value={inputsValue['login']}
                    className="reglog-input"
                    placeholder={i18next.t('password_recovery')}
                />
                <input
                    type="password"
                    onChange={onChange('password')}
                    value={inputsValue['password']}
                    className="reglog-input"
                    placeholder={i18next.t('password_new')}
                />
                <input
                    type="password"
                    onChange={onChange('passwordConfirm')}
                    value={inputsValue['passwordConfirm']}
                    className="reglog-input"
                    placeholder={i18next.t('password_new_again')}
                />
                <input
                    type="number"
                    onChange={onChange('code')}
                    value={inputsValue['code']}
                    className="reglog-input"
                    placeholder={i18next.t('code')}
                />
                {inputsValue['error'] && <p className="ChangePass__alert">{inputsValue['error']}</p>}
                {alert.message && alert.message.message && (
                    ( code === 12 || code === '12' ) ?
                        <p className="ChangePass__alert ChangePass__alert--success">
                            {alert.message.message}</p>
                        :
                        <p className="ChangePass__alert">{alert.message.message}</p> )
                }

                <div className="ChangePass__btn-box">
                    <button type="submit" className="reglog-btn">
                        {i18next.t('recovery_pass')}
                    </button>
                </div>
            </form>
        </RegLog>
    );
}


ResetPassword.propTypes = {
    alert:         PropTypes.object,
    resetPassword: PropTypes.func.isRequired,
    alertClear:    PropTypes.func,
    history:       PropTypes.object,
    login:         PropTypes.string,
};


export default connect(
    ({alert}) => ( {alert} ),
    {resetPassword, alertClear}
)(withRouter(ResetPassword));

