import './style.scss';
import sprite from '../../img/sprite.svg';
import girl from '../../img/girl.png';

import React from 'react';
import qrCode from '../../img/qr-code-small.png';

const Contact = props => {
  return (
    <li className={`Contact${props.stylezz || ''}`}>
      <div className="Contact__contact-box">
        <div className="Contact__images-block">
          <div className="Contact__image-box">
            <img src={girl} alt="contact" className="Contact__image" />
          </div>
          <div className="Contact__qr-box">
            <div className="Contact__qr-innerbox">
              <img src={qrCode} alt="qr-code" className="Contact__qr-code" />
            </div>
          </div>
        </div>

        <div className="Contact__text-box">
          <h4 className="Contact__name">Konstancia Algremonto</h4>
          <p className="Contact__spec">UX/UI Designer</p>
        </div>
      </div>
      <div className="Contact__icon-box">
        <p className="Contact__icon-amount-letters">5</p>
        <svg className="Contact__icon">
          <use xlinkHref={`${sprite}#icon-contacts-envelope`} />
        </svg>
      </div>
    </li>
  );
};

export default Contact;
