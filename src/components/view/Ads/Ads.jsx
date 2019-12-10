import './style.scss';
import sprite from '../../../img/sprite.svg';
import girl from '../../../img/girl.png';

import React from 'react';

const Ads = () => {
  return (
    <section className="Ads section-main">
      <div className="Ads__text-box">
        <h2 className="Ads__header">Лучшее предложение</h2>
        <ul className="Ads__list">
          <li className="Ads__item">Оплати 2 услуги и получи бонус!</li>
          <li className="Ads__item">1 - Iphone XS</li>
          <li className="Ads__item">2 - Airpods</li>
          <li className="Ads__item">3 - Bluetooth колонка</li>
        </ul>
        <div className="Ads__btn" role="button">
          Подробности узнай тут!
        </div>
      </div>
      <div className="Ads__image-container">
        <div
          className="Ads__image-box"
          style={{ backgroundImage: `url(${girl})` }}
        />
        <svg className="Ads__icon-circle">
          <use xlinkHref={`${sprite}#icon-circle-ads`} />
        </svg>
        <svg className="Ads__icon-dots-ads">
          <use xlinkHref={`${sprite}#icon-dots-ads`} />
        </svg>
      </div>
    </section>
  );
};

export default Ads;
