import './style.scss';
import sprite from '../../../img/sprite.svg';
import UserLoginProfile from "../../Header/UserLoginProfile";

import React from 'react';

const MobileFooter = () => {
  return (
    <div className="MobileFooter">
      <svg className="MobileFooter__icon">
        <use xlinkHref={`${sprite}#icon-bell`} />
      </svg>
      <svg className="MobileFooter__icon">
        <use xlinkHref={`${sprite}#icon-star-footer`} />
      </svg>
      <svg className="MobileFooter__icon">
        <use xlinkHref={`${sprite}#icon-setting`} />
      </svg>

      <UserLoginProfile
        clazz='MobileFooter'
      />
    </div>
  );
};

export default MobileFooter;
