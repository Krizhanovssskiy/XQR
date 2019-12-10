import './style.scss';
import sprite from '../../../img/sprite.svg';
import imageStub from '../../../img/icon-180x180.png';
import { SERVICE } from '../../../_constants';
import { connect } from 'react-redux';
import {
  showPopup,
  hidePopup,
  resetCurrentService,
  alertSuccess
} from '../../../_actions';
import i18next from "i18next";

import React from 'react';

const ServicesPopupView = ({
  isChangePage,
  services,
  showPopup,
  hidePopup,
  resetCurrentService
}) => {
  const { name, price, description, image_url } = services.currentService;
  const imageSrc = image_url ? image_url : imageStub;

  const resetPopup = () => {
    hidePopup();
    resetCurrentService();
  };

  return (
    <div className="ServicesPopupView">
      <div className="ServicesPopupView__icons-box">
        {isChangePage && (
          <div
            onClick={() => showPopup(SERVICE)}
            role="button"
            className="ServicesPopupView__edit-box"
          >
            <svg className="ServicesPopupView__icon-edit">
              <use xlinkHref={`${sprite}#icon-edit`} />
            </svg>
            <p className="ServicesPopupView__text-edit">{i18next.t("change")}</p>
          </div>
        )}
        <svg
          onClick={resetPopup}
          role="button"
          className="ServicesPopupView__icon-cancel"
        >
          <use xlinkHref={`${sprite}#icon-cancel`} />
        </svg>
      </div>
      <div className="ServicesPopupView__image-box">
        <img
          className="ServicesPopupView__image"
          src={imageSrc}
          alt="service"
        />
      </div>
      <div className="ServicesPopupView__text-container">
        <h1 className="ServicesPopupView__title">{name}</h1>
        <div className="ServicesPopupView__buy-box">
          <h2 className="ServicesPopupView__price">&#36;{price}</h2>
          <button className="ServicesPopupView__btn">{i18next.t("in_garbage")}</button>
        </div>
        <div className="ServicesPopupView__description-box">
          <p className="ServicesPopupView__description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ isChangePage, services }) => ({
  isChangePage,
  services
});
export default connect(
  mapStateToProps,
  {
    showPopup,
    hidePopup,
    resetCurrentService,
    alertSuccess
  }
)(ServicesPopupView);
