import './style.scss';

import React from 'react';
import sprite from "../../../img/sprite.svg";

const Lang = () => {
  return (
    <div className="Lang">
      {/*<p className="Lang__label">en</p>*/}
      <svg className="UserNav__icon">
        <use xlinkHref={`${sprite}#icon-EN`} />
      </svg>
    </div>
  );
};

export default Lang;
