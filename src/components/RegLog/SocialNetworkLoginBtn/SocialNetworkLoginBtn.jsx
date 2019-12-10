import './style.scss';
import sprite from '../../../img/sprite.svg';
import i18next                           from "i18next";

import React from 'react';

const SocialNetworkLoginBtn = props => (
    <div
      className="SocialNetworkLoginBtn"
      onClick={props.onSignInClick}
      role="button"
    >
      <p className="SocialNetworkLoginBtn__via">
          {i18next.t('via')}
      </p>
      <svg className={`SocialNetworkLoginBtn__icon--${props.name}`}>
        <use xlinkHref={`${sprite}#icon-${props.name}`} />
      </svg>
    </div>
);


export default SocialNetworkLoginBtn;
