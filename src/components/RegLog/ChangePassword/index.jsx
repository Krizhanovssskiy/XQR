import './style.scss';

import RegLog from '../../RegLog';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { validatePassword } from '../../../_helpers/formValidation';
import { forgotPassword } from '../../../_actions'
import PropTypes from 'prop-types';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import i18next                      from 'i18next';


const ChangePass = ({ isLoggedIn, user, alertInfo,history }) => {
  const [inputPass, setInputPass] = useState("");
  const [inputPassConfirm, setInputPassConfirm] = useState("");
  const [inputsEqual, setInputsEqual] = useState(true);

  const onChangeInputPass = e => {
    const inputPass = e.target.value;
    if (validatePassword(inputPass)) setInputPass(inputPass)
  }
  const onChangeInputPassConfigrm = e => {
    const inputPassConfirm = e.target.value;
    if (validatePassword(inputPass)) setInputPassConfirm(inputPassConfirm)
  }

  const clearError = () => setInputsEqual(true);
  const searchAPIDebounced = AwesomeDebouncePromise(clearError, 3000);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (inputPass !== inputPassConfirm) setInputsEqual(false)
    searchAPIDebounced();
    /**Дожидаемся результата и редиректим на главную */
    const res = await forgotPassword('TEST');
    if (res) history.push('/login');
  };

  return (
    <RegLog header="Сменить пароль">
      <form className="ChangePass__form" onSubmit={onFormSubmit}>
        <input
          type="password"
          onChange={onChangeInputPass}
          value={inputPass}
          className="reglog-input"
          placeholder="Введите пароль"
        />
        <input
          type="password"
          onChange={onChangeInputPassConfigrm}
          value={inputPassConfirm}
          className="reglog-input"
          placeholder="Повторите пароль"
        />
        {(!inputsEqual) ?
          <p className="ChangePass__alert">Пароли не совпадают</p>
          : null}
        <div className="ChangePass__btn-box">
          <button type="submit" className="reglog-btn">
            Восстановить пароль
            </button>
          <button type="reset" className="ChangePass__reset-btn">
            Отменить
            </button>
        </div>
      </form>
    </RegLog>
  );
}


ChangePass.propTypes = {
  alert: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  history: PropTypes.object,
};


export default connect(
  ({ alert, auth }) => ({ alertInfo: alert, isLoggedIn: auth.isLoggedIn, user: auth.user }),
  { forgotPassword }
)(ChangePass);

