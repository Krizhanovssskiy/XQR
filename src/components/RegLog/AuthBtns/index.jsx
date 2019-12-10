import './style.scss';

import React, {Fragment} from 'react';

import AuthGoogle   from './auth.google';
import AuthFacebook from './auth.facebook';
import AuthTelegram from './auth.telegram';
import i18next                      from 'i18next';


const AuthBtn = () => (
    <Fragment>
      <div className="AuthBtns__text-box">
        <div className="AuthBtns__hr" />
        <p className="AuthBtns__social-text">{i18next.t('or')}</p>
        <div className="AuthBtns__hr" />
      </div>
      <div className="AuthBtns__social-btns">
        <AuthFacebook />
        <AuthGoogle />
        {/*<AuthTelegram />*/}
      </div>
    </Fragment>
);
export default AuthBtn;
