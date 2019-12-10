import RegLog from '../../RegLog';
import '.././ChangePassword/style.scss';

import React, {useState, useEffect}  from 'react';
import MainLayout                    from '../../../_src/layouts/Main'
import {connect}                     from 'react-redux';
import {validateLogin}               from '../../../_helpers/formValidation';
import {getNewResetCode, alertClear} from '../../../_actions'
import PropTypes                     from 'prop-types';
import _                             from "underscore";
import ResetPassword                 from '../ResetPassword'
import i18next                       from 'i18next';


const NewResetCode = ({alert, getNewResetCode, alertClear}) => {
    const [inputLogin, setInputLogin] = useState("");
    const [formReset, setFormReset] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (alert.message === 2 || alert.message === '2') {
            setFormReset(true)
        }
    }, [alert])


    const onChange = e => {
        setInputLogin(e.target.value)
    };
    const clearDebounced = _.debounce(alertClear, 2000);
    const clearError = _.debounce(() => {
        setError(null)
    }, 2000);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (validateLogin(inputLogin)) {
            getNewResetCode(inputLogin);
            clearDebounced();
        } else {
            setError(i18next.t('invalid_login'));
            clearError()
        }

    };

    const newResetPassword = () => (
        <RegLog header={i18next.t('password_recovery')}>
            <form className="ChangePass__form" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    onChange={onChange}
                    value={inputLogin}
                    className="reglog-input"
                    placeholder={i18next.t('phone_email')}
                />
                {alert.message && alert.message.message && <p className="ChangePass__alert">
                    {alert.message.message}</p>}
                {error && <p className="ChangePass__alert">{error}</p>}
                <div className="ChangePass__btn-box">
                    <button type="submit" className="reglog-btn">
                        {i18next.t('send_code')}
                    </button>
                </div>
            </form>
        </RegLog>
    );


    return (
        <MainLayout>
            {formReset ? <ResetPassword login={inputLogin}/> : newResetPassword()}
        </MainLayout>
    )
}


NewResetCode.propTypes = {
    alert:           PropTypes.object,
    getNewResetCode: PropTypes.func.isRequired,
    alertClear:      PropTypes.func,
};

export default connect(
    ({alert}) => ( {alert} ),
    {getNewResetCode, alertClear}
)(NewResetCode);

