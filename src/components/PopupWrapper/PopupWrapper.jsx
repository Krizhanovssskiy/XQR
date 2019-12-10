import './style.scss';
import sprite from '../../img/sprite.svg';
import i18next from "i18next";

import React from 'react';

const PopupWrapper = ({ children, onFormSubmit, onClickDelete, onClickReset }) => {
  return (
    <form onSubmit={onFormSubmit} className="PopupWrapper">
      {children}
      <button
        type="button"
        onClick={onClickDelete}
        className="PopupWrapper__delete"
      >
        <svg className="PopupWrapper__icon-delete">
          <use xlinkHref={`${sprite}#icon-cancel`} />
        </svg>
        <p className="PopupWrapper__icon-text">{i18next.t("delete_btn")}</p>
      </button>
      <div className="PopupWrapper__btn-container">
        <button onClick={onClickReset} type="reset" className="PopupWrapper__btn">
          <p className="PopupWrapper__icon-text">{i18next.t("cancel_btn")}</p>
          <svg className="PopupWrapper__icon-cancel">
            <use xlinkHref={`${sprite}#icon-cancel`} />
          </svg>
        </button>
        <button type="submit" className="PopupWrapper__btn">
          <p className="PopupWrapper__icon-text">{i18next.t("save_btn")}</p>
          <svg className="PopupWrapper__icon-confirm">
            <use xlinkHref={`${sprite}#icon-confirm`} />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default PopupWrapper;
