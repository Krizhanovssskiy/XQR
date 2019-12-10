import './style.scss';
import sprite from '../../../img/sprite.svg';
import { buisenessPage, becomePro } from '../../../_helpers/ctaPopupTexts';
import { BUISENESS_PAGE, BECOME_PRO } from '../../../_constants';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hidePopup } from '../../../_actions';
import i18next from 'i18next';

const CTApopup = ({ popupToShow, hidePopup }) => {
  const [plan, setPlan] = useState('annually');

  const onFormSubmit = e => {
    e.preventDefault();
    console.log({ popupToShow, plan });
    hidePopup();
  };

  let textsToRender;
  if (popupToShow === BUISENESS_PAGE) {
    textsToRender = buisenessPage;
  } else if (popupToShow === BECOME_PRO) {
    textsToRender = becomePro;
  }

  const {
    title,
    description,
    pros,
    monthly,
    annually,
    year,
    btn
  } = textsToRender;

  return (
    <div className="CTApopup">
      <div onClick={() => hidePopup()} className="CTApopup__icon-close-box">
        <svg className="CTApopup__icon-close">
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>
      </div>

      <div className="CTApopup__text-box">
        <h1 className="CTApopup__title">{title}</h1>
        <p className="CTApopup__description">{description}</p>
        <ul className="CTApopup__list">
          {pros.map(text => (
            <li className="CTApopup__list-item">
              <div className="CTApopup__list-item-icon-box">
                <svg className="CTApopup__list-item-icon">
                  <use xlinkHref={`${sprite}#icon-confirm`} />
                </svg>
              </div>
              <p className="CTApopup__list-item-text">{text}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={onFormSubmit} className="CTApopup__form">
          <div className="CTApopup__form-box">
            <div className="CTApopup__form-group">
              <input
                type="radio"
                className="CTApopup__form-radio-input"
                id="monthly"
                checked={plan === 'monthly'}
                onChange={() => setPlan('monthly')}
              />
              <label htmlFor="monthly" className="CTApopup__form-radio-label">
                <span className="CTApopup__form-radio-btn"></span>
                <p className="CTApopup__form-group-text">
                  {i18next.t('cta_popup.monthly')}
                </p>
                <p className="CTApopup__form-group-price">
                  <span className="CTApopup__form-group-price-number">
                    {monthly}
                  </span>
                  &nbsp;&#36;&#47;{i18next.t('cta_popup.month')}
                </p>
              </label>
            </div>
            <div className="CTApopup__form-group">
              <input
                type="radio"
                className="CTApopup__form-radio-input"
                id="annually"
                checked={plan === 'annually'}
                onChange={() => setPlan('annually')}
              />
              <label htmlFor="annually" className="CTApopup__form-radio-label">
                <span className="CTApopup__form-radio-btn"></span>
                <p className="CTApopup__form-group-text">
                  {i18next.t('cta_popup.annual')}
                </p>
                <p className="CTApopup__form-group-price">
                  <span className="CTApopup__form-group-price-number">
                    {annually}
                  </span>
                  &nbsp;&#36;&#47;{i18next.t('cta_popup.month')}
                </p>
                <div className="CTApopup__form-radio-label-50">
                  &#45;50&#37;
                </div>
                <p className="CTApopup__form-radio-label-domen">
                  &#40;&#36;{year}&nbsp;{i18next.t('cta_popup.year')}&#41;
                </p>
                {/* <p className="CTApopup__form-radio-label-domen">
                  &#43;{i18next.t('cta_popup.present')}
                </p> */}
              </label>
            </div>
          </div>
          <button type="submit" className="CTApopup__form-submit-btn">
            {btn}
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ popupToShow }) => ({ popupToShow });

export default connect(
  mapStateToProps,
  { hidePopup }
)(CTApopup);
