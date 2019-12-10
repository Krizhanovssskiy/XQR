import './style.scss';
import imgPopup from '../img/bilding-2.png'

import React from 'react';
import { connect } from 'react-redux';
import { hidePopup } from "../../../../_actions";

const PopupSubscription = ({ hidePopup }) => {
  return (
    <div className='PopupSubscription'>
      <img src={imgPopup}/>
      <div className='PopupSubscription__form-box'>
        <p className='PopupSubscription__title'>
          Раздел в разработке
        </p>
        <p className='PopupSubscription__text'>
          Мы оповестим Вас как только появится обновление.
          Для этого оставьте свой контакт
        </p>
        <form className='PopupSubscription__form'>
          <input
            className='PopupSubscription__input'
            type="text"
            placeholder='Email или телефон'
          />
          <button className='PopupSubscription__btn'>
            Быть в курсе
          </button>
        </form>
      </div>

      <div
        onClick={() => hidePopup()}
        className="Lending__closed-menu"
      />
    </div>
  )
};

export default connect(
  null,
  {
    hidePopup
  }
)(PopupSubscription);