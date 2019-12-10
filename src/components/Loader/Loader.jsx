import './style.scss';
import sprite from '../../img/sprite.svg';

import React from 'react';

const Loader = () => {
  return (
    <div className="Loader">
      <div id="particles-background" className="Loader__vertical-centered-box"></div>
      <div id="particles-foreground" className="Loader__vertical-centered-box"></div>
      <div className="Loader__vertical-centered-box">
        <div className="Loader__content">
          <div className="Loader__loader-circle"></div>
          <div className="Loader__loader-line-mask">
            <div className="Loader__loader-line"></div>
          </div>
          <svg className="Loader__icon">
            <use xlinkHref={`${sprite}#icon-xcard`} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
